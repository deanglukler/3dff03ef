import {
    Phone,
    Clock,
    Archive,
} from "lucide-react";
import Calls, { Activity } from "../lib/calls";

export const CallItem: React.FC<{ activity: Activity }> = ({ activity }) => {
    return (
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-red-500 rotate-225" />
                </div>
                <div>
                    <div className="text-gray-800 font-medium">
                        {activity.to}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>From: {activity.from}</span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{activity.duration}s</span>
                        </span>
                        {activity.call_type !== "answered" && (
                            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                                !
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-sm text-gray-500">
                    {new Date(activity.created_at).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => Calls.ArchiveCallById(activity.id)}>
                        <Archive className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};
