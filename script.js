class CountWord {
  constructor(text) {
    this.text = text;
    this.text.addEventListener("input", () => {
      this.count();
    });
  }

  count() {
    let word = this.calculateWords(this.text.value.trim());
    this.emitEvent(word);
  }

  calculateWords(str) {
    let matches = str.match(/\S+/g);
    return {
      characters: str.length,
      words: matches ? matches.length : 0,
    };
  }

  emitEvent(word) {
    let countEvent = new CustomEvent("count", {
      bubbles: true,
      cancelable: true,
      detail: {
        word,
      },
    });
    this.text.dispatchEvent(countEvent);
  }
}
let text = document.querySelector("textarea");
let p = document.querySelector("#output");

new CountWord(text);

const render = (event) => {
  p.innerHTML = `You've written ${event.detail.word.words} words and ${event.detail.word.characters} characters`;
};

text.addEventListener("count", render);
