var main = {
    vars: {
        calc_str: '0',
        flag: false
    },

    methods: {
        build_str: function (char){
            let mm = main.methods;
            let mv = main.vars;
            let patt1 = /[0-9]/g;
            let patt2 = /[.]/g;
            let patt3 = /[*=\-\/+]/g;

            if (mv.flag == false && patt3.test(char) == false && char != 'clear'){ // checks to make sure this isn't the first time;
                mv.calc_str = char;
                mv.flag = true;
            } else {

                if (char == '.' && patt2.test(mv.calc_str.split(' ')[mv.calc_str.split(' ').length -1]) == false){
                    mv.calc_str = mv.calc_str + char;
                } else if (char == 'clear'){
                    $('#calc_str').html(0);
                    $('#calculation').html('0.00');
                    mv.calc_str = '0';
                } else if (char == '='){
                    if (mv.calc_str.split(' ').length == 3){
                        mv.calc_str = mm.calculate();
                        $('#calculation').html(mv.calc_str);
                    }
                } else if (patt1.test(char) == true ){
                    if (mv.calc_str != '0'){
                        mv.calc_str = mv.calc_str + char;
                    } else {
                        mv.calc_str = char;
                    }
                    
                } else if (patt3.test(char) == true && patt3.test(mv.calc_str) == false) {
                    mv.calc_str = mv.calc_str + ' ' + char + ' ';
                }

            }
            $('#calc_str').html(mv.calc_str);
        },

        calculate: function(){
            let mv = main.vars;

            let answer = mv.calc_str.split(' ');

            switch (answer[1]) {
                case '+':
                    return Number(answer[0]) + Number(answer[2]);
                    break;
                case '-':
                    return Number(answer[0]) - Number(answer[2]);
                    break;
                case '*':
                    return Number(answer[0]) * Number(answer[2]);
                    break;
                case '/':
                    return Number(answer[0]) / Number(answer[2]);
                    break;
                default:
                    break;
            }
        },

        keydown: function(el){
            $('#'+el).addClass('pressed');
        },

        keyup: function (el){
            setTimeout(() => {
                $('#'+el).removeClass('pressed');
            }, 100);
        }

    }
}

$('body').keydown(function(e){
    let mm = main.methods;
    switch (true){
        case (e.which == 13 || e.which == 187): // enter
            mm.keydown('equals');
            console.log('enter');
            break;
        case (e.which == 67): // c (for clear)
            mm.keydown('clear');
            console.log('clear');
            break;
        case (e.which == 106): // *
            mm.keydown('multiply') 
            console.log('multiply');
            break;
        case (e.which == 107): // +
            mm.keydown('add');
            console.log('add');
            break;
        case (e.which == 109 || e.which == 189):  // -
            mm.keydown('subtract');
            console.log('subtract');
            break;
        case (e.which == 190 || e.which == 110): // .
            mm.keydown('decimal');
            console.log('decimal');
            break;
        case (e.which == 191 || e.which == 111): // /
            mm.keydown('divide');
            console.log('divide');
            break;
        case (e.which == 48 || e.which == 96): // 0
            mm.keydown('zero');
            console.log('zero');
            break;
        case (e.which == 49 || e.which == 97): // 1
            mm.keydown('one');
            console.log('one');
            break;
        case (e.which == 50 || e.which == 98): // 2
            mm.keydown('two');
            console.log('two');
            break;
        case (e.which == 51 || e.which == 99): // 3
            mm.keydown('three');
            console.log('three');
            break;
        case (e.which == 52 || e.which == 100): // 4
            mm.keydown('four');
            console.log('four');
            break;
        case (e.which == 53 || e.which == 101): // 5
            mm.keydown('five');
            console.log('five');
            break;
        case (e.which == 54 || e.which == 102): // 6
            mm.keydown('six');
            console.log('six');
            break;
        case (e.which == 55 || e.which == 103): // 7
            mm.keydown('seven');
            console.log('seven');
            break;
        case (e.which == 56 || e.which == 104): // 8
            mm.keydown('eight');
            console.log('eight');
            break;
        case (e.which == 57 || e.which == 105): // 9
            mm.keydown('nine');
            console.log('nine');
            break;
        default:
            console.log(e.which);
            break;
    }
});

