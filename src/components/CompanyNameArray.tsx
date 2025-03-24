// CompanyNameArray.tsx
import getCompanies from "@/libs/getCompanies";

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

interface CompanyOption {
  id: string;
  name: string;
}

export default async function CompanyNameArray(): Promise<CompanyOption[]> {
  try {
    const response = await getCompanies();

    console.log('Raw response from getCompanies:', response);
    console.log('Response type:', typeof response);
    console.log('Is array?', Array.isArray(response));

    let companies: Company[];
    if (response && 'data' in response && Array.isArray(response.data)) {
      companies = response.data;
    } else if (Array.isArray(response)) {
      companies = response;
    } else {
      throw new Error('Companies data is not an array');
    }

    console.log('Processed companies:', companies);

    return companies.map((company) => ({
      id: company._id,
      name: company.Companyname,
    }));
  } catch (error) {
    console.error('Error in CompanyNameArray:', error);
    throw error;
  }
}