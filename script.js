document.addEventListener("DOMContentLoaded", () => {
    const calendarContainer = document.getElementById("calendar-container");
    const calendar = document.getElementById("calendar");
    const letterContainer = document.getElementById("letter-container");
    const letterContent = document.getElementById("letter-content");
    const notJanuaryPage = document.getElementById("not-january-page");

    // Contenedor para el mensaje de día incorrecto
    const incorrectDayMessageContainer = document.createElement("div");
    incorrectDayMessageContainer.id = "incorrect-day-message";
    incorrectDayMessageContainer.className = "hidden";
    document.body.appendChild(incorrectDayMessageContainer);

    const incorrectDayMessage = document.createElement("p");
    incorrectDayMessage.textContent = "Ay que te conozco, ¡Todavía no guapa!";
    incorrectDayMessageContainer.appendChild(incorrectDayMessage);

    const closeButton = document.createElement("button");
    closeButton.textContent = "Cerrar";
    closeButton.onclick = () => {
        incorrectDayMessageContainer.classList.add("hidden");
    };
    incorrectDayMessageContainer.appendChild(closeButton);

    // Cargar cartas desde el archivo JSON
    fetch('letters.json')
        .then(response => response.json())
        .then(data => {
            const letters = data.letters;

            console.log("Mostrando el calendario."); // Depuración
            notJanuaryPage.style.display = "none"; // Ocultar el mensaje de no enero
            calendarContainer.style.display = "block"; // Mostrar el calendario

            for (let day = 1; day <= 31; day++) {
                const button = document.createElement("button");
                button.textContent = `Día ${day}`;

                // Habilitar botón y agregar lógica para mostrar carta
                button.onclick = () => {
                    showLetter(day - 1);
                };

                calendar.appendChild(button);
            }

            function showLetter(index) {
                letterContent.textContent = letters[index];
                letterContainer.classList.remove("hidden");
            }

            window.closeLetter = function () {
                letterContainer.classList.add("hidden");
            };
        })
        .catch(error => console.error('Error al cargar las cartas:', error));
});




