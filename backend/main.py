from flask import Flask, request, redirect, url_for, render_template
from read import read_file
import os
from time import time
from datetime import datetime
from flask import abort
from chat_query import return_query_engine
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
FOLDER_PATH = f'file_uploadati'
DOMANDA = "Di cosa parlano i promessi sposi?"
INCIPIT= "Se non hai la risposta alla seguente domanda, non devi rispondere."
query_engine = None

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_query')
def send_query():
    return render_template('query.html')

@app.route('/upload_file', methods=['POST'])
def upload_file():
    global query_engine
    os.makedirs(FOLDER_PATH, exist_ok=True)
    files = request.files.getlist('fileToUpload')
    for file in files:
        ispdf = file.filename.endswith('.pdf')
        istxt = file.filename.endswith('.txt')
        if not (ispdf or istxt):
            abort(400, 'Invalid file format. Only PDF and TXT files are allowed.')

    start_time = datetime.now()
    for file in files:
        ispdf = file.filename.endswith('.pdf')
        istxt = file.filename.endswith('.txt')
        file_path = os.path.join(FOLDER_PATH, file.filename)
        if istxt:
            file.save(file_path)
        else:
            text = read_file(file_path)
            with open(f'{FOLDER_PATH}/{file.filename}.txt', 'w') as f:
                f.write(text)
    end_time = datetime.now()
    print(f"LOG upload: Tempo di risposta: {end_time - start_time}")
        
    current_time = int(time())
    start_time = datetime.now()
    query_engine = return_query_engine(f"ciao {current_time}")
    end_time = datetime.now()
    print(f"LOG train: Tempo di risposta: {end_time - start_time}")
    return

@app.route('/delete_file', methods=['POST', 'GET'])
def delete_file():
    if request.method == 'POST':
        file_name = request.form['fileToDelete']
        file_path = f'file_uploadati/{file_name}'
        os.remove(file_path)
        return redirect(url_for('home'))
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def query():
    query = request.form['query']
    start_time = datetime.now()
    response = str(query_engine.query(f"{INCIPIT} {query}"))
    end_time = datetime.now()
    print(f"LOG query: Tempo di risposta: {end_time - start_time}")
    return response

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
