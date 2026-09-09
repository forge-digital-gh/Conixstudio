// ==========================================
// CONIXSTUDIO - SCRIPT.JS
// ==========================================


// ==========================================
// GALLERIES
// ==========================================

const galleries = {

    studio: [
        "images/studio.jpg",
        "images/studio2.jpg",
        "images/studio3.jpg",
        "images/studio4.jpg",
        "images/studio5.jpg",
        "images/studio6.jpg",
        "images/studio7.jpg",
        "images/studio8.jpg"
    ],

    outdoor: [
        "images/outdoor.jpg",
        "images/outdoor2.jpg",
        "images/outdoor3.jpg",
        "images/outdoor4.jpg",
        "images/outdoor5.jpg",
        "images/outdoor6.jpg",
        "images/outdoor7.jpg"
    ],

    concept: [
        "images/concept.jpg",
        "images/concept2.jpg"
    ],

    documentary: [
        "images/documentary.jpg",
        "images/documentary2.jpg",
        "images/documentary3.jpg"
    ],

    weddings: [
        "images/weddings.jpg",
        "images/weddings2.jpg"
    ]

};


// ==========================================
// GALLERY TITLES
// ==========================================

const galleryNames = {

    studio: "Studio Photography",

    outdoor: "Outdoor Photography",

    concept: "Concept Photography",

    documentary: "Documentary Photography",

    weddings: "Wedding Photography"

};


// ==========================================
// GALLERY ELEMENTS
// ==========================================

const galleryModal = document.getElementById("galleryModal");
const galleryTitle = document.getElementById("galleryTitle");
const galleryGrid = document.getElementById("galleryGrid");

const galleryClose = document.querySelector(".gallery-close");


// ==========================================
// OPEN GALLERY
// ==========================================

function openGallery(service) {

    if (!galleries[service]) {
        console.error("Gallery not found:", service);
        return;
    }

    if (!galleryModal || !galleryGrid || !galleryTitle) {
        console.error("Gallery elements missing from HTML.");
        return;
    }


    // Clear previous gallery
    galleryGrid.innerHTML = "";


    // Set gallery title
    galleryTitle.textContent = galleryNames[service];


    // Create images
    galleries[service].forEach((image, index) => {

        const galleryItem = document.createElement("div");

        galleryItem.className = "gallery-item";


        const img = document.createElement("img");

        img.src = image;

        img.alt = `${galleryNames[service]} ${index + 1}`;

        img.loading = "lazy";


        // Prevent broken images from appearing
        img.onerror = function () {

            console.warn("Could not load:", image);

            galleryItem.remove();

        };


        galleryItem.appendChild(img);

        galleryGrid.appendChild(galleryItem);

    });


    // Open modal
    galleryModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


// ==========================================
// CLOSE GALLERY
// ==========================================

function closeGallery() {

    if (!galleryModal) return;

    galleryModal.classList.remove("active");

    document.body.style.overflow = "";

}


// Close button

if (galleryClose) {

    galleryClose.addEventListener("click", closeGallery);

}


// Click outside gallery

if (galleryModal) {

    galleryModal.addEventListener("click", function (event) {

        if (event.target === galleryModal) {

            closeGallery();

        }

    });

}


// ESC key

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeGallery();

    }

});


// ==========================================
// SERVICE CARDS
// ==========================================

document.querySelectorAll("[data-gallery]").forEach(card => {

    card.addEventListener("click", function () {

        const service = this.getAttribute("data-gallery");

        openGallery(service);

    });

});


// ==========================================
// WHATSAPP BOOKING
// ==========================================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name")?.value.trim() || "";

        const phone =
            document.getElementById("phone")?.value.trim() || "";

        const service =
            document.getElementById("service")?.value || "";

        const date =
            document.getElementById("date")?.value || "";

        const location =
            document.getElementById("location")?.value.trim() || "";

        const message =
            document.getElementById("message")?.value.trim() || "";


        // Required fields

        if (!name || !phone || !service || !date || !location) {

            alert("Please complete all required fields.");

            return;

        }


        // Format date

        let formattedDate = date;

        if (date) {

            formattedDate = new Date(date + "T00:00:00")
                .toLocaleDateString("en-GH", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

        }


        // WhatsApp message

        const whatsappMessage = `Hello Conixstudio 👋

I'd like to make a booking.

📸 Service: ${service}
👤 Name: ${name}
📱 Phone: ${phone}
📅 Preferred Date: ${formattedDate}
📍 Location: ${location}

💬 Shoot Details:
${message || "No additional details provided."}

Sent from the Conixstudio website.`;


        // WhatsApp number

        const whatsappURL =
            "https://wa.me/233543446000?text=" +
            encodeURIComponent(whatsappMessage);


        // Open WhatsApp

        window.open(whatsappURL, "_blank");

    });

}


// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active");

    });

}


// Close menu when clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function () {

        navLinks?.classList.remove("active");

        menuToggle?.classList.remove("active");

    });

});


// ==========================================
// SCROLL REVEAL
// ==========================================

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    // Fallback for older browsers

    revealElements.forEach(element => {

        element.classList.add("show");

    });

}


// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", function () {

    if (!navbar) return;


    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetID =
            this.getAttribute("href");

        const target =
            document.querySelector(targetID);


        if (target) {

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log("Conixstudio website loaded successfully.");
console.log("Gallery system ready.");
