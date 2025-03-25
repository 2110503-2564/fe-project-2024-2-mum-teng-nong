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
      <div className="min-h-screen flex items-center justify-center bg-blue-900 p-6">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">User Profile</h1>
          <div className="space-y-6">
            <p className="text-xl"><strong className="text-gray-700">Username:</strong> {userData.name || "N/A"}</p> 
            <p className="text-xl"><strong className="text-gray-700">Email:</strong> {userData.email || "N/A"}</p>
            <p className="text-xl"><strong className="text-gray-700">Phone:</strong> {userData.phonenum || "N/A"}</p>
            <p className="text-xl"><strong className="text-gray-700">Sex:</strong> {userData.sex || "N/A"}</p>
            <p className="text-xl"><strong className="text-gray-700">Role:</strong> {userData.role || "N/A"}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-400 p-6">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-800">Error</h1>
          <p className="mt-6 text-xl text-gray-700">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }
}