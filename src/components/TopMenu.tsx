"use client"; // ใช้ client-side rendering

import { useSession, signIn, signOut } from "next-auth/react";
import TopMenuItem from "./TopMenuItem";
import getUserProfile from "@/libs/getUserProfile";

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
                <div className="flex-1 flex justify-end space-x-4">
                    {session ? (
                        <>
                            <button
                                onClick={() => window.location.href = "/me"}
                                className="px-4 py-2 bg-gray-500 hover:bg-yellow-500 text-white text-sm rounded-md transition duration-300 transform hover:scale-105"
                            >
                                Me
                            </button>
                            <button
                                onClick={() => signOut()}
                                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white text-sm rounded-md transition duration-300 transform hover:scale-105"
                            >
                                Sign-Out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => signIn()}
                                className="px-4 py-2 bg-gray-500 hover:bg-blue-500 text-white text-sm rounded-md transition duration-300 transform hover:scale-105"
                            >
                                Sign-In
                            </button>
                            <button
                                onClick={() => window.location.href = "/register"}
                                className="px-4 py-2 bg-gray-500 hover:bg-green-500 text-white text-sm rounded-md transition duration-300 transform hover:scale-105"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}