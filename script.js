// ===============================
// CONIXSTUDIO GALLERIES
// ===============================

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
        "images/outdoor7.jpg",
        "images/outdoor8.jpg"
    ],

    concept: [
        "images/concept.jpg",
        "images/concept2.jpg",
        "images/concept3.jpg",
        "images/concept4.jpg",
        "images/concept5.jpg",
        "images/concept6.jpg",
        "images/concept7.jpg",
        "images/concept8.jpg"
    ],

    documentary: [
        "images/documentary.jpg",
        "images/documentary2.jpg",
        "images/documentary3.jpg",
        "images/documentary4.jpg",
        "images/documentary5.jpg",
        "images/documentary6.jpg",
        "images/documentary7.jpg",
        "images/documentary8.jpg"
    ],

    weddings: [
        "images/weddings.jpg",
        "images/weddings2.jpg",
        "images/weddings3.jpg",
        "images/weddings4.jpg",
        "images/weddings5.jpg",
        "images/weddings6.jpg",
        "images/weddings7.jpg",
        "images/weddings8.jpg"
    ]
};


// ===============================
// GALLERY ELEMENTS
// ===============================

const galleryModal = document.getElementById("galleryModal");
const galleryTitle = document.getElementById("galleryTitle");
const galleryGrid = document.getElementById("galleryGrid");
const galleryClose = document.querySelector(".gallery-close");


// ===============================
// OPEN GALLERY
// ===============================

function openGallery(service) {

    if (!galleries[service]) {
        console.error("Gallery not found:", service);
        return;
    }

    galleryGrid.innerHTML = "";

    const serviceNames = {
        studio: "Studio Photography",
        outdoor: "Outdoor Photography",
        concept: "Concept Photography",
        documentary: "Documentary Photography",
        weddings: "Wedding Photography"
    };

    galleryTitle.textContent = serviceNames[service];

    galleries[service].forEach((image, index) => {

        const item = document.createElement("div");
        item.className = "gallery-item";

        const img = document.createElement("img");

        img.src = image;
        img.alt = serviceNames[service];
        img.loading = "lazy";

        // If an image doesn't exist, hide the broken image
        img.onerror = function () {
            console.warn("Image not found:", image);
            item.remove();
        };

        item.appendChild(img);
        galleryGrid.appendChild(item);
    });

    galleryModal.classList.add("active");
    document.body.style.overflow = "hidden";
}


// ===============================
// CLOSE GALLERY
// ===============================

function closeGallery() {
    galleryModal.classList.remove("active");
    document.body.style.overflow = "";
}


if (galleryClose) {
    galleryClose.addEventListener("click", closeGallery);
}


// Close when clicking outside gallery

if (galleryModal) {
    galleryModal.addEventListener("click", function (e) {

        if (e.target === galleryModal) {
            closeGallery();
        }

    });
}


// Close with ESC key

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
        closeGallery();
    }

});


// ===============================
// SERVICE CARDS
// ===============================

document.querySelectorAll("[data-gallery]").forEach(card => {

    card.addEventListener("click", function () {

        const service = this.dataset.gallery;

        openGallery(service);

    });

});


// ===============================
// WHATSAPP BOOKING
// ===============================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name")?.value.trim();
        const phone = document.getElementById("phone")?.value.trim();
        const service = document.getElementById("service")?.value;
        const date = document.getElementById("date")?.value;
        const location = document.getElementById("location")?.value.trim();
        const message = document.getElementById("message")?.value.trim();

        if (!name || !phone || !service || !date || !location) {
            alert("Please complete all required fields.");
            return;
        }

        const formattedDate = new Date(date).toLocaleDateString(
            "en-GH",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

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

        const whatsappURL =
            "https://wa.me/233543446000?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank");

    });

}


// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");

    });

}


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function () {

        navLinks?.classList.remove("active");
        menuToggle?.classList.remove("active");

    });

});


// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

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


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});
