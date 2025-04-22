import React, { useState, useEffect } from 'react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import './AppointmentDialogue.scss';

interface AppointmentData {
    title: string;
    description: string;
    appointment_time: string; // Use string for datetime-local input
}

interface AppointmentDialogueProps {
    onSubmit: (data: AppointmentData) => void;
    data?: AppointmentData | null; // Optional initial data for editing
}

const AppointmentDialogue: React.FC<AppointmentDialogueProps> = ({ onSubmit, data }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (data) {
            setTitle(data.title || '');
            setDescription(data.description || '');
            // Format date for datetime-local input
            const formattedTime = data.appointment_time ? new Date(data.appointment_time).toISOString().slice(0, 16) : '';
            setTime(formattedTime);
        } else {
            // Reset form if no data (for creating new)
            setTitle('');
            setDescription('');
            setTime('');
        }
    }, [data]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add validation logic here
        if (!title || !time) {
            alert('Title and Time are required!'); // Replace with better error handling
            return;
        }
        onSubmit({ title, description, appointment_time: time });
    };

    return (
        <form className="appointment-dialogue" onSubmit={handleSubmit}>
            <Input
                placeholder="Event Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {/* Changed type to datetime-local as per description.md */}
            <Input
                placeholder="Time"
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            {/* Changed placeholder and type as per description.md */}
            <Input
                placeholder="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button text="Confirm" type="primary" onClick={() => { /* Submit logic is in form onSubmit */ }} />
            {/* Removed the unnecessary link from the description */}
        </form>
    );
};

export default AppointmentDialogue;
