

shapes = {
    'T': [[0, 0], [-1, 0], [1, 0], [0, -1]],
    'J': [[0, 0], [-1, 0], [0, -1], [0, -2]],
    'L': [[0, 0], [1, 0], [0, -1], [0, -2]],
    'Z': [[0, 0], [-1, 0], [0, -1], [1, -1]],
    'S': [[0, 0], [-1, -1], [0, -1], [1, 0]],
    'I': [[0, 0], [0, -1], [0, -2], [0, -3]],
    'O': [[0, 0], [0, -1], [-1, 0], [-1, -1]],
}
shape_names = ['T', 'J', 'L', 'Z', 'S', 'I', 'O']



const randomShape = ()=>{
    const shape = shape_names[Math.floor(Math.random()*shape_names.length)];
    return shapes[shape]
} ; 
const rotated = (shape, cclk=False )=>{
    if(cclk){
        return shape.map(([i,j]) =>{
            return [-j,i]
        }) ; 
    }
    else {
        return shape.map(([i,j]) =>{
            return [j,-i]
        }) ; 
    }
};


 const isOccupied = (shape,anchor,board)=>{

    for(const [i,j] of shape){
        const [x,y] = [anchor[0]+i,anchor[1]+j]
        if(y<0){
            continue
        }
        if (x<0 || x>= board.shape[0] || y>= board.shape[1] || board[x][y]){
            return true
        }

    }
    return false 

};


 const left = (shape,anchor, board)=>{
    const newAnchor = [anchor[0]-1,anchor[1]]
    return isOccupied(shape,newAnchor,board)?[shape,anchor]:[shape,newAnchor]
};



 const right = (shape,anchor, board)=>{
    const newAnchor = [anchor[0]+1,anchor[1]]
    return isOccupied(shape,newAnchor,board)?[shape,anchor]:[shape,newAnchor]
};


 const softDrop =(shape,anchor, board)=>{
    const newAnchor = [anchor[0],anchor[1]+1]
    return isOccupied(shape,newAnchor,board)?[shape,anchor]:[shape,newAnchor]
};

 const hardDrop = (shape,anchor,board)=>{
    while (true){
        [_,newAnchor] = softDrop(shape,anchor,board)
        if(JSON.stringify(newAnchor)==JSON.stringify(anchor)){
            return [shape,newAnchor]
        }
        anchor=newAnchor
    }
}; 



 const rotateLeft = (shape,anchor,board)=>{
    const newShape = rotated(shape,false)
    return isOccupied(newShape,anchor,board)?[shape,anchor]:[newShape,anchor]
};

 const rotateRight = (shape,anchor,board)=>{
    const newShape = rotated(shape,true)
    return isOccupied(newShape,anchor,board)?[shape,anchor]:[newShape,anchor]
};


 const idle = (shape,anchor , board )=>{
    return [shape,anchor]
};


module.exports= {
    isOccupied,randomShape,rotated,rotateLeft,rotateRight,left,right,softDrop,hardDrop,idle
}