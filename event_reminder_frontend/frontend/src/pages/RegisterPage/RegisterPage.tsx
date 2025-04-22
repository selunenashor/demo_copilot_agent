import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import { registerUser } from '@/services/authService';
import './RegisterPage.scss';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRegister = async (data: any) => {
        // Basic validation (should be more robust in a real app)
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (!data.name || !data.email || !data.password) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const registrationData = {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword, // API expects password_confirmation
            };
            await registerUser(registrationData);
            alert('Registration successful! Please log in.');
            navigate('/login'); // Navigate to login page on success
        } catch (error: any) {
            console.error('Registration failed:', error);
            // Display more specific error messages based on API response
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = Object.values(error.response.data.errors).flat().join('\n');
                alert(`Registration failed:\n${errors}`);
            } else {
                alert('Registration failed. Please try again.');
            }
        }
    };

    const handleSignInClick = () => {
        navigate('/login'); // Navigate to login page
    };

    return (
        <div className="register-page">
            <div className="form-container">
                <RegisterForm onSubmit={handleRegister} onSignInClick={handleSignInClick} />
            </div>
        </div>
    );
};

export default RegisterPage;
