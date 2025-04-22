import apiClient from './api';

// Định nghĩa kiểu dữ liệu dựa trên api.yaml
export interface Appointment {
    id: number;
    user_id: number;
    title: string;
    description?: string | null;
    appointment_time: string; // ISO 8601 format
    created_at: string;
    updated_at: string;
}

export interface AppointmentInput {
    title: string;
    description?: string | null;
    appointment_time: string; // ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ or equivalent)
}

// Kiểu dữ liệu cho response phân trang từ Laravel
export interface PaginatedResponse<T> {
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
}

export interface GetAppointmentsParams {
    page?: number;
    per_page?: number;
    sort_by?: 'appointment_time' | 'created_at' | 'title';
    sort_direction?: 'asc' | 'desc';
}

// Các hàm gọi API liên quan đến Appointments
export const getAppointments = (params?: GetAppointmentsParams): Promise<{ data: PaginatedResponse<Appointment> }> => {
    return apiClient.get('/appointments', { params });
};

export const createAppointment = (appointmentData: AppointmentInput): Promise<{ data: Appointment }> => {
    return apiClient.post('/appointments', appointmentData);
};

export const getAppointmentById = (appointmentId: number | string): Promise<{ data: Appointment }> => {
    return apiClient.get(`/appointments/${appointmentId}`);
};

export const updateAppointment = (appointmentId: number | string, appointmentData: AppointmentInput): Promise<{ data: Appointment }> => {
    return apiClient.put(`/appointments/${appointmentId}`, appointmentData);
};

export const deleteAppointment = (appointmentId: number | string): Promise<void> => {
    // DELETE requests typically return 204 No Content, so no specific data type needed for Promise
    return apiClient.delete(`/appointments/${appointmentId}`);
};
