var myChart = null;
var first = true;

$("document").ready(function() {
  createDamageChart();
  $("#dice").val("");
  $("#sides").val("");
  $("#critical").val("");
  $("#reduction").val("");
});

$("#form").submit(function(e) {
  e.preventDefault();
  createDamageChart();
});

const createDamageChart = () => {
  var dice = Number($("#dice").val());
  var sides = Number($("#sides").val());
  var reduction = Number($("#reduction").val());
  var roll = [];
  var critical = Number($("#critical").val());
  var percent = {};
  var percentage = [];
  var bgcolor = function() {
    let bgcarray = [];
    for (let i = 0; i <= max(roll); i++) {
      bgcarray.push("rgba(54, 162, 235, 0.2)");
    }
    return bgcarray;
  };

  bgbcolor = function() {
    let bgbarray = [];
    for (let i = 0; i <= max(roll); i++) {
      bgbarray.push("rgba(54, 162, 235, 1)");
    }
    return bgbarray;
  };

  chartlabels = function() {
    let labels = [];
    for (let i = 0; i <= max(roll); i++) {
      labels.push(i);
    }
    return labels;
  };

  function max(arr) {
    var max = arr.reduce(function(a, b) {
      return Math.max(a, b);
    });
    return max;
  }

  const getDamage = function(dice, sides, critical, reduction) {
    const thisDamage = function(dice, sides, critical, reduction) {
      this.damage = 0;

      this.rollDice = function() {
        for (let i = 0; i < dice; i++) {
          this.damage += this.random(sides) + 1;
        }
        return this;
      };
      this.random = function(S) {
        return Math.floor(S * Math.random());
      };
      this.critical = function() {
        if (this.random(100) < critical) {
          this.damage += this.rollDice(dice, sides).damage;
        }
        return this;
      };
      this.reduction = function() {
        this.damage = this.damage + Math.ceil(this.damage * reduction * -0.01);
        return this;
      };
    };
    return new thisDamage(dice, sides, critical, reduction).rollDice().critical().reduction().damage;
  };

  for (let i = 0; i < 1000; i++) {
    let damage = getDamage(dice, sides, critical, reduction);
    roll.push(damage);
  }
  //console.log(roll);

  for (let i = 0; i <= max(roll); i++) {
    percent[i] = 0;
  }

  for (let j = 0; j <= max(roll); j++) {
    for (let i = 0; i <= roll.length + 1; i++) {
      if (roll[i] == j) {
        percent[j]++;
      }
    }
  }

  for (let i = 0; i <= max(roll); i++) {
    percentage.push(Math.round(percent[i] * 0.1 * 100 + Number.EPSILON) / 100);
  }

  var ctx = document.getElementById("myChart").getContext("2d");
  ctx.clearRect(0, 0, $("#mychart").width(), $("#mychart").height());
  if (myChart != null) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      //labels: ['1', '2', '3', '4', '5', '6'],
      labels: chartlabels(),
      datasets: [
        {
          label: "Percentage (%) for the number rolled out of 1000 rolls",
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
