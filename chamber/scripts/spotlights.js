const spotlightContainer = document.querySelector('#spotlight-container');
const membersUrl = 'data/members.json';

/**
 * Obtiene los datos del archivo JSON de miembros
 */
async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    displaySpotlights(data.members);
  } catch (error) {
    console.error('Error al cargar los miembros destacados:', error);
    spotlightContainer.innerHTML = '<p>No se pudieron cargar las empresas destacadas.</p>';
  }
}

/**
 * Filtra, mezcla aleatoriamente y renderiza hasta 3 empresas
 * @param {Array} members 
 */
function displaySpotlights(members) {
  spotlightContainer.innerHTML = '';

  // 1. Filtrar miembros de nivel 3 (Oro) o 2 (Plata) usando la propiedad exacta en minúsculas
  const qualifiedMembers = members.filter((member) => {
    const level = Number(member.membershiplevel);
    return level === 3 || level === 2;
  });

  // 2. Mezcla aleatoria (Algoritmo Fisher-Yates)
  for (let i = qualifiedMembers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [qualifiedMembers[i], qualifiedMembers[j]] = [qualifiedMembers[j], qualifiedMembers[i]];
  }

  // 3. Selecciona las primeras 3 empresas
  const selectedMembers = qualifiedMembers.slice(0, 3);

  // 4. Construye el HTML de cada tarjeta
  selectedMembers.forEach((member) => {
    const card = document.createElement('article');
    card.classList.add('spotlight-card');

    const isGold = Number(member.membershiplevel) === 3;
    const badgeLabel = isGold ? 'Gold Membership' : 'Silver Membership';
    const badgeClass = isGold ? 'badge-gold' : 'badge-silver';

    card.innerHTML = `
      <h3>${member.name}</h3>
      <span class="badge ${badgeClass}">${badgeLabel}</span>
      <img src="images/${member.image}" alt="Logotipo de ${member.name}" loading="lazy" width="160" height="95">
      <p><strong>Tel:</strong> ${member.phone}</p>
      <p><strong>Dirección:</strong> ${member.address}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer" aria-label="Visitar el sitio web de ${member.name}">Visitar sitio web</a>
    `;

    spotlightContainer.appendChild(card);
  });
}

getSpotlights();