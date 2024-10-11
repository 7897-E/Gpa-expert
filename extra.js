document.addEventListener('DOMContentLoaded', () => {
    const invisibleButton = document.getElementById('invisible-button');
    invisibleButton.addEventListener('click', createPopup);
});

// Function to create and display the popup
function createPopup() {
    // Create a pop-up div
    const popup = document.createElement('div');
    popup.classList.add('popup');
    
    // Create an unrestricted text field
    const textField = document.createElement('textarea');
    textField.placeholder = 'Passcode';
    textField.style.width = '100px';  // Fixed width
    textField.style.height = '20px'; // Fixed height

    // Create a submit butt5on
    const submitButton = document.createElement('button');
    submitButton.classList.add('popup-submit-btn');
    submitButton.innerText = 'Submit';
    submitButton.addEventListener('click', handlePopupSubmit);

    // Append elements to popup
    popup.appendChild(textField);
    popup.appendChild(submitButton);

    // Append popup to body
    document.body.appendChild(popup);

    // Apply the current theme to the popup
    applyThemeToPopup(popup);

    // Add event listener for Enter key
    textField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevent newline in textarea
            submitButton.click();
        }
    });
}

// Function to handle popup submission
function handlePopupSubmit() {
    const textField = document.querySelector('.popup textarea');
    const inputText = textField.value;
    
    // Check if the input text equals the passcode
    if (inputText === '185656') {
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
