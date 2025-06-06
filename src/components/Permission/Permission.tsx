import React, {useEffect, useState} from 'react'
import axios from "axios";

interface UserType {
    _id: number;
    name: string;
    email: string;
    role: string;
}

const Permission = () => {
    const [user, setUser] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            setError("Unauthorized");
            setLoading(false)
            return
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get<UserType[]>("http://localhost:5002/api/v1/users", {headers: {Authorization: `Bearer ${token}`}});
                setUser(response.data);
            } catch (err: any) {
                if (err.response?.status === 403) {
                    setError("Access denied. You are not an admin.");
                } else {
                    setError("Failed to fetch users.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{color: "red"}}>{error}</div>;
    return (
        <div className="flex flex-col align-items-center gap-5">
            <h2>Permission</h2>
            <div className="w-full h-full">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                    <tr>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className="block text-sm font-normal leading-none text-slate-500">Name</p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className={"block text-sm font-normal leading-none text-slate-500"}>Email</p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-slate-50">
                            <p className={"block text-sm font-normal leading-none text-slate-500"}>Role</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        user?.map((item: UserType, index) => (
                            <tr key={index} className={"hover:bg-slate-50"}>
                                <td className={"p-4 border-b border-slate-200"}>
                                    <p className={"block text-sm text-slate-800"}>{item?.name}</p>
                                </td>
                                <td className={"p-4 border-b border-slate-200"}>
                                    <p className={"block text-sm text-slate-800"}>{item?.email}</p>
                                </td>
                                <td className={"p-4 border-b border-slate-200"}>
                                    <p className={"block text-sm text-slate-800"}>{item?.role}</p>
                                    {/*<select id="cars" name="cars">*/}
                                    {/*    <option value="volvo" className={"block text-sm text-slate-800"}>Admin</option>*/}
                                    {/*    <option value="saab" className={"block text-sm text-slate-800"}>Editor</option>*/}
                                    {/*    <option value="fiat" className={"block text-sm text-slate-800"}>Viewer</option>*/}
                                    {/*    <option value="audi" className={"block text-sm text-slate-800"}>User</option>*/}
                                    {/*</select>*/}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Permission