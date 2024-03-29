document.addEventListener("DOMContentLoaded", function () {
  const modoNoturno = document.getElementById('modoNoturno')
  const textareaFrom = document.getElementById('textareaFrom')
  const textareaTo = document.getElementById('textareaTo')
  const body = document.body

  let modoEscuro = false

  modoNoturno.addEventListener('click', function () {
    modoEscuro = !modoEscuro
    toggleModo(modoEscuro)
  })

  function toggleModo(modoEscuro) {
    if (modoEscuro) {
      modoNoturno.src = './img/sol.png'
      body.style.backgroundColor = 'black'
      textareaFrom.style.color = 'white'
      textareaTo.style.color = 'white'
      textareaFrom.style.borderBottomColor = 'white'
      textareaTo.style.borderBottomColor = 'white'
      document.body.style.color = 'white'
    } else {
      modoNoturno.src = './img/lua.png'
      body.style.backgroundColor = ''
      textareaFrom.style.color = ''
      textareaTo.style.color = ''
      textareaFrom.style.borderBottomColor = ''
      textareaTo.style.borderBottomColor = ''
      document.body.style.color = 'black'
    }
  }

  //feature alice

  function emilyEgustavo() {
    if (textareaFrom.value.toLowerCase() === "gustavo" || textareaFrom.value.toLowerCase() === "emily" ) {
      modoEscuro = !modoEscuro
      toggleModo(modoEscuro)
    }
  }

  btnTranslate.addEventListener("click", emilyEgustavo)
})
