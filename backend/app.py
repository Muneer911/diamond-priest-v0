from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, jwt_manager, get_jwt_identity
from flask_bcrypt import Bcrypt
from datetime import datetime
import pandas as pd
import joblib

preprocessor = joblib.load("../model/preprocessor.joblib")
model = joblib.load("../model/saved-models/model.joblib")
app = Flask(__name__)
app.config["JWT-SECRET-KEY"] = "e1c34f338297eddab8cf07cee9699290ca9c1122d951c14c393407a6d6fabbb0f1d7235a368b79a323c098e6a8820832e347dee66782d275e75e833e38609a19d16c641340a81c2791914ed389908aadd2feb1ea7aef4b52cbef43b2dc97dc8f93c79ef2d2598d49834d434eb03eff6316cfc2d07cb99f7ca9328752b7f6ece2c2cf4c6d25dddc4ffb51ebe492706e3ee8fa1a79034f0883bc5fe5de5b61f4c34c57b744af87b1c0ebca3a8364e75a1da31e061b9e4114639b32e33150671eba6be65ed26ffbd6a4e3064d7e6652d73f6ba4b92f29272af1f70cd5bac54a9a8196ae3b24af08ca2c6a109de1e0cc28f48aee2c3621aa21392f5af09fb1ae9b17"
bcrypt = Bcrypt(app)
CORS(app)
users = {"amd.muneer0@gmail.com":"$2a$12$ksYOPHt4sJ1wNPTwO4gO2eZL/enoxAniTQuKso0sahXxvn511vOZO"} # Temporary in-memory database 



@app.route("/", methods=["POST","GET"])
def home():
    return "Hello, world!"

@app.route("/signup", methods=["POST", "GET"])
def signup():
    try:
        # Get the incoming JSON data
        data = request.get_json()
        email = data["email"]
        password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

        # Store the email and hashed password in the users dictionary
        users[email] = password

        return jsonify(message="User registered successfully"), 201

    except Exception as e:
        return jsonify(error=f"An error occurred: {str(e)}"), 500


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

        # Check if the email exists in the users dictionary
        if email in users:
            # Validate the password using bcrypt
            hashed_password = users[email]  # Retrieve the hashed password
            if bcrypt.check_password_hash(hashed_password, password):
                return jsonify(message="Logged in successfully"), 200
            else:
                return jsonify(error="Invalid password"), 401
        else:
            return jsonify(error="Email not found"), 404

    except Exception as e:
        return jsonify(error=f"An error occurred: {str(e)}"), 500


predictionhis = []
@app.route("/predict", methods=["POST","GET"])
def predict():
    try:
        # 1. Get the incoming JSON data from the POST request
        incoming_data = request.get_json()
        
        if not incoming_data:
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

        # for entry in incoming_data:
        #     predictionhis[len()]
        current_time = datetime.now().strftime("%Y-%m-%d  %H:%M:%S")
        new_entry = {"data" :incoming_data,"price": rounded_prediction, "date": current_time}
        predictionhis.append(new_entry)

        # 5. Return the prediction as a JSON response
        return jsonify(rounded_prediction)

    except Exception as e:
        return jsonify(error=f"the error is {str(e)}")
    

@app.route("/gethis", methods=['GET'])
def gethis():
    try:
        # Return the prediction history as a JSON response
        return jsonify(predictionhis), 200
    except Exception as e:
        # Handle any unexpected errors
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)