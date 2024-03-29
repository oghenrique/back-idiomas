'use strict'

const textareaFrom = document.querySelector("#textareaFrom")
const textareaTo = document.querySelector("#textareaTo")
const btnTranslate = document.querySelector("#btnTranslate")
const selectFrom = document.querySelector(".selectFrom")
const selectTo = document.querySelector(".selectTo")
const microphone = document.querySelector("#microphone")
const volume = document.querySelector("#volume")


const countries = {
  "ar-AR": "Árabe",
  "de-DE": "Alemão",
  "zh-ZH": "Chinês",
  "es-ES": "Espanhol",
  "fr-FR": "Francês",
  "en-US": "Inglês",
  "it-IT": "Italiano",
  "ja-JA": "Japonês",
  "pt-BR": "Português",
  "ru-RU": "Russo"
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
createSelectOptions(selectTo, "en-US")

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

// feature comandos de voz

let recognition

'webkitSpeechRecognition' in window
recognition = new (window.webkitSpeechRecognition)()
recognition.lang = 'pt-BR'


if (recognition) {
  microphone.addEventListener("click", () => {
    recognition.start()
  })

  recognition.addEventListener("result", (event) => {
    const speechToText = event.results[0][0].transcript
    textareaFrom.value = speechToText
  })
}

volume.addEventListener("click", () => {
  const textToRead = textareaTo.value
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance(textToRead)
    speech.lang = selectTo.value
    window.speechSynthesis.speak(speech)
  } else {
    alert("Desculpe, seu navegador não suporta a funcionalidade de leitura de texto.")
  }
})
