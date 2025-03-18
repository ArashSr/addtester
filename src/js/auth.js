// Authentication script for AdBlock Tester
document.addEventListener('DOMContentLoaded', function() {
    const authContainer = document.getElementById('auth_container');
    const mainContent = document.getElementById('main_content');
    const loginForm = document.getElementById('login_form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error_message');
    
    // Hardcoded credentials
    const validUsername = 'arash';
    const validPassword = 'ams505';
    
    // Check if user is already authenticated
    function checkAuth() {
        const isAuthenticated = localStorage.getItem('adblock_auth') === 'true';
        if (isAuthenticated) {
            authContainer.style.display = 'none';
            mainContent.style.display = 'block';
        } else {
            authContainer.style.display = 'block';
            mainContent.style.display = 'none';
        }
    }
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (username === validUsername && password === validPassword) {
                // Set authentication in localStorage
                localStorage.setItem('adblock_auth', 'true');
                authContainer.style.display = 'none';
                mainContent.style.display = 'block';
                errorMessage.style.display = 'none';
            } else {
                errorMessage.textContent = 'Invalid username or password';
                errorMessage.style.display = 'block';
                passwordInput.value = '';
            }
        });
    }
    
    // Add logout functionality
    const logoutButton = document.getElementById('logout_button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('adblock_auth');
            checkAuth();
        });
    }
    
    // Initial auth check
    checkAuth();
}); 