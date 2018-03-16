var myChart = null;
var first = true;

$('document').ready(function(){
  rolldice();
  $("#dice").val('');
  $("#sides").val('');
  $("#critical").val('');
  $("#armor_reduction").val('');
});

$("#form").submit(function(e) {
  e.preventDefault();
  rolldice();
});

const rolldice = () => {
  var dice = Number($("#dice").val());
  var sides = Number($("#sides").val());
  var armor_reduction = Number($("#armor_reduction").val());
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

  function rollDice(D, S) {
    let roll = 0;
    for (let i = 0; i < D; i++) {
      roll += random(S) + 1;
    }
    return roll;
  }

  function random(S) {
    return Math.floor(S * Math.random());
  }

  function flipCoin() {
    if (random(100) > 50){
      return true;
    } else {
      return false;
    }
  }

  for (let i = 0; i < 1000; i++) {
    let damage = rollDice(dice, sides);

    if (random(100) < critical) {
      damage += rollDice(dice, sides);
    }
    
    damage = (damage + (Math.ceil(damage * armor_reduction * -.01)));
    roll.push(damage);
  }

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
