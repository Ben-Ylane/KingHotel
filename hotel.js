document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("booking-form");
    const summary = document.getElementById("summary");
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const adultsInput = document.getElementById("adults");
    const childrenInput = document.getElementById("children");
    const roomsInput = document.getElementById("rooms");
    const adultsError = document.getElementById("adults-error");
    const childrenError = document.getElementById("children-error");
    const roomsError = document.getElementById("rooms-error");
    const dateError = document.getElementById("date-error");
    const childrenAgesContainer = document.getElementById("children-ages");

    // Fonction pour incrémenter les valeurs des champs
    function increment(field) {
        const input = document.getElementById(field);
        input.value = parseInt(input.value) + 1;
        // Appeler la fonction pour afficher les champs d'âge des enfants
        showChildrenAges();
    }

    // Fonction pour décrémenter les valeurs des champs
    function decrement(field) {
        const input = document.getElementById(field);
        const value = parseInt(input.value);
        if (value > 0) {
            input.value = value - 1;
            // Appeler la fonction pour afficher les champs d'âge des enfants
            showChildrenAges();
        }
    }

    // Fonction pour afficher les champs d'âge des enfants
    function showChildrenAges() {
        const childrenCount = parseInt(childrenInput.value);
        childrenAgesContainer.innerHTML = "";
        for (let i = 0; i < childrenCount; i++) {
            childrenAgesContainer.innerHTML += `
                <label for="child-age-${i}">Âge de l'enfant ${i + 1}:</label>
                <input type="number" id="child-age-${i}" name="child-age-${i}" min="0" max="17"><br>
            `;
        }
    }

    // Gestion des événements de clic pour les boutons d'incrémentation et de décrémentation
    document.querySelectorAll('[data-action="increment"]').forEach(button => {
        button.addEventListener("click", function() {
            const field = button.dataset.field;
            increment(field);
        });
    });

    document.querySelectorAll('[data-action="decrement"]').forEach(button => {
        button.addEventListener("click", function() {
            const field = button.dataset.field;
            decrement(field);
        });
    });

    // Vérification en temps réel pour afficher les champs d'âge des enfants
    childrenInput.addEventListener("input", showChildrenAges);

    // Validation en temps réel pour le champ des adultes
    adultsInput.addEventListener("input", function() {
        const adultsValue = parseInt(adultsInput.value);
        if (adultsValue < 0) {
            adultsError.textContent = "Le nombre d'adultes ne peut pas être inférieur à 0.";
            adultsInput.classList.add("error-input");
        } else {
            adultsError.textContent = "";
            adultsInput.classList.remove("error-input");
        }
    });

    // Validation en temps réel pour le champ des enfants
    childrenInput.addEventListener("input", function() {
        const childrenValue = parseInt(childrenInput.value);
        if (childrenValue < 0) {
            childrenError.textContent = "Le nombre d'enfants ne peut pas être inférieur à 0.";
            childrenInput.classList.add("error-input");
        } else {
            childrenError.textContent = "";
            childrenInput.classList.remove("error-input");
        }
    });

    // Validation en temps réel pour le champ des chambres
    roomsInput.addEventListener("input", function() {
       
        const roomsValue = parseInt(roomsInput.value);
        if (roomsValue < 0) {
            roomsError.textContent = "Le nombre de chambres ne peut pas être inférieur à 0.";
            roomsInput.classList.add("error-input");
        } else {
            roomsError.textContent = "";
            roomsInput.classList.remove("error-input");
        }
    });
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
    
        const adults = parseInt(adultsInput.value);
        const children = parseInt(childrenInput.value);
        const rooms = parseInt(roomsInput.value);
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const currentDate = new Date();
    
        // Vérification des dates
        if (startDate >= endDate) {
            dateError.textContent = "La date de début doit être antérieure à la date de fin.";
            startDateInput.classList.add("error-input");
            endDateInput.classList.add("error-input");
            return;
        }
    
        // Réinitialiser les erreurs et les styles d'entrée en cas de succès
        dateError.textContent = "";
        startDateInput.classList.remove("error-input");
        endDateInput.classList.remove("error-input");
    
        // Vérification de l'âge des enfants et leur conversion en adultes si nécessaire
        for (let i = 0; i < children; i++) {
            const ageInput = document.getElementById(`child-age-${i}`);
            const age = parseInt(ageInput.value);
            if (age >= 18) {
                childrenInput.value--;
                adultsInput.value++;
                showChildrenAges();
                break;
            }
        }
    
        // Afficher le récapitulatif de la réservation
        summary.innerHTML = `
            <h2>Récapitulatif de la réservation</h2>
            <p>Adultes: ${adults}</p>
            <p>Enfants: ${children}</p>
            <p>Chambres: ${rooms}</p>
            <p>Date de début: ${startDate.toLocaleDateString()}</p>
            <p>Date de fin: ${endDate.toLocaleDateString()}</p>
        `;
    });
    });
    