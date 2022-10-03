#http://localhost:5000/static/pos.html
import spacy
from flask import Flask, request
from werkzeug.exceptions import BadRequest

print('Loading NLP model...')
nlp = spacy.load('en_core_web_lg')
print('Loaded NLP model!')

app = Flask(__name__)

@app.route('/api/pos')
def pos():
    if request.args.get('text') is None: #handles for case where text points to NULL
        raise BadRequest()

    results = []

    text = request.args.get('text') # Gets the text parameter from the URL's query string (i.e. the part after the '?')
    #this will basically be whatever you type into the text area on the page
    doc = nlp(text)
    sents = list(doc.sents)
    for sent in sents:
        sent_result = []
        for token in sent:
            sent_result.append({ #sent_result dictionary that will have the word/token + " " as well as the word's part of speech
                'text': token.text_with_ws, #Text content, with trailing space character if present.
                'pos': token.pos_ #part of speech 
            })
        results.append(sent_result)

    return {
        'results': results #returns JSON data 
    }

if __name__ == '__main__':
    app.run(port=5000, debug=True, threaded=True) #sets and runs app at port "5000", turns on debug mode, allows for multi-threading
