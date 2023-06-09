import os
from flask import Flask, request,jsonify
from flask_cors import CORS
from flask_restx import Api,Resource
import pandas as pd
import numpy as np
import seaborn as sn
import matplotlib.pyplot as plt
from werkzeug.utils import secure_filename
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split as tts
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score

app = Flask(__name__)
api = Api(app)

CORS(app)
ALLOWED_EXTENSIONS = {'csv'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@api.route('/predict_sales')
class predict_sales(Resource):
    
    global df

    def post(self): 
        file = request.files['file']
       
        
        df = pd.read_csv(file)
        df.head()
        df.info()
        df.columns
        df.nunique()

        df = df[['region', 'year', 'value']].copy()
        df.region.unique()
        df=df[df['region']!='World']
        df.describe()



        return  predict_sales(df)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def predict_sales(data):
            
            df = data

            #split dataset into x and y 
            x=df.loc[:,('region', 'value')].values
            y=df.iloc[:,-1].values

            # label Encoder
            lab=LabelEncoder()
            x[:,0]=lab.fit_transform(x[:,0])
            x[:,1]=lab.fit_transform(x[:,1])


            #split my data
            x_train,x_test,y_train,y_test=tts(x,y,test_size=0.1)

           
            model=LinearRegression()
            model.fit(x_train,y_train)

            y_pred=model.predict(x_test)
            plt.figure(figsize=(8, 6))
            plt.scatter(range(len(y_test)), y_test, color='blue', label='Actual')
            plt.plot(range(len(y_test)), y_pred, color='red', linewidth=2, label='Predicted')
            plt.xlabel('Data Points')
            plt.ylabel('Sales')
            plt.title('Forecasted Sales vs. Actual Sales')
            plt.legend()
            plt.show()
            return 'success'


def allowed_file(self, filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



if __name__ == '__main__':
    app.run(debug=True, port=5000)