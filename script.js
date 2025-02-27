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

grafico = new GraficoParabola(10,2,3)