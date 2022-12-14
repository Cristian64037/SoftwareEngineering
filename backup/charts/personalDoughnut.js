let pChart = document.getElementById("doughnutChart2").getContext('2d');
//let PTo="public/script/getPTOAvailable.js".Parser;

let pDoughnut = new Chart(pChart, {
    type: 'doughnut',
    data: {
        labels: ["Available", "Pending", "Consumed"],
        datasets: [{
            data: [1,2,3],
            backgroundColor: ["#75B809", "#FA8214", "#C80000"],
            hoverBackgroundColor: ["#75B809", "#FA8214", "#C80000"]
        }]
    },
    options: {
        responsive: true
    }
});
