

import React from 'react';
import Cell from './Cell'
import Div from './Div'
const Row = ({row})=>{
    return (
    <Div>{row.split('').map(cell=><Cell cell={cell}/>)}</Div>
    );
}
export default Row; 

