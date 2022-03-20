

class Board{
    constructor(width, height) {
        this.width = width
        this.height = height
        this.board = Array(width).fill().map(() => Array(height).fill(0));
        this.shape = [width,height]
        this.board.shape
    }

    clearedLines()  {
        const arr = []
        for(let j = 0 ; j <this.height ; j++) {
            let flag = true
            for (let i = 0 ; i <this.width; i++) { 
                if (!this.board[i][j]){
                    flag = false
                }
            }
            arr.push(flag)
            
        }
        return arr 
    }
    zerosLike(){
        return Board(this.width,this.height)
    }
    getColumn(c){
        return this.board.map(value=>value[c])
    }

    setColumn(c,newCol){
        for (let i  = 0 ; i <this.width; i ++ ) {
            this.board[i][c] = newCol[i]
        }
    }

    


}

module.exports=Board