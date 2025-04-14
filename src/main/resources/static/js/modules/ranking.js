export async function populateTable() {
    const tableBody = document.querySelector("#rankingTable tbody");
    tableBody.innerHTML = '';

    const data = await downloadRanking();

    data.forEach((player, index) => {
        console.log(player);
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td><img src="https://flagcdn.com/24x18/${player.country.toLowerCase()}.png" alt="${player.country}" /></td>

        <td>${player.score}</td>
    `;
        tableBody.appendChild(row);
    });
}

async function downloadRanking() {
    try {
        const response = await fetch("/api/GetTop");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch ranking:", error);
        return [];
    }
}