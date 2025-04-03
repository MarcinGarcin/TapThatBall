export async function populateTable() {
    const tableBody = document.querySelector("#rankingTable tbody");
    let counter = 1
    tableBody.innerHTML = '';

    const data = await downloadRanking();



    data.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${counter}</td>
            <td>${player.name}</td>
            <td>${player.country}</td>
            <td>${player.score}</td>
        `;
        tableBody.appendChild(row);
        counter++;
    });
}

async function downloadRanking() {
    try {
        const response = await fetch("http://localhost:8080/api/GetTop");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch ranking:", error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", populateTable);