import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

import { countAliveNeighbors, getAliveCells, getRowAndColumn } from '../utils';
import { COLUMNS, FIELD, infoLink } from './const';
import SpeedSlider from './SpeedSlider';
import CellBoard from './CellBoard';
import Button from './Button';

import './life.scss';

const Life = () => {
    const [board, setBoard] = useState<boolean[]>(Array.from({ length: FIELD }, () => false));
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [speedUpdateCell, setSpeedUpdateCell] = useState<number>(500);

    useEffect(() => {
        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleReviveCell = (index: number): void => {
        if (!isRunning) {
            const newBoard = [...board];
            newBoard[index] = !newBoard[index];
            setBoard(newBoard);
        }
    }

    const handleCellInteraction = (index: number): void => {
        if (isMouseDown) {
            handleReviveCell(index);
        }
    }

    const updateCellStatus = (board: boolean[]): boolean[] => {
        return board.map((alive: boolean, index) => {
            const { row, col } = getRowAndColumn(index, COLUMNS)

            const neighbors: boolean[] = [
                board[(row - 1) * COLUMNS + col - 1],
                board[(row - 1) * COLUMNS + col],
                board[(row - 1) * COLUMNS + col + 1],
                board[row * COLUMNS + col - 1],
                board[row * COLUMNS + col + 1],
                board[(row + 1) * COLUMNS + col - 1],
                board[(row + 1) * COLUMNS + col],
                board[(row + 1) * COLUMNS + col + 1],
            ];

            const aliveNeighbors = countAliveNeighbors(neighbors);
            return getAliveCells(alive, aliveNeighbors);
        });
    }

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setBoard((prevBoard) => updateCellStatus(prevBoard));
            }, speedUpdateCell);

            return () => clearInterval(interval);
        }
    }, [isRunning]);

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue: number = parseInt(event.target.value);
        setSpeedUpdateCell(newValue);
    }

    const startGame = (): void => setIsRunning(true);
    const stopGame = (): void => setIsRunning(false);
    const clearGame = (): void => setBoard(Array.from({ length: FIELD }, () => false));
    const fillBoard = (): void => {
        const newBoard = Array.from({ length: FIELD }, () => Math.random() < 0.2);
        setBoard(newBoard);
    }

    return (
        <div className='container'>
            <CellBoard
                board={board}
                onClick={handleReviveCell}
                onMouseEnter={handleCellInteraction}
            />

            <motion.div
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: .5 }}
                className="settings"
            >
                {!isRunning ?
                    <>
                        <Button text='начать' isDisabled={isRunning} onClick={startGame} />
                        <Button text='очистить' isDisabled={isRunning} onClick={clearGame} />
                        <Button text='заполнить' isDisabled={isRunning} onClick={fillBoard} />
                        <SpeedSlider value={speedUpdateCell} onChange={handleSpeedChange} />

                    </>
                    :
                    <Button text='остановить' isDisabled={!isRunning} onClick={stopGame} />
                }


                <motion.a
                    className='info__link'
                    target='_blank' href={infoLink}
                    whileHover={{ scale: 1.05, cursor: 'pointer' }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    информация
                </motion.a>
            </motion.div>
        </div>
    );
}

export default Life;