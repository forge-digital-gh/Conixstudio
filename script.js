/* =========================================
   CONIXSTUDIO JAVASCRIPT
========================================= */


/* =========================================
   PAGE LOADER
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* =========================================
   YEAR
========================================= */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================================
   NAVBAR
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });


    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    });

}


/* =========================================
   GALLERY FILTER
========================================= */

const filters = document.querySelectorAll(".filter");
const galleryItems = document.querySelectorAll(".gallery-item");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const selected = filter.dataset.filter;

        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (
                selected === "all" ||
                category === selected
            ) {

                item.classList.remove("hidden");

                item.style.animation = "galleryIn .6s ease";

            } else {

                item.classList.add("hidden");

            }

        });

    });

});


/* =========================================
   LIGHTBOX
========================================= */

const lightbox = document.querySelector(".lightbox");

const lightboxImage =
    document.querySelector(".lightbox-image");

const lightboxTitle =
    document.querySelector(".lightbox-title");

const lightboxNumber =
    document.querySelector(".lightbox-number");

const closeLightbox =
    document.querySelector(".lightbox-close");

const nextButton =
    document.querySelector(".lightbox-next");

const prevButton =
    document.querySelector(".lightbox-prev");


let currentImage = 0;

let visibleGalleryItems = [];


function refreshVisibleItems() {

    visibleGalleryItems = [
        ...document.querySelectorAll(
            ".gallery-item:not(.hidden)"
        )
    ];

}


function openLightbox(index) {

    refreshVisibleItems();

    if (!visibleGalleryItems.length) {
        return;
    }

    currentImage = index;

    const item = visibleGalleryItems[currentImage];

    const image =
        item.dataset.image;

    const title =
        item.dataset.title;

    lightboxImage.src = image;

    lightboxImage.alt = title;

    lightboxTitle.textContent = title;

    lightboxNumber.textContent =
        `${String(currentImage + 1).padStart(2, "0")} / ${String(visibleGalleryItems.length).padStart(2, "0")}`;

    lightbox.classList.add("active");

    document.body.classList.add("lightbox-open");

}


function closeViewer() {

    lightbox.classList.remove("active");

    document.body.classList.remove("lightbox-open");

}


function nextImage() {

    refreshVisibleItems();

    if (!visibleGalleryItems.length) {
        return;
    }

    currentImage++;

    if (currentImage >= visibleGalleryItems.length) {
        currentImage = 0;
    }

    showCurrentImage();

}


function previousImage() {

    refreshVisibleItems();

    if (!visibleGalleryItems.length) {
        return;
    }

    currentImage--;

    if (currentImage < 0) {
        currentImage = visibleGalleryItems.length - 1;
    }

    showCurrentImage();

}


function showCurrentImage() {

    const item =
        visibleGalleryItems[currentImage];

    lightboxImage.src =
        item.dataset.image;

    lightboxImage.alt =
        item.dataset.title;

    lightboxTitle.textContent =
        item.dataset.title;

    lightboxNumber.textContent =
        `${String(currentImage + 1).padStart(2, "0")} / ${String(visibleGalleryItems.length).padStart(2, "0")}`;

}


/* Open image */

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        refreshVisibleItems();

        const index =
            visibleGalleryItems.indexOf(item);

        openLightbox(index);

    });

});


/* Controls */

if (closeLightbox) {

    closeLightbox.addEventListener(
        "click",
        closeViewer
    );

}

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextImage
    );

}

if (prevButton) {

    prevButton.addEventListener(
        "click",
        previousImage
    );

}


/* Click outside */

if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (
            event.target === lightbox
        ) {

            closeViewer();

        }

    });

}


/* Keyboard */

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeViewer();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }

});


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const target =
            document.querySelector(
                link.getAttribute("href")
            );

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================================
   REVIEW SLIDER
========================================= */

const reviews =
    document.querySelectorAll(".review");

const prevReview =
    document.getElementById("prevReview");

const nextReview =
    document.getElementById("nextReview");

const reviewCounter =
    document.querySelector(".review-counter");


let currentReview = 0;


function showReview(index) {

    reviews.forEach(review => {

        review.classList.remove("active");

    });

    reviews[index].classList.add("active");

    if (reviewCounter) {

        reviewCounter.textContent =
            `${String(index + 1).padStart(2, "0")} — ${String(reviews.length).padStart(2, "0")}`;

    }

}


if (nextReview) {

    nextReview.addEventListener("click", () => {

        currentReview++;

        if (currentReview >= reviews.length) {
            currentReview = 0;
        }

        showReview(currentReview);

    });

}


if (prevReview) {

    prevReview.addEventListener("click", () => {

        currentReview--;

        if (currentReview < 0) {
            currentReview = reviews.length - 1;
        }

        showReview(currentReview);

    });

}


/* =========================================
   IMAGE FALLBACK
========================================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        image.style.background =
            "linear-gradient(135deg,#0b1a2a,#102a43)";

        image.style.objectFit = "cover";

    });

});


/* =========================================
   REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(
        ".intro, .gallery-item, .about, .service, .review, .contact"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   GALLERY ANIMATION
========================================= */

const style =
    document.createElement("style");

style.innerHTML = `

@keyframes galleryIn {

    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

}

`;

document.head.appendChild(style);


/* =========================================
   TOUCH SWIPE FOR LIGHTBOX
========================================= */

let touchStartX = 0;
let touchEndX = 0;


if (lightbox) {

    lightbox.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    lightbox.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );

}


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;

    if (Math.abs(distance) < 50) {
        return;
    }

    if (distance < 0) {
        nextImage();
    } else {
        previousImage();
    }

}


/* =========================================
   PREVENT EMPTY IMAGE LINKS
========================================= */

document.querySelectorAll(
    'img[src=""]'
).forEach(image => {

    image.removeAttribute("src");

});