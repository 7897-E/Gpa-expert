document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const inputs = document.querySelectorAll('.time-input');
    const tapButtons = document.querySelectorAll('.tap-btn');
    const resultDiv = document.getElementById('result'); // Reference to the result div

    submitBtn.addEventListener('click', () => {
        let totalScore = 0;
        let tapCount = 0;

        // Calculate total from input fields
        inputs.forEach((input) => {
            const value = parseFloat(input.value) || 0; // Convert input to a number
            totalScore += value;
        });

        // Count number of tapped buttons
        tapButtons.forEach((button) => {
            if (button.classList.contains('pressed')) {
                tapCount++;
            }
        });

        // Calculate GPA
        const gpa = (totalScore + (tapCount * 15)) / 7;

        // Calculate GPA divided by 25
        const gpaDividedBy25 = gpa / 25;

        // Display results in the result div
        resultDiv.innerHTML = `${gpa.toFixed(2)}<br>${gpaDividedBy25.toFixed(2)}`;
    });
});
