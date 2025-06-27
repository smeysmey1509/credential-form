export type SidebarItem = {
    _id: string;
    name: string;
    path?: string;
    icon?: string;
    order: number;
    type: 'module' | 'service' | 'feature';
    parentId?: string | null;
    createdAt: string;
    updatedAt: string;
    __v?: number;
};

export type SidebarItemNode = {
    _id: string;
    name: string;
    path?: string;
    icon?: string;
    order: number;
    type: 'module' | 'service' | 'feature';
    parentId?: string | null;
    children: SidebarItemNode[]; // recursive children
    createdAt: string;
    updatedAt: string;
    __v?: number;
};
