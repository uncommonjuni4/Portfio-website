const textElement = document.getElementById('typewriter');
const text = "Muhammad Junaid Hassan"; 
let index = 0;

function typeWriter() {
  if (index < text.length) {
    textElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100); 
  }
}

window.onload = typeWriter;