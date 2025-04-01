const rankingData = [
    { name: "Marcin", country: "POL", date: "01.04.2025", score: 1025 },
];

function populateTable() {
    const tableBody = document.querySelector("#rankingTable tbody");
    for(let i=0;i<200;i++){
    rankingData.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.country}</td>
            <td>${player.date}</td>
            <td>${player.score}</td>
        `;
        tableBody.appendChild(row);
    });
    }
}

document.addEventListener("DOMContentLoaded", populateTable);