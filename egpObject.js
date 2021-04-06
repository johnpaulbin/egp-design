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
      
      f += 'if((changed(Egp_use) & Egp_use == 1) && Egp:button(' + this.index + ', Egp_cursor)){ print("click") }';
      
    }
    
    return f;
    
  }
  
  generateE2Line() {

    let f = "";

    if (this.type == "carre") {

      f += 'Egp:egpBox(' + this.index + ', vec2(' + this.x + ', ' + this.y + '), vec2(' + this.sizex + ', ' + this.sizey + ')) ';

    }
    else if (this.type == "cercle") {

      f += 'Egp:egpCircle(' + this.index + ', vec2(' + this.x + ', ' + this.y + '), vec2(' + this.sizex + ', ' + this.sizey + ')) ';

    }
    else if(this.type == "texte"){
      f += 'Egp:egpText(' + this.index + ', "' + this.text + '", vec2(' + this.x + ', ' + this.y + ')) ';
      f += 'Egp:egpSize(' + this.index + ', ' + this.sizex + ') ';
      f += 'Egp:egpAlign(' + this.index + ', 1, 1) ';
      
    }


    f += 'Egp:egpColor(' + this.index + ', vec4(' + red(this.color) + ', ' + green(this.color) + ', ' + blue(this.color) + ', 255)) ';
    f += 'Egp:egpAngle(' + this.index + ', -' + this.angle + ')';

    return f;

  }
}