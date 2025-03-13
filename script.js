class Grafico {
    constructor() {
        this.data = [['X', 'Y']];
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(() => this.drawChart()); 
    }

    addData(x, y) {
        this.data.push([x, y]);
    }

    drawChart() {
        var data = google.visualization.arrayToDataTable(this.data);

        var options = {
            hAxis: {title: 'X',  viewWindow: {min: -10, max: 10}},
            vAxis: {title: 'Y', viewWindow: {min: -10, max: 10}},
            curveType: 'function',
            legend: "none",
            pointSize: 2,
            lineWidth: 0,
            chartArea: {width: '60%', height: '70%'},
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
    }
}

class GraficoRetta extends Grafico {
    constructor(m, q) {
        super();
        this.data = [['X', 'Y']];
        this.addDataFromEquation(m, q);
    }

    addDataFromEquation(m, q) {
        for (let x = -10; x <= 10; x += 0.1) {
            let y = m * x + q;
            this.addData(x, y);
        }
    }
}

class GraficoParabola extends Grafico {
    constructor(a, b, c) {
        super();
        this.data = [['X', 'Y']];
        this.addDataFromEquation(a, b, c);
    }

    addDataFromEquation(a, b, c) {
        for (let x = -10; x <= 10; x += 0.1) {
            let y = a * x * x + b * x + c;
            this.addData(x, y);
        }
    }
}

function updateInputFields() {
    const graphType = document.getElementById('graphType').value;
    const inputFieldsDiv = document.getElementById('inputFields');
    inputFieldsDiv.innerHTML = '';

    if (graphType === 'parabola') {
        inputFieldsDiv.innerHTML = `
            <label for="a">a:</label>
            <input type="number" id="a" name="a">
            <label for="b">b:</label>
            <input type="number" id="b" name="b">
            <label for="c">c:</label>
            <input type="number" id="c" name="c">
        `;
    } else if (graphType === 'retta') {
        inputFieldsDiv.innerHTML = `
            <label for="m">m:</label>
            <input type="number" id="m" name="m">
            <label for="q">q:</label>
            <input type="number" id="q" name="q">
        `;
    }
}

function drawGraph() {
    const graphType = document.getElementById('graphType').value;

    if (graphType === 'parabola') {
        const a = parseFloat(document.getElementById('a').value);
        const b = parseFloat(document.getElementById('b').value);
        const c = parseFloat(document.getElementById('c').value);
        new GraficoParabola(a, b, c);
    } else if (graphType === 'retta') {
        const m = parseFloat(document.getElementById('m').value);
        const q = parseFloat(document.getElementById('q').value);
        new GraficoRetta(m, q);
    }
}
