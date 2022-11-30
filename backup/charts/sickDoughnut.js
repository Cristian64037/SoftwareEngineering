let sChart = document.getElementById("doughnutChart3").getContext('2d');
let sDoughnut = new Chart(sChart, {
    type: 'doughnut',
    data: {
        labels: ["Available", "Pending", "Consumed"],
        datasets: [{
            data: [5,2,3],
            backgroundColor: ["#75B809", "#FA8214", "#C80000"],
            hoverBackgroundColor: ["#75B809", "#FA8214", "#C80000"]
        }]
    },
    options: {
        responsive: true
    }
});