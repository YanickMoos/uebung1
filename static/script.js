function analyzeText() {
    let text = document.getElementById("textInput").value;
    let resultsDiv = document.getElementById("results");

    if (!text.trim()) {
        alert("Bitte geben Sie einen Text ein!");
        return;
    }

    fetch("/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Serverantwort war nicht in Ordnung.");
        }
        return response.json();
    })
    .then(data => {
        resultsDiv.innerHTML = `<h3>Analyseergebnisse</h3>`;

        resultsDiv.innerHTML += `
            <h4>Tokens</h4>
            <p>${data.tokens.join(", ")}</p>
        `;

        resultsDiv.innerHTML += `
            <h4>POS-Tags</h4>
            <table class="table table-striped">
                <thead><tr><th>Wort</th><th>Tag</th></tr></thead>
                <tbody>
                    ${data.pos_tags.map(t => `<tr><td>${t[0]}</td><td>${t[1]}</td></tr>`).join("")}
                </tbody>
            </table>
        `;

        resultsDiv.innerHTML += `
            <h4>Entities</h4>
            <table class="table table-striped">
                <thead><tr><th>Entität</th><th>Typ</th></tr></thead>
                <tbody>
                    ${data.entities.map(e => `<tr><td>${e[0]}</td><td>${e[1]}</td></tr>`).join("")}
                </tbody>
            </table>
        `;
    })
    .catch(error => {
        console.error("Fehler:", error);
        alert("Fehler bei der Analyse. Bitte versuchen Sie es erneut.");
    });
}
