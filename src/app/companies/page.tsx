import getCompanies from "@/libs/getCompanies";
import { CompanyItems } from "../../../interface";

export default async function CompaniesPage() {
    const companies = await getCompanies();

    return (
        <div className="mt-10 text-white container mx-auto px-6">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-400">
                Explore {companies.count} Models in Our Catalog
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.data.map((company: CompanyItems) => (
                    <div 
                        key={company._id} 
                        className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-400"
                    >
                        <h2 className="text-xl font-bold text-blue-300 mb-2">{company.Companyname}</h2>
                        <p className="text-gray-300 text-sm mb-1"><strong>Phone:</strong> {company.tel}</p>
                        <p className="text-gray-300 text-sm mb-1"><strong>Address:</strong> {company.address}</p>
                        <p className="text-gray-400 text-sm mb-3">{company.description}</p>
                        <a 
                            href={company.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:underline text-sm"
                        >
                            {company.website}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}