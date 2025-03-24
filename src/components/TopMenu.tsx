import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

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
                        <Link href="/api/auth/signout">
                            <button className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white text-sm rounded-md transition">
                                Sign-Out ({session.user.name})
                            </button>
                        </Link>
                    ) : (
                        <Link href="/api/auth/signin">
                            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm rounded-md transition">
                                Sign-In
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
