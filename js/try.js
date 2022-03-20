



// const a  = [[1,3]
//             ,[4,6],
//             [7,8]]

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

const f = (va) =>"Hello World"+va
const ff = (va) =>"Hello World!!"+va

const ma = {
    0:f,
    1:ff
}

console.log(ma[0]("Joker"))


