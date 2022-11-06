let vChart = document.getElementById("doughnutChart1").getContext('2d');
let vDoughnut = new Chart(vChart, {
    type: 'doughnut',
    data: {
        labels: ["Available", "Pending", "Consumed"],
        datasets: [{
            data: [10, 4, 6],
            backgroundColor: ["#75B809", "#FA8214", "#C80000"],
            hoverBackgroundColor: ["#75B809", "#FA8214", "#C80000"]
        }]
    },
    options: {
        responsive: true
    }
});