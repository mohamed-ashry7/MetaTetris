

import React from 'react';
import './Cell.css';

const Cell = ({cell})=>{
    
    const color = cell===' '?'#FFFFFF':'#FF0000'    
    return (
        <span className = 'cell' style={{
            backgroundColor: color 
    }}/>
    );
}
export default Cell; 