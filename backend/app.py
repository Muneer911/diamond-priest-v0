from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import joblib

preprocessor = joblib.load("../model/preprocessor.joblib")
model = joblib.load("../model/saved-models/model.joblib")

app = Flask(__name__)
CORS(app)



@app.route("/", methods=["POST","GET"])
def home():
    return "Hello, world!"

@app.route("/predict", methods=["POST","GET"])
def predict():

    try:
        # 1. Get the incoming JSON data from the POST request
        incoming_data = request.get_json()
        # print("Raw received data:", incoming_data) 
        if not incoming_data:
            return jsonify({"error": "Invalid JSON input"}), 400
        # return jsonify({"message": "Received", "data": incoming_data})  # Echo back
        # incoming_data = request.get_json
        required_columns = ['carat', 'cut', 'color', 'clarity', 'depth', 'table', 'x', 'y', 'z']
        for column in required_columns:
            if column not in incoming_data:
                return jsonify({"error": f"missing value {column}" }), 400

        # 2. Convert the incoming data into a pandas DataFrame
        # You might get a list of records, so wrap it in a list if necessary
        # input_data = pd.DataFrame([incoming_data])
        # input_fata = pd.DataFrame([incoming_data])
        data = pd.DataFrame([incoming_data])

        # 3. Preprocess the incoming data
        processed_data = preprocessor.transform(data)
        # processed = preprocessor.transform(input_data)
        print(processed_data)

        # 4. Use the preprocessed data to make a prediction
        prediction = model.predict(processed_data)

        # 5. Return the prediction as a JSON response
        return jsonify({"prediction": prediction.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)