"use client"; // ใช้ client-side rendering

import { useSession, signIn, signOut } from "next-auth/react";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
    const { data: session } = useSession();

    return (
        <nav className="bg-gray-900 text-white shadow-md w-full fixed top-0 left-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                
                {/* Left Spacer (for centering effect) */}
                <div className="flex-1"></div>

                {/* Centered Menu Items */}
                <div className="flex space-x-6">
                    <TopMenuItem title="Booking" pagehref="/booking" />
                    <TopMenuItem title="About Us" pagehref="/about" />
                    <TopMenuItem title="View All Companies" pagehref="/companies" />
                </div>

                {/* Right Section: Auth Links */}
                <div className="flex-1 flex justify-end">
                    {session ? (
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white text-sm rounded-md transition"
                        >
                            Sign-Out ({session.user.name})
                        </button>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm rounded-md transition"
                        >
                            Sign-In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}