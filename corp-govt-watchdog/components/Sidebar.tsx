import Link from "next/link";
import { Home, Settings, Bell } from "lucide-react";

export default function Sidebar() {
    return (
        <div className="w-128 h-screen bg-black text-black p-8 fixed">
            <nav className="flex-1">
                <ul className="space-y-4">
                    <li>
                        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
                            <div className="flex gap-3">
                                <Home className="w-5 h-5" /> Home
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/messages" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
                            <Bell className="w-5 h-5" /> Campaigns
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
                            <Settings className="w-5 h-5" /> Account
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
