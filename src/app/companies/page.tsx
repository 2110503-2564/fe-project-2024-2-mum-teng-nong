import React, { useEffect, useState } from "react";
import getCompanies from "@/libs/getCompanies";

export default async function CompaniesPage() {
    const companies = await getCompanies()

    return(
        <div className="mt-10">
             Explore {companies.count} models in our catalog
        </div>
    )
}
