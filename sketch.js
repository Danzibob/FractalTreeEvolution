var tree;
var noiseCounter;
var eval_button;
var regen_button;
function setup() {
    createCanvas(800,600);
    eval_button = createButton("Evaluate");
    eval_button.mousePressed(evaluate);
    regen_button = createButton("Re-create tree");
    regen_button.mousePressed(regenerate);
    tree = new Tree();
    tree.grow();
    translate(width/2,height);
    noiseCounter = random(0,1000);
}

function draw() {
    background(255);
    noiseCounter += 0.01;
    tree.show(noiseCounter);
}

function evaluate(){
    tree.evaluate();
}

function regenerate(){
    tree = new Tree();
    tree.grow();
}

