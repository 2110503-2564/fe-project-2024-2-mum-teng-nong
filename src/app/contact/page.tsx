'use client';
import React from 'react';

export default function Contact() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md text-black">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Student</h1>
        <p className="text-lg text-center mb-4"><span className="font-semibold">Name:</span> Teetat</p>
        <p className="text-lg text-center mb-8"><span className="font-semibold">Student ID:</span> 12345678</p>
        <p className="text-lg text-center mb-4"><span className="font-semibold">Name:</span> Chatchapon</p>
        <p className="text-lg text-center mb-8"><span className="font-semibold">Student ID:</span> 12345678</p>
        <p className="text-lg text-center mb-4"><span className="font-semibold">Name:</span> Supakit</p>
        <p className="text-lg text-center"><span className="font-semibold">Student ID:</span> 12345678</p>
      </div>
    </main>
  );
}