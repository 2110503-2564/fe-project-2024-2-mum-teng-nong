import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    return (
        <div className={styles.menuContainer}>
            <div className="flex items-center">
                {session ? (
                    <Link href="/api/auth/signout">
                        <div className="flex items-center px-2 text-black text-sm">
                            Sign-Out of {session.user.name}
                        </div>
                    </Link>
                ) : (
                    <Link href="/api/auth/signin">
                        <div className="flex items-center px-2 text-black text-sm">
                            Sign-in
                        </div>
                    </Link>
                )}
            </div>
            
            <div className="flex items-center">
                <TopMenuItem title="Booking" pageRef="/booking" />
                <div className="flex items-center justify-center h-full">
                    <img src="/img/logo.png" className={styles.logoimg} alt="Logo" />
                </div>
            </div>
        </div>
    );
}