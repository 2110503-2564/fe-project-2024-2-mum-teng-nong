// src/libs/getUserProfile.tsx
export default async function getUserProfile(token: string) {
    const response = await fetch("https://backend-gilt-five-89.vercel.app/v1/auth/me", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text(); // ดึง response body
        throw new Error(`Can't get user profile - Status: ${response.status}, Response: ${errorText}`);
    }

    return await response.json();
}