// script to delete and re-type the secondary text

const texts = ["Cybersecurity Major", "Software Developer", "Security Enthusiast", "Homelab Hobbyist", "Penn State Student"];
let currentTextIndex = 0;
let currentCharIndex = 0;
const typingSpeed = 100;  // typing speed in ms
const deletingSpeed = 50; // deleting speed in ms
const delayBetweenTexts = 2000; // delay between displaying texts in ms

function typeText() {
    const subtitleText = document.getElementById('secondary-text');
    const currentText = texts[currentTextIndex];

    if (currentCharIndex < currentText.length) {
        // one character at a time
        subtitleText.textContent += currentText[currentCharIndex];
        currentCharIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        // wait for a moment before deleting
        setTimeout(deleteText, delayBetweenTexts);
    }
}

function deleteText() {
    const subtitleText = document.getElementById('secondary-text');

    if (currentCharIndex > 0) {
        // remove one character at a time
        subtitleText.textContent = subtitleText.textContent.slice(0, -1);
        currentCharIndex--;
        setTimeout(deleteText, deletingSpeed);
    } else {
        // move to the next text after deletion
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(typeText, typingSpeed);
    }
}

typeText();