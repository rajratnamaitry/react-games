import React, { useState } from 'react'
import './memory.css'
export default function Memory() {
  const GRID_SIZE = 12;
  const CURRENT = 'current';
  const DISABLED_CLICK = 'disabledClick';
  const GRID_CELL = 'gridCell';
  const GRID_CELL_FLIP = 'gridCellFlip';
  const CHECK_MARK = '✔';
  const emoji = ["😜", "🙉", "🚃", "🚑", "🍎", "🍙", "🎅", "🎆"];
  const getRandom = (max, memo) => {
    if (max != memo.length) {
      const pos = Math.floor(Math.random() * max);
      if (memo.includes(pos)) {
        return getRandom(max, memo);
      } else {
        return pos;
      }
    }
  }
  const right = [];
  const left = [];
  const range = 6;
  for (let index = 0; index < range; index++) {
    right.push(getRandom(range, right))
    left.push(getRandom(range, left))
  }
  const random = [...left, ...right];
  const newGridArray = Array.from({ length: GRID_SIZE }, (v, k) => {
    let value = emoji[random[k]];
    return {
      value,
      className: DISABLED_CLICK + ' ' + GRID_CELL
    }
  });
  const checkTiles = () => {
    const gridCellFlip = document.querySelectorAll('.' + GRID_CELL_FLIP);
    if (gridCellFlip.length == 2) {
      if (gridCellFlip[0].innerText == gridCellFlip[1].innerText) {
        gridCellFlip[0].innerText = CHECK_MARK;
        gridCellFlip[1].innerText = CHECK_MARK;
        gridCellFlip[0].classList.remove(GRID_CELL_FLIP);
        gridCellFlip[1].classList.remove(GRID_CELL_FLIP);
      }
    }
    const totalCheck = document.querySelectorAll('.disabledClick').length;
    if (totalCheck == GRID_SIZE) {
      setIsWinner(true);
    }
    const flipCellLen = document.querySelectorAll('.' + GRID_CELL_FLIP).length;
    setCellcounter(++cellCounter);
    if (flipCellLen > 2 && cellCounter > 2) {
      setCellcounter(1);
      gridCellFlip.forEach((el) => {
        if (el.innerText != CHECK_MARK && !el.classList.contains(CURRENT)) {
          el.innerText = '';
          el.classList.remove(DISABLED_CLICK);
          el.classList.remove(GRID_CELL_FLIP);
        } else if (!el.classList.contains(DISABLED_CLICK)) {
          el.classList.add(DISABLED_CLICK);
        }
      })
    }
  }
  const setNewGame = () => {
    const boardCell = document.querySelectorAll('.' + GRID_CELL);
    boardCell.forEach(e => {
      e.innerText = '';
      e.classList.remove(DISABLED_CLICK);
    })
  }
  const [isWinner, setIsWinner] = useState(false);
  const [board, setBoard] = useState(newGridArray);
  let [cellCounter, setCellcounter] = useState(0);
  const handleCellClickFn = (e) => {
    const target = e.target;
    if (target.classList.contains(DISABLED_CLICK)) {
      return false;
    }
    target.classList.add(CURRENT);
    target.classList.add(DISABLED_CLICK)
    target.classList.add(GRID_CELL_FLIP)
    setTimeout(() => {
      checkTiles();
      target.classList.remove(CURRENT);
    }, 1000);
    target.innerText = target.getAttribute('data-value');
  }
  return (
    <div>
      {isWinner ? <div className='m20 alert success'>{'Winner'}</div> : ''}
      <div className='displayFlex'>
        <button onClick={setNewGame} className="btnSuccess"> Start Game </button>
        <button onClick={() => window.location.reload()} className="btnSuccess"> New Game </button>
      </div>
      <div id="memoryBoard" className='grid'>
        {board.map((cell, i) => {
          return <div className={cell.className} key={i} onClick={handleCellClickFn} data-value={cell.value}>{cell.value}</div>
        })}
      </div>
    </div>

  )
}
