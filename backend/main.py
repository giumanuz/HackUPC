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
INCIPIT = "Respond to the following question using the " \
          "information in the provided context. If you cannot provide the answer based on " \
          "the context, respond with 'I don't know how to answer this question'."

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
    getLogger().warn(files)

    for file in files:
        file_path = os.path.join(FOLDER_PATH, file.filename)
        file.save(file_path)


    current_time = int(time())
    query_engine = return_query_engine(f"basta {current_time}")

    NUMBER_CURRENT_CHAT +=1
    HISTORY_CHAT[NUMBER_CURRENT_CHAT] = []
    return ('', 200)

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
    return list(HISTORY_CHAT.keys())

@app.route('/get_chat', methods=['GET'])
def get_chat():
    chat_number = int(request.args.get('chat_number'))
    return HISTORY_CHAT[chat_number]

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
