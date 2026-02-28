import axios from 'axios';
import { getApiUrl } from '../config/api';

const api = axios.create({
    baseURL: getApiUrl(''),
    headers: {
        'Content-Type': 'application/json',
    },
});

export const aiService = {
    analyzePalm: (formData) => api.post('/api/ai/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    getChatResponse: (message) => api.post('/api/ai/chat', { message }),
    getDailyHoroscope: (sign) => api.post('/api/ai/horoscope', { sign }),
};

export const appointmentService = {
    bookAppointment: (data) => api.post('/api/appointment', data),
};

export const zodiacService = {
    getZodiacSign: (dob) => api.post('/api/zodiac', { dob }),
};

export default api;
