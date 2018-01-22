/* global $ socket gameroom */

            var a = function(d){alert(d);},
      		   c = function(d){console.log(d);},
      		   ct = function(d){console.log(JSON.stringify(d))},
               canvas = document.getElementById("myCanvas"),
               ctx = canvas.getContext("2d"),
               colors = {
                  st_red: 'rgba(255, 37, 0, 0.25)'/*semi-transparent red*/,
                  clear: 'rgba(255, 255, 255, 0)'/*transparent white*/,
                  red: 'red',
                  blue: '#3498DB',
                  orange: '#F39C12',
                  green: '#27AE60',
                  st_blue: 'rgba(0, 120, 255, .25)',
                  st_green: 'rgba(17, 222, 27, .25)',
                  shadow: 'rgba(0,0,0,.75)',
                  purple: 'rgba(151, 17, 222, .25)'
               },
               attackers = [],
               gamelive = 0,
               goals = [{
                  x: 200,
                  y: 10
               },
               {
                  x: 200,
                  y: 370
               }],
               flags = [
                  {
                     src : 'img/waving-flag-red.png',
                     x : goals[0].x,
                     y : goals[0].y
                  },
                  {
                     src : 'img/waving-flag-blue.png',
                     x : goals[1].x,
                     y : goals[1].y
                  }
               ],
               flagrunners = [],
               mouse = {
                  x: '0',
                  y: '201'
               },
               dropboundry = {
                  x : 0,
                  y : 0,
                  w : 400,
                  h : 200
               },
               goalboundries = [{
                  x: 120,
                  y: 0,
                  w: 160,
                  h: 80,
                  c: colors.st_green
               },
               {
                  x: 120,
                  y: 320,
                  w: 160,
                  h: 80,
                  c: colors.st_blue
                  
               }],
               totaldots = flagrunners.length + attackers.length,
               eattackers = [],
               eflagrunners = [];
            
            ctx.canvas.width = 400;
            ctx.canvas.height = 400;
            
            function message(text){
               $('#message').html(text);
               setTimeout(function(){$('#message').html('');},3000);
            }
            
            function drawFlags(){
               flags.forEach(function(element,index,array){
                  var img = new Image();   
                  img.src = flags[index].src;
                  ctx.drawImage(img,flags[index].x,flags[index].y);
               });
            }
            
            function drawBoundry(){
               ctx.save();
               ctx.translate(0,0);
               ctx.beginPath();
               ctx.rect(dropboundry.x, dropboundry.y, dropboundry.w, dropboundry.h);    
                
               // check if we hover it, fill red, if not fill it blue
               ctx.fillStyle = ctx.isPointInPath(mouse.x, mouse.y) ? colors.st_red : colors.clear;
               ctx.fill();
               ctx.restore();
            }
            
            function drawGoalBoundries() {

               goalboundries.forEach(function(element,index,array){
                  
                  ctx.shadowColor = colors.shadow;
                  ctx.shadowBlur = 20;
                  
                  if (index == 0) {
                     ctx.shadowOffsetY = 2;
                     ctx.shadowOffsetX = 2;
                     
                  } else {
                     ctx.shadowOffsetY = -2;
                     ctx.shadowOffsetX = -2;
                  }
                  
                  ctx.fillStyle = element.c;
                  ctx.fillRect(element.x,element.y,element.w,element.h);

                  if (eattackers.length > 0 && index == 0){
                     for(var i = 0; i < eattackers.length; i++){
                        var test = RectCircleColliding(eattackers[i],element) ==  true;
                        if (test){
                           eattackers.splice(i,1);  
                        }
                     }
                  }

                  if (attackers.length > 0 && index == 1) {
                     for(var i = 0; i < attackers.length; i++){
                        var test = RectCircleColliding(attackers[i],element) ==  true;
                        if (test){
                           attackers.splice(i,1);  
                        }
                     }
                  }

               });
               

               function RectCircleColliding(circle,rect){
                  // return true if the rectangle and circle are colliding
                   var distX = Math.abs(circle.x - rect.x-rect.w/2);
                   var distY = Math.abs(circle.y - rect.y-rect.h/2);
               
                   if (distX > (rect.w/2 + circle.r)) { return false; }
                   if (distY > (rect.h/2 + circle.r)) { return false; }
/*               
                   if (distX <= (rect.w/2)) { return true; } 
                   if (distY <= (rect.h/2)) { return true; }
*/
                  if (distX <= (rect.w/2) && distY <= (rect.h/2)) { return true; } 
                  
                   var dx=distX-rect.w/2;
                   var dy=distY-rect.h/2;
                   return (dx*dx+dy*dy<=(circle.r*circle.r));
               }
               
            }
            
            function drawNewCircle(x,y,r,color,dottype){
               ctx.fillStyle = color;
               ctx.beginPath();
               ctx.arc(x,y,r,0,2*Math.PI);
               ctx.stroke();   
               ctx.fill();
                
               switch(dottype){
                  case 'attackers':
                     attackers.push({'x': x, 'y': y, 'rad': r});
                     break;
                  case 'flagrunners':
                     flagrunners.push({'x': x, 'y': y, 'rad': r});
                     break;
               }

               var circle = {
                  x: x,
                  y: y,
                  r: r,
                  dottype: dottype
               };
               
               socket.emit('circle', circle, gameroom);

            }
            
            function drawNewEnemyCircle(x,y,r,dottype){
               switch(dottype){ // have to off-set x & y to make it a mirror image from the opponents viewpoint...
                  case 'attackers':
                     eattackers.push({'x': (400 - x), 'y': (400 - y), 'rad': r});
                     var color = colors.red;
                     break;
                  case 'flagrunners':
                     eflagrunners.push({'x': (400 - x), 'y': (400 - y), 'rad': r});
                     var color = colors.orange;
                     break;
               }
               
               ctx.fillStyle = color;
               ctx.beginPath();
               ctx.arc((400-x),(400-y),r,0,2*Math.PI);
               ctx.stroke();   
               ctx.fill();
            }
            
            function drawCircle(x,y,r,color){
               ctx.fillStyle = color;
               ctx.beginPath();
               ctx.arc(x,y,r,0,2*Math.PI);
               ctx.stroke();   
               ctx.fill();
            }
            
            function drawLine(x1,y1,x2,y2){
               ctx.beginPath();
               ctx.moveTo(x1,y1);
               ctx.lineTo(x2,y2);
               ctx.stroke();
            }

            function moveFlagRunners(){

               if(flagrunners.length != 0){
                  flagrunners.forEach(function(element,index,array){

                     var x = element.x,
                     y = element.y,
                     moveFlag = false,
                     velX = 0,
                     velY = 0,
                     thrust = 4;
                     
                     var targetaquired = x == flags[0].x && y == flags[0].y;
                     var targetoffset = x - 7 == flags[0].x && y - 7 == flags[0].y;
 
                     if (targetaquired || targetoffset) {
                        var target = {
                           x: goals[1].x,
                           y: goals[1].y,
                        }
                        element.rad = 12;
                        moveFlag = true;
                        
                     } else {
                        var target = {
                           x : flags[0].x,
                           y : flags[0].y
                        }
                     }

                     var tx = target.x - x,
                     ty = target.y - y,
                     dist = Math.sqrt(tx*tx+ty*ty);
//                     rad = Math.atan2(ty,tx),
//                     angle = rad/Math.PI * 180;
                
                     velX = (tx/dist)*thrust;
                     velY = (ty/dist)*thrust;
                     
                     var testX = target.x - (element.x + velX);
                     var testY = target.y - (element.y + velY);
                
                     // some math to ensure no 'bouncing' once the circle reaches the target...     
                     if(testX / velX > 1){
                        element.x += velX;
                     } else if (testX / velX < 1){
                        element.x = target.x;
                     }
                        
                     // some math to ensure no 'bouncing' once the circle reaches the target...     
                     if(testY / velY > 1){
                        element.y += velY;
                     } else if (testY / velY < 1){
                        element.y = target.y;
                     }
                     // if the 'moveFlag' variable has been set to 'true', then move the flag position equal to the circle position
                     if (moveFlag) {
                        flags[0].x = element.x -7;
                        flags[0].y = element.y -7;
                     }
                     
                  });
               }
            }

            function moveEFlagRunners(){

               if(eflagrunners.length != 0){
                  eflagrunners.forEach(function(element,index,array){

                     var x = element.x,
                     y = element.y,
                     moveFlag = false,
                     velX = 0,
                     velY = 0,
                     thrust = 4;
                     
                     var targetaquired = x == flags[1].x && y == flags[1].y;
                     var targetoffset = x - 7 == flags[1].x && y - 7 == flags[1].y;
 
                     if (targetaquired || targetoffset) {
                        var target = {
                           x: goals[0].x,
                           y: goals[0].y,
                        }
                        element.rad = 12;
                        moveFlag = true;
                        
                     } else {
                        var target = {
                           x : flags[1].x,
                           y : flags[1].y
                        }
                     }

                     var tx = target.x - x,
                     ty = target.y - y,
                     dist = Math.sqrt(tx*tx+ty*ty);
//                     rad = Math.atan2(ty,tx),
//                     angle = rad/Math.PI * 180;
                
                     velX = (tx/dist)*thrust;
                     velY = (ty/dist)*thrust;
                     
                     var testX = target.x - (element.x + velX);
                     var testY = target.y - (element.y + velY);
                
                     // some math to ensure no 'bouncing' once the circle reaches the target...     
                     if(testX / velX > 1){
                        element.x += velX;
                     } else if (testX / velX < 1){
                        element.x = target.x;
                     }
                        
                     // some math to ensure no 'bouncing' once the circle reaches the target...     
                     if(testY / velY > 1){
                        element.y += velY;
                     } else if (testY / velY < 1){
                        element.y = target.y;
                     }
                     // if the 'moveFlag' variable has been set to 'true', then move the flag position equal to the circle position
                     if (moveFlag) {
                        flags[1].x = element.x -7;
                        flags[1].y = element.y -7;
                     }
                     
                  });
               }

            }

            function moveAttackers(){

               var targetarray = [];
               targetarray[0] = '';
               targetarray[1] = '';

               if(attackers.length != 0 && eattackers.concat(eflagrunners).length != 0){
                  attackers.forEach(function(element,index,array){
                     
                     if (eattackers.length > 0){
                        targetarray[0] = nearestTarget(element,eattackers);
                        if (checkCollision(element,targetarray[0].target) ==  true){
                           attackers.splice(targetarray[0].index,1);
                           eattackers.splice(targetarray[0].index,1);  
                        }
                     }

                     if (eflagrunners.length > 0){
                        targetarray[1] = nearestTarget(element,eflagrunners);
                        if (checkCollision(element,targetarray[1].target) == true){
                           eflagrunners.splice(targetarray[1].index,1);
                           attackers.splice(targetarray[1].index,1);
                        }
                     }
                     
                     var condition1 = targetarray[0] != '' && targetarray[1] == '';
                     var condition2 = targetarray[0] == '' && targetarray[1] != '';
                     var condition3 = targetarray[0] != '' && targetarray[1] != '';

                     if (condition1 == true){
                        var t = targetarray[0].target;
                        move(element,t);
                     } else if (condition2 == true){
                        var t = targetarray[1].target;
                        move(element,t);
                     } else if (condition3 == true){
                        var t = nearestTarget(element,[targetarray[0].target,targetarray[1].target]);
                        move(element,t.target);
                     }
                    
                     function move(element,t){
                        var x = element.x,
                        y = element.y,
                        velX = 0,
                        velY = 0,
                        thrust = 3;
                        
                        var tx = t.x - x,
                        ty = t.y - y,
                        dist = Math.sqrt(tx*tx+ty*ty);
      
                        velX = (tx/dist)*thrust;
                        velY = (ty/dist)*thrust;
      
                        element.x += velX;
                        element.y += velY;
                     }
                     
                  });
               }
        
/*
               if(attackers.length != 0 && flagrunners.length != 0){
                  attackers.forEach(function(element,index,array){
                     var distance = [];
                     for (var i = 0; i < flagrunners.length; i ++){
                        distance.push(  Math.sqrt( Math.pow((element.x - (flagrunners[i].x)),2) + Math.pow((element.y - (flagrunners[i].y)),2) ) );
                     }
             
                     var arraymin = Math.min.apply(Math, distance);
                     var target = flagrunners[distance.indexOf(arraymin)];
                     
                     var x = element.x,
                     y = element.y,
                     velX = 0,
                     velY = 0,
                     thrust = 3;

                     var tx = target.x - x,
                     ty = target.y - y,
                     dist = Math.sqrt(tx*tx+ty*ty);

                     velX = (tx/dist)*thrust;
                     velY = (ty/dist)*thrust;

                     if(dist > 1){
                        element.x += velX;
                        element.y += velY;
                     }

                  });
               }
 */              
            }

            function moveEAttackers(){

               var targetarray = [];
               targetarray[0] = '';
               targetarray[1] = '';

               if(eattackers.length != 0 && attackers.concat(flagrunners).length != 0){
                  eattackers.forEach(function(element,index,array){
                     
                     if (attackers.length > 0){
                        targetarray[0] = nearestTarget(element,attackers);
                        if (checkCollision(element,targetarray[0].target) ==  true){
                           attackers.splice(targetarray[0].index,1);
                           eattackers.splice(targetarray[0].index,1);  
                        }
                     }

                     if (flagrunners.length > 0){
                        targetarray[1] = nearestTarget(element,flagrunners);
                        if (checkCollision(element,targetarray[1].target) == true){
                           flagrunners.splice(targetarray[1].index,1);
                           eattackers.splice(targetarray[1].index,1);
                        }
                     }
                     
                     var condition1 = targetarray[0] != '' && targetarray[1] == '';
                     var condition2 = targetarray[0] == '' && targetarray[1] != '';
                     var condition3 = targetarray[0] != '' && targetarray[1] != '';

                     if (condition1 == true){
                        var t = targetarray[0].target;
                        move(element,t);
                     } else if (condition2 == true){
                        var t = targetarray[1].target;
                        move(element,t);
                     } else if (condition3 == true){
                        var t = nearestTarget(element,[targetarray[0].target,targetarray[1].target]);
                        move(element,t.target);
                     }
                    
                     function move(element,t){
                        var x = element.x,
                        y = element.y,
                        velX = 0,
                        velY = 0,
                        thrust = 3;
                        
                        var tx = t.x - x,
                        ty = t.y - y,
                        dist = Math.sqrt(tx*tx+ty*ty);
      
                        velX = (tx/dist)*thrust;
                        velY = (ty/dist)*thrust;
      
                        element.x += velX;
                        element.y += velY;
                     }
                     
                  });
               }
            }

            var nearestTarget = function(element,arr){

               var distance = [];
               for (var i = 0; i < arr.length; i ++){
                  distance.push(  Math.sqrt( Math.pow((element.x - (arr[i].x)),2) + Math.pow((element.y - (arr[i].y)),2) ) );
               }
       
               var arraymin = Math.min.apply(Math, distance);
               var target = arr[distance.indexOf(arraymin)];
               
               var data = {
                  target: target,
                  index: distance.indexOf(arraymin)
               };
               return data;
            }

            var checkCollision = function(circ1,circ2){
               
            // Mathmatic Equation to Detect Colision
            // distance = sqrt( (y2 - y1)² + (x2 - x1)² ) 
            // if distance < r1 + r2, then INTERSECTION HAS OCCURED
            
               var distance = Math.sqrt( Math.pow(((circ2.x) - circ1.x),2) + Math.pow(((circ2.y) - circ1.y),2) );
               if(distance <= 50){ drawLine(circ1.x,circ1.y,circ2.x,circ2.y) }
               var test = distance < circ1.rad + circ2.rad;
               return test;
            }

