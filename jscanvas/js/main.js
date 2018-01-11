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
        totalgroups: 0,
        groups: {
            /*
            tstamp + flag: false,
            tstamp + random: 0,
            tstamp + count1: 0,
            tstamp + count2: 8,
            tstamp + limit: 8
            */
        },
        groups1: {}
    },

    methods: {
        setup: function () {
            let dimension = document.body.getBoundingClientRect();
            let canvas = document.getElementById('canvas');
            canvas.width = dimension.width;
            //canvas.height = dimension.height;
            canvas.height = 300;
            main.vars.totalgroups = Math.floor(((canvas.width * canvas.height / (25*25)) * .15) / 8);
            let i = 0;
            function createGridVars() {

                if (i < main.vars.totalgroups) {
                    let tstamp = Date.now();
                    main.vars.groups[i] = tstamp;
                    main.vars.groups[tstamp + 'flag'] = false;
                    main.vars.groups[tstamp + 'random'] = main.methods.getRandomArbitrary();
                    main.vars.groups[tstamp + 'count1'] = 0;
                    main.vars.groups[tstamp + 'count2'] = 8;
                    main.vars.groups[tstamp + 'limit'] = 8;

                    main.vars.groups1[i] = tstamp;
                    main.vars.groups1[tstamp + 'flag'] = false;
                    main.vars.groups1[tstamp + 'random'] = main.methods.getRandomArbitrary();
                    main.vars.groups1[tstamp + 'count1'] = 0;
                    main.vars.groups1[tstamp + 'count2'] = 8;
                    main.vars.groups1[tstamp + 'limit'] = 8;

                    i++;
                    setTimeout(function () { createGridVars(); }, 15);
                }
            };
            createGridVars();

            main.methods.gridsetup();
        },

        drawsquare: function (s) {

            ctx.fillStyle = s.c;
            //ctx.strokeStyle = '#fff';
            //ctx.strokeRect(s.x, s.y, s.w, s.h);
            ctx.fillRect(s.x, s.y, s.w, s.h);

        },

        gridsetup: function () {
            main.vars.squares.length = 0;
            let width = document.getElementById('canvas').width;
            //let height = document.getElementById('canvas').height;
            let height = 300;

            let w = Math.floor(width / 25) + 1;
            let h = Math.floor(height / 25) + 1;
            let c = 1;

            for (let i = 0; i < h; i++) {
                let y = 26 * i;
                for (let i = 0; i < w; i++) {
                    let x = 26 * i;
                    if (c <= 7) {
                        main.vars.squares.push({ x: x, y: y, w: 25, h: 25, c: main.vars.color['c0'] })
                        c++;
                    } else {
                        c = 1;
                        main.vars.squares.push({ x: x, y: y, w: 25, h: 25, c: main.vars.color['c0'] })
                        c++;
                    }
                }
            }
        },

        gridanimate: function (tstamp) {

            let mvg = main.vars.groups;
            let mvc = main.vars.color;

            if (mvg[tstamp + 'flag'] == false) {

                mvg[tstamp + 'random'] = main.methods.getRandomArbitrary();
                mvg[tstamp + 'flag'] = true;

            } else if (mvg[tstamp + 'count1'] < mvg[tstamp + 'limit']) {

                main.vars.squares[mvg[tstamp + 'random']].c = mvc['c' + mvg[tstamp + 'count1']];
                mvg[tstamp + 'random']++;
                mvg[tstamp + 'count1']++;

            } else if (mvg[tstamp + 'count1'] == mvg[tstamp + 'limit']) {
                for ( let i = mvg[tstamp + 'random']-7; i <= (mvg[tstamp + 'random']); i ++){
                    switch (main.vars.squares[i].c){
                        case mvc['c7']:
                            main.vars.squares[i].c = mvc['c6'];
                            break;
                        case mvc['c6']:
                            main.vars.squares[i].c = mvc['c5'];
                            break;
                        case mvc['c5']:
                            main.vars.squares[i].c = mvc['c4'];
                            break;
                        case mvc['c4']:
                            main.vars.squares[i].c = mvc['c3'];
                            break;
                        case mvc['c3']:
                            main.vars.squares[i].c = mvc['c2'];
                            break;
                        case mvc['c2']:
                            main.vars.squares[i].c = mvc['c1'];
                            break;
                        case mvc['c1']:
                            main.vars.squares[i].c = mvc['c0'];
                            break;
                        default:
                            break;
                    }
                };
                console.log(mvg[tstamp + 'count2']+'t'+tstamp);
                
                if (mvg[tstamp + 'count2'] <= 0) {
                    mvg[tstamp + 'flag'] = false;
                    mvg[tstamp + 'count1'] = 0;
                    mvg[tstamp + 'count2'] = 8;
                }
                mvg[tstamp + 'count2']--;
            }

        },
        /*
                gridanimate: function (tstamp) {
        
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
        */
        getRandomArbitrary: function () {
            let canvas = document.getElementById('canvas');
            //return (Math.random() * (max - min)) + min;
            return (Math.floor(Math.random() * (Math.floor((canvas.width * canvas.height) / (25 * 25)) - 1)) + 1)
        },

        animate: function () {

            if (main.vars.step % 5 == 0) {
                let s = main.vars.squares;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (i = 0; i < main.vars.totalgroups; i++) {
                    main.methods.gridanimate(main.vars.groups[i]);
                }
/*
                for (i = 0; i < main.vars.totalgroups; i++) {
                    main.methods.gridanimate(main.vars.groups1[i]);
                }
*/
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