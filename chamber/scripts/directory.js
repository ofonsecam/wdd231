// Dom
const jsonURL = 'data/members.json';
const membersContainer = document.querySelector('#members-container');
const gridBtn = document.querySelector('#grid-view-btn');
const listBtn = document.querySelector('#list-view-btn');
const hamburgerBtn = document.querySelector('#hamburger-btn');
const primaryNav = document.querySelector('#primary-nav');

hamburgerBtn.addEventListener('click', () => {
  primaryNav.classList.toggle('open');
  hamburgerBtn.setAttribute(
    'aria-expanded',
    primaryNav.classList.contains('open')
  );
});

// Grid vs List
gridBtn.addEventListener('click', () => {
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});

function getMembershipDetails(level) {
  switch (level) {
    case 3:
      return { label: 'Membresía Oro', cssClass: 'badge-gold' };
    case 2:
      return { label: 'Membresía Plata', cssClass: 'badge-silver' };
    default:
      return { label: 'Miembro Afiliado', cssClass: 'badge-member' };
  }
}

const displayMembers = (members) => {
  membersContainer.innerHTML = ''; 

  members.forEach((member) => {
    const card = document.createElement('section');

    const name = document.createElement('h2');
    name.textContent = member.name;

    const category = document.createElement('p');
    category.textContent = member.category;
    category.classList.add('tagline');

    const image = document.createElement('img');
    image.setAttribute('src', `images/${member.image}`);
    image.setAttribute('alt', `Logo representativo de ${member.name}`);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('width', '220');
    image.setAttribute('height', '130');

    const address = document.createElement('p');
    address.textContent = member.address;

    const phone = document.createElement('p');
    phone.textContent = member.phone;

    const website = document.createElement('a');
    website.setAttribute('href', member.website);
    website.setAttribute('target', '_blank');
    website.setAttribute('rel', 'noopener noreferrer');
    website.textContent = 'Visitar sitio web';
    website.setAttribute('arial-label', 'Visitar el sitio web de ${member.name}');

    const membership = getMembershipDetails(member.membershipLevel);
    const badge = document.createElement('span');
    badge.className = `badge ${membership.cssClass}`;
    badge.textContent = membership.label;

    card.appendChild(name);
    card.appendChild(category);
    card.appendChild(image);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(badge);

    membersContainer.appendChild(card);
  });
};

async function getMembers() {
  try {
    const response = await fetch(jsonURL);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error('Error al cargar members.json:', error);
    membersContainer.innerHTML = `<p class="error-msg">No fue posible cargar el directorio comercial en este momento.</p>`;
  }
}

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;

getMembers();