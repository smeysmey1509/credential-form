import axiosClient from "../../api/axiosClient";
import {SidebarItem, SidebarItemNode} from "../../../types/SidebarType";

export const sidebarService = {
    getTree: async (): Promise<SidebarItemNode[]> => {
        const res = await axiosClient.get('/sidebar-tree');
        return res.data;
    },
    create: async (data: Partial<SidebarItem>): Promise<SidebarItem> => {
        const res = await axiosClient.post('/sidebar-items', data);
        return res.data;
    }
}