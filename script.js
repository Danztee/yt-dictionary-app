const button = document.getElementById("btn");
const definitionsDiv = document.getElementById("definitions");

async function searchDictionary() {
  const searchInput = document.getElementById("searchInput");
  const word = searchInput.value.trim().toLowerCase();

  if (word === "") return alert("Please enter a word");

  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  const spinner = document.getElementById("spinner");

  try {
    definitionsDiv.innerHTML = "";
    spinner.style.display = "block";

    const res = await fetch(apiUrl);
    const data = await res.json();

    displayDefinitions(data);
  } catch (error) {
    console.log(error);
    alert("Word not found");
  } finally {
    spinner.style.display = "none";
  }
}

function displayDefinitions(data) {
  console.log(data);

  data.forEach((entry) => {
    const word = entry.word;
    const meanings = entry.meanings;

    const heading = document.createElement("h2");
    heading.textContent = word;
    definitionsDiv.appendChild(heading);

    meanings.forEach((meaning) => {
      const partOfSpeech = document.createElement("p");
      partOfSpeech.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
      definitionsDiv.appendChild(partOfSpeech);

      meaning.definitions.forEach((definition, index) => {
        const definitionParagraph = document.createElement("p");
        definitionParagraph.textContent = `${index + 1}. ${
          definition.definition
        }`;
        definitionsDiv.appendChild(definitionParagraph);
      });
    });
  });
}

button.addEventListener("click", searchDictionary);
