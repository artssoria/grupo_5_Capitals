document.addEventListener('DOMContentLoaded', (event) => {
    const passwordInput1 = document.getElementById('password1');
    const toggleButton1 = document.getElementById('togglePassword1');
    const passwordInput2 = document.getElementById('password2');
    const toggleButton2 = document.getElementById('togglePassword2');
    const passwordInput3 = document.getElementById('password3');
    const toggleButton3 = document.getElementById('togglePassword3');

    toggleButton1.addEventListener('click', (event) => {
        event.preventDefault();
        if (passwordInput1.type === 'password') {
            passwordInput1.type = 'text';
        } else {
            passwordInput1.type = 'password';
        }
    });

    toggleButton2.addEventListener('click', (event) => {
        event.preventDefault();
        if (passwordInput2.type === 'password') {
            passwordInput2.type = 'text';
        } else {
            passwordInput2.type = 'password';
        }
    });

    toggleButton3.addEventListener('click', (event) => {
        event.preventDefault();
        if (passwordInput3.type === 'password') {
            passwordInput3.type = 'text';
        } else {
            passwordInput3.type = 'password';
        }
    });


});