import { useState } from 'react';
import './tic-tac.css';
export default function Tictac() {
    const GRID_SIZE = 3;
    const cell = {
        value: '',
        className : ''
    }
    const newGridArray = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () =>{
        return Object.assign({},cell)
    }));
    const [gridArray, setGridArray] = useState(newGridArray);
    const [clickCounter, setClickCounter] = useState(1);
    const [dialogData, setDialogData] = useState({
        msg: '',
        type: '',
        className: ''
    });
    const [isFinish, setIsFinish] = useState(false);
    const [player, setPlayer] = useState('Player 1');
    const custAlert = (msg, flag = true) => {
        setDialogData({
            msg: msg,
            type: flag,
            className: 'alert success',
        });
    }
    const everyFnCall = (e,row,col) => e.value && e.value === gridArray[row][col].value;
    const handleClick = (e) => {
        const index = e.target.getAttribute('data-index');
        const gridIndex = e.target.getAttribute('data-grid');
        const rowIndex = e.target.getAttribute('data-row');
        if (gridArray[gridIndex][rowIndex].value || isFinish) return false;
        setClickCounter(clickCounter + 1);
        const isOdd = (clickCounter % 2) ? "X" : "0";
        setPlayer((clickCounter % 2) ? 'Player 1' : 'Player 2' );
        gridArray[gridIndex][rowIndex].value = isOdd;
        setGridArray(gridArray);
        if (clickCounter >= 5) {
            // row check 
            for (const index in gridArray) {
                const  isChecked = gridArray[index].every(e => everyFnCall(e,index,0));
                if (isChecked) {
                    gridArray[index].forEach(row => {
                        row.className = 'textStrike';
                    });
                    setIsFinish(true);
                    console.log('row',{ zero : gridArray[index], index })
                    custAlert('Winner ' + isOdd)
                    return false;
                }
            }
            // col check
            gridArray.forEach((col, cIndex) => {
                const isChecked = gridArray.map((e) => e[cIndex]).every(e => everyFnCall(e,0,cIndex))
                if (isChecked) {
                    gridArray.forEach(row => {
                        row[cIndex].className = 'textStrike';
                    });
                    setIsFinish(true);
                    console.log('col',{ zero : gridArray, cIndex })
                    custAlert('Winner ' + isOdd)
                    return false;
                }
            });
            // cross col check
            let lastCol = gridArray.length - 1;
            const rightToLeft = [];
            const leftToRight = [];
            gridArray.forEach((col, cIndex) => {
                col.forEach((row, rowIndex) => {
                    if (cIndex === rowIndex) {
                        leftToRight.push(gridArray[cIndex][rowIndex])
                    }
                });
                rightToLeft.push(gridArray[cIndex][lastCol--]);
            });
            if (leftToRight.every(e => everyFnCall(e,0,0))) {
                setIsFinish(true);
                leftToRight.forEach(row => {
                    row.className = 'textStrike';
                });
                console.log('left',{ zero : gridArray })
                custAlert('Winner ' + isOdd)
                return false;
            }
            if (rightToLeft.every(e => everyFnCall(e,0,gridArray.length - 1))) {
                setIsFinish(true);
                rightToLeft.forEach(row => {
                    row.className = 'textStrike';
                });
                console.log('right',{ zero : gridArray })
                custAlert('Winner ' + isOdd)
                return false;
            }
        }
        console.log('gridArray', gridArray);
        console.log(`You clicked. [${gridIndex}][${rowIndex}] : ` + index, isOdd);
    }
    const setNewGame = () => {
        setGridArray(newGridArray);
        setIsFinish(false);
        setClickCounter(1);
        custAlert('', false)
    }
    let count = 0;
    return (
        <div className='mTop'>
            {<div className='alert info'>{player}</div>}
            {dialogData.type ?
                <div className={dialogData.className} >
                    <strong>{dialogData.msg}</strong>
                </div>
                :<div></div>}
            <button onClick={setNewGame} className="btnSuccess"> New Game </button>
            <div id="ticTacBoard" >
                {gridArray.map((el, index) => el.map((cl, rowIndex) => {
                    let className = "tCell ";
                    className += gridArray[index][rowIndex].className;
                    className += index === gridArray.length - 1 ? '' : ' borderBottom ';
                    className += rowIndex === 0 ? '' : ' borderLeft';
                    count++;
                    return <div
                        onClick={handleClick}
                        data-index={count}
                        data-grid={index}
                        data-row={rowIndex}
                        key={count}
                        className={className} >
                        {gridArray[index][rowIndex].value}
                    </div>
                }))}
            </div>
        </div>
    )
}
