import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Button from '@/components/Button/Button';
import AppointmentCard from '@/components/AppointmentCard/AppointmentCard';
import AppointmentDialogue from '@/components/AppointmentDialogue/AppointmentDialogue';
import { getCurrentUser, logoutUser } from '@/services/authService';
import {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    Appointment,
    AppointmentInput,
} from '@/services/appointmentService';
import './DashboardPage.scss';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
    const [overdueAppointments, setOverdueAppointments] = useState<Appointment[]>([]);
    const [isDialogueOpen, setIsDialogueOpen] = useState(false);
    const [dialogueData, setDialogueData] = useState<Appointment | null>(null); // For editing
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const [userResponse, appointmentsResponse] = await Promise.all([
                getCurrentUser(),
                getAppointments({ sort_by: 'appointment_time', sort_direction: 'asc' }), // Fetch sorted appointments
            ]);
            setCurrentUser(userResponse.data);
            setAppointments(appointmentsResponse.data.data);
        } catch (err: any) {
            console.error('Failed to fetch data:', err);
            setError('Failed to load dashboard data. Please try logging in again.');
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const now = new Date();
        const upcoming: Appointment[] = [];
        const overdue: Appointment[] = [];

        appointments.forEach(app => {
            if (new Date(app.appointment_time) >= now) {
                upcoming.push(app);
            } else {
                overdue.push(app);
            }
        });

        // Sort upcoming appointments by time (already sorted by API, but good practice)
        upcoming.sort((a, b) => new Date(a.appointment_time).getTime() - new Date(b.appointment_time).getTime());
        // Sort overdue appointments (optional, e.g., most recent overdue first)
        overdue.sort((a, b) => new Date(b.appointment_time).getTime() - new Date(a.appointment_time).getTime());

        setUpcomingAppointments(upcoming);
        setOverdueAppointments(overdue);
    }, [appointments]);

    const handleSignOut = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error('Logout failed:', err);
            // Even if API logout fails, clear local token and redirect
        } finally {
            localStorage.removeItem('accessToken');
            navigate('/login');
        }
    };

    const handleOpenNewDialogue = () => {
        setDialogueData(null);
        setIsDialogueOpen(true);
    };

    const handleOpenEditDialogue = (appointment: Appointment) => {
        setDialogueData(appointment);
        setIsDialogueOpen(true);
    };

    const handleCloseDialogue = () => {
        setIsDialogueOpen(false);
        setDialogueData(null);
    };

    const handleDialogueSubmit = async (data: AppointmentInput) => {
        try {
            if (dialogueData && dialogueData.id) {
                // Update existing appointment
                await updateAppointment(dialogueData.id, data);
                alert('Appointment updated successfully!');
            } else {
                // Create new appointment
                await createAppointment(data);
                alert('Appointment created successfully!');
            }
            handleCloseDialogue();
            fetchData(); // Re-fetch data to update lists
        } catch (err: any) {
            console.error('Failed to save appointment:', err);
            // Display more specific error messages based on API response
            if (err.response && err.response.data && err.response.data.errors) {
                const errors = Object.values(err.response.data.errors).flat().join('\n');
                alert(`Failed to save:\n${errors}`);
            } else {
                alert('Failed to save appointment. Please try again.');
            }
        }
    };

    const handleDeleteAppointment = async (id: number | string) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                await deleteAppointment(id);
                alert('Appointment deleted successfully!');
                fetchData(); // Re-fetch data
            } catch (err) {
                console.error('Failed to delete appointment:', err);
                alert('Failed to delete appointment. Please try again.');
            }
        }
    };

    const handleDeleteAllOverdue = async () => {
        if (overdueAppointments.length === 0) {
            alert('No overdue appointments to delete.');
            return;
        }
        if (window.confirm(`Are you sure you want to delete all ${overdueAppointments.length} overdue appointments? This cannot be undone.`)) {
            setIsLoading(true); // Show loading indicator during bulk delete
            try {
                // API doesn't support bulk delete, so delete one by one
                await Promise.all(overdueAppointments.map(app => deleteAppointment(app.id)));
                alert('All overdue appointments deleted successfully!');
                fetchData(); // Re-fetch data
            } catch (err) {
                console.error('Failed to delete all overdue appointments:', err);
                alert('Failed to delete all overdue appointments. Some may not have been deleted. Please try again.');
                // Optionally re-fetch even on error to see the current state
                fetchData();
            } finally {
                // Ensure loading is turned off even if fetchData hasn't finished
                // but fetchData itself will turn it off.
            }
        }
    };

    if (isLoading && !currentUser) {
        // Show a loading indicator only on initial load
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error} <button onClick={() => navigate('/login')}>Go to Login</button></div>;
    }

    return (
        <div className="dashboard-page">
            {currentUser && <Header name={currentUser.name} onSignOut={handleSignOut} />}

            <div className="view-appointment-container">
                <div className="appointment-column upcoming-appointment">
                    <div className="column-header">
                        <div className="title">Upcoming Appointments</div>
                        <Button text="New Appointment" type="primary" onClick={handleOpenNewDialogue} />
                    </div>
                    <div className="list">
                        {isLoading && appointments.length > 0 && <div>Updating...</div>} {/* Show update indicator */}
                        {!isLoading && upcomingAppointments.length === 0 && <div>No upcoming appointments.</div>}
                        {upcomingAppointments.map(app => (
                            <AppointmentCard
                                key={app.id}
                                data={app}
                                onEdit={handleOpenEditDialogue}
                                onDelete={handleDeleteAppointment}
                            />
                        ))}
                    </div>
                </div>

                <div className="appointment-column overdue-appointment">
                    <div className="column-header">
                        <div className="title">Overdue Appointments</div>
                        <Button text="Delete All" type="delete" onClick={handleDeleteAllOverdue} />
                    </div>
                    <div className="list">
                        {isLoading && appointments.length > 0 && <div>Updating...</div>} {/* Show update indicator */}
                        {!isLoading && overdueAppointments.length === 0 && <div>No overdue appointments.</div>}
                        {overdueAppointments.map(app => (
                            <AppointmentCard
                                key={app.id}
                                data={app}
                                onEdit={handleOpenEditDialogue} // Keep edit for reference, though button is hidden
                                onDelete={handleDeleteAppointment}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {isDialogueOpen && (
                <div className="dialogue-overlay" onClick={handleCloseDialogue}> {/* Close on overlay click */}
                    <div className="dialogue-content" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside dialogue */}
                        <button className="close-button" onClick={handleCloseDialogue}>&times;</button>
                        <AppointmentDialogue
                            onSubmit={handleDialogueSubmit}
                            data={dialogueData} // Pass null for new, appointment data for edit
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
