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

    // Obtener la fecha actual
    const today = new Date();
    const currentDay = today.getDate(); // Obtener el día del mes
    const currentMonth = today.getMonth(); // Obtener el mes (0 = enero, 11 = diciembre)

    console.log(`Mes actual: ${currentMonth}`); // Depuración
    console.log(`Día actual: ${currentDay}`); // Depuración

    // Cargar cartas desde el archivo JSON
    fetch('letters.json')
        .then(response => response.json())
        .then(data => {
            const letters = data.letters;

            if (currentMonth === 0) { // 0 representa enero
                console.log("Es enero. Mostrando el calendario."); // Depuración
                notJanuaryPage.style.display = "none"; // Ocultar el mensaje de no enero
                calendarContainer.style.display = "block"; // Mostrar el calendario

                for (let day = 1; day <= 31; day++) {
                    const button = document.createElement("button");
                    button.textContent = `Día ${day}`;

                    // Habilitar botón y agregar lógica para mostrar carta o mensaje de día incorrecto
                    button.onclick = () => {
                        if (day <= currentDay) {
                            showLetter(day - 1);
                        } else {
                            showIncorrectDayMessage();
                        }
                    };

                    calendar.appendChild(button);
                }

                function showLetter(index) {
                    letterContent.textContent = letters[index];
                    letterContainer.classList.remove("hidden");
                }

                function showIncorrectDayMessage() {
                    incorrectDayMessageContainer.classList.remove("hidden");
                }

                window.closeLetter = function () {
                    letterContainer.classList.add("hidden");
                    incorrectDayMessageContainer.classList.add("hidden");
                };
            } else {
                console.log("No es enero. Mostrando el mensaje de no enero."); // Depuración
                calendarContainer.style.display = "none"; // Ocultar el calendario
                notJanuaryPage.style.display = "flex"; // Mostrar el mensaje de no enero
            }
        })
        .catch(error => console.error('Error al cargar las cartas:', error));
});



