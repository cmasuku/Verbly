# Verbly Chinese

Verbly Chinese is a static browser prototype for a Mandarin verb-first language-learning app.

## Run

Open `index.html` in a modern browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Mandarin learning model

Mandarin verbs do not conjugate for person or number. The prototype therefore focuses on:

- High-frequency verbs in Hanzi and pinyin
- Subject–verb–object word order
- Modal verbs such as 能 and 想
- Sentence-level translation and recognition
- A foundation for later aspect markers such as 了, 过, and 着
- Verb complements and practical usage patterns

## Included

- Mandarin verb-focused learning path
- Hanzi and pinyin support
- Translation and sentence-completion drills
- XP, daily goal, accuracy, and local progress persistence
- Searchable Mandarin verb bank
- Responsive desktop/mobile layout


## Pinyin keyboard input

Typed lesson questions accept pinyin entered with a regular alphabet keyboard. Tone marks are optional, capitalization is ignored, and spaces or common punctuation do not affect answer checking. For example, `shi`, `shì`, and `Shi` are treated as equivalent.
