from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from supabase import Client, create_client
from jose import jwt
from dotenv import load_dotenv

import pandas as pd
import joblib
import os
preprocessor = joblib.load("../ml_model/preprocessor.joblib")
model = joblib.load("../ml_model/saved-models/model.joblib")
supabase_url = os.getenv("SUPABASE_URL")
superbase_apikey = os.getenv("SUPABASE_BEARER_KEY")
superbase_SK = os.getenv("SUPABASE_SECRETKEY")
app = Flask(__name__)
CORS(app)
JWT = JWTManager(app)

load_dotenv()
supabase: Client = create_client(supabase_url,superbase_apikey)

@app.route("/userdata", methods=["POST","GET"])
def home():
    response = request.headers["Authorization"]
    token = response.split("Bearer ")[1]
    decoded_token = jwt.decode(token, superbase_SK, algorithms=["HS256"],  audience="authenticated")
    sub = decoded_token["sub"]

    profile = supabase.from_("id")\
    .select("*")\
    .eq("uuid", sub)\
    .order("user_name")\
    .order("user_email").execute()

    user_history = supabase.from_("user_history")\
    .select("*")\
    .eq("uuid", sub)\
    .limit(5)\
    .order("created_at", desc=True)\
    .execute()

    user_profile = {"user_name": profile.data[0]["user_name"],
                    "user_email": profile.data[0]["user_email"]}
    his = user_history.data


    return jsonify({"message": "Pass", "user_profile":user_profile, "user_history":his})

@app.route("/signup", methods=["POST", "GET"])
def signup():
    try:
        # Get the incoming JSON data
        data = request.get_json()
        username = data["username"]
        email = data["email"]
        password = data["password"]

        # Store the email and hashed password in the users dictionary
        response = supabase.auth.sign_up({"email": email, "password": password})
        if response.user:
            user_id = response.user.id
            supabase.table("id").insert({
                "uuid": user_id,
                "user_name": username,
                "user_email": email,
                "user_hashed_password": password
            }).execute()

        if "error" in response:
            return jsonify({"error": response.error.message}), 400
        
        return jsonify({"message": "Signup successful"}), 201

    except Exception as e:
        return jsonify(error=f"{str(e)}"), 500


@app.route("/signin", methods=["POST", "GET"])
def signin():
    try:
        # Get the incoming JSON data
        signinData = request.get_json()

        if not signinData or "email" not in signinData or "password" not in signinData:
            return jsonify(error="Invalid input. 'email' and 'password' are required."), 400
        
        # Store the incoming data 
        email = signinData["email"]
        password = signinData["password"]

        response = supabase.auth.sign_in_with_password({
            "email":email,
            "password":password
        })

        user = response.user.id
        if not user:
            return jsonify({"error":"user not found"})
        
        access_token = response.session.access_token
        profile = supabase.from_("id")\
            .select("*")\
            .eq("uuid",user)\
            .order("user_name")\
            .execute()
        
        return jsonify({"message":"logged in successfully",
                        "user": {
                            "id": profile.data[0]["uuid"],
                            "user_email": profile.data[0]["user_email"],
                            "user_name": profile.data[0]["user_name"]
                        },
                        "access_token": access_token,
                        "redirect_url": "/Dashboard"})

    except Exception as e:
        return jsonify(error=f"{str(e)}"), 500


predictionhis = []
@app.route("/predict", methods=["POST","GET"])
def predict():
    try:
        # 1. Get the incoming JSON data from the POST request
        incoming_data = request.get_json()
        incoming_header = request.headers["Authorization"]
        cookie = incoming_header.split("Bearer ")[1]
        decookie = jwt.decode(cookie, superbase_SK, algorithms=["HS256"], audience="authenticated")
        
        if not incoming_data or not cookie:
            return jsonify({"error": "Invalid JSON input"}), 400
      
        required_columns = ['carat', 'cut', 'color', 'clarity', 'depth', 'table', 'x', 'y', 'z']
        for column in required_columns:
            if column not in incoming_data:
                return jsonify({"error": f"missing value {column}" }), 400

        # 2. Convert the incoming data into a pandas DataFrame
        data = pd.DataFrame([incoming_data])

        # 3. Preprocess the incoming data
        processed_data = preprocessor.transform(data)
        
        # 4. Use the preprocessed data to make a prediction
        prediction = model.predict(processed_data)
        # Round the predicted price into two decimals 
        rounded_prediction = round(float(prediction[0]), 2)

        # Add "uuid" and "price" to the data dic
        incoming_data["uuid"] = decookie["sub"]
        incoming_data["price"] = rounded_prediction
    
        supabase.from_("user_history")\
        .insert([incoming_data]).execute()

        # 5. Return the prediction as a JSON response
        return jsonify(rounded_prediction)

    except Exception as e:
        return jsonify(error=f"the error is {str(e)}")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)