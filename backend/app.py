from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from supabase import Client, create_client
from jose import jwt
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
import pandas as pd
import joblib
import os

load_dotenv()
preprocessor = joblib.load("../ml_model/preprocessor.joblib")
model = joblib.load("../ml_model/saved-models/model.joblib")

supabase_url = os.environ.get("SUPABASE_URL")
superbase_apikey = os.environ.get("SUPABASE_BEARER_KEY")
# Use os.environ[...] to ensure SUPABASE_SECRETKEY is a str (KeyError will be raised if missing)
SUPABASE_SECRETKEY = os.environ["SUPABASE_SECRETKEY"]

app = Flask(__name__)
CORS(app)
JWT = JWTManager(app)

supabase: Client = create_client(supabase_url, superbase_apikey)  # pyright: ignore[reportArgumentType]


@app.route("/userdata", methods=["POST", "GET"])
def userdata():
    # Validate Authorization header
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Invalid or missing Authorization header"}), 401

    token = auth_header.split("Bearer ")[1]

    # Diagnostics: show unverified header and claims so we can see alg/aud/sub/exp
    try:
        unverified_header = jwt.get_unverified_header(token)
    except Exception as _:
        unverified_header = None

    try:
        unverified_claims = jwt.get_unverified_claims(token)
    except Exception as _:
        unverified_claims = None

    print("JWT unverified header:", unverified_header)
    print("JWT unverified claims:", unverified_claims)

    try:
        # primary verify (HS256 + audience)
        decoded_token = jwt.decode(
            token, SUPABASE_SECRETKEY, algorithms=["HS256"], audience="authenticated"
        )
    except Exception as e:
        # Return helpful diagnostics to client/logs to debug signature/audience issues
        print("JWT verification failed:", str(e))
        return jsonify(
            {
                "error": "Invalid token",
                "detail": str(e),
                "jwt_header": unverified_header,
                "jwt_claims_unverified": unverified_claims,
            }
        ), 401
    sub = decoded_token.get("sub")
    print("Decoded token:", decoded_token)
    if not sub:
        return jsonify({"error": "Invalid token payload"}), 401

    profile = (
        supabase.from_("id")
        .select("*")
        .eq("uuid", sub)
        .order("user_name")
        .order("user_email")
        .execute()
    )

    user_history = (
        supabase.from_("user_history")
        .select("*")
        .eq("uuid", sub)
        .limit(5)
        .order("created_at", desc=True)
        .execute()
    )

    if not getattr(profile, "data", None) or len(profile.data) == 0:
        return jsonify({"error": "User profile not found"}), 404

    user_profile = {
        "user_name": profile.data[0].get("user_name"),
        "user_email": profile.data[0].get("user_email"),
    }
    his = getattr(user_history, "data", []) or []

    return jsonify({"message": "Pass", "user_profile": user_profile, "user_history": his})


@app.route("/signup", methods=["POST", "GET"])
def signup():
    try:
        # Validate JSON payload
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return jsonify({"error": "username, email and password are required"}), 400

        # Create user via Supabase Auth
        response = supabase.auth.sign_up({"email": email, "password": password})

        # Handle Supabase errors
        if getattr(response, "error", None):
            return jsonify({"error": getattr(response.error, "message", str(response.error))}), 400

        if not getattr(response, "user", None):
            return jsonify({"error": "User creation failed"}), 500

        user_id = response.user.id

        # Store hashed password
        hashed = generate_password_hash(password)
        supabase.table("id").insert(
            {
                "uuid": user_id,
                "user_name": username,
                "user_email": email,
                "user_hashed_password": hashed,
            }
        ).execute()

        return jsonify({"message": "Signup successful"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


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

        response = supabase.auth.sign_in_with_password({"email": email, "password": password})

        if not getattr(response, "user", None):
            return jsonify({"error": "user not found"}), 404

        user = response.user.id
        access_token = getattr(response.session, "access_token", None)

        profile = (
            supabase.from_("id")
            .select("*")
            .eq("uuid", user)
            .order("user_name")
            .execute()
        )

        if not getattr(profile, "data", None) or len(profile.data) == 0:
            return jsonify({"error": "User profile not found"}), 404
        print(profile)
        
        user_history = (
            supabase.from_("user_history")
            .select("*")
            .eq("uuid", user)
            .limit(5)
            .order("created_at", desc=True)
            .execute()
        )
        print(user_history)

        return jsonify(
            {
                "message": "logged in successfully",
                "user": {
                    "id": profile.data[0].get("uuid"),
                    "user_email": profile.data[0].get("user_email"),
                    "user_name": profile.data[0].get("user_name"),
                },
                "access_token": access_token,
                "redirect_url": "/Dashboard",
            }
        )

    except Exception as e:
        return jsonify(error=f"{str(e)}"), 500


@app.route("/predict", methods=["POST", "GET"])
def predict():
    try:
        # 1. Get the incoming JSON data from the POST request
        incoming_data = request.get_json()
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Invalid or missing Authorization header"}), 401

        cookie = auth_header.split("Bearer ")[1]
        try:
            decookie = jwt.decode(cookie, SUPABASE_SECRETKEY, algorithms=["HS256"], audience="authenticated")
        except Exception as e:
            return jsonify({"error": "Invalid token", "detail": str(e)}), 401

        if not incoming_data:
            return jsonify({"error": "Invalid JSON input"}), 400

        required_columns = ["carat", "cut", "color", "clarity", "depth", "table", "x", "y", "z"]
        for column in required_columns:
            if column not in incoming_data:
                return jsonify({"error": f"missing value {column}"}), 400

        # 2. Convert the incoming data into a pandas DataFrame
        data = pd.DataFrame([incoming_data])

        # 3. Preprocess the incoming data
        processed_data = preprocessor.transform(data)

        # 4. Use the preprocessed data to make a prediction
        prediction = model.predict(processed_data)
        # Round the predicted price into two decimals
        rounded_prediction = round(float(prediction[0]), 2)

        # Add "uuid" and "price" to the data dic
        incoming_data["uuid"] = decookie.get("sub")
        incoming_data["price"] = rounded_prediction

        supabase.from_("user_history").insert([incoming_data]).execute()

        # 5. Return the prediction as a JSON response
        return jsonify({"price": rounded_prediction})

    except Exception as e:
        return jsonify(error=f"the error is {str(e)}"), 500
