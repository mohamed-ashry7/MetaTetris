

import engine from './utils/tetris_engine_utils'
import Board from './Board'

const prompt = require('prompt-sync')({sigint: true});


class MetaTris { 


    constructor(width=10,height=20){
        
        this.board = Board(width,height)
        this.anchor = null
        this.shape = null 
        this.tetrominos = 0 
        this.score = 0 
        this.valueActionMap={
            0: engine.left,
            1: engine.right,
            2: engine.hardDrop,
            3: engine.softDrop,
            4: engine.rotateLeft,
            5: engine.rotateRight,
            6: engine.idle,            
        }
        
        
    }
    newPiece() {
        this.tetrominos+=1 
        this.anchor = [Math.floor(this.board.width/2),0 ]
        this.shape = engine.randomShape()
        [this.shape,this.anchor] = engine.softDrop(this.shape,this.anchor,this.board)

    }
    hasDropped(){
        return engine.isOccupied(this.shape,[this.anchor[0],this.anchor[1]+1],this.board)
        
    }

    clearLines(){
        const clearedLines = board.clearedLines()
        const newBoard = this.board.zerosLike()
        let j = this.board.height
        for (let i = j; i>=0 ; i--){
            if (!clearedLines[i]){
                newBoard.setColumn(j,board.getColumn(i))
                j--; 
            }
        }

        this.board = newBoard
        this.score+= clearedLines.reduce((a,b)=>a+b)
    }

    execAction(action){
        [this.shape,this.anchor] = this.valueActionMap[action](this.shape,this.anchor,this.board)
        [this.shape,this.anchor] = this.valueActionMap[3](this.shape,this.anchor,this.board)

    }

    run(){
        let done = false
        while (!done ){
            let action = parseInt(prompt("Enter the action: \n"))
            this.execAction(action)
            
        }
    }







}