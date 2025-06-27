// components/ActivityLog.tsx
import {useEffect, useState} from "react";
import {getAllActivities, Activity} from "../../services/common/ActivityService/activityService";

const ActivityLog = () => {
    const [activity, setActivity] = useState<Activity[]>([]);

    useEffect(() => {
        getAllActivities()
            .then((data) => setActivity(data))
            .catch((err) => console.error('Failed to fetch activities:', err))
            .finally(() => console.log('Finished fetching activities'));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">User Activity Log</h2>
            <div className="overflow-x-auto border shadow-sm">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 text-left">
                    <tr>
                        <th className="p-3">User</th>
                        <th className="p-3">Action</th>
                        <th className="p-3">Products</th>
                        <th className="p-3">Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activity.map((activity: any) => (
                        <tr key={activity._id} className="border-t">
                            <td className="p-3">
                                <div className="font-medium">{activity.user?.name}</div>
                                <div className="text-xs text-gray-500">{activity.user?.email}</div>
                            </td>
                            <td className="p-3 capitalize text-blue-600 font-medium">{activity.action}</td>
                            <td className="p-3 space-y-1">
                                {activity.products.map((product: any) => (
                                    <div key={product._id} className="text-sm">
                                        <div className="font-semibold">{product.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {product.category?.name || "No category"}
                                        </div>
                                    </div>
                                ))}
                            </td>
                            <td className="p-3 text-gray-500">
                                {new Date(activity.timestamp).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivityLog;
