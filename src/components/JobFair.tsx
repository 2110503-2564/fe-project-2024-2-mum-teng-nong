import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const JobFair = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center justify-center px-6">
      {/* Welcome Section */}
      <section className="bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-3xl shadow-xl text-white text-center max-w-3xl">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">Welcome to Job Fair</h1>
        <p className="mt-4 text-xl opacity-90">Discover your next career opportunity</p>
        <Link href="/companies" passHref>
          <button className="mt-6 bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
            Get Started
          </button>
        </Link>
      </section>

      <footer className="bg-blue-800 text-white text-center py-6 w-full mt-20 fixed bottom-0 left-0">
        <p className="text-lg">&copy; 2025 Job Fair | All Rights Reserved</p>
        <div className="flex justify-center space-x-6 mt-4">
          <Link href="/about" legacyBehavior>
            <a className="hover:underline text-lg">About Us</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="hover:underline text-lg">Contact</a>
          </Link>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <FaFacebook className="text-2xl hover:text-gray-300 cursor-pointer" />
          <FaTwitter className="text-2xl hover:text-gray-300 cursor-pointer" />
          <FaLinkedin className="text-2xl hover:text-gray-300 cursor-pointer" />
        </div>
      </footer>
    </div>
  );
};

export default JobFair;