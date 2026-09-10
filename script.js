// Cambia esta clave por la que quieras enviar a tus invitados.
// Esta es una protección simple: la clave queda en el código público de GitHub Pages.
const PASSWORD = "chrisyvivi2027";

// Cambia este link por tu Google Form real.
const RSVP_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScv2iNQlzOIfNVkTfNxbJTCqx-PZQnaG-7dnMBYdWmG9vRZGw/viewform?usp=header";

const GIFTS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxvIHU3_uW6cjDtWIwDA2lSuqUg7ggZ_21KIrgBF4iGz7I7vtVYD-WjBuSMBrx4-L10zg/exec";

const giftForm = document.getElementById("gift-form");
const guestName = document.getElementById("guest-name");
const guestMessage = document.getElementById("guest-message");
const giftFormStatus = document.getElementById("gift-form-status");

function getSelectedGifts() {
  const quantities = getQuantities();

  return gifts
    .map((gift, index) => {
      const quantity = quantities[index];
      if (quantity <= 0) return null;

      return {
        name: gift.name,
        quantity: quantity,
        unitPrice: gift.price,
        subtotal: quantity * gift.price
      };
    })
    .filter(Boolean);
}

function getTotalAmount() {
  return getSelectedGifts().reduce((sum, gift) => sum + gift.subtotal, 0);
}

giftForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const selectedGifts = getSelectedGifts();
  const total = getTotalAmount();

  if (selectedGifts.length === 0) {
    giftFormStatus.textContent = "Nada seleccionado aún.";
    return;
  }

  const payload = {
    name: guestName.value,
    message: guestMessage.value,
    totalUsd: total,
    selectedGifts: selectedGifts
  };

  giftFormStatus.textContent = "Enviando...";

  try {
    await fetch(GIFTS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify(payload)
    });

    giftFormStatus.textContent = "¡Muchísimas gracias! Ahora viene el último paso:";
    giftForm.reset();
  } catch (error) {
    giftFormStatus.textContent = "Algo salió mal. Por favor, inténtalo de nuevo.";
  }
});

const gifts = [
  { name: "Un cartón de la lotería de Wisconsin 🍀🍀", price: 5000 },
  { name: "Una cerveza para cada uno 🥂💑", price: 10000 },  
  { name: "2 entradas (student discount!) a la Madison Symphony Orchestra 🎶🎻", price: 30000 },  
  { name: "Pack de quesos de Wisconsin 🥰🍳", price: 50000 },  
  { name: "1 hora de clases de inglés 🙏🕰️", price: 60000 },  
  { name: "Una noche de hospedaje en algún lugar de Europa 🛋️🍷", price: 60000 },  
  { name: "Un libro de Teoría de Juegos 📚💡", price: 70001 },  
  { name: "Un libro de Termodinámica 📚🎇", price: 70000 },  
  { name: "Clases de salsa por un mes 🎺🎶", price: 80000 },  
  { name: "Una cena deliciosa en la Luna de Miel 🍽️", price: 90000 },  
  { name: "Brunch de lujo 🍳🍽️", price: 100000 },  
  { name: "Ir al teatro en Nueva York 🎇🎆", price: 120000 },  
  { name: "Un tour por los Highlands de Escocia 🏔️🌿", price: 150000 },  
  { name: "Tour por Teotihuacán en la luna de miel 🏔️🌿", price: 200000 },  
  { name: "Entradas a un concierto de SOAD en Chicago 🎵🎤", price: 250000 },
  { name: "Viaje por tierra a Toronto 🚗", price: 300000 }, 
  { name: "Pasajes a Nueva York ✈️🍷", price: 500000 }, 
  { name: "Viaje por Yosemite National Park 🏔️🌅", price: 600000 },
  { name: "Viaje de Wisconsin a Chile ✈️🏔️", price: 900000 },
];

const authScreen = document.getElementById("auth-screen");
const siteContent = document.getElementById("site-content");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const authError = document.getElementById("auth-error");
const lockAgain = document.getElementById("lock-again");
const giftList = document.getElementById("gift-list");
const totalUsd = document.getElementById("total-usd");

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

document.querySelectorAll('a[href="https://forms.gle/REEMPLAZAR_CON_TU_FORM"]').forEach((link) => {
  link.href = RSVP_FORM_URL;
});

function money(value) {
  return "$" + new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value) + " CLP";
}

function renderGifts() {
  giftList.innerHTML = "";

  gifts.forEach((gift, index) => {
    const card = document.createElement("article");
    card.className = "gift-card-item";

    card.innerHTML = `
      <div class="gift-card-top">
        <h3 class="gift-name">${gift.name}</h3>
        <div class="gift-price">${money(gift.price)}</div>
      </div>

      <div class="gift-card-bottom">
        <span class="qty-label">Cantidad</span>
        <div class="qty-control" aria-label="Quantity for ${gift.name}">
          <button type="button" class="qty-minus" data-index="${index}" aria-label="Restar">−</button>
          <input type="number" min="0" step="1" value="0" inputmode="numeric" data-index="${index}" aria-label="Quantity" />
          <button type="button" class="qty-plus" data-index="${index}" aria-label="Sumar">+</button>
        </div>
      </div>
    `;

    giftList.appendChild(card);
  });

  updateTotal();
}

function getQuantities() {
  return Array.from(giftList.querySelectorAll("input[type='number']")).map((input) => {
    const value = Number.parseInt(input.value, 10);
    return Number.isFinite(value) && value > 0 ? value : 0;
  });
}

function updateTotal() {
  const quantities = getQuantities();
  const total = quantities.reduce((sum, qty, index) => sum + qty * gifts[index].price, 0);
  totalUsd.textContent = money(total);
  updateGiftPreview();
}

function updateGiftPreview() {
  const previewList = document.getElementById("gift-preview-list");
  if (!previewList) return;

  const quantities = getQuantities();

  const selected = gifts
    .map((gift, index) => {
      const quantity = quantities[index];
      if (quantity <= 0) return null;

      return {
        name: gift.name,
        quantity: quantity,
        subtotal: quantity * gift.price
      };
    })
    .filter(Boolean);

  if (selected.length === 0) {
    previewList.innerHTML = "<li>No has seleccionado regalos.</li>";
    return;
  }

  previewList.innerHTML = selected
    .map(gift => {
      return `<li>${gift.quantity} × ${gift.name} — ${money(gift.subtotal)}</li>`;
    })
    .join("");
}

giftList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const index = button.dataset.index;
  const input = giftList.querySelector(`input[data-index="${index}"]`);
  const current = Number.parseInt(input.value, 10) || 0;

  if (button.classList.contains("qty-minus")) {
    input.value = Math.max(0, current - 1);
  }

  if (button.classList.contains("qty-plus")) {
    input.value = current + 1;
  }

  updateTotal();
});

giftList.addEventListener("input", (event) => {
  const input = event.target.closest("input[type='number']");
  if (!input) return;

  const value = Number.parseInt(input.value, 10);
  input.value = Number.isFinite(value) && value > 0 ? value : 0;
  updateTotal();
});

renderGifts();
