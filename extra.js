document.addEventListener('DOMContentLoaded', () => {
    const invisibleButton = document.getElementById('invisible-button');
    invisibleButton.addEventListener('click', () => {
        if (getCookie('verified') === 'true') {
            window.location.href = 'clock.html';
        } else {
            createPopup();
        }
    });
});
function createPopUp(){
  const verifyCookie = getCookie('verified');
  if (verifyCookie !== 'true') {
        createPopup();
    }else{
        setCookie('verified', 'true', 365);
        window.location.href = 'clock.html';
    }
}
// Function to create and display the popup
// Function to create and display the popup
function createPopup() {
    // Create a pop-up div
    const popup = document.createElement('div');
    popup.classList.add('popup');
    
    // Create a password input field
    const passwordField = document.createElement('input');
    passwordField.type = 'password';
    passwordField.placeholder = 'Passcode';
    passwordField.style.width = '100px';  // Fixed width
    passwordField.style.height = '20px'; // Fixed height

    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('popup-submit-btn');
    submitButton.innerText = 'Submit';
    submitButton.addEventListener('click', handlePopupSubmit);

    // Append elements to popup
    popup.appendChild(passwordField);
    popup.appendChild(submitButton);

    // Append popup to body
    document.body.appendChild(popup);

    // Apply the current theme to the popup
    applyThemeToPopup(popup);

    // Add event listener for Enter key
    passwordField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevent form submission
            submitButton.click();
        }
    });
}


// Function to handle popup submission
function handlePopupSubmit() {
    const passwordField = document.querySelector('.popup input[type="password"]');
    const inputText = passwordField.value;
    
    // Check if the input text equals the passcode
    if (inputText === '185656' || inputText === '127576' || inputText === '!haveBrainrot08') {
        setCookie('verified', 'true', 365);
        window.location.href = 'clock.html';
    } else {
        alert('Incorrect passcode.');
    }

    // Remove the popup after submission
    document.body.removeChild(document.querySelector('.popup'));
}


// Function to apply the current theme to the popup
function applyThemeToPopup(popup) {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
        popup.classList.add('dark-theme');
        popup.classList.remove('light-theme');
    } else {
        popup.classList.add('light-theme');
        popup.classList.remove('dark-theme');
    }
}

// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
