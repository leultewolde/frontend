import axios from "axios";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://172.18.32.155:30080/api";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const api = {
    get: (path: string) => apiClient.get(path),
    post: (path: string, data: any) => apiClient.post(path, data),
    put: (path: string, data: any) => apiClient.put(path, data),
    delete: (path: string) => apiClient.delete(path),
};

// Fetch data
export const useFetchData = (endpoint: string, queryKey: string) => {
    return useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const res = await apiClient.get(endpoint);
            return res.data;
        },
    });
};

// Create data
export const useCreateData = (endpoint: string, queryKey: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => apiClient.post(endpoint, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
    });
};

// Delete data
export const useDeleteData = (endpoint: string, queryKey: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => apiClient.delete(`${endpoint}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
    });
};
