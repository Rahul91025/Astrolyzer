import { useState, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook for handling API requests with loading, error states, and toast notifications.
 */
export const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiFunc(...args);
            setData(response.data);
            return response.data;
        } catch (err) {
            const message = err.response?.data?.error || err.message || 'Something went wrong';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunc]);

    return { data, error, loading, execute, setData };
};

export default useApi;
