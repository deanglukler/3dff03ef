"use client";

import { useState } from "react";
import {
    Archive,
    Phone,
    User,
    Grid3X3,
    Settings,
    Search,
    MessageSquare,
} from "lucide-react";
import { useCallActivities } from "../lib/callHooks";
import CompanyLogo from "../components/CompanyLogo";
import ActivityList from "../components/ActivityList";
import Calls from "../lib/calls";

export default function Page() {
    const [activeTab, setActiveTab] = useState<"inbox" | "all">("inbox");

    const { data: activities, setReload: reloadCallActivities } = useCallActivities({ type: activeTab });

    async function handleUnarchiveAll() {
        await Calls.UnarchiveAll()
        reloadCallActivities(true)
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-20 lg:w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Sidebar header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="hidden lg:block">
                        <CompanyLogo />
                    </div>
                    <div className="flex justify-center lg:hidden">
                        <div className="w-10 h-10 rounded-full bg-[#0369a1] flex items-center justify-center">
                            <Phone className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>

                {/* Sidebar navigation */}
                <div className="flex-1">
                    <div className="py-4">
                        <div className="flex flex-col items-center lg:items-start">
                            <button disabled className="cursor-not-allowed w-full flex items-center gap-3 px-4 py-3 transition-colors">
                                <MessageSquare className="w-6 h-6 text-gray-500" />
                                <span className="hidden lg:block text-gray-700">
                                    Chats
                                </span>
                            </button>

                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 transition-colors relative">
                                <div className="relative">
                                    <Phone className="w-6 h-6 text-green-500" />
                                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                        +
                                    </div>
                                </div>
                                <span className="hidden lg:block text-gray-900 font-medium">
                                    Calls
                                </span>
                                {/* Active indicator */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0369a1]"></div>
                            </button>

                            <button disabled className="cursor-not-allowed w-full flex items-center gap-3 px-4 py-3 transition-colors">
                                <User className="w-6 h-6 text-gray-500" />
                                <span className="hidden lg:block text-gray-700">
                                    Contacts
                                </span>
                            </button>

                            <button disabled className="cursor-not-allowed w-full flex items-center gap-3 px-4 py-3 transition-colors">
                                <Settings className="w-6 h-6 text-gray-500" />
                                <span className="hidden lg:block text-gray-700">
                                    Settings
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* User profile */}
                <div className="p-4 border-t border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div className="hidden lg:block">
                        <div className="text-sm font-medium text-gray-800">
                            Cody McBook
                        </div>
                        <div className="text-xs text-gray-500">Online</div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Call Activity
                        </h2>

                        <div className="flex gap-4 ml-6">
                            <button
                                onClick={() => setActiveTab("inbox")}
                                className={`cursor-pointer pb-1 text-sm font-medium relative ${
                                    activeTab === "inbox"
                                        ? "text-red-500"
                                        : "text-gray-500"
                                }`}
                            >
                                Inbox
                                {activeTab === "inbox" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`cursor-pointer pb-1 text-sm font-medium relative ${
                                    activeTab === "all"
                                        ? "text-red-500"
                                        : "text-gray-500"
                                }`}
                            >
                                All calls
                                {activeTab === "all" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                disabled
                                type="text"
                                placeholder="Search calls..."
                                className="cursor-not-allowed pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </header>

                {/* Archive option */}
                <button onClick={handleUnarchiveAll} className="bg-white px-6 py-3 flex items-center gap-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <Archive className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Un-Archive All</span>
                </button>

                {/* Call list */}
                <ActivityList activities={activities} />
                
                {/* Floating action button for mobile */}
                <div className="lg:hidden fixed bottom-6 right-6">
                    <button className="w-14 h-14 rounded-full bg-[#0369a1] flex items-center justify-center shadow-lg">
                        <Grid3X3 className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
