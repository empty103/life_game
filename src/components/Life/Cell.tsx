import { useMemo } from 'react';

import { cellColors } from "./const";

interface CellProps {
    alive: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
}

const Cell = ({ alive, onClick, onMouseEnter }: CellProps) => {
    const color = useMemo(() => {
        if (alive) {
            const rndColor = Math.floor(Math.random() * cellColors.length);
            return cellColors[rndColor];
        }
    }, [alive]);

    return (
        <div
            className='cell'
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            style={{
                backgroundColor: color,
                border: `${alive ? '1px solid black' : ''}`
            }}
        >
        </div>
    );
}

export default Cell;