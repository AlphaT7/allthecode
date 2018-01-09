let c = document.getElementById('canvas');
let ctx = c.getContext('2d');

let main = {
    vars: {
        color: {
            c0: 'rgba(255, 255, 255, 0)',
            c1: 'rgba(255, 255, 255, .1)',
            c2: 'rgba(255, 255, 255, .15)',
            c3: 'rgba(255, 255, 255, .2',
            c4: 'rgba(255, 255, 255, .25)',
            c5: 'rgba(255, 255, 255, .3',
            c6: 'rgba(255, 255, 255, .35',
            c7: 'rgba(255, 255, 255, .4',

        },
        squares: [],
        step: 0,
        increment: 0,
        groups: {
            g1_flag: false,
            g1_random: 0,
            g_count1: 0,
            g_count2: 8,
            g_limit: 8
        }
    },

    methods: {
        setup: function () {
            let dimension = document.body.getBoundingClientRect();
            let canvas = document.getElementById('canvas');

            canvas.width = dimension.width;
            //canvas.height = dimension.height;
            canvas.height = 300;
            main.methods.gridsetup();
        },

        drawsquare: function (s) {
            ctx.fillStyle = s.c;
            ctx.fillRect(s.x, s.y, s.w, s.h);
        },

        drawborder: function (x, y, w, h, c) {
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(x, y, w, h);
        },

        gridsetup: function () {
            main.vars.squares.length = 0;
            let width = document.getElementById('canvas').width;
            //let height = document.getElementById('canvas').height;
            let height = 300;

            let w = Math.floor(width / 50) + 1;
            let h = Math.floor(height / 50) + 1;
            let c = 1;

            for (let i = 0; i < h; i++) {
                let y = 51 * i;
                for (let i = 0; i < w; i++) {
                    let x = 51 * i;
                    if (c <= 7) {
                        //main.methods.drawborder(x,y,50,50,main.vars.color['c7']);
                        //main.vars.squares.push({ x: x, y: y, w: 50, h: 50, c: main.vars.color['c' + c] })
                        main.vars.squares.push({ x: x, y: y, w: 50, h: 50, c: main.vars.color['c0'] })
                        c++;
                    } else {
                        c = 1;
                        //main.methods.drawborder(x,y,50,50,main.vars.color['c7']);
                        main.vars.squares.push({ x: x, y: y, w: 50, h: 50, c: main.vars.color['c0'] })
                        c++;
                    }
                }
            }
        },

        gridanimate: function () {

            let mvg = main.vars.groups;
            let mvc = main.vars.color;

            if (mvg.g1_flag == false) {

                mvg.g1_random = main.methods.getRandomArbitrary();
                mvg.g1_flag = true;
                
            } else if (mvg.g_count1 < mvg.g_limit){

                main.vars.squares[mvg.g1_random].c = mvc['c'+mvg.g_count1];
                mvg.g1_random += 1;
                mvg.g_count1 ++;
                
            } else if (mvg.g_count1 == mvg.g_limit){
                main.vars.squares.forEach(function(element, index, array){
                    if (element.c == mvc['c7']) {
                        element.c = mvc['c6'];
                    } else if (element.c == mvc['c6']){
                        element.c = mvc['c5'];
                    } else if (element.c == mvc['c5']){
                        element.c = mvc['c4'];
                    } else if (element.c == mvc['c4']){
                        element.c = mvc['c3'];
                    } else if (element.c == mvc['c3']){
                        element.c = mvc['c2'];
                    } else if (element.c == mvc['c2']){
                        element.c = mvc['c1'];
                    } else if (element.c == mvc['c1']){
                        element.c = mvc['c0'];
                    }
                });
                mvg.g_count2 --;
                if (mvg.g_count2 <= 0){
                    mvg.g1_flag = false;
                    mvg.g_count1 = 0;
                    mvg.g_count2 = 8;
                }
            }

        },

        getRandomArbitrary: function () {
            //return Math.random() * (max - min) + min;
            return Math.floor(Math.random() * ((Math.floor(document.getElementById('canvas').width * 6 / 50)) - 7) + 7);
        },

        animate: function () {

            if (main.vars.step % 10 == 0) {
                let s = main.vars.squares;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                main.methods.gridanimate();

                s.forEach(function (element, index, array) {
                    main.methods.drawsquare(element);
                });
            }
        },

        step: function () {

            main.methods.animate();

            main.vars.step++;

            window.requestAnimationFrame(main.methods.step);
        }

    }
}

main.methods.setup();
main.methods.step();