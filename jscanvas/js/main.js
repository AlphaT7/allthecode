
    let c = document.getElementById('canvas');
    let ctx = c.getContext('2d');

    let main = {
        vars: {
/*            
            color: {
                blue1: 'rgba(227, 242, 253, 1)',
                blue2: 'rgba(187, 222, 251, 1)',
                blue3: 'rgba(144, 202, 249, 1)',
                blue4: 'rgba(100, 181, 246, 1)',
                blue5: 'rgba(227, 242, 253, 1)'
            },
*/
            color: {
                blue1: 'rgba(100, 181, 246, 0)',
                blue2: 'rgba(100, 181, 246, .3)',
                blue3: 'rgba(100, 181, 246, .5)',
                blue4: 'rgba(100, 181, 246, .7',
                blue5: 'rgba(100, 181, 246, 1)'
            },
        squares: [],
        step: 0,
        increment: 0,
        increment2: 0


    },

    methods: {
        setup: function (){
            let dimension = document.body.getBoundingClientRect();
            let canvas = document.getElementById('canvas');

            canvas.width = dimension.width;
            //canvas.height = dimension.height;
            canvas.height = 300;
        },

        drawsquare: function(x,y,w,h,c){
            ctx.fillStyle = c;
            ctx.fillRect(x,y,w,h);
        },

        drawborder: function(x,y,w,h,c){
            ctx.strokeStyle='#fff';
            ctx.strokeRect(x,y,w,h);
        },
        
        grid: function(){
            main.vars.squares.length = 0;
            let width = document.getElementById('canvas').width;
            //let height = document.getElementById('canvas').height;
            let height = 300;

            let w = Math.floor(width / 50)+1;
            let h = Math.floor(height / 50)+1;
            let c = 1;

            for (let i = 0; i < h; i ++){
                let y = 51 * i;
                for (let i = 0; i < w; i ++){
                    let x = 51 * i;
                    if (c <= 5){
                        main.methods.drawborder(x,y,50,50,main.vars.color['blue'+c]);
                        //main.methods.square(x,y,50,50,main.vars.color.blue4);
                        main.vars.squares.push({x: x, y: y, w: 50, h: 50, c: main.vars.color['blue'+c]})
                        //main.vars.squares.push({x: x, y: y, w: 50, h: 50, c: main.vars.color.blue4})
                        c ++;
                    } else {
                        c = 1;
                        main.methods.drawborder(x,y,50,50,main.vars.color['blue'+c]);
                        //main.methods.square(x,y,50,50,main.vars.color.blue4);
                        main.vars.squares.push({x: x, y: y, w: 50, h: 50, c: main.vars.color['blue'+c]})
                        //main.vars.squares.push({x: x, y: y, w: 50, h: 50, c: main.vars.color.blue4})
                        c ++;
                    }
                }
            }
        },

        animate: function(){

             function getRandomArbitrary() {
                //return Math.random() * (max - min) + min;
                return Math.floor(Math.random() * ((Math.floor(document.getElementById('canvas').width*6 / 50)) - 5) + 5);
            }

            if (main.vars.step % 8 == 0){
                let s = main.vars.squares;
                let i = main.vars.increment;

                ctx.clearRect(0,0,canvas.width,canvas.height);
                main.methods.grid();

                switch (main.vars.increment){
                    case 0:
                        main.methods.drawsquare(s[i].x,s[i].y,s[i].w, s[i].h,main.vars.color['blue5']);
                        break;

                    case 1:
                        main.methods.drawsquare(s[i].x,s[i].y,s[i].w, s[i].h,main.vars.color['blue5']);
                        main.methods.drawsquare(s[i-1].x,s[i-1].y,s[i-1].w, s[i-1].h,main.vars.color['blue4']);
                        break;

                    case 2:
                        main.methods.drawsquare(s[i].x,s[i].y,s[i].w, s[i].h,main.vars.color['blue5']);
                        main.methods.drawsquare(s[i-1].x,s[i-1].y,s[i-1].w, s[i-1].h,main.vars.color['blue4']);
                        main.methods.drawsquare(s[i-2].x,s[i-2].y,s[i-2].w, s[i-2].h,main.vars.color['blue3']);
                        break;

                    case 3:
                        main.methods.drawsquare(s[i].x,s[i].y,s[i].w, s[i].h,main.vars.color['blue5']);
                        main.methods.drawsquare(s[i-1].x,s[i-1].y,s[i-1].w, s[i-1].h,main.vars.color['blue4']);
                        main.methods.drawsquare(s[i-2].x,s[i-2].y,s[i-2].w, s[i-2].h,main.vars.color['blue3']);
                        main.methods.drawsquare(s[i-3].x,s[i-3].y,s[i-3].w, s[i-3].h,main.vars.color['blue2']);
                        break;

                    case 4:
                        main.methods.drawsquare(s[i].x,s[i].y,s[i].w, s[i].h,main.vars.color['blue5']);
                        main.methods.drawsquare(s[i-1].x,s[i-1].y,s[i-1].w, s[i-1].h,main.vars.color['blue4']);
                        main.methods.drawsquare(s[i-2].x,s[i-2].y,s[i-2].w, s[i-2].h,main.vars.color['blue3']);
                        main.methods.drawsquare(s[i-3].x,s[i-3].y,s[i-3].w, s[i-3].h,main.vars.color['blue2']);
                        main.methods.drawsquare(s[i-4].x,s[i-4].y,s[i-4].w, s[i-4].h,main.vars.color['blue1']);
                        break;

                    default:

                        main.methods.drawsquare(s[i].x,s[i].y,s[i].w, s[i].h,main.vars.color['blue5']);
                        main.methods.drawsquare(s[i-1].x,s[i-1].y,s[i-1].w, s[i-1].h,main.vars.color['blue4']);
                        main.methods.drawsquare(s[i-2].x,s[i-2].y,s[i-2].w, s[i-2].h,main.vars.color['blue3']);
                        main.methods.drawsquare(s[i-3].x,s[i-3].y,s[i-3].w, s[i-3].h,main.vars.color['blue2']);
                        main.methods.drawsquare(s[i-4].x,s[i-4].y,s[i-4].w, s[i-4].h,main.vars.color['blue1']);
                        break;
                }
                
                main.vars.increment2 ++;
                main.vars.increment ++;
/*
                if (main.vars.increment2 > 10) {
                    main.vars.increment2 = 0;
                    main.vars.increment = getRandomArbitrary()
                }
*/          } 
        },

        step: function(){

            main.methods.animate();

            main.vars.step ++;

            window.requestAnimationFrame(main.methods.step);
        }

    }
}

main.methods.setup();
//main.methods.grid();
//main.methods.animate();
main.methods.step();
