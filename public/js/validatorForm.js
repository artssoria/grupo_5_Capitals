document.addEventListener('DOMContentLoaded', (event) => {
        const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');

    toggleButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });

    const form = document.getElementById('myForm');
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    form.addEventListener('submit', (event) => {
        let isValid = true;

        
        if (usernameInput.value.trim() === '') {
            usernameError.style.display = 'inline';
            isValid = false;
        } else {
            usernameError.style.display = 'none';
        }

        
        if (passwordInput.value.trim() === '') {
            passwordError.style.display = 'inline';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});