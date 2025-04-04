let previousData = [];

const document = document.getElementById("gameCanvas");
async function populateTable() {
    const tableBody = document.querySelector("#rankingTable tbody");

    try {
        const data = await downloadRanking();
        if (JSON.stringify(data) !== JSON.stringify(previousData)) {
            tableBody.innerHTML = '';
            let counter = 1;

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

            previousData = data;
        }
    } catch (error) {
        console.error("Failed to fetch ranking:", error);
    }
}

async function downloadRanking() {
    try {
        const response = await fetch("http://localhost:8080/api/GetTop");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        return previousData;
    }
}


