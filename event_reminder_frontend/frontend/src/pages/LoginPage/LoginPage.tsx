import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm/LoginForm';
import { loginUser } from '@/services/authService';
import './LoginPage.scss';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = async (data: any) => {
        // Basic validation
        if (!data.email || !data.password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const response = await loginUser(data);
            const { access_token } = response.data;
            localStorage.setItem('accessToken', access_token); // Store token
            // Optionally store user info if needed elsewhere
            // localStorage.setItem('user', JSON.stringify(response.data.user));
            alert('Login successful!');
            navigate('/'); // Navigate to dashboard on success
        } catch (error: any) {
            console.error('Login failed:', error);
            if (error.response && error.response.status === 401) {
                alert('Invalid credentials. Please try again.');
            } else if (error.response && error.response.data && error.response.data.errors) {
                const errors = Object.values(error.response.data.errors).flat().join('\n');
                alert(`Login failed:\n${errors}`);
            } else {
                alert('Login failed. Please try again.');
            }
        }
    };

    const handleSignUpClick = () => {
        navigate('/register'); // Navigate to register page
    };

    return (
        <div className="login-page">
            <div className="form-container">
                <LoginForm onSubmit={handleLogin} onSignUpClick={handleSignUpClick} />
            </div>
        </div>
    );
};

export default LoginPage;
