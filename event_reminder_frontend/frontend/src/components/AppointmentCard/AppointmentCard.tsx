import React from 'react';
import Button from '@/components/Button/Button';
import './AppointmentCard.scss';

interface AppointmentData {
    id: number | string; // Add id for key prop and potential API calls
    title: string;
    description?: string;
    appointment_time: string | Date;
}

interface AppointmentCardProps {
    data: AppointmentData;
    onEdit: (data: AppointmentData) => void;
    onDelete: (id: number | string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ data, onEdit, onDelete }) => {
    const appointmentTime = new Date(data.appointment_time);
    const now = new Date();
    const isOverdue = appointmentTime < now;

    const formattedTime = appointmentTime.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className="appointment-card">
            <h3>{data.title}</h3>
            <div className={`time ${isOverdue ? 'overdue' : 'upcoming'}`}>
                Thời gian: {formattedTime}
            </div>
            {data.description && <div className="description">Mô tả: {data.description}</div>}
            {!isOverdue && (
                <div className="actions">
                    <Button text="Edit" type="edit" onClick={() => onEdit(data)} />
                    <Button text="Delete" type="delete" onClick={() => onDelete(data.id)} />
                </div>
            )}
        </div>
    );
};

export default AppointmentCard;
