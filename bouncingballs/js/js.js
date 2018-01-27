Physics(function (world) {

    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight - 20;
    var tarray = [];

    var renderer = Physics.renderer('canvas', {
        el: 'viewport',
        width: viewWidth,
        height: viewHeight,
        meta: false, // don't display meta data
        styles: {
            // set colors for the circle bodies
            'circle': {
                strokeStyle: '#351024',
                lineWidth: 1,
                fillStyle: '#f6ff00',
                angleIndicator: '#351024'
            }
        }
    });

    // add the renderer
    world.add(renderer);
    // render on each step
    world.on('step', function () {
        world.render();
    });

    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchmove", handleMove, false);
    canvas.addEventListener("touchend", handleEnd, false);
    $('canvas').contextmenu(function(e){ e.preventDefault(); });

    function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    function handleStart(e) {
        e.preventDefault();
    }

    function handleMove(e) {
        e.preventDefault();
        
        let pos = getTouchPos(canvas, e);
        tarray.push(pos)

    }

    function handleEnd(e) {
        e.preventDefault();

        let tstart = tarray[0];
        let tend = tarray[tarray.length -1];
        let thrust = 1;

        var tx = tend.x - tstart.x,
        ty = tend.y - tstart.y,
        dist = Math.sqrt(tx * tx + ty * ty);

        velX = (tx / dist) * thrust;
        velY = (ty / dist) * thrust;

        // add a circle
        world.add(
            Physics.body('circle', {
                x: tend.x, // x-coordinate
                y: tend.y, // y-coordinate
                vx: velX,
                vy: velY,
                radius: 20
            })
        );
        tarray.length = 0;
    }

    // bounds of the window
    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    // constrain objects to these bounds
    world.add(Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.99,
        cof: 0.99
    }));

    // ensure objects bounce when edge collision is detected
    world.add(Physics.behavior('body-impulse-response'));

    // add some gravity
    world.add(Physics.behavior('constant-acceleration'));

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function (time, dt) {

        world.step(time);
    });

    // start the ticker
    Physics.util.ticker.start();

});