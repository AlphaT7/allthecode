var selectedRow = [];

//Create Gender
var genderEditor = function(cell, onRendered, success, cancel){
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass the succesfully updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell

    //create and style editor
    var editor = $("<select><option value=''></option><option value='male'>male</option><option value='female'>female</option></select>");
    editor.css({
        "padding":"3px",
        "width":"100%",
        "box-sizing":"border-box",
    });

    //Set value of editor to the current value of the cell
    editor.val(cell.getValue());

    //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
    onRendered(function(){
      editor.focus();
      editor.css("height","100%");
    });

    //when the value has been set, trigger the cell to update
    editor.on("change blur", function(e){
        success(editor.val());
    });

    //return the editor element
    return editor;
};

//Build Tabulator
$("#example-table").tabulator({
    height:"100%",
    selectable:true, //make rows selectable
    layout:"fitColumns",
    columns:[
        {title:"Id", field:"_id"},
	    {title:"First Name", field:"fname", align: "left", sorter:"string", editor: "input"},
	    {title:"Last Name", field:"lname", align:"left", sorter:"string", editor: "input"},
	    {title:"Address", field:"address", align:"left", sorter:"string", editor: "input"},
        {title:"City", field:"city", align:"left", sorter:"string", editor: "input"},
        {title:"State", field:"state", align:"left", sorter:"string", editor: "input"},
        {title:"Zip", field:"zip", align:"left", sorter:"number", editor: "input"},
        {title:"Email", field:"email", align:"left", sorter:"string", editor: "input"},
        {title:"Phone", field:"phone", align:"left", sorter:"string", editor: "input"},
    ],
    rowSelectionChanged:function(data, rows){
        //update selected row counter on selection change
        $("#select-stats span").text(data.length);
        console.log(data.length +' text');
        //selectedRow.push(data[0].id);
        //console.log(selectedRow);
    },
});

//select row on "select" button click
$("#select-row").click(function(){
    $("#example-table").tabulator("selectRow", 1);
});

//deselect row on "deselect" button click
$("#deselect-row").click(function(){
    $("#example-table").tabulator("deselectRow", 1);
});

//select row on "select all" button click
$("#select-all").click(function(){
    $("#example-table").tabulator("selectRow");
});

//deselect row on "deselect all" button click
$("#deselect-all").click(function(){
    $("#example-table").tabulator("deselectRow");
});

//Add row on "Add Row" button click
$("#add-row").click(function(){
    $("#example-table").tabulator("addRow", {});
});

//Delete row on "Delete Row" button click
$("#del-row").click(function(){
    $("#example-table").tabulator("deleteRow", 1);
});

//Clear table on "Empty the table" button click
$("#clear").click(function(){
    $("#example-table").tabulator("clearData");
});

//Reset table contents on "Reset the table" button click
$("#reset").click(function(){
    $("#example-table").tabulator("setData", tabledata);
});

//define some sample data
var tabledata = [
/*    
    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
*/
];

$.get( "request", function( data ) {
    console.log(data)
    tabledata = data;
    $("#example-table").tabulator("setData", tabledata);    
});