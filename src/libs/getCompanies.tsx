export default async function getCompanies(){
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await fetch ("https://backend-kn8m.onrender.com/api/v1/companies")
    if(!response.ok){
        throw new Error("Failed to fetch companies")
    }
    return await response.json();
     
}