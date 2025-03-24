'use client';
import React, { useState } from 'react';
import DateReserve from './DateReserve';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleDateReserveChange = (date: string, companyId: string) => {
    setSelectedDate(date);
    setSelectedCompanyId(companyId);
    console.log('Selected Date:', date);
    console.log('Selected Company ID:', companyId);
  };

  const handleReserve = async () => {
    if (!selectedDate || !selectedCompanyId) {
      setIsFailed(true);
      setErrorMessage('Please select both date and company');
      setTimeout(() => {
        setIsFailed(false);
        setErrorMessage('');
      }, 2000);
      return;
    }

    // ตรวจสอบวันที่
    const date = dayjs(selectedDate);
    const startDate = dayjs('2022-05-10');
    const endDate = dayjs('2022-05-13');
    if (date.isBefore(startDate) || date.isAfter(endDate)) {
      setIsFailed(true);
      setErrorMessage('You must reserve within the specified dates (May 10th-13th, 2022)');
      setTimeout(() => {
        setIsFailed(false);
        setErrorMessage('');
      }, 2000);
      return;
    }

    if (status === 'loading') {
      setErrorMessage('Session is loading...');
      return;
    }

    if (status === 'unauthenticated') {
      setIsFailed(true);
      setErrorMessage('You must be logged in to reserve');
      setTimeout(() => {
        setIsFailed(false);
        setErrorMessage('');
      }, 2000);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const token = session?.accessToken || session?.user?.token;
      console.log('Token from session:', token);

      if (!token) {
        throw new Error('No token found in session');
      }

      console.log('Request URL:', `http://localhost:5000/api/v1/companies/${selectedCompanyId}/appointments/`);
      console.log('Request Body:', JSON.stringify({ apptDate: new Date(selectedDate).toISOString() }));

      const response = await fetch(
        `http://localhost:5000/api/v1/companies/${selectedCompanyId}/appointments/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            apptDate: new Date(selectedDate).toISOString(),
          }),
        }
      );

      console.log('Response Status:', response.status);
      const data = await response.json();
      console.log('Response Data:', data);

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setSelectedDate('');
          setSelectedCompanyId('');
        }, 2000);
      } else {
        throw new Error(data.message || 'Reservation failed');
      }
    } catch (error: any) {
      setIsFailed(true);
      setErrorMessage(error.message);
      console.error('Error during reservation:', error);
      setTimeout(() => {
        setIsFailed(false);
        setErrorMessage('');
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4 mt-10 text-white relative min-h-screen">
      <div className="text-xl font-medium">Job Fair Reservation</div>
      <div className="w-fit space-y-2">
        <DateReserve onChange={handleDateReserveChange} />
      </div>
      {errorMessage && (
        <p className="text-red-400 text-center">{errorMessage}</p>
      )}
      <button
        onClick={handleReserve}
        disabled={isLoading || status === 'loading'}
        className={`block rounded-md px-3 py-2 shadow-sm text-white transition-colors duration-300 ${
          isSuccess
            ? 'bg-green-600 hover:bg-green-700'
            : isFailed
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-sky-600 hover:bg-indigo-600'
        }`}
      >
        {isLoading
          ? 'Reserving...'
          : isSuccess
          ? 'Success'
          : isFailed
          ? 'Failed'
          : 'Reserve'}
      </button>
      <button
        onClick={handleBack}
        className="absolute bottom-4 right-4 rounded-md bg-gray-600 hover:bg-gray-700 px-3 py-2 text-white shadow-sm"
      >
        Back
      </button>
    </main>
  );
}