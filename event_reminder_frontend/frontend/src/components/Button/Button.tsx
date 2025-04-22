import React from 'react';
import './Button.scss';

interface ButtonProps {
    text: string;
    type?: 'primary' | 'edit' | 'delete';
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, type = 'primary', onClick }) => {
    return (
        <button className={`button ${type}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
