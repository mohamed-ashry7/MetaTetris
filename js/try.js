// const b = [true,false ,true ,false ]
// const c = b.reduce((a,b)=> a +b)
// console.log(c)
// const getCol = (c) => a.map(value=>value[c])
// console.log(getCol(0))
// for(let j = 0 ; j <a[0].length ; j++) {
//     for (let i = 0 ; i <a.length ; i++) {
//         console.log(a[i][j])
//     }
//     console.log()
// }

// const a = [1,2,3]
// a.map((value,index)=>value+1)
// console.log(a)

// const f = (va) =>"Hello World"+va
// const ff = (va) =>"Hello World!!"+va

// const ma = {
//     0:f,
//     1:ff
// }

// console.log(ma[0]("Joker"))

// const array = [
//   [1, 3],
//   [4, 6],
//   [7, 8],
// ];


// console.log(output);
const array = Array(10).fill().map(() => Array(20).fill(0))
const output = array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
const line = "o"+Array(10).fill("-").join("")+"o"
console.log(line)
output.forEach(row=>console.log("|"+row.map(val=>val==0?" ":"X").join("")+"|"))
console.log(line)

// for (let i = 0; i < 20 ;i++){
//     a.map()
// }
