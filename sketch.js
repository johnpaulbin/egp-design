let egpObjects = [];
let selectedEgpObject;
let isSelectedEgpObject;

function generateE2Code(){
  
  let Code = "@name Generated EGP\n";
  Code += "@inputs [ Egp ]:wirelink\n";
  Code += "@persist [ Egp_use ]:number [ Egp_cursor ]:vector2 [ Egp_user ]:entity\n\n";
  
  Code += "interval(1)\n\n";
  
  Code += "function number wirelink:button(ID:number,Cursor:vector2){ local BPos = This:egpPos(ID) local BSize = This:egpSize(ID)/2 local Pressed = inrange(Cursor,BPos-BSize,BPos+BSize) return Pressed }\n\n";
  
  Code += 'Egp_user = Egp["User", entity]\n';
  Code += 'Egp_cursor = Egp:egpCursor(Egp_user)\n';
  Code += 'Egp_use = Egp_user:keyUse()\n\n';
  
  Code += "if(first() || dupefinished()){ \n\n    Egp:egpClear()\n";

  for (let i = 0; i < egpObjects.length; i++) {
    
    Code += "\n    " + egpObjects[i].generateE2Line();
    
  }
  
  Code += "\n\n}\n\n";
  
  for (let i = 0; i < egpObjects.length; i++) {
    
    Code += egpObjects[i].generateE2Event();
    
  }
  
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
  
  createButton("Générer l'E2").mousePressed(generateE2Code);
  
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