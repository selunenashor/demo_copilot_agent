import React from 'react';
import './Input.scss';

interface InputProps {
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'datetime-local';
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, type = 'text', value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default Input;
