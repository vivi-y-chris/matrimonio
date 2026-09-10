// Contraseña de la invitación
const PASSWORD = "chrisyvivi2027";

// Formulario RSVP
const RSVP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScv2iNQlzOIfNVkTfNxbJTCqx-PZQnaG-7dnMBYdWmG9vRZGw/viewform?usp=header";

// Lista de regalos
const GIFTS_PAGE_URL =
  "https://milistadenovios.cl/lista/chrisyviviparasiempre";

const authScreen = document.getElementById("auth-screen");
const siteContent = document.getElementById("site-content");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const authError = document.getElementById("auth-error");
const lockAgain = document.getElementById("lock-again");


function normalize(value) {
  return String(value).trim().toLowerCase();
}


function unlockSite() {
  document.body.classList.remove("locked");
  authScreen.classList.add("hidden");
  siteContent.classList.remove("hidden");

  localStorage.setItem("wedding_invitation_unlocked", "true");

  window.scrollTo({ top: 0 });
}


function lockSite() {
  document.body.classList.add("locked");
  siteContent.classList.add("hidden");
  authScreen.classList.remove("hidden");

  localStorage.removeItem("wedding_invitation_unlocked");

  passwordInput.value = "";
  passwordInput.focus();

  window.scrollTo({ top: 0 });
}


passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (normalize(passwordInput.value) === normalize(PASSWORD)) {
    authError.textContent = "";
    unlockSite();
  } else {
    authError.textContent = "Clave incorrecta. Intenta nuevamente.";
    passwordInput.select();
  }
});


lockAgain.addEventListener("click", lockSite);


if (localStorage.getItem("wedding_invitation_unlocked") === "true") {
  unlockSite();
}


// Cambia el link placeholder del RSVP por el link real
document
  .querySelectorAll(
    'a[href="https://forms.gle/REEMPLAZAR_CON_TU_FORM"]'
  )
  .forEach((link) => {
    link.href = RSVP_FORM_URL;
  });


// Cambia regalos.html por el link real de la lista de regalos
document
  .querySelectorAll('a[href="regalos.html"]')
  .forEach((link) => {
    link.href = GIFTS_PAGE_URL;
    link.target = "_blank";
    link.rel = "noopener";
  });