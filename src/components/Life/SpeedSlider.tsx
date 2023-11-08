import { ChangeEvent } from "react";

interface SpeedSliderProps {
    value: number,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const SpeedSlider = ({ value, onChange }: SpeedSliderProps) => {
    return (
        <div className="life__speed">
            <input
                type="range"
                min="100"
                max="1000"
                step="10"
                value={value}
                onChange={onChange}
                className='life__speed'
            />

            <div className='life__speed-value'>
                Значение: {value}
            </div>
        </div>
    );
}

export default SpeedSlider;