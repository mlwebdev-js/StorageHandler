/*
 * js/StorageManager.js
 * StorageManager class
*/
class StorageManager {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.localStorageKey = 'formData';

        // Bind the submit event to the form
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {};

        // Gather data from form inputs
        Array.from(this.form.elements).forEach(element => {
            if (element.name && !element.disabled) {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    if (element.checked) {
                        formData[element.name] = element.value;
                    }
                } else {
                    formData[element.name] = element.value;
                }
            }
        });

        // Save data to local storage
        this.create(formData);
    }

    create(data) {
        localStorage[this.localStorageKey] = JSON.stringify(data);
    }
    

    read() {
        return JSON.parse(localStorage[this.localStorageKey] || '{}');
    }
    

    update(newData) {
        let currentData = this.read();
        currentData = {...currentData, ...newData};
        localStorage.setItem(this.localStorageKey, 
            JSON.stringify(currentData));
    }

    delete() {
        localStorage.removeItem(this.localStorageKey);
    }

    displayData(containerSelector) {
        const data = this.read();
        const container = document.querySelector(containerSelector);
        container.innerHTML = '';

        for (const [key, value] of Object.entries(data)) {
            const div = document.createElement('div');
            div.textContent = `${key}: ${value}`;
            container.appendChild(div);
        }
    }
}
