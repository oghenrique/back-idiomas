const textareaFrom = document.querySelector("#textareaFrom")
const textareaTo = document.querySelector("#textareaTo")
const btnTranslate = document.querySelector("#btnTranslate")
const selectFrom = document.querySelector(".selectFrom")
const selectTo = document.querySelector(".selectTo")

const countries = {
  "en-US": "Inglês",
  "es-ES": "Espanhol",
  "pt-BR": "Português",
}

function createSelectOptions(selectElement, selectedValue) {
  for (let country in countries) {
    const option = document.createElement("option")
    option.value = country
    option.textContent = countries[country]
    if (country === selectedValue) {
      option.selected = true
    }
    selectElement.appendChild(option)
  }
}

createSelectOptions(selectFrom, "pt-BR")
createSelectOptions(selectTo, "en-GB")

function loadTranslation() {
  if (textareaFrom.value) {
    fetch(`https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selectFrom.value}|${selectTo.value}`)
      .then((res) => res.json())
      .then((data) => {
        textareaTo.value = data.responseData.translatedText
      })
      .catch((error) => {
        console.error("Erro ao traduzir:", error)
      })
  } else {
    textareaTo.value = ""
  }
}

btnTranslate.addEventListener("click", loadTranslation)