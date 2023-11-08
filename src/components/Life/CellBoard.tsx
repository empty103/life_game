import { motion } from 'framer-motion';
import Cell from "./Cell";

interface CellBoardProps {
    board: boolean[],
    onClick: (index: number) => void,
    onMouseEnter: (index: number) => void,
}

const CellBoard = ({ board, onClick, onMouseEnter }: CellBoardProps) => {
    return (
        <motion.div
            initial={{ x: -1000, opacity: 0 }}
            transition={{ delay: .5 }}
            animate={{ x: 0, opacity: 1 }}
            className="life-board"
        >
            {board.map((cellAlive, index) => (
                <Cell
                    key={index}
                    alive={cellAlive}
                    onClick={() => onClick(index)}
                    onMouseEnter={() => onMouseEnter(index)}
                />
            ))}
        </motion.div>
    );
}
export default CellBoard;