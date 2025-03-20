import Card from "./Card"
import Link from "next/link"
import getVenues from "@/libs/getVenues";

export default async function VenueCatalog({VenueJson}:{VenueJson:Promise<VenueJson>}){
    const VenueJsonReady = await getVenues();
    return(
        <>
        Explore {VenueJsonReady.count} models in our catalog
        <div style={{margin: "20px", display: "flex", flexDirection: "row", alignContent: "space-around", justifyContent: "space-around", flexWrap: "wrap"}}>
                    {
                        VenueJsonReady.data.map((venueItem:VenueItem) =>(
                        <Link href={`/venue/${venueItem.id}`} className="w-1/5" key={venueItem.id}>
                            <Card venueName={venueItem.name} imgSrc={venueItem.picture} />
                        </Link>
                        ))
                    }
            
        </div>
        
        </>
        
    )
    
}
