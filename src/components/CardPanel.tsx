'use client'
import { useReducer } from "react"
import Card from "./Card"
import Link from "next/link"
import { useRef } from "react"
export default function CardPanel() {

    const ratingReducer = (
        venueList: Map<string, number>,
        action: { type: string; venueName: string; rating?: number }
    ) => {
        switch (action.type) {
            case 'add': {
                const newVenueList = new Map(venueList);
                newVenueList.set(action.venueName, action.rating ?? 0);
                return newVenueList;
            }
            case 'remove': {
                const newVenueList = new Map(venueList);
                newVenueList.delete(action.venueName);
                return newVenueList;
            }
            default:
                return venueList;
        }
    }
    //MockData
    const mockVenueRepo = [{vid:"001",name:"The Bloom Pavilion",img:"/img/bloom.jpg"},
        {vid:"002",name:"Spark Space",img:"/img/sparkspace.jpg"},
        {vid:"003",name:"The Grand Table",img:"/img/grandtable.jpg"}]




    let defaultVenue = new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0],
    ]);

    const [ratingList, dispatchRating] = useReducer(ratingReducer, defaultVenue);

    return (
        <div>
            <div style={{margin: "20px", display: "flex", flexDirection: "row", alignContent: "space-around", justifyContent: "space-around", flexWrap: "wrap"}}>
                    {
                        mockVenueRepo.map((venueItem) =>(
                        <Link href={`/venue/${venueItem.vid}`} className="w-1/5" key={venueItem.vid}>
                            <Card
                                venueName={venueItem.name}
                                imgSrc={venueItem.img}
                                rating={ratingList.get(venueItem.name) || 0}
                                onRatingChange={(newRating) => 
                                    dispatchRating({ 
                                        type: 'add', 
                                        venueName: venueItem.name, 
                                        rating: newRating || 0 
                                    })
                                }
                            />
                        </Link>
                        ))
                    }
            </div>

                <div className="w-full text-xl font-medium p-4">
                    Venue List with Ratings: {ratingList.size}
                </div>
            <ul>
                {Array.from(ratingList).map(([venueName, rating]) => (
                    <li
                        key={venueName}
                        className="p-4"
                        data-testid={venueName}
                        onClick={() => dispatchRating({ type: 'remove', venueName })}
                    >
                        {venueName}: {rating}
                    </li>
                ))}
            </ul>
        </div>
    )
}