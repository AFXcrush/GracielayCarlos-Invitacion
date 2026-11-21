const music = document.getElementById("weddingMusic");
const button = document.getElementById("musicButton");

async function playMusic() {
  try {
    await music.play();
    button.textContent = "♫ Pausar canción";
  } catch (error) {
    console.log("El navegador bloqueó la reproducción automática.");
    button.textContent = "♡ Reproducir canción";
  }
}

button.addEventListener("click", async () => {
  if (music.paused) {
    await playMusic();
  } else {
    music.pause();
    button.textContent = "♡ Reproducir canción";
  }
});

// Intentar reproducir después de 3 segundos
window.addEventListener("load", () => {
  setTimeout(playMusic, 2000);
});
