const currentUrl = window.location.search;
const formData = new URLSearchParams(currentUrl);

const resultsContainer = document.querySelector('#results');


const fields = [
  { label: 'Name', value: `${formData.get('first')} ${formData.get('last')}` },
  { label: 'Cell Phone', value: formData.get('phone') },
  { label: 'Email', value: formData.get('email') },
  { label: 'Ordinance', value: formData.get('ordinance') },
  { label: 'Date', value: formData.get('date') },
  { label: 'Location', value: formData.get('location') }
];

fields.forEach(item => {
  const p = document.createElement('p');
  p.textContent = `${item.label}: ${item.value}`;
  resultsContainer.appendChild(p);
});