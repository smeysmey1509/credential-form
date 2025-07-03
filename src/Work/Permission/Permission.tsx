import React, {useState} from "react";
import './Permission.css'

type ActionType = 'Full Access' | 'Write' | 'Read';

type Permission = {
    id: string;
    name: string;
    action: ActionType;
    permissions: {
        write?: boolean;
        read?: boolean;
        create?: boolean;
        update?: boolean;
        delete?: boolean;
        view?: boolean;
    };
};

type Section = {
    title: string;
    permissions: Permission[];
};

const mockData: Section[] = [
    {
        title: "Authentication",
        permissions: [
            {
                id: "01",
                name: "FullAccessAuthentication",
                action: "Full Access",
                permissions: {write: false, read: false},
            },
            {
                id: "02",
                name: "AccessLogin",
                action: "Write",
                permissions: {create: false, update: false, delete: false},
            },
            {
                id: "03",
                name: "NoAccessLogin",
                action: "Read",
                permissions: {view: false},
            },
            {
                id: "04",
                name: "AccessMFA",
                action: "Write",
                permissions: {create: false, update: false, delete: false},
            },
            {
                id: "05",
                name: "NoAccessLogin",
                action: "Read",
                permissions: {view: false},
            },
        ],
    },
    {
        title: "Dashboard",
        permissions: [],
    },
    {
        title: "User",
        permissions: [],
    },
    {
        title: "Role",
        permissions: [],
    },
    {
        title: "Permission",
        permissions: [],
    },
    {
        title: "Action",
        permissions: [],
    },
    {
        title: "Setting",
        permissions: [],
    },
    {
        title: "Notification",
        permissions: [],
    },
    {
        title: "Version Control",
        permissions: [],
    },
];

export const PermissionMatrix: React.FC = () => {
    const [sections, setSections] = useState(mockData);
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    const toggleExpand = (title: string) => {
        setExpanded((prev) => ({...prev, [title]: !prev[title]}));
    };

    const togglePermission = (sectionIndex: number, permIndex: number, key: keyof Permission['permissions']) => {
        const newSections = [...sections];
        const current = newSections[sectionIndex].permissions[permIndex].permissions[key];
        newSections[sectionIndex].permissions[permIndex].permissions[key] = !current;
        setSections(newSections);
    };

    return (
        <div className="permission-matrix">
            <table className="permission-table">
                <thead>
                <tr className="permission-header">
                    <th>ID</th>
                    <th className="permission-header-title">
                        <input type="checkbox"/>
                        Permission name
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Action</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {sections.map((section, sectionIndex) => (
                    <React.Fragment key={section.title}>
                        <tr
                            className="section-row"
                            onClick={() => toggleExpand(section.title)}
                        >
                            <td colSpan={9} className="section-title">
                                <span className="title">{section.title}</span>
                                {expanded[section.title] ? <svg width="9" height="5" viewBox="0 0 9 5" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.5 0.500765L4.50038 4.50038L8.5 0.5" stroke="#3B82F6"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    : <svg width="10" height="5" viewBox="0 0 10 5" fill="none"
                                           xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 4.49924L5.00038 0.499618L9 4.5" stroke="#3B82F6"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                }
                            </td>
                        </tr>
                        {expanded[section.title] &&
                            section.permissions.map((perm, permIndex) => (
                                <tr key={perm.id} className="permission-row">
                                    <td>{perm.id}</td>
                                    <td className="permission-header-title"><input type="checkbox"/> {perm.name}</td>
                                    <td></td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        Full Access
                                    </td>
                                    <td className="permission-header-title">
                                        <input
                                            type="checkbox"
                                            checked={perm.permissions.update || false}
                                            onChange={() => togglePermission(sectionIndex, permIndex, "update")}
                                        />
                                        Read
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={perm.permissions.delete || false}
                                            onChange={() => togglePermission(sectionIndex, permIndex, "delete")}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={perm.permissions.view || false}
                                            onChange={() => togglePermission(sectionIndex, permIndex, "view")}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </React.Fragment>
                ))}
                </tbody>
            </table>

            <div className="permission-actions">
                <button className="btn cancel">Cancel</button>
                <button className="btn save">Save</button>
            </div>
        </div>
    );
};

export default PermissionMatrix;
