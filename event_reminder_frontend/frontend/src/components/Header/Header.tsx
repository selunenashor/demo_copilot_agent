import React from 'react';
import Button from '@/components/Button/Button';
import './Header.scss';

interface HeaderProps {
    name: string;
    onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ name, onSignOut }) => {
    return (
        <div className="header-container">
            <div className="user-info">
                <span>Xin chào, {name}</span>
                {/* Ensure Button component is imported correctly */}
                <Button text="Sign out" type="delete" onClick={onSignOut} />
            </div>
        </div>
    );
};

export default Header;
