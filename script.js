/* =========================================================
   CONIXSTUDIO — MAIN JAVASCRIPT
   Collins Nixon Photography
========================================================= */


/* =========================================================
   GALLERIES
========================================================= */

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


/* =========================================================
   GALLERY TITLES
========================================================= */

const galleryNames = {

    studio: "Studio Photography",

    outdoor: "Outdoor Photography",

    concept: "Concept Photography",

    documentary: "Documentary Photography",

    weddings: "Wedding Photography"

};


/* =========================================================
   GALLERY ELEMENTS
========================================================= */

const galleryModal =
    document.getElementById("galleryModal");

const galleryGrid =
    document.getElementById("galleryGrid");

const galleryTitle =
    document.getElementById("galleryTitle");

const galleryClose =
    document.getElementById("closeGallery");


/* =========================================================
   OPEN GALLERY
========================================================= */

function openGallery(service) {

    if (!galleries[service]) {

        console.error(
            "Gallery not found:",
            service
        );

        return;
    }

    if (
        !galleryModal ||
        !galleryGrid ||
        !galleryTitle
    ) {

        console.error(
            "Gallery HTML elements are missing."
        );

        return;
    }


    /* Clear previous images */

    galleryGrid.innerHTML = "";


    /* Change title */

    galleryTitle.textContent =
        galleryNames[service];


    /* Add images */

    galleries[service].forEach(
        (image, index) => {

            const galleryItem =
                document.createElement("div");

            galleryItem.className =
                "gallery-item";


            const img =
                document.createElement("img");

            img.src = image;

            img.alt =
                `${galleryNames[service]} ${index + 1}`;

            img.loading = "lazy";


            /* If an image doesn't exist,
               remove it instead of showing
               a broken image icon. */

            img.onerror = function () {

                console.warn(
                    "Image could not be loaded:",
                    image
                );

                galleryItem.remove();

            };


            galleryItem.appendChild(img);

            galleryGrid.appendChild(
                galleryItem
            );

        }
    );


    /* Show gallery */

    galleryModal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE GALLERY
========================================================= */

function closeGallery() {

    if (!galleryModal) return;

    galleryModal.classList.remove(
        "active"
    );

    document.body.style.overflow = "";

}


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (galleryClose) {

    galleryClose.addEventListener(
        "click",
        closeGallery
    );

}


/* =========================================================
   CLOSE WHEN CLICKING BACKGROUND
========================================================= */

if (galleryModal) {

    galleryModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === galleryModal
            ) {

                closeGallery();

            }

        }
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeGallery();

        }

    }
);


/* =========================================================
   SERVICE / PORTFOLIO CLICK
========================================================= */

document
    .querySelectorAll("[data-gallery]")
    .forEach(card => {

        card.addEventListener(
            "click",
            function () {

                const service =
                    this.getAttribute(
                        "data-gallery"
                    );

                openGallery(service);

            }
        );

    });


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


if (
    menuBtn &&
    navLinks
) {

    menuBtn.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function () {

                navLinks?.classList.remove(
                    "open"
                );

            }
        );

    });


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "show"
            );

        }
    );

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector("header");


window.addEventListener(
    "scroll",
    function () {

        if (!navbar) return;


        if (
            window.scrollY > 50
        ) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const targetID =
                    this.getAttribute(
                        "href"
                    );


                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =========================================================
   BOOKING → WHATSAPP
========================================================= */

const bookingForm =
    document.getElementById(
        "bookingForm"
    );


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    ?.value
                    .trim() || "";


            const phone =
                document
                    .getElementById("phone")
                    ?.value
                    .trim() || "";


            const service =
                document
                    .getElementById("service")
                    ?.value || "";


            const date =
                document
                    .getElementById("date")
                    ?.value || "";


            const location =
                document
                    .getElementById("location")
                    ?.value
                    .trim() || "";


            const message =
                document
                    .getElementById("message")
                    ?.value
                    .trim() || "";


            /* Validate */

            if (
                !name ||
                !phone ||
                !service ||
                !date ||
                !location
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            /* Format date */

            let formattedDate =
                date;


            if (date) {

                formattedDate =
                    new Date(
                        date + "T00:00:00"
                    ).toLocaleDateString(
                        "en-GH",
                        {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    );

            }


            /* WhatsApp message */

            const whatsappMessage =
`Hello Conixstudio 👋

I'd like to make a booking.

📸 Service: ${service}
👤 Name: ${name}
📱 Phone: ${phone}
📅 Preferred Date: ${formattedDate}
📍 Location: ${location}

💬 Shoot Details:
${message || "No additional details provided."}

Sent from the Conixstudio website.`;


            /* WhatsApp URL */

            const whatsappURL =
                "https://wa.me/233543446000?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            /* Open WhatsApp */

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroImage =
    document.querySelector(
        ".hero-image img"
    );


window.addEventListener(
    "scroll",
    function () {

        if (!heroImage) return;


        const scroll =
            window.scrollY;


        if (
            scroll <
            window.innerHeight
        ) {

            heroImage.style.transform =
                `translateY(${scroll * 0.08}px) scale(1.02)`;

        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    function () {

        let current = "";


        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 150;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navItems.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) === "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   PAGE LOADED
========================================================= */

console.log(
    "Conixstudio website loaded successfully."
);

console.log(
    "Gallery system ready."
);
