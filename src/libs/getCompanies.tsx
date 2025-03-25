import { cache } from "react";

export default async function getCompanies(){
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await fetch ("https://backend-gilt-five-89.vercel.app/api/v1/companies",{cache:"no-store"})
    if(!response.ok){
        throw new Error("Failed to fetch companies")
    }
    return await response.json();
     
}