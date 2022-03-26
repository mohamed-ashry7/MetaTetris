

import React from 'react'; 
import Row from './Row';
import './MetaTrisBoard.css'
const MetaTrisBoard = ({mBoard})=>{

    const width = mBoard[0].length;
    const height = mBoard.length;
    const style = {
        gridTemplateColumns: `repeat( ${width}, 50px)`,
        gridTemplateRows: `repeat(${height}, 50px)`
    }
    return (
        
        <div className='mboard' style = {style} >
        {mBoard.map(row=><Row row={row}/>)}
        </div>
    )
}


export default MetaTrisBoard;