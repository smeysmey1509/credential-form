import {axiosClientWorker} from "../../api/axiosClient";

export interface INotification {
    _id: string;
    user: string;
    title: string;
    message: string;
    read: boolean;
    timeAgo: string;
    created: string;
    updated: string;
}

export const getAllNotifications = {
    getNotification: () => axiosClientWorker.get<INotification[]>("/notifications")
}
