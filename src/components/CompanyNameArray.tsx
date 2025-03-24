// CompanyNameArray.tsx
import getCompanies from "@/libs/getCompanies"; // Adjust path as needed

interface Company {
    Companyname: string;
    _id: string;
    businessType: string;
    size: string;
    address: string;
    tel: string;
    website: string;
    description: string;
    __v: number;
}

export default async function CompanyNameArray(): Promise<string[]> {
    try {
        const response = await getCompanies();
        
        // Log the full response for debugging
        console.log('Raw response from getCompanies:', response);
        console.log('Response type:', typeof response);
        console.log('Is array?', Array.isArray(response));

        // If the data is wrapped in an object (e.g., { data: [...] })
        let companies: Company[];
        if (response && 'data' in response && Array.isArray(response.data)) {
            companies = response.data;
        } else if (Array.isArray(response)) {
            companies = response;
        } else {
            throw new Error('Companies data is not an array');
        }

        console.log('Processed companies:', companies);

        return companies.map(company => company.Companyname);
    } catch (error) {
        console.error('Error in CompanyNameArray:', error);
        throw error;
    }
}