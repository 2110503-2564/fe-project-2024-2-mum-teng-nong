"use client"; // Ensure this runs as a client component

import { useState, useEffect } from "react";
import getCompanies from "@/libs/getCompanies";
import { CompanyItems } from "../../../interface";

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<CompanyItems[]>([]);
    const [sizeFilter, setSizeFilter] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCompanies() {
            const data = await getCompanies();
            setCompanies(data.data);
        }
        fetchCompanies();
    }, []);

    const filteredCompanies = sizeFilter
        ? companies.filter((company) => company.size === sizeFilter)
        : companies;

    return (
        <div className="mt-10 text-white container mx-auto px-6">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-400">
                Explore Our {filteredCompanies.length} Companies
            </h1>
            
            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                {["small", "medium", "large"].map((size) => (
                    <button
                        key={size}
                        onClick={() => setSizeFilter((prev) => (prev === size ? null : size))}
                        className={`px-4 py-2 rounded-lg border ${
                            sizeFilter === size ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>

            {/* Company Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => (
                    <div 
                        key={company._id} 
                        className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-400"
                    >
                        <h2 className="text-xl font-bold text-blue-300 mb-2">{company.Companyname}</h2>
                        <p className="text-gray-300 text-sm mb-1"><strong>Phone:</strong> {company.tel}</p>
                        <p className="text-gray-300 text-sm mb-1"><strong>Address:</strong> {company.address}</p>
                        <p className="text-gray-300 text-sm mb-1"><strong>Size:</strong> {company.size}</p>
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
