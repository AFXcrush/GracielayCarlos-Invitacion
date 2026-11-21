const welcomeScreen = document.getElementById("welcomeScreen");
const openButton = document.getElementById("openInvitation");
const music = document.getElementById("weddingMusic");

openButton.addEventListener("click", async () => {
  // Evitar múltiples clics
  openButton.disabled = true;

  // Iniciar el audio en silencio para conseguir
  // autorización de reproducción mediante el clic.
  music.volume = 0;
  music.muted = true;

  try {
    await music.play();

    // Desvanecer la pantalla de bienvenida
    welcomeScreen.classList.add("fade-out");

    setTimeout(() => {
      audioControl.classList.add("visible");
    }, 1200);

    // Después de 2 segundos, activar el sonido
    setTimeout(() => {
      music.muted = false;

      // Subir el volumen gradualmente
      let volume = 0;

      const fadeMusic = setInterval(() => {
        volume += 0.05;
        music.volume = Math.min(volume, 0.7);

        if (volume >= 0.7) {
          clearInterval(fadeMusic);
        }
      }, 100);
    }, 2000);
  } catch (error) {
    console.error("No se pudo reproducir la música:", error);
    openButton.disabled = false;
  }
});

const audioControl = document.getElementById("audioControl");
const audioIconPlaying = document.getElementById("audioIconPlaying");
const audioIconPaused = document.getElementById("audioIconPaused");

audioControl.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      music.muted = false;
      music.volume = 0.7;
    } catch (error) {
      console.error("No se pudo reanudar la música:", error);
    }
  } else {
    music.pause();
  }
});

// Actualizar el icono según el estado real del audio
function updateAudioIcon() {
  const isPlaying = !music.paused && !music.muted;

  audioIconPlaying.style.display = isPlaying ? "block" : "none";
  audioIconPaused.style.display = isPlaying ? "none" : "block";

  audioControl.setAttribute(
    "aria-label",
    isPlaying ? "Pausar música" : "Reproducir música",
  );

  audioControl.title = isPlaying ? "Pausar música" : "Reproducir música";
}

music.addEventListener("play", updateAudioIcon);
music.addEventListener("pause", updateAudioIcon);
music.addEventListener("volumechange", updateAudioIcon);

updateAudioIcon();
