var myChart = null;

$("#roll").click(function() {
  rolldice();
});

var rolldice = function() {
  var dice = $("#dice").val();
  var sides = $("#sides").val();
  var roll = [];
  var percent = {};
  for (let i = dice; i <= sides * dice; i++) {
    percent[i] = 0;
  }
  var percentage = [];
  var bgcolor = function() {
    let bgcarray = [];
    for (let i = dice; i <= sides * dice; i++) {
      bgcarray.push("rgba(54, 162, 235, 0.2)");
    }
    return bgcarray;
  };
  bgbcolor = function() {
    let bgbarray = [];
    for (let i = dice; i <= sides * dice; i++) {
      bgbarray.push("rgba(54, 162, 235, 1)");
    }
    return bgbarray;
  };
  chartlabels = function() {
    let labels = [];
    for (let i = dice; i <= sides * dice; i++) {
      labels.push(i);
    }
    return labels;
  };

  for (let i = 0; i < 1000; i++) {
    let thisroll = getRandomInt(dice, sides * dice);
    roll.push(thisroll);
  }
  //console.log(roll);
  for (let j = dice; j <= sides * dice; j++) {
    for (let i = 0; i < 1000; i++) {
      if (roll[i] == j) {
        percent[j]++;
      }
    }
  }
  //console.log(percent);
  for (let i = dice; i <= sides * dice; i++) {
    percent[i] = percent[i] * 0.1;
  }

  for (let i = dice; i <= sides * dice; i++) {
    percentage.push(percent[i]);
  }

  //console.log(percentage + '-test')

  function getRandomInt(min, max) {
    max = Number(max);
    min = Number(min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var ctx = document.getElementById("myChart").getContext("2d");
  ctx.clearRect(0, 0, $("#mychart").width(), $("#mychart").height());
  if (myChart != null) {myChart.destroy();}
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      //labels: ["1", "2", "3", "4", "5", "6"],
      labels: chartlabels(),
      datasets: [
        {
          label: "% for each side of the dice",
          //data: [12, 19, 3, 5, 2, 3],
          data: percentage,
          /*
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                */
          backgroundColor: bgcolor(),
          /*
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                */
          borderColor: bgbcolor(),
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
};
