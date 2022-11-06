let pChart = document.getElementById("doughnutChart2").getContext('2d');
let pDoughnut = new Chart(pChart, {
    type: 'doughnut',
    data: {
        labels: ["Available", "Pending", "Consumed"],
        datasets: [{
            data: [3,0,0],
            backgroundColor: ["#75B809", "#FA8214", "#C80000"],
            hoverBackgroundColor: ["#75B809", "#FA8214", "#C80000"]
        }]
    },
    options: {
        responsive: true
    }
});