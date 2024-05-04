from flask import Flask, request, redirect, url_for, render_template
from read import read_file
import os
from time import time
from datetime import datetime
from flask import abort
from chat_query import return_query_engine
from logging import getLogger
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

FOLDER_PATH = f'/app/backend/file_uploadati'
INCIPIT = "If you cannot provide the answer based on " \
          "the context, respond with 'I cannot answer this question'."

query_engine = None
HISTORY_CHAT = {}
NUMBER_CURRENT_CHAT = 0

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/send_query')
def send_query():
    return render_template('query.html')

@app.route('/upload_file', methods=['POST'])
def upload_file():
    global query_engine
    global NUMBER_CURRENT_CHAT
    os.makedirs(FOLDER_PATH, exist_ok=True)
    files = request.files.getlist('file')
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
        text = read_file(file_path)
        with open(f'{FOLDER_PATH}/{file.filename[:-4]}.txt', 'w') as f:
            f.write(text)
    end_time = datetime.now()
    print(f"LOG upload: Tempo di risposta: {end_time - start_time}")

    current_time = int(time())
    start_time = datetime.now()
    query_engine = return_query_engine(f"basta {current_time}")
    end_time = datetime.now()
    print(f"LOG train: Tempo di risposta: {end_time - start_time}")
    NUMBER_CURRENT_CHAT +=1
    HISTORY_CHAT[NUMBER_CURRENT_CHAT] = []
    return ('', 200)


# @app.route('/delete_file', methods=['POST', 'GET'])
# def delete_file():
#     if request.method == 'POST':
#         file_name = request.form['fileToDelete']
#         file_path = f'file_uploadati/{file_name}'
#         os.remove(file_path)
#         return redirect(url_for('home'))
#     return render_template('index.html')

@app.route('/query', methods=['POST'])
def query():
    query = request.json['query']
    issafe = request.json['safemode'] == True
    start_time = datetime.now()
    print(issafe)
    response = str(query_engine.query(f"{INCIPIT} {query}" if issafe else query))
    end_time = datetime.now()
    print(f"LOG query: Tempo di risposta: {end_time - start_time}")
    HISTORY_CHAT[NUMBER_CURRENT_CHAT].append({'role': 'user', 'response': query})
    HISTORY_CHAT[NUMBER_CURRENT_CHAT].append({'role': 'bot', 'response': response})
    return (response, 200)

@app.route('/list_all_chat', methods=['GET'])
def list_all_chat():
    return HISTORY_CHAT.keys()

@app.route('/get_chat', methods=['GET'])
def get_chat():
    chat_number = request.args.get('chat_number')
    return HISTORY_CHAT[chat_number]

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