// Canvas onclick, rightclick, and mouseover events....

            canvas.oncontextmenu = function(e){
               e.preventDefault();
               if (totaldots < 10) {
                  var x;
                  var y;
                  
                  if (e.pageX || e.pageY) { 
                    x = e.pageX;
                    y = e.pageY;
                  }
                  
                  else { 
                    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
                    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
                  } 
                  
                  x -= canvas.offsetLeft;
                  y -= canvas.offsetTop;
   
                  // check and disallow circle creation if within drop boundry area...               
                  ctx.rect(dropboundry.x, dropboundry.y, dropboundry.w, dropboundry.h);    
                  ctx.isPointInPath(mouse.x, mouse.y) ? '' : drawNewCircle(x,y,7,colors.blue,'flagrunners');
                  $('#flagrunnercount').html('Flagrunner Count: ' + flagrunners.length);
                  totaldots ++;
               } else {
                  message('You have reached your dot limit of 10!')
               }
            };

            canvas.addEventListener('click',function(e){
               if (totaldots < 10) {
                  var x;
                  var y;
                  if (e.pageX || e.pageY) { 
                    x = e.pageX;
                    y = e.pageY;
                  }
                  else { 
                    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
                    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
                  } 
                  x -= canvas.offsetLeft;
                  y -= canvas.offsetTop;
                  
                  // check and disallow circle creation if within drop boundry area...
                  ctx.rect(dropboundry.x, dropboundry.y, dropboundry.w, dropboundry.h);
                  ctx.isPointInPath(mouse.x, mouse.y) ? '' : drawNewCircle(x,y,7,colors.blue,'attackers');
                  $('#attackercount').html('Attackers Count: ' + attackers.length);
                  totaldots ++;
               } else {
                  message('You have reached your dot limit of 10!')
               }
            });
            
            canvas.onmousemove = function(e) { //captures the mouse coordinates within the canvas...
            
               var rect = this.getBoundingClientRect();
               mouse.x = e.clientX - rect.left;
               mouse.y = e.clientY - rect.top;

            };
            
            canvas.onmouseout = function(e) { //sets the y value outside of the border coordinates so it will not stay red...
               mouse.y = 201;
            }
            
            var step = function() {
               
               ctx.clearRect(0,0,400,400);
               
               ctx.save();
               ctx.translate(0,0);
               drawGoalBoundries();
               
               attackers.forEach(function(element,index,array){
                  drawCircle(attackers[index].x, attackers[index].y,7,colors.blue);
               });
               flagrunners.forEach(function(element,index,array){
                  drawCircle(flagrunners[index].x, flagrunners[index].y,element.rad,colors.green);
               });
               eflagrunners.forEach(function(element,index,array){
                  drawCircle(eflagrunners[index].x, eflagrunners[index].y,element.rad,colors.orange);
               });
               eattackers.forEach(function(element,index,array){
                  drawCircle(eattackers[index].x, eattackers[index].y,7,colors.red);
               });
               
               drawFlags();
               ctx.restore();
               
               if(flagrunners.length != 0){ moveFlagRunners() }
               if(attackers.length != 0){ moveAttackers() }
               if(eflagrunners.length != 0){ moveEFlagRunners() }
               if(eattackers.length != 0){ moveEAttackers() }
               
               drawBoundry();

               /*
               if(gamelive == 0){
                  window.requestAnimationFrame(step);
               }
               */
            };
            
            setInterval(() => step(),50);
            
            //step();