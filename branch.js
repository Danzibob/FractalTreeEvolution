function Branch(begin, end) {
    this.begin = begin;
    this.end = end;
    this.d = dist(begin.x,begin.y,end.x,end.y);
    this.grown = false;
    this.thickness;
    
    this.show = function(offest) {
        offset_end = offset*pow(this.thickness,-1.2);
        offset_begin = offset*pow(this.thickness*TC,-1.2);
        line(this.begin.x+offset_begin,this.begin.y,this.end.x+offset_end,this.end.y);
    }
    
    this.branchA = function(a,l,r,t) {
        var dir = p5.Vector.sub(this.end, this.begin);
        new_dir = dir.copy();
        new_dir.rotate(a*r);
        new_dir.mult(l);
        dir.mult(r);
        newStart = p5.Vector.add(this.begin,dir);
        var newEnd = p5.Vector.add(newStart,new_dir);
        var right = new Branch(newStart, newEnd);
        right.thickness = t;
        return right;
    }
    
    this.branchB = function(a,l,r,t) {
        var dir = p5.Vector.sub(this.end, this.begin);
        new_dir = dir.copy();
        new_dir.rotate(-a*r);
        new_dir.mult(l);
        dir.mult(r);
        newStart = p5.Vector.add(this.begin,dir);
        var newEnd = p5.Vector.add(newStart,new_dir);
        var left = new Branch(newStart, newEnd);
        left.thickness = t;
        return left;
    }
}