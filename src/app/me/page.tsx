// app/me/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions"; 
import getUserProfile from "@/libs/getUserProfile";
import { redirect } from "next/navigation";

export default async function MePage() {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);

  if (!session || !session.user) {
    console.log("No session or user found, redirecting to signin");
    redirect("/api/auth/signin");
  }

  const token = session.user.token;
  console.log("Token from session:", token);

  if (!token) {
    console.log("No token found in session.user");
    return <div>Error: No token found in session</div>;
  }

  try {
    const userProfile = await getUserProfile(token);
    console.log("User Profile from getUserProfile:", userProfile);

    // เข้าถึงข้อมูลใน userProfile.data
    const userData = userProfile.data; // เพิ่มบรรทัดนี้เพื่อความชัดเจน

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
          <div className="space-y-4">
            <p><strong>Username:</strong> {userData.name || "N/A"}</p> {/* ใช้ name แทน username */}
            <p><strong>Email:</strong> {userData.email || "N/A"}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-red-100 p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-xl font-bold text-red-600">Error</h1>
          <p className="mt-2 text-red-700">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }
}