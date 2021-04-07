class egpObject {

  constructor(Index) {

    this.index = Index;
    this.type = "carre";
    this.x = 512 / 2;
    this.y = 512 / 2;
    this.sizex = 512 / 2;
    this.sizey = 512 / 2;
    this.color = "#428df5";
    this.angle = 0;
    this.text = "Nouveau texte";
    this.events = "";
    this.selected = false;

  }

  render() {

    push();
    
    if(this.selected){
      stroke(random(255), random(255), random(255));
      strokeWeight(3);
    }
    else
    {
      noStroke();
    }
    

    translate(this.x, this.y);
    rotate(PI / 180 * this.angle);
    
    fill(this.color);

    if(this.type == "carre") {

      rectMode(CENTER);
      rect(0, 0, this.sizex, this.sizey);

    }
    else if(this.type == "cercle"){
      
      ellipseMode(CENTER);
      ellipse(0, 0, this.sizex * 2, this.sizey * 2);
      
    }
    else if(this.type == "texte"){
      
      textSize(parseInt(this.sizex));
      textAlign(CENTER, CENTER);
      text(this.text, 0, 0);
      
    }
    
    pop();

  }

  generateE2Event(){
    
    let f = "";
    
    if(this.event == "print"){
      
      alert("Currently not supported")
      
    }
    
    return f;
    
  }
  
  generateE2Line() {

    let f = "";

    if (this.type == "carre") {

      f += '"box'+ this.index +'" = table("box", '+ this.x +', '+ this.y +', '+ this.sizex +', '+ this.sizey +', '+ red(this.color) +', '+ green(this.color) +', '+ blue(this.color) +', '+ this.angle +'), ';

    }
    else if (this.type == "cercle") {

      f += '"circle'+ this.index +'" = table("circle", '+ this.x +', '+ this.y +', '+ this.sizex +', '+ this.sizey +', '+ red(this.color) +', '+ green(this.color) +', '+ blue(this.color) +', '+ this.angle +'), ';

    }
    else if(this.type == "texte"){
      f += '"text'+ this.index +'" = table("text", '+ this.text +', '+ this.x +', '+ this.y +', '+ this.sizex +', '+ red(this.color) +', '+ green(this.color) +', '+ blue(this.color) +', '+ this.angle +'), ';
      
      }

    return f;

  }
}