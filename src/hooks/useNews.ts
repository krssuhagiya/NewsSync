import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface Article {
    _id: string;
    title: string;
    shortDescription: string;
    content: string;
    category: string;
    tags: string[];
    imageUrl?: string;
    author?: string;
    source: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export const useArticles = () => {
    return useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const { data } = await api.get<Article[]>('/news/');
            return data;
        },
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data } = await api.get('/categories/');
            return data;
        },
    });
};
