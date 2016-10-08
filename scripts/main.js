/* Cipher */

let inputField = document.querySelector('.message.-input');
let outputField = document.querySelector('.message.-output');

let shiftAmount = -3;

// Input:
inputField.addEventListener('input', function(e) {
    let text = this.value;
    outputField.textContent = cipher({
        message: text,
        shift: shiftAmount
    });
});

// Cipher:
function cipher(data) {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".toLowerCase();
    let otherCharacters = "-=~\"\'#$%&*^:;<>?/!{(|)}.1234567890\, \\";

    let shift, message, shiftedAlphabet, output = "";

    // Validate parameters:
    if (typeof data === "object") {
        message = data.message.toLowerCase();
        shift = data.shift;
    } else {
        return;
    }

    // Shift alphabet:
    if (typeof message === "string" || typeof message + "" === "string") {
        shiftedAlphabet = alphabet.slice(shift);
        shiftedAlphabet += alphabet.slice(0, shift)
        shiftedAlphabet += otherCharacters;

        alphabet += otherCharacters;

        for (let character of message) {
            let order = alphabet.indexOf(character);
            output += shiftedAlphabet[order];
        }
    } else {
        return;
    }

    return output;
}


/* Settings */

let settingsButton = document.querySelector('.settings-button');
let settingsForm = document.querySelector('.settings-form');
let shiftText = document.querySelector('.shift');

// Show/hide settings:
settingsButton.addEventListener('click', function(e) {
    if (this.classList.contains('-blackout')) {
        settingsForm.classList.remove('-visible');
        setTimeout(() => {
            this.style.animation = 'blackout-to-button .3s';
            this.classList.remove('-blackout')
        }, 400);
    } else {
        this.style.animation = 'button-to-blackout .5s';
        this.classList.add('-blackout');
        setTimeout(() => {settingsForm.classList.add('-visible')}, 500);
    }
});

// Change shift:
shiftText.addEventListener('input', function(e) {
    // Validate input:
    let shift = parseInt(this.value);
    if (!isNaN(shift)) {
        shiftAmount = shift;
        applyShift();
    }
});

document.querySelector('.direction-button.-negative').addEventListener('click', (e) => {
    if (shiftAmount > 0) {
        shiftAmount = shiftAmount * -1;
        shiftText.value = shiftAmount;
        applyShift();
    }
});

document.querySelector('.direction-button.-positive').addEventListener('click', (e) => {
    if (shiftAmount < 0) {
        shiftAmount = Math.abs(shiftAmount);
        shiftText.value = shiftAmount;
        applyShift();
    }
});

function applyShift() {
    outputField.textContent = cipher({
        message: inputField.value,
        shift: shiftAmount
    });
}