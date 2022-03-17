

import engine from './utils/tetris_engine_utils'
class MetaTris { 


    constructor(width=10,height=20){
        this.width = width
        this.height=height
        this.anchor = null
        this.shape = null 
        this.tetrominos = 0 

        
    }
    newPiece() {
        this.tetrominos+=1 
        this.anchor = [Math.floor(this.width/2),0 ]
        this.shape = engine.randomShape()
        // TODO board and the rest of the code 

    }


}