document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.querySelector('#timestamp');
    if (timestampField) {
        timestampField.value = new Date().toLocaleString();
    }

    const openButtons = document.querySelectorAll('.open-modal-btn');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.tier-modal');

    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modal;
            const modal = document.querySelector(`#${modalId}`);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    });
});