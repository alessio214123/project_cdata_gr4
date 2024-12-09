document.addEventListener("DOMContentLoaded", () => {   
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const genreButtons = document.querySelectorAll(".genre-buttons button");
    const navLinks = document.querySelectorAll(".navbar a");
    const movieCards = document.querySelectorAll(".movie-card");
    const mostViewedTitle = document.getElementById("most-viewed-title");
    const latestTitle = document.getElementById("latest-title");

    let currentGenre = "all";
    let currentType = "all";

    const performSearch = () => {
        const searchValue = searchInput.value.trim().toLowerCase();
        let found = false;

        if (searchValue !== "") {
            mostViewedTitle.style.display = "none";
            latestTitle.style.display = "none";
        } else {
            mostViewedTitle.style.display = "block";
            latestTitle.style.display = "block";
        }

        movieCards.forEach(card => {
            const movieName = card.querySelector(".card-back h3").textContent.toLowerCase();

            if (
                (currentGenre === "all" || card.getAttribute("data-genre") === currentGenre) &&
                (currentType === "all" || card.getAttribute("data-type") === currentType) &&
                (searchValue === "" || movieName.includes(searchValue))
            ) {
                card.style.display = "block";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!found && searchValue) {
            alert("We're sorry. No movies were found with that name.");
            setTimeout(() => {
                window.location.href = "index.html"; 
            }, 100);  
        }
    };

    searchButton.addEventListener("click", () => {
        performSearch();
    });

    searchInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }
    });

    genreButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentGenre = button.getAttribute("data-genre");
            searchInput.value = "";
            performSearch();
        });
    });

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const typeFilter = event.target.textContent.toLowerCase();

            if (typeFilter === "movies" || typeFilter === "tv series") {
                currentType = typeFilter.replace(" ", "-");
                mostViewedTitle.style.display = "none";
                latestTitle.style.display = "none";
            } else if (typeFilter === "home") {
                currentType = "all";
                currentGenre = "all";
                mostViewedTitle.style.display = "block";
                latestTitle.style.display = "block"; 
            }

            performSearch();
        });
    });

    genreButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.getAttribute("data-genre") === "all") {
                currentGenre = "all";
                currentType = "all"; 
                mostViewedTitle.style.display = "block";
                latestTitle.style.display = "block";
                performSearch();
            }
        });
    });
});
