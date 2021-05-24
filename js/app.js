// Mis variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

// mis eventos
addEventListener();

function addEventListener() {
  // Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  // Cuando el documento esté listo

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    console.log(tweets);

    crearHTML();
  });
}

// mis funciones
function agregarTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value;

  if (tweet === "") {
    mostrarError("Debes Agregar Un Tweet");

    return; // evita ejecutar más líneas de código.
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  // Añadir al array

  tweets = [...tweets, tweetObj];

  // Crear HTML
  crearHTML();

  // Reiniciar el formulario

  formulario.reset();
}

// Mostrar Mensaje de Error.
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.querySelector("#contenido");

  // insertar el error en el contenido
  contenido.appendChild(mensajeError);

  // Elimina la alerta después de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// Muestra el listado de los tweets

function crearHTML() {
  //limpiar HTML
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      // añadir la función de eliminar.

      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      const li = document.createElement("li");

      // Añadir un tweet al DOM

      li.innerText = tweet.tweet;

      // Eliminar el tweet
      li.appendChild(btnEliminar);

      // Isertarlo en el HTML.
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

// agregar los tweets a local storage

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Elimina un tweet

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  crearHTML();
}

// Limpiar el HTML

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
