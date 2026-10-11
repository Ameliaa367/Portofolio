
document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE MENU
    ========================== */

    const menuButton = document.getElementById("menuButton");
    const navMenu = document.querySelector(".nav-menu");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }


    /* =========================
       SMOOTH SCROLL
    ========================== */

    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {
                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    if (navMenu) {
                        navMenu.classList.remove("active");
                    }
                }
            }
        });
    });


    /* =========================
       NAVBAR SCROLL EFFECT
    ========================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow =
                    "0 5px 20px rgba(0,0,0,0.08)";
            } else {
                navbar.style.boxShadow = "none";
            }
        }
    });


    /* =========================
       DATA PROYEK
       Ganti nama dan file sesuai
       proyek milik kamu.
    ========================== */

    const projectData = {

        game: {
            title: "Game Projects",
            description: "Kumpulan proyek game yang pernah saya buat.",
            items: [
                {
                    name: "Game Platformer",
                    type: "video",
                    src: "Game1.mp4",
                    description: "Dokumentasi proyek game pertama."
                },
                {
                    name: "Game 2",
                    type: "video",
                    src: "Game2.mp4",
                    description: "Dokumentasi proyek game kedua."
                },
                {
                    name: "Game 3",
                    type: "video",
                    src: "Game3.mp4",
                    description: "Dokumentasi proyek game ketiga."
                }
            ]
        },

        web: {
            title: "Aplikasi Web Projects",
            description: "Kumpulan aplikasi web yang pernah saya buat.",
            items: [
                {
                    name: "Aplikasi 1",
                    type: "image",
                    src: "apk1.png",
                    description: "Tampilan aplikasi pertama."
                },
                {
                    name: "Aplikasi 2",
                    type: "image",
                    src: "apk2.png",
                    description: "Tampilan aplikasi kedua."
                },
                {
                    name: "Aplikasi 3",
                    type: "image",
                    src: "apk3.png",
                    description: "Tampilan aplikasi ketiga."
                }
            ]
        },

        "3d": {
            title: "3D Design Projects",
            description: "Kumpulan karya desain 3D saya.",
            items: [
                {
                    name: "3D Design 1",
                    type: "video",
                    src: "1.mp4",
                    description: "Hasil desain 3D pertama."
                },
                {
                    name: "3D Design 2",
                    type: "video",
                    src: "2.mp4",
                    description: "Hasil desain 3D kedua."
                },
                {
                    name: "3D Design 3",
                    type: "video",
                    src: "3.mp4",
                    description: "Hasil desain 3D ketiga."
                }
            ]
        },

        design: {
            title: "Poster Design Projects",
            description: "Kumpulan desain poster yang pernah saya buat.",
            items: [
                {
                    name: "Poster 1",
                    type: "image",
                    src: "Desain1.png",
                    description: "Hasil desain poster pertama."
                },
                {
                    name: "Poster 2",
                    type: "image",
                    src: "Desain2.png",
                    description: "Hasil desain poster kedua."
                },
                {
                    name: "Poster 3",
                    type: "image",
                    src: "Desain3.png",
                    description: "Hasil desain poster ketiga."
                }
            ]
        }

    };


    /* =========================
       ELEMEN POPUP
    ========================== */

    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription =
        document.getElementById("modalDescription");

    const carouselContent =
        document.getElementById("carouselContent");

    const prevButton = document.getElementById("prevProject");
    const nextButton = document.getElementById("nextProject");
    const closeButton = document.getElementById("closeModal");
    const counter = document.getElementById("carouselCounter");

    let currentCategory = "";
    let currentIndex = 0;


    /* =========================
       TAMPILKAN SATU PROYEK
    ========================== */

    function showProject(index) {

        if (!carouselContent || !projectData[currentCategory]) {
            return;
        }

        const items = projectData[currentCategory].items;

        if (items.length === 0) {
            return;
        }

        // Kembali ke proyek terakhir jika melewati batas.
        currentIndex = (index + items.length) % items.length;

        const item = items[currentIndex];

        // Menghapus media sebelumnya.
        carouselContent.replaceChildren();

        const mediaBox = document.createElement("div");
        mediaBox.className = "project-media";

        // Tampilkan video atau gambar sesuai jenis file.
        if (item.type === "video") {

            const video = document.createElement("video");

            video.src = item.src;
            video.controls = true;
            video.playsInline = true;
            video.preload = "metadata";
            video.className = "modal-media";

            mediaBox.appendChild(video);

        } else {

            const image = document.createElement("img");

            image.src = item.src;
            image.alt = item.name;
            image.className = "modal-media";

            mediaBox.appendChild(image);
        }

        const itemTitle = document.createElement("h3");
        itemTitle.className = "carousel-item-title";
        itemTitle.textContent = item.name;

        const itemDescription = document.createElement("p");
        itemDescription.className = "carousel-item-description";
        itemDescription.textContent = item.description || "";

        carouselContent.appendChild(mediaBox);
        carouselContent.appendChild(itemTitle);
        carouselContent.appendChild(itemDescription);

        // Nomor proyek, misalnya 1 / 3.
        if (counter) {
            counter.textContent =
                (currentIndex + 1) + " / " + items.length;
        }
    }


    /* =========================
       BUKA POPUP
    ========================== */

    function openModal(category) {

        if (!modal || !projectData[category]) {
            return;
        }

        currentCategory = category;
        currentIndex = 0;

        modalTitle.textContent = projectData[category].title;
        modalDescription.textContent =
            projectData[category].description;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        showProject(0);
    }


    /* =========================
       TUTUP POPUP
    ========================== */

    function closeModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        // Menghentikan video ketika popup ditutup.
        if (carouselContent) {
            carouselContent.replaceChildren();
        }
    }


    /* =========================
       KLIK KARTU PROYEK
    ========================== */

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach(function (card, index) {

        card.style.cursor = "pointer";

        // Memilih kategori dari atribut data-category.
        const categories = ["game", "web", "3d", "design"];

        function handleCardClick() {
            const category =
                card.getAttribute("data-category") || categories[index];

            openModal(category);
        }

        card.addEventListener("click", handleCardClick);

        // Supaya kartu juga bisa dibuka dengan keyboard.
        card.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleCardClick();
            }
        });
    });


    /* =========================
       TOMBOL SEBELUMNYA / BERIKUTNYA
    ========================== */

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            showProject(currentIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            showProject(currentIndex + 1);
        });
    }


    /* =========================
       TOMBOL TUTUP DAN ESCAPE
    ========================== */

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    if (modal) {

        // Tutup jika area gelap di luar popup diklik.
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Tutup popup dengan tombol Escape.
        document.addEventListener("keydown", function (event) {
            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {
                closeModal();
            }
        });
    }


    /* =========================
       GESER MEDIA DI HP
    ========================== */

    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselContent) {

        carouselContent.addEventListener("touchstart", function (event) {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });

        carouselContent.addEventListener("touchend", function (event) {
            touchEndX = event.changedTouches[0].screenX;

            const swipeDistance = touchStartX - touchEndX;

            if (swipeDistance > 50) {
                showProject(currentIndex + 1);
            } else if (swipeDistance < -50) {
                showProject(currentIndex - 1);
            }
        }, { passive: true });
    }

});
