import React, { useState } from 'react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import './LoginForm.scss';

interface LoginFormProps {
    onSubmit: (data: any) => void; // Replace 'any' with a specific type for login data
    onSignUpClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onSignUpClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add validation logic here
        onSubmit({ email, password });
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
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
            <Button text="Sign In" type="primary" onClick={() => { /* Submit logic is in form onSubmit */ }} />
            <div className="link-container">
                <a href="#" onClick={onSignUpClick}>Sign Up an account</a>
            </div>
        </form>
    );
};

export default LoginForm;