$('body').keyup(function(e){
    let mm = main.methods;

    switch (true){
        case (e.which == 13 || e.which == 187): // =
            mm.keyup('equals');
            console.log('enter');
            main.methods.build_str('=');
            break;
        case (e.which == 67): // c (for clear)
            mm.keyup('clear');
            console.log('clear');
            main.methods.build_str('clear');
            break;
        case (e.which == 106): // *
            mm.keyup('multiply');
            console.log('multiply');
            main.methods.build_str('*');
            break;
        case (e.which == 107): // +
            mm.keyup('add');
            console.log('add');
            main.methods.build_str('+');
            break;
        case (e.which == 109 || e.which == 189):  // -
            mm.keyup('subtract');
            console.log('subtract');
            main.methods.build_str('-');
            break;
        case (e.which == 190 || e.which == 110): // .
            mm.keyup('decimal');
            console.log('decimal');
            main.methods.build_str('.');
            break;
        case (e.which == 191 || e.which == 111): // /
            mm.keyup('divide');
            console.log('divide');
            main.methods.build_str('/');
            break;
        case (e.which == 48 || e.which == 96): // 0
            mm.keyup('zero');
            console.log('zero');
            main.methods.build_str('0');
            break;
        case (e.which == 49 || e.which == 97): // 1
            mm.keyup('one');
            console.log('one');
            main.methods.build_str('1');
            break;
        case (e.which == 50 || e.which == 98): // 2
            mm.keyup('two');
            console.log('two');
            main.methods.build_str('2');
            break;
        case (e.which == 51 || e.which == 99): // 3
            mm.keyup('three');
            console.log('three');
            main.methods.build_str('3');
            break;
        case (e.which == 52 || e.which == 100): // 4
            mm.keyup('four');
            console.log('four');
            main.methods.build_str('4');
            break;
        case (e.which == 53 || e.which == 101): // 5
            mm.keyup('five');
            console.log('five');
            main.methods.build_str('5');
            break;
        case (e.which == 54 || e.which == 102): // 6
            mm.keyup('six');
            console.log('six');
            main.methods.build_str('6');
            break;
        case (e.which == 55 || e.which == 103): // 7
            mm.keyup('seven');
            console.log('seven');
            main.methods.build_str('7');
            break;
        case (e.which == 56 || e.which == 104): // 8
            mm.keyup('eight');
            console.log('eight');
            main.methods.build_str('8');
            break;
        case (e.which == 57 || e.which == 105): // 9
            mm.keyup('nine');
            console.log('nine');
            main.methods.build_str('9');
            break;
        default:
            console.log(e.which);
            break;
    }
});

$('.button').mousedown(function(){
    main.methods.keydown($(this).attr('id'));
});

$('.button').mouseup(function(){
    let mm = main.methods;
    mm.keyup($(this).attr('id'));

    switch ($(this).attr('id')) {
        case 'equals':
            mm.build_str('=');
            break;
        case 'multiply':
            mm.build_str('*');
            break;
        case 'add':
            mm.build_str('+');
            break;
        case 'subtract':
            mm.build_str('-');
            break;
        case 'decimal':
            mm.build_str('.');
            break;
        case 'divide':
            mm.build_str('/');
            break;
        case 'zero':
            mm.build_str('0');
            break;
        case 'one':
            mm.build_str('1');
            break;
        case 'two':
            mm.build_str('2');
            break;
        case 'three':
            mm.build_str('3');
            break;
        case 'four':
            mm.build_str('4');
            break;
        case 'five':
            mm.build_str('5');
            break;
        case 'six':
            mm.build_str('6');
            break;
        case 'seven':
            mm.build_str('7');
            break;
        case 'eight':
            mm.build_str('8');
            break;
        case 'nine':
            mm.build_str('9');
            break;
        case 'clear':
            mm.build_str('clear');
        default:
            break;
    }
});