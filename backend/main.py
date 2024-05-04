from flask import Flask, request, redirect, url_for, render_template, abort
from read import read_file
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

def add_file():
    if request.method == 'POST':
        file = request.files['fileToUpload']
        if not (file.filename.endswith('.pdf') or file.filename.endswith('.txt')):
            abort(400, 'Bad Request: Invalid file format')
            

        folder_path = f'file_uploadati'
        os.makedirs(folder_path, exist_ok=True)
        
        file_path = os.path.join(folder_path, file.filename)
        file.save(file_path)
        
        text = read_file(file_path)
        return text
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
