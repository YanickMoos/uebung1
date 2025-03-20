from flask import Flask, request, jsonify, render_template
import spacy

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    text = request.json.get('text', '')
    doc = nlp(text)

    tokens = [token.text for token in doc]
    pos_tags = [(token.text, token.pos_) for token in doc]
    entities = [(ent.text, ent.label_) for ent in doc.ents]

    return jsonify({
        'tokens': tokens,
        'pos_tags': pos_tags,
        'entities': entities
    })

if __name__ == '__main__':
    app.run(debug=True)
