import { places } from "../data/places.mjs";

const MS_PER_DAY = 86400000;
const visitMessage = document.querySelector("#visit-message");
const visitBanner = document.querySelector(".visit-banner");
const closeBannerBtn = document.querySelector("#close-banner");

const lastVisit = Number(localStorage.getItem("funzaChamberLastVisit"));
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysElapsed = Math.floor((now - lastVisit) / MS_PER_DAY);
  if (daysElapsed < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else {
    const dayWord = daysElapsed === 1 ? "day" : "days";
    visitMessage.textContent = `You last visited ${daysElapsed} ${dayWord} ago.`;
  }
}

localStorage.setItem("funzaChamberLastVisit", now.toString());

if (closeBannerBtn && visitBanner) {
  closeBannerBtn.addEventListener("click", () => {
    visitBanner.style.display = "none";
  });
}

const gridContainer = document.querySelector("#discover-grid");
const modal = document.querySelector("#place-modal");
const modalTitle = document.querySelector("#modal-title");
const modalAddress = document.querySelector("#modal-address");
const modalDescription = document.querySelector("#modal-description");
const closeModalBtn = document.querySelector("#close-modal");

function renderPlaces(items) {
  gridContainer.innerHTML = "";

  items.forEach((place, index) => {
    const card = document.createElement("article");
    card.className = "place-card";

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.name;
    img.width = 300;
    img.height = 200;
    if (index > 1) {
      img.loading = "lazy";
    }
    figure.appendChild(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const desc = document.createElement("p");
    desc.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";
    button.addEventListener("click", () => {
      modalTitle.textContent = place.name;
      modalAddress.textContent = place.address;
      modalDescription.textContent = place.description;
      modal.showModal();
    });

    card.append(title, figure, address, desc, button);
    gridContainer.appendChild(card);
  });
}

if (closeModalBtn && modal) {
  closeModalBtn.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
}

renderPlaces(places);