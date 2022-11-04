//doughnut
var ctxD = document.getElementById("doughnutChart1").getContext('2d');
var myLineChart = new Chart(ctxD, {
  type: 'doughnut',
  data: {
    labels: ["Available", "Pending", "Consumed"],
    datasets: [{
      data: [10,4,6],
      backgroundColor: ["#75B809", "#FA8214", "#C80000"],
      hoverBackgroundColor: ["#75B809", "#FA8214", "#C80000"]
    }]
  },
  options: {
    responsive: true
  }
});
//doughnut
var ctxD = document.getElementById("doughnutChart2").getContext('2d');
var myLineChart = new Chart(ctxD, {
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
//doughnut
var ctxD = document.getElementById("doughnutChart3").getContext('2d');
var myLineChart = new Chart(ctxD, {
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