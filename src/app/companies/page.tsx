import getCompanies from "@/libs/getCompanies";
import { CompanyItems } from "../../../interface";

export default async function CompaniesPage() {
    const companies = await getCompanies();

    return (
        <div className="mt-10 text-white">
            <h1 className="text-2xl font-bold mb-4">Explore {companies.count} models in our catalog</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.data.map((company: CompanyItems) => (
            <div key={company._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold">{company.Companyname}</h2>
                <p>{company.tel}</p>
                <p>{company.address}</p>
                <p>{company.description}</p>
                <p>{company.website}</p>
            </div>
            ))}
            </div>
        </div>
    );
}