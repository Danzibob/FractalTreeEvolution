var TC = 1.8; //thickness constant

function genQ(n) {
    var q = [];
    for(var i = 0; i < n; i++){
        var r = floor(random(0,2));
        q.push(r);
    }
    return q.slice();
}



function Tree(start_length, angle, pos_ratio, layer_ratio, leaf_diameter, quotients){
    
    this.L = start_length || floor(random(60,120));
    this.n =  6
    this.a = angle || random(0.1,PI / 4);
    this.pR = pos_ratio || random(0.5,1);
    this.lR = layer_ratio || random(0.5,0.0.9);
    this.D = leaf_diameter || floor(random(5,20));
    this.q = quotients || genQ(this.n);
    this.energy;
    this.branches = [];
    this.leaves = [];
    
    this.grow = function() {
        console.log(this.q);
        console.log("Growing...");
        var a = createVector(0, 0);
        var b = createVector(0, -this.L);
        var trunk = new Branch(a,b);
        trunk.thickness = pow(TC,this.n);
        this.branches.push(trunk);
        
        for(var layer = 1; layer < this.n; layer++){
            var o = [this.pR, 1]
            var t = pow(TC,this.n-layer-1)
            
            for(var i=this.branches.length-1; i >= 0; i--){
                if(!this.branches[i].grown){
                    this.branches[i].grown = true;
                    this.branches.push(this.branches[i].branchA(this.a,this.lR,o[this.q[layer]],t));
                    this.branches.push(this.branches[i].branchB(this.a,this.lR,o[(this.q[layer]+1)%2],t));
                }
            }
        }
        for(var i=this.branches.length-1; i >= 0; i--){
            if(this.branches[i].thickness == 1){
                this.leaves[this.leaves.length] = this.branches[i].end;
                this.branches[i].grown = true;
            }
        }
    }
    
    this.show = function(noiseCounter) {
        stroke(80,80,0);
        offset = (noise(noiseCounter)-0.5)*25;
        for(var i=this.branches.length-1; i >= 0; i--){
            strokeWeight(this.branches[i].thickness);
            this.branches[i].show(offset);
        }
        stroke(0,180,0,100);
        strokeWeight(this.D);
        for (var i = 0;i < this.leaves.length; i++) {
            point(this.leaves[i].x+offset,this.leaves[i].y);
        }
    }
    
    this.evaluate = function() {
        var E_used = 0
        for(var i=this.branches.length-1; i >= 0; i--){
            E_used += this.branches[i].thickness*pow(this.branches[i].d/2,2)
        }    
        E_used = E_used/6
        E_used += pow(this.D,2) * this.leaves.length * 1.67;
        
        var E_made = 0;
        this.leaves.sort((a,b) => a.y-b.y);
        var xs = this.leaves.map(a => {return a.x});
        xoff = - floor(min(xs)) +50;
        var light = new Array(floor(max(xs)-min(xs))+100).fill(5);
        for(var i = 0; i < this.leaves.length; i++){
            var x = this.leaves[i].x;
            var tmp = 0;
            for(var j = floor(x-0.5*this.D)+xoff; j <= floor(x+0.5*this.D)+xoff; j++){
                var dl = light[j] * 0.67;
                tmp += dl;
                light[j] -= dl;
            }
            tmp = pow(tmp,2);
            E_made += tmp
        }
        console.log(E_made-E_used);
        createP("Energy surplus: " + String(E_made-E_used));
    }
}


function getX(a){
    return a.x
}



