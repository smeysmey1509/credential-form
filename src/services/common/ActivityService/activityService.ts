import axiosClient from "../../api/axiosClient";

export interface Activity {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        createdAt: string;
    };
    products: {
        _id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        category: {
            _id: string;
            name: string;
            description: string;
        } | null;
        createdAt: string;
        updatedAt: string;
    }[];
    action: 'create' | 'update' | 'delete';
    timestamp: string;
}

export const getAllActivities = async (): Promise<Activity[]> => {
    const response = await axiosClient.get<{ activities: Activity[] }>('/activities');
    return response.data.activities;
};
