const form = document.getElementById("addForm");
const input = document.getElementById("cardInput");

let cards = [
    {id: 1, text: "Learn Git", status: "done"},
    {id: 2, text: "Build Siyana Board", status: "inprogress"},
    {id: 3, text: "Ship Project 03", status: "todo"},
];

function renderCards() {
    document.querySelectorAll(".cards").forEach(col => col.innerHTML = "");

    cards.forEach(card => {
        const cardEl = document.createElement("div");
        cardEl.classList.add("card");
        cardEl.textContent = card.text;
        cardEl.draggable = true;
        cardEl.dataset.id = card.id;

        cardEl.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", card.id);
        });

        const column = document.querySelector(`.column[data-status="${card.status}"] .cards`);
        column.appendChild(cardEl);
    });
}

function saveCards() {
    localStorage.setItem("siyanaBoardCards", JSON.stringify(cards));
}

function loadCards() {
    const saved = localStorage.getItem("siyanaBoardCards");
    if (saved) {
        cards = JSON.parse(saved);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newCard = {
        id: Date.now(),
        text: input.value,
        status: "todo"
    };

    cards.push(newCard);
    saveCards();
    renderCards();
    input.value = "";
});

loadCards();
renderCards();

document.querySelectorAll(".column").forEach(column => {
    column.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    column.addEventListener("drop", (event) => {
        const cardId = Number(event.dataTransfer.getData("text/plain"));
        const newStatus = column.dataset.status;
        const card = cards.find(c => c.id === cardId);
        card.status =  newStatus;

        saveCards();
        renderCards();
    })
});