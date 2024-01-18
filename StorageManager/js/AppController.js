// AppController.js

// js/AppController.js
// js/AppController.js
class AppController {
    constructor(storageManager) {
        this.storageManager = storageManager;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const showStorageBtn = document.getElementById('show-storage');
        showStorageBtn.addEventListener('click', () => this.handleShowStorage());
    }

    handleShowStorage() {
        const data = this.storageManager.read();
        this.storageManager.displayData('#dataDisplay', data);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AppController(new StorageManager('#myForm'));
});

