'use client';
import React from 'react';

export default function About() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white p-12 rounded-lg shadow-md w-[90%] max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <p className="text-2xl mb-6 text-black font-serif">Group Name: Mum Teng Nong</p>
        <img src="img/3cha.jpg" alt="Group Photo" className="rounded-lg shadow-md mb-8 mx-auto w-full max-w-lg" />
      </div>
    </main>
  );
}