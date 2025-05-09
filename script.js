const zakupValues = [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600];
const sprzedazValues = [600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600];

function updateMatrix() {
    const allegroRate = parseFloat(document.getElementById("allegroSlider").value);
    const allegroFraction = allegroRate / 100;
    const extraCost = parseInt(document.getElementById("extraCost").value);
    const gameCost = parseInt(document.getElementById("gameCost").value);
    const pracaChecked = document.getElementById("pracaCheckbox").checked;
    const pracaCost = pracaChecked ? 40 : 0;

    document.getElementById("allegroValue").textContent = allegroRate.toFixed(0) + "%";

    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        let html = "<table><tr><th>Kupno →<br>Sprzedaż ↓</th>";
        for (let i = 0; i < zakupValues.length; i++) {
            html += '<th>' + zakupValues[i] + '</th>';
        }
        html += "</tr>";

        for (let y = 0; y < sprzedazValues.length; y++) {
            html += '<tr><th>' + sprzedazValues[y] + '</th>';
            for (let x = 0; x < zakupValues.length; x++) {
                html += matrixCell(x, y, allegroFraction, extraCost, gameCost, pracaCost);
            }
            html += "</tr>";
        }

        html += "</table>";
        document.getElementById("matrixSingle").innerHTML = html;
        document.getElementById("matrixTop").innerHTML = "";
        document.getElementById("matrixBottom").innerHTML = "";
    } else {
        renderSplit(allegroFraction, extraCost, gameCost, pracaCost);
    }
}

function renderSplit(allegroFraction, extraCost, gameCost, pracaCost) {
    let topHTML = "<table><tr><th>Kupno →<br>Sprzedaż ↓</th>";
    for (let i = 0; i < zakupValues.length; i++) {
        if (zakupValues[i] <= 800) topHTML += "<th>" + zakupValues[i] + "</th>";
    }
    topHTML += "</tr>";

    for (let y = 0; y < sprzedazValues.length; y++) {
        topHTML += "<tr><th>" + sprzedazValues[y] + "</th>";
        for (let x = 0; x < zakupValues.length; x++) {
            if (zakupValues[x] <= 800) {
                topHTML += matrixCell(x, y, allegroFraction, extraCost, gameCost, pracaCost);
            }
        }
        topHTML += "</tr>";
    }
    topHTML += "</table>";

    let bottomHTML = "<table><tr><th>Kupno →<br>Sprzedaż ↓</th>";
    for (let i = 0; i < zakupValues.length; i++) {
        if (zakupValues[i] > 800) bottomHTML += "<th>" + zakupValues[i] + "</th>";
    }
    bottomHTML += "</tr>";

    for (let y = 0; y < sprzedazValues.length; y++) {
        bottomHTML += "<tr><th>" + sprzedazValues[y] + "</th>";
        for (let x = 0; x < zakupValues.length; x++) {
            if (zakupValues[x] > 800) {
                bottomHTML += matrixCell(x, y, allegroFraction, extraCost, gameCost, pracaCost);
            }
        }
        bottomHTML += "</tr>";
    }
    bottomHTML += "</table>";

    document.getElementById("matrixSingle").innerHTML = "";
    document.getElementById("matrixTop").innerHTML = topHTML;
    document.getElementById("matrixBottom").innerHTML = bottomHTML;
}

function matrixCell(x, y, allegroFraction, extraCost, gameCost, pracaCost) {
    const zakup = zakupValues[x];
    const sprzedaz = sprzedazValues[y];
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

    return '<td class="' + cls + '">' + zysk + '</td>';
}

window.addEventListener("resize", updateMatrix);
window.addEventListener("load", updateMatrix);
