class MinHeap{
constructor(){
    this.heap=[];
}
size(){
    return this.heap.length;
}
peek(){
    return this.heap[0];
}
insert(item){
    this.heap.push(item);
    let i=this.heap.length-1;
    while(i>0){
        let p=Math.floor((i-1)/2);
        if(this.heap[p].priority<=this.heap[i].priority)
            break;
        [this.heap[p],this.heap[i]]=[this.heap[i],this.heap[p]];
        i=p;
    }
}
removeMin(){
    if(this.heap.length<=1) return this.heap.pop();
    let min=this.heap[0];
    this.heap[0]=this.heap.pop();
    let i=0;
    while(true){
        let l=2*i+1,r=2*i+2,s=i;
        if(l<this.heap.length&&this.heap[l].priority<this.heap[s].priority) s=l;
        if(r<this.heap.length&&this.heap[r].priority<this.heap[s].priority) s=r;
        if(s===i) break;
        [this.heap[i],this.heap[s]]=[this.heap[s],this.heap[i]];
        i=s;
    }
    return min;
}
}
module.exports=MinHeap;