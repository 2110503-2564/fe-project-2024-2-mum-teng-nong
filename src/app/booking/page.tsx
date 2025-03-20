
import DateReserve from "@/components/DateReserve";
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile"

export default async function Booking () {

    const session = await getServerSession(authOptions)
        if(!session || !session.user.token) 
        return(
            <main className="w-[100%] flex flex-col items-center space-y-4 mt-5">
                 <div className="text-xl font-medium">Booking Venue</div>
            <div className="w-fit space-y-2">
                <DateReserve/>
            </div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white">Book Venue</button>
            </main>
        )
        
        const profile = await getUserProfile(session.user.token)
        var createdAt = new Date(profile.data.createdAt)


    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 mt-5">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto boder-seperate border-spacing-2"><tbody>
                <tr><td>Name:</td><td>{profile.data.name}</td></tr>
                <tr><td>Email:</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel:</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since:</td><td>{profile.data.createdAt}</td></tr>
            </tbody>
            </table>
            <div className="text-xl font-medium">Booking Venue</div>
            <div className="w-fit space-y-2">
                <DateReserve/>
            </div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white">Book Venue</button>
        </main>
    );
}
