import React, { useState } from 'react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import './RegisterForm.scss';

interface RegisterFormProps {
    onSubmit: (data: any) => void; // Replace 'any' with a specific type for registration data
    onSignInClick: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, onSignInClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add validation logic here
        if (password !== confirmPassword) {
            alert("Passwords don't match!"); // Replace with better error handling
            return;
        }
        onSubmit({ name, email, password });
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <Input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button text="Sign Up" type="primary" onClick={() => { /* Submit logic is in form onSubmit */ }} />
            <div className="link-container">
                Already one? <span onClick={onSignInClick}><a href="#">Sign in</a></span>
            </div>
        </form>
    );
};

export default RegisterForm;
