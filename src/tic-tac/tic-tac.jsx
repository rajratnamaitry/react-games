import { useState } from 'react';
import './tic-tac.css';

export default function Tictac () {
    const GRID_SIZE = 3; 
    const [gridArray,setGridArray] = useState(Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => '')));
    const [clickCounter,setClickCounter] = useState(1);
    const [isFinish,setIsFinish] = useState(false);

    const handleClick = (e) => {
        const index = e.target.getAttribute('data-index');
        const gridIndex = e.target.getAttribute('data-grid');
        const rowIndex = e.target.getAttribute('data-row');
        if(gridArray[gridIndex][rowIndex] || isFinish) return false;
        setClickCounter(clickCounter+1);
        const isOdd = (clickCounter % 2) ? "X":"0";
        gridArray[gridIndex][rowIndex] = isOdd; 
        setGridArray(gridArray);
        if(clickCounter >= 5 ){
        // row check 
        for (const index in gridArray) { 
            if(gridArray[index].every(e => e && e === gridArray[index][0])) {
            alert('Winner [row] ' +  isOdd )
            setIsFinish(true);
            return false;
            }
        }
        // col check
        gridArray.forEach((col,cIndex)=>{
            const isChecked = gridArray.map((e) =>e[cIndex]).every(c => c && c === gridArray[0][cIndex])
            if(isChecked) {
            alert('Winner [col] ' +  isOdd )
            setIsFinish(true);
            return false;
            }
        });
        // cross col check
        let lastCol = gridArray.length - 1;
        const rightToLeft = [];
        const leftToRight = [];
        gridArray.forEach((col,cIndex)=>{
            col.forEach((row, rowIndex)=>{
                if(cIndex === rowIndex){
                leftToRight.push(gridArray[cIndex][rowIndex]) 
                }
            });
            rightToLeft.push(gridArray[cIndex][lastCol--]);
        });
        if(leftToRight.every(c => c && c === gridArray[0][0])){
            alert('Winner [left to right] ' +  isOdd )
            setIsFinish(true);
            return false;
        }
        if(rightToLeft.every(c => c && c === gridArray[0][gridArray.length -1 ])){
            alert('Winner [right to left] ' +  isOdd )
            setIsFinish(true);
            return false;
        }
        }
        console.log('gridArray',gridArray);
        console.log(`You clicked. [${gridIndex}][${rowIndex}] : `  + index, isOdd);
    }
    const setNewGame = () =>{
        const newArray = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => ''))
        setGridArray(newArray);
    }
    let count  = 0;
    return (
        <div>
            <button onClick={setNewGame}> new game </button>
            <div id="ticTacBoard" >
            {gridArray.map((el,index)=> el.map((cl,rowIndex)=>{
                let className = "cell ";
                className += index === gridArray.length -1 ? '' : 'borderBottom ';
                className += rowIndex === 0 ? '' : 'borderLeft';
                count++;
                return <div 
                onClick={handleClick} 
                data-index={count} 
                data-grid={index} 
                data-row={rowIndex} 
                key={count} 
                className={className} > 
                { gridArray[index][rowIndex] }
                </div>
            }))}
            </div>
        </div>
    )
}
