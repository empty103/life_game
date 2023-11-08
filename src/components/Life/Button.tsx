import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
    text: ReactNode,
    isDisabled: boolean,
    onClick: () => void,
}

const Button = ({ text, isDisabled, onClick }: ButtonProps) => {
    return (
        <motion.button
            className='life__btn'
            onClick={onClick}
            disabled={isDisabled}
            whileHover={{ scale: 1.05, cursor: 'pointer' }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            {text}
        </motion.button>
    );
}

export default Button;
