document.addEventListener('DOMContentLoaded', () => {
    const summaryContainer = document.querySelector('#application-summary');
    const params = new URLSearchParams(window.location.search);

    if (summaryContainer) {
        const fields = [
            { label: 'First Name', value: params.get('first-name') },
            { label: 'Last Name', value: params.get('last-name') },
            { label: 'Email Address', value: params.get('email') },
            { label: 'Mobile Phone', value: params.get('phone') },
            { label: 'Business / Organization', value: params.get('organization') },
            { label: 'Application Timestamp', value: params.get('timestamp') }
        ];

        fields.forEach(item => {
            const p = document.createElement('p');
            const strong = document.createElement('strong');
            strong.textContent = `${item.label}: `;
            p.appendChild(strong);
            p.appendChild(document.createTextNode(item.value || 'Not provided'));
            summaryContainer.appendChild(p);
        });
    }
});