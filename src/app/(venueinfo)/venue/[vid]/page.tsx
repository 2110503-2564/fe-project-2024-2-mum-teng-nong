import Image from "next/image";
import getVenue from "@/libs/getVenue";
export default async function VenueDetailPage({ params }: { params: { vid: string } }) {

  const venueDetail = await getVenue(params.vid);

  if (!venueDetail) return <main className="text-center p-5">Venue not found</main>;

  return (
    <main className="text-center p-5">
      <h1 className="text-lg font-medium">{venueDetail.data.name}</h1>
      <div className="flex flex-row my-5">
        <Image 
          src={venueDetail.data.picture} 
          alt="Venue Image" 
          width={300} 
          height={200}
          className="rounded-lg w-[30%] object-cover" 
        />
        <div className="text-left ml-5">
          <p className="mb-2"><span className="font-medium">Name:</span> {venueDetail.data.name}</p>
          <p className="mb-2"><span className="font-medium">Address:</span> {venueDetail.data.address}</p>
          <p className="mb-2"><span className="font-medium">District:</span> {venueDetail.data.district}</p>
          <p className="mb-2"><span className="font-medium">Province:</span> {venueDetail.data.province}</p>
          <p className="mb-2"><span className="font-medium">Postal Code:</span> {venueDetail.data.postalcode}</p>
          <p className="mb-2"><span className="font-medium">Tel:</span> {venueDetail.data.tel}</p>
          <p><span className="font-medium">Daily Rate:</span> {venueDetail.data.dailyrate}</p>
        </div>
      </div>
    </main>
  )
}

