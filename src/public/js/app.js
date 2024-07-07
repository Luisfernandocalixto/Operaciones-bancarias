document.addEventListener('DOMContentLoaded', async function () {
    const form = document.getElementById('myForm');
    const home = document.getElementById('home');
    const chatDisplay = document.getElementById('chatDisplay');
    const carousel = document.getElementById('carousel');
    const viewData = document.getElementById('viewData');

    
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        fetch('/access', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error the data of server')
                }
                alertify.success('Success');
                return response.text();
            }
            )
            .then((data) => {
                form.reset();
                form.style.display = 'none';
                home.style.display = 'none';
                chatDisplay.style.display = 'none';
                carousel.style.display = 'block';
                viewData.style.display = 'none';
                form.remove()
                document.querySelector("#operations").innerHTML = data;
            })
            .catch((error) => {
                alertify.error('UPS! NIP Incorrect', error);
                form.reset();
                responseBtn.classList.remove("btn-neutral")
                responseBtn.classList.add("btn-disabled")
                
            });
            
            
        });
        
        document.addEventListener("click", function (e) {
            let response = e.target.closest(".response");
            if (response) {
                responseBtn.classList.remove("btn-neutral")
                responseBtn.classList.add("btn-disabled")
                form.reset();
            }
        });
    
    
    
});

// add value to input
let responseBtn = document.querySelector("#response")
function add(value) {
    let refactor1 = document.getElementById("nip").value += value;
    let refactor = refactor1.slice(0, 4);
    if (refactor1.length > 3) {
        responseBtn.classList.remove("btn-disabled")
        responseBtn.classList.add("btn-neutral")
    }
    document.getElementById("nip").value = refactor;
}

// remove value to input
function removeValue() {
    const value = document.getElementById("nip").value;
    const result = value.slice(0, -1);
    if (result.length <= 3) {
        responseBtn.classList.remove("btn-neutral")
        responseBtn.classList.add("btn-disabled")
    }
    document.getElementById('nip').value = result;
}




// carousel
const slides = document.querySelectorAll('.carousel-item');
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.add("fade-in");
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Show of first image
showSlide(currentSlide);

// Change of image 5.5 segundos (5500 ms)
setInterval(nextSlide, 5500);
