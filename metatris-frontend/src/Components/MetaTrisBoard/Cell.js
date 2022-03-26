

import React from 'react';
import './Cell.css';

const Cell = ({cell})=>{
    
    const colors = {
        P:"#BE04FF",
        B:"#4104FF",
        O:"#FFA500",
        R:"#FF2604",
        G:"#20D100",
        C:"#04C2FF",
        Y:"#FFFB04",
        " ":"#FFFFFF"
    }   ;
    const color = colors[cell]||"#A0A0A0";
    return (
        <span className = 'cell' style={{
            backgroundColor: color 
    }}/>
    );
}
export default Cell; 