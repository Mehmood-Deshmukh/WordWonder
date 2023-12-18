const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const output = $("#output");
const button = $("#search-button");
var sound;
button.click(() => {
  let inputWord = $("#input-word").val();
  fetch(`${url}${inputWord}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      sound = new Audio(`${data[0].phonetics[0].audio}`);
      output.html(`
        <div class="word">
        <h3>${inputWord}</h3>
        <button id="pronounciation"><span class="material-symbols-outlined">
        volume_up
        </span></button>
        </div>
        <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>${data[0].phonetic}</p>
        </div>
        <p class="word-meaning">
        ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">${
          data[0].meanings[0].definitions[0].example || ""
        }</p>
        `);
    }).then(() => {
      output.on("click", "#pronounciation", function (event) {
        sound.play();
      });
    })
    .catch((error) => {
      output.html(`<h3 class="error">Sorry, We Couldn't find the Word</h3>`);
    });
});
