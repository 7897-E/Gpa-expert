document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeIconImg = document.getElementById('theme-icon-img');
    const settingsIconImg = document.getElementById('settings-icon-img'); // New line
    const body = document.body;
    const currentTheme = getCookie('theme') || 'light';
    const inputs = document.querySelectorAll('.time-input');
    const submitBtn = document.getElementById('submit-btn');

    setTheme(currentTheme);

    themeSwitcher.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        setTheme(newTheme);
        setCookie('theme', newTheme, 365);
    });
  
    
 inputs.forEach((input, index) => {
        const tapButton = input.nextElementSibling; // Get the associated tap button

        input.addEventListener('input', () => {
            // Allow only numbers and a single decimal point
            let value = input.value
                .replace(/[^0-9.]/g, '') // Allow only numbers and decimal
                .replace(/(\..*?)\..*/g, '$1'); // Allow only one decimal point

            // Check if the first two characters are not "10"
            if (value.length >= 2 && value.substring(0, 2) !== '10' && !value.includes('.')) {
                value += '.'; // Add a dot if first two characters aren't "10"
            }

            // Update input value
            input.value = value;

            // If input value is '100', auto-add '.0'
            if (input.value === '100') {
                input.value = '100.0';
            }

            // Focus on the next input if maxLength is reached
            if (input.value.length === input.maxLength) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    submitBtn.style.display = 'block'; // Show the submit button if the last input is filled
                }
            }
        });

        // Handle keydown for backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                const value = input.value;
                const cursorPos = input.selectionStart;

                // Check if the cursor is positioned right after the dot
                if (cursorPos > 0 && cursorPos < value.length && value[cursorPos - 1] === '.') {
                    e.preventDefault(); // Prevent default backspace behavior
                    // Remove dot and the character before it
                    input.value = value.slice(0, cursorPos - 1) + value.slice(cursorPos);
                    // Set cursor position to the right place
                    input.setSelectionRange(cursorPos - 1, cursorPos - 1);
                } else if (cursorPos > 0) {
                    // If cursor is not right after a dot, just allow backspace
                    input.value = value.slice(0, cursorPos - 1) + value.slice(cursorPos);
                    input.setSelectionRange(cursorPos - 1, cursorPos - 1);
                }
            }
        });

        // Handle decimal point explicitly
        input.addEventListener('keypress', (e) => {
            const key = e.key;
            if (key === '.' && input.value.includes('.')) {
                e.preventDefault(); // Prevent additional decimal points
            }
        });

        // Add click event to the tap button
        tapButton.addEventListener('click', () => {
            tapButton.classList.toggle('pressed'); // Toggle the pressed class
        });
    });
});

function setTheme(theme) {
    const body = document.body;
    const themeIconImg = document.getElementById('theme-icon-img');
    const backIconImg = document.getElementById('back-icon-img'); // New line

    if (theme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeIconImg.src = 'https://cdn.glitch.global/37f7caaf-a54e-4f69-a4e1-8ae7e91c6e79/sun.png?v=1728608585117';
        if (backIconImg) { // Check if backIconImg exists
            backIconImg.src = 'https://cdn.glitch.global/37f7caaf-a54e-4f69-a4e1-8ae7e91c6e79/darkarrow.png?v=1728669711441';
        }
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        themeIconImg.src = 'https://cdn.glitch.global/37f7caaf-a54e-4f69-a4e1-8ae7e91c6e79/moon.png?v=1728608444414';
        if (backIconImg) { // Check if backIconImg exists
            backIconImg.src = 'https://cdn.glitch.global/37f7caaf-a54e-4f69-a4e1-8ae7e91c6e79/lightarrow.png?v=1728669947231';
        }
    }
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}
function back(){
  window.open('index.html', '_blank'); 
  window.close();
}