var best_trees = [];
var new_trees = [];
var text_out;
var noiseCounter;
var eval_button;
var regen_button;
var breed_button;
var pop_size = 3; //actually half the pop size, as it must be even
function setup() {
    canvas = createCanvas(800,600);
    eval_button = createButton("Evaluate");
    eval_button.mousePressed(evaluate);
    eval_button.attribute('id','eval');
    regen_button = createButton("New tree/Next tree");
    regen_button.mousePressed(regenerate);
    regen_button.attribute('id','regen');
    breed_button = createButton("Breed best trees");
    breed_button.mousePressed(repop);
    breed_button.attribute('id','breed');
    $( "#breed" ).prop("disabled",true);
    tree = new Tree();
    text_out = createP("");
    tree.grow();
    translate(width/2,height);
    noiseCounter = random(0,1000);
}

function draw() {
    background(255);
    noiseCounter += 0.01;
    tree.show(noiseCounter);
    if(best_trees.length >= pop_size*2){
        $( "#breed" ).prop("disabled",false);
    }
}

function evaluate(){
    var score = tree.evaluate();
    var scores = best_trees.map(a => {return a.energy});
    if(best_trees.length < pop_size*2 && score > 0 && best_trees.indexOf(tree) == -1){
        best_trees.push(tree);
        text_out.html("This tree was added to best_trees, with a score of " + String(floor(score)));
    } else if (best_trees.length >= pop_size*2) {
        text_out.html("Warning: best_trees array is already full! \nNo more trees will be added.");
    } else {
         text_out.html("This tree sucks, or has already been added to best_trees");
    }
}

function regenerate(){
    if(new_trees.length > 0){
        tree = new_trees.pop();
        tree.grow();
    } else {
        tree = new Tree();
        tree.grow();
    }
    
}

function repop(){
    breed_button.attribute('disabled','true');
    var pairs = [];
    best_trees = shuffle(best_trees);
    for(var i = 0; i < pop_size; i++){
        var next_gen = breed(best_trees[i],best_trees[i+pop_size]);
        new_trees = concat(new_trees,next_gen);
    }
    trees = new_trees;
    best_trees = [];
}

function breed(a,b){
    var news = [new Tree(),new Tree()];
    var rand = [];
    var mutate = [];
    for(var i = 0; i < 5; i++){
        rand.push(floor(random(2)));
        if(random(1) > 0.95){
            mutate.push(random(2)-1);
        } else {
            mutate.push(0);
        }
         mutate.push(0);
    }
    news[rand[0]%2].L = a.L + floor(mutate[0]*80);
    news[(rand[0]+1)%2].L = b.L + floor(mutate[1]*80);
    news[rand[1]%2].a = a.a + mutate[2]*0.1;
    news[(rand[1]+1)%2].a = b.a + mutate[3]*0.1;
    news[rand[2]%2].pR = a.pR + mutate[4]*0.1;
    news[(rand[2]+1)%2].pR = b.pR + mutate[5]*0.1;
    news[rand[3]%2].lR = a.lR + mutate[6]*0.1;
    news[(rand[3]+1)%2].lR = b.lR + mutate[7]*0.1;
    news[rand[4]%2].D = a.D + floor(mutate[8]*3);
    news[(rand[4]+1)%2].D = b.D + floor(mutate[9]*3);
    var n = 0;
    for(var i = 0; i < 6; i++){
        news[n%2].q[i] = a.q[i];
        news[(n+1)%2].q[i] = b.q[i];
        if(random()>0.6){
            n++;
        }
    }
    return news;
}






