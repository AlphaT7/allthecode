var main = {
    vars: {
        calc_array: [],
        calc_str: 0,
        flag: false
    },

    methods: {
        build_str: function (char){
            if (main.vars.flag == false){
                main.vars.calc_str = char;
                main.vars.flag = true;
            } else {
                main.vars.calc_str = main.vars.calc_str + char;
            }
            $('#calc_str').html(main.vars.calc_str);
        }
    }
}

$('body').keydown(function(e){
    switch (true){
        case (e.which == 13 || e.which == 187):
            $('#equals').css("background-color","#777");
            $('#equals').css("border-color","#888");
            console.log('enter');
            break;
        case (e.which == 106):
            $('#multiply').css("background-color","#777");
            $('#multiply').css("border-color","#888");
            console.log('multiply');
            break;
        case (e.which == 107):
            $('#add').css("background-color","#777");
            $('#add').css("border-color","#888");
            console.log('add');
            break;
        case (e.which == 109 || e.which == 189): 
            $('#subtract').css("background-color","#777");
            $('#subtract').css("border-color","#888");
            console.log('subtract');
            break;
        case (e.which == 190 || e.which == 110):
            $('#decimal').css("background-color","#777");
            $('#decimal').css("border-color","#888");
            console.log('decimal');
            break;
        case (e.which == 191 || e.which == 111):
            $('#divide').css("background-color","#777");
            $('#divide').css("border-color","#888");
            console.log('divide');
            break;
        case (e.which == 48 || e.which == 96):
            $('#zero').css("background-color","#777");
            $('#zero').css("border-color","#888");
            console.log('zero');
            break;
        case (e.which == 49 || e.which == 97):
            $('#one').css("background-color","#777");
            $('#one').css("border-color","#888");
            console.log('one');
            break;
        case (e.which == 50 || e.which == 98):
            $('#two').css("background-color","#777");
            $('#two').css("border-color","#888");
            console.log('two');
            break;
        case (e.which == 51 || e.which == 99):
            $('#three').css("background-color","#777");
            $('#three').css("border-color","#888");
            console.log('three');
            break;
        case (e.which == 52 || e.which == 100):
            $('#four').css("background-color","#777");
            $('#four').css("border-color","#888");
            console.log('four');
            break;
        case (e.which == 53 || e.which == 101):
            $('#five').css("background-color","#777");
            $('#five').css("border-color","#888");
            console.log('five');
            break;
        case (e.which == 54 || e.which == 102):
            $('#six').css("background-color","#777");
            $('#six').css("border-color","#888");
            console.log('six');
            break;
        case (e.which == 55 || e.which == 103):
            $('#seven').css("background-color","#777");
            $('#seven').css("border-color","#888");
            console.log('seven');
            break;
        case (e.which == 56 || e.which == 104):
            $('#eight').css("background-color","#777");
            $('#eight').css("border-color","#888");
            console.log('eight');
            break;
        case (e.which == 57 || e.which == 105):
            $('#nine').css("background-color","#777");
            $('#nine').css("border-color","#888");
            console.log('nine');
            break;
        default:
            console.log(e.which);
            break;
    }
});

$('body').keyup(function(e){
    switch (true){
        case (e.which == 13 || e.which == 187):
            $('#equals').css("background-color","#555");
            $('#equals').css("border-color","#000");
            console.log('enter');
            break;
        case (e.which == 106):
            $('#multiply').css("background-color","#555");
            $('#multiply').css("border-color","#000");
            console.log('multiply');
            break;
        case (e.which == 107):
            $('#add').css("background-color","#555");
            $('#add').css("border-color","#000");
            console.log('add');
            break;
        case (e.which == 109 || e.which == 189): 
            $('#subtract').css("background-color","#555");
            $('#subtract').css("border-color","#000");
            console.log('subtract');
            break;
        case (e.which == 190 || e.which == 110):
            $('#decimal').css("background-color","#555");
            $('#decimal').css("border-color","#000");
            console.log('decimal');
            main.methods.build_str(".");
            break;
        case (e.which == 191 || e.which == 111):
            $('#divide').css("background-color","#555");
            $('#divide').css("border-color","#000");
            console.log('divide');
            break;
        case (e.which == 48 || e.which == 96):
            $('#zero').css("background-color","#555");
            $('#zero').css("border-color","#000");
            console.log('zero');
            main.methods.build_str(0);
            break;
        case (e.which == 49 || e.which == 97):
            $('#one').css("background-color","#555");
            $('#one').css("border-color","#000");
            console.log('one');
            main.methods.build_str(1);
            break;
        case (e.which == 50 || e.which == 98):
            $('#two').css("background-color","#555");
            $('#two').css("border-color","#000");
            console.log('two');
            main.methods.build_str(2);
            break;
        case (e.which == 51 || e.which == 99):
            $('#three').css("background-color","#555");
            $('#three').css("border-color","#000");
            console.log('three');
            main.methods.build_str(3);
            break;
        case (e.which == 52 || e.which == 100):
            $('#four').css("background-color","#555");
            $('#four').css("border-color","#000");
            console.log('four');
            main.methods.build_str(4);
            break;
        case (e.which == 53 || e.which == 101):
            $('#five').css("background-color","#555");
            $('#five').css("border-color","#000");
            console.log('five');
            main.methods.build_str(5);
            break;
        case (e.which == 54 || e.which == 102):
            $('#six').css("background-color","#555");
            $('#six').css("border-color","#000");
            console.log('six');
            main.methods.build_str(6);
            break;
        case (e.which == 55 || e.which == 103):
            $('#seven').css("background-color","#555");
            $('#seven').css("border-color","#000");
            console.log('seven');
            main.methods.build_str(7);
            break;
        case (e.which == 56 || e.which == 104):
            $('#eight').css("background-color","#555");
            $('#eight').css("border-color","#000");
            console.log('eight');
            main.methods.build_str(8);
            break;
        case (e.which == 57 || e.which == 105):
            $('#nine').css("background-color","#555");
            $('#nine').css("border-color","#000");
            console.log('nine');
            main.methods.build_str(9);
            break;
        default:
            console.log(e.which);
            break;
    }
});

$('.button').mousedown(function(){
    $(this).css("background-color","#777");
    $(this).css("border-color","#888");
});

$('.button').mouseup(function(){
    $(this).css("background-color","#555");
    $(this).css("border-color","#000");
});