import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Lấy từ api.yaml
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor để thêm token vào header của mỗi request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Interceptor để xử lý lỗi response (ví dụ: tự động logout khi token hết hạn)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Xử lý lỗi 401 (Unauthorized), ví dụ: xóa token và chuyển hướng về trang login
            localStorage.removeItem('accessToken');
            // Có thể thêm logic chuyển hướng ở đây nếu cần
            console.error('Unauthorized access - logging out.');
            // window.location.href = '/login'; // Ví dụ chuyển hướng
        }
        return Promise.reject(error);
    }
);

export default apiClient;
