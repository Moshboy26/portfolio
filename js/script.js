// Project description toggle
const buttons = document.querySelectorAll('.toggle-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const paragraph = btn.previousElementSibling;
    paragraph.classList.toggle('expanded');
    btn.textContent = paragraph.classList.contains('expanded') ? 'Show less' : 'Show more';
  });
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    projects.forEach(project => {
      if(category === 'all' || project.dataset.category === category){
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
  });
});

// Smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});


// Contact form validation and sending
const form = document.getElementById('contact-form');

form.addEventListener('submit', async function(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(name === "" || email === "" || message === ""){
        alert("Please fill all fields");
        return;
    }

    const formData = { name, email, message };

    try {
        const response = await fetch('/api/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if(result.status === 'success'){
            alert('Message sent successfully!');
            form.reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again.');
    }
});


// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-bar');
const skillValues = {html:80, uiux:70, figma:80, responsive:100, playwright:60, qa:50};

window.addEventListener('scroll', () => {
    skillBars.forEach(bar => {
        const skill = bar.dataset.skill;
        const rect = bar.getBoundingClientRect();
        if(rect.top < window.innerHeight){
            bar.style.width = skillValues[skill] + "%";
        }
    });
});
