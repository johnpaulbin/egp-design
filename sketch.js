let egpObjects = [];
let selectedEgpObject;
let isSelectedEgpObject;

function generateE2Code(){
  
  let Code = "";

  Code = "@name Generated EGP\n";
  Code += "@inputs [ Egp ]:wirelink\n";
  Code += "@persist [ Egp_use ]:number [ Egp_cursor ]:vector2 [ Egp_user ]:entity\n\n";
  
  Code += "Egp:egpClear()\n\nEgpObjects = table(";

  for (let i = 0; i < egpObjects.length; i++) {
    console.log(egpObjects.length)
    let suffix = ", "
    if (i == egpObjects.length){
      suffix = ""
    }
    Code += "\n    " + egpObjects[i].generateE2Line() + suffix;
    
  }
  
  Code += "\n)\n\n";
  
  Code += "# Thanks to gohidas for help with this!\n\nID_Counter = 0\nforeach(Name:string, Data:table = EgpObjects) {\n    ID_Counter++\n    #ID_Mapping[Name, number] = ID_Counter\n    switch(Data[1,string]) {\n        case \"box\",\n            Egp:egpBox( ID_Counter, vec2(Data[2, number], Data[3, number]), vec2(Data[4, number], Data[5, number]) )\n            Egp:egpColor( ID_Counter, vec4(Data[6, number], Data[7, number], Data[8, number], 255) )\n            Egp:egpAngle( ID_Counter, -Data[9, number] )\n        break\n        \n        case \"circle\",\n            Egp:egpCircle( ID_Counter, vec2(Data[2, number], Data[3, number]), vec2(Data[4, number], Data[5, number]) )\n            Egp:egpColor( ID_Counter, vec4(Data[6, number], Data[7, number], Data[8, number], 255) )\n            Egp:egpAngle( ID_Counter, -Data[9, number] )\n        break   \n        \n        case \"text\",\n            Egp:egpText( ID_Counter, Data[2, string], vec2(Data[3, number], Data[4, number]) )\n            Egp:egpSize( ID_Counter, Data[5, number] )\n            Egp:egpAlign( ID_Counter, 1, 1 )\n            Egp:egpColor( ID_Counter, vec4(Data[6, number], Data[7, number], Data[8, number], 255))\n            Egp:egpAngle( ID_Counter, -Data[9, number] )\n        break\n        \n    }\n\n}";

  
  
  Code += "\n\n}";
  
  for (let i = 0; i < egpObjects.length; i++) {
    
    Code += egpObjects[i].generateE2Event();
    
  }
  
  document.getElementById("output").value = "";
  document.getElementById("output").value += Code;
  print(Code);
  
  
}

function copyCode() {
  /* Get the text field */
  var copyText = document.getElementById("output");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied EGP code!");
}

function setevent(){
  
  if(isSelectedEgpObject){
    
    selectedEgpObject.event = document.getElementById("event").value;
    print(selectedEgpObject.event);
      
  }
  
}

function select_(egpObject){
  
  isSelectedEgpObject = true;
  egpObject.selected = true;
  selectedEgpObject = egpObject;
  
  document.getElementById("slider_pos_x").value = egpObject.x;
  document.getElementById("slider_pos_y").value = egpObject.y;
  
  document.getElementById("slider_size_x").value = egpObject.sizex;
  document.getElementById("slider_size_y").value = egpObject.sizey;
  
  document.getElementById("slider_angle").value = egpObject.angle;
  
  document.getElementById("color_picker").value = egpObject.color;
  
  document.getElementById("input_text").value = egpObject.text;
  
}
function deselect_(){
  
  if(isSelectedEgpObject){
    selectedEgpObject.selected = false;
    isSelectedEgpObject = false;
  }
  
}

function createObject(){
  
  egpObjects.push(new egpObject(egpObjects.length + 1));
  egpObjects[egpObjects.length - 1].type = document.getElementById("object_type").value;
  
  deselect_();
  select_(egpObjects[egpObjects.length - 1]);
  
  document.getElementById("object_selected").options.length = 0;
  
  for (let i = 0; i < egpObjects.length; i++) {
    
    var x = document.getElementById("object_selected");
    var option = document.createElement("option");
    option.text = egpObjects[i].type + i;
    option.value = i;
    x.add(option); 
    
  }

  
}

function newselect(){
  
  deselect_();
  select_(egpObjects[document.getElementById("object_selected").value]);
  
}

function delObject(){
  
  if(isSelectedEgpObject){
    
    for (let i = 0; i < egpObjects.length; i++) {
      
      if(egpObjects[i] == selectedEgpObject){
        egpObjects.splice(i, 1);
      }
      
    }
    
    deselect_();
    document.getElementById("object_selected").options.length = 0;
    
  }
  
}


function setup() {
  
  createCanvas(512, 512);
  
  createButton("Generate EGP Code").mousePressed(generateE2Code);
  
  isSelectedEgpObject = false;
  
}

function draw() {
  
  background(0);
  
  if(isSelectedEgpObject){
    
    selectedEgpObject.x = document.getElementById("slider_pos_x").value;
    selectedEgpObject.y = document.getElementById("slider_pos_y").value;
    
    selectedEgpObject.sizex = document.getElementById("slider_size_x").value;
    selectedEgpObject.sizey = document.getElementById("slider_size_y").value;
    
    selectedEgpObject.angle = document.getElementById("slider_angle").value;
    
    selectedEgpObject.color = document.getElementById("color_picker").value;
    
    selectedEgpObject.text = document.getElementById("input_text").value;
    
  }
  
  for (let i = 0; i < egpObjects.length; i++) {
    
    egpObjects[i].render();
    
  }
  
}