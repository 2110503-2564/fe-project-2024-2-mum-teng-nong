// JobFair.tsx
import React from 'react';
import Link from 'next/link';
const JobFair = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-20">
        <h1 className="text-4xl font-bold">Welcome to Job Fair</h1>
        <p className="mt-4 text-xl">Discover your next career opportunity</p>
        <button className="mt-6 bg-white text-blue-600 py-2 px-6 rounded-lg hover:bg-gray-200">Get Started</button>
      </section>

      {/* Job Listings Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Job Listings</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Job Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold">Software Engineer</h3>
            <p className="text-gray-500 mt-2">Company Name: Tech Corp</p>
            <p className="text-gray-600 mt-2">Location: Remote</p>
            <Link href="/booking">
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">Apply Now</button>
            </Link>
          </div>
          {/* Job Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold">Product Manager</h3>
            <p className="text-gray-500 mt-2">Company Name: Innovate Ltd.</p>
            <p className="text-gray-600 mt-2">Location: New York, NY</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">Apply Now</button>
          </div>
          {/* Job Card 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold">Marketing Specialist</h3>
            <p className="text-gray-500 mt-2">Company Name: MarketPro</p>
            <p className="text-gray-600 mt-2">Location: Chicago, IL</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">Apply Now</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white text-center py-4">
        <p>&copy; 2025 Job Fair | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default JobFair;
