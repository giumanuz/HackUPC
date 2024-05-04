from flask import Flask, request, redirect, url_for, render_template
from read import read_file
import os
from datetime import datetime
from flask import abort
from chat_query import return_query_engine
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
FOLDER_PATH = f'file_uploadati'
DOMANDA = "Di cosa parlano i promessi sposi?"
INCIPIT= "Se non hai la risposta alla seguente domanda, non devi rispondere."

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_query')
def send_query():
    return render_template('query.html')

@app.route('/upload_file', methods=['POST', 'GET'])
def upload_file():
    if request.method == 'POST':
        files = request.files.getlist('fileToUpload')
        for file in files:
            if not (file.filename.endswith('.pdf') or file.filename.endswith('.txt')):
                abort(400, 'Invalid file format. Only PDF and TXT files are allowed.')

            
            os.makedirs(FOLDER_PATH, exist_ok=True)
            
            file_path = os.path.join(FOLDER_PATH, file.filename)
            file.save(file_path)
            
            text = read_file(file_path)
            
        return render_template('query.html')
    return render_template('index.html')

@app.route('/delete_file', methods=['POST', 'GET'])
def delete_file():
    if request.method == 'POST':
        file_name = request.form['fileToDelete']
        file_path = f'file_uploadati/{file_name}'
        os.remove(file_path)
        return redirect(url_for('home'))
    return render_template('index.html')

@app.route('/query', methods=['POST', 'GET'])
def query():
    if request.method == 'POST':
        query = request.form['query']
        # take the hour and second
        now = datetime.now()
        current_time = now.strftime("%H-%M-%S")
        query_engine = return_query_engine("prova")
        response = str(query_engine.query(f"{INCIPIT} {query}"))
        print(response)
        return response
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
