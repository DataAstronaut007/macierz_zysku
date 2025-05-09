
const zakupFull = [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600];
const zakupTop = [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800];
const zakupBottom = [850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600];
const sprzedazValues = [600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600];

function updateMatrix() {
    const matrixSingle = document.getElementById("matrixSingle");
    const matrixTop = document.getElementById("matrixTop");
    const matrixBottom = document.getElementById("matrixBottom");

    const allegroRate = parseFloat(document.getElementById("allegroSlider").value);
    const allegroFraction = allegroRate / 100;
    const extraCost = parseInt(document.getElementById("extraCost").value);
    const gameCost = parseInt(document.getElementById("gameCost").value);
    const pracaChecked = document.getElementById("pracaCheckbox").checked;
    const pracaCost = pracaChecked ? 40 : 0;

    document.getElementById("allegroValue").textContent = allegroRate.toFixed(0) + "%";

    function generateTable(zakupArray) {
        let html = "<table><tr><th>Kupno →<br>Sprzedaż ↓</th>";
        zakupArray.forEach(function(zakup) {
            html += "<th>" + zakup + "</th>";
        });
        html += "</tr>";

        sprzedazValues.forEach(function(sprzedaz) {
            html += "<tr><th>" + sprzedaz + "</th>";
            zakupArray.forEach(function(zakup) {
                const prowizja = Math.round(sprzedaz * allegroFraction);
                const pcc = zakup > 1000 ? Math.round(zakup * 0.02) : 0;
                const marza = sprzedaz - zakup - prowizja - extraCost - gameCost - pcc;
                const vat = Math.round((marza / 1.23) * 0.23);
                const zyskNetto = Math.round(marza - vat);
                const podDoch = Math.round(zyskNetto * 0.19);
                const zysk = zyskNetto - podDoch - pracaCost;

                let cls = "";
                if (zysk < 0) cls = "negative";
                else if (zysk <= 150) cls = "medium";
                else cls = "positive";

                html += "<td class='" + cls + "'>" + zysk + "</td>";
            });
            html += "</tr>";
        });

        html += "</table>";
        return html;
    }

    matrixSingle.innerHTML = generateTable(zakupFull);
    matrixTop.innerHTML = generateTable(zakupTop);
    matrixBottom.innerHTML = generateTable(zakupBottom);
}

updateMatrix();
