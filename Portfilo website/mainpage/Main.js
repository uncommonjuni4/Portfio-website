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

// Navbar links par click hone par mobile menu ko automatically close karne ke liye
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  });
});