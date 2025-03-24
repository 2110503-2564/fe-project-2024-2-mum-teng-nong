"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface Appointment {
  _id: string;
  apptDate: string;
  user: string;
  company: {
    _id: string;
    Companyname: string;
  };
  createdAt: string;
}

export default function MyBookingPage() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAppt, setEditingAppt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    const fetchAppointments = async () => {
      if (!session) {
        setError("You must be logged in to view bookings");
        setLoading(false);
        return;
      }

      try {
        const token = session?.accessToken || session?.user?.token;
        if (!token) throw new Error("No token found in session");

        const response = await fetch("http://localhost:5000/api/v1/appointments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("GET Response Status:", response.status);
        const data = await response.json();
        console.log("GET Response Data:", data);

        if (!response.ok) throw new Error(data.message || "Failed to fetch appointments");

        setAppointments(data.data || data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [session, status]);

  const handleEdit = (appt: Appointment) => {
    setEditingAppt(appt);
    setNewDate(dayjs(appt.apptDate));
  };

  const handleSaveEdit = async () => {
    if (!editingAppt || !newDate) return;

    const date = newDate.format("YYYY-MM-DD");
    const startDate = dayjs("2022-05-10");
    const endDate = dayjs("2022-05-13");

    if (newDate.isBefore(startDate) || newDate.isAfter(endDate)) {
      setError("You must select a date between May 10th and 13th, 2022");
      setTimeout(() => setError(null), 2000);
      return;
    }

    try {
      const token = session?.accessToken || session?.user?.token;
      console.log("PUT URL:", `http://localhost:5000/api/v1/appointments/${editingAppt._id}`);
      console.log("PUT Body:", JSON.stringify({ apptDate: newDate.toISOString() }));

      const response = await fetch(`http://localhost:5000/api/v1/appointments/${editingAppt._id}`, {
        method: "PUT", // เปลี่ยนจาก PATCH เป็น PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          apptDate: newDate.toISOString(),
        }),
      });

      console.log("PUT Response Status:", response.status);
      const data = await response.json();
      console.log("PUT Response Data:", data);

      if (!response.ok) {
        throw new Error(data.message || `Failed to update appointment (Status: ${response.status})`);
      }

      setAppointments(
        appointments.map((appt) =>
          appt._id === editingAppt._id ? { ...appt, apptDate: data.data.apptDate } : appt
        )
      );
      setEditingAppt(null);
      setNewDate(null);
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(null), 2000);
    }
  };

  const handleDelete = async (apptId: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const token = session?.accessToken || session?.user?.token;
      const response = await fetch(`http://localhost:5000/api/v1/appointments/${apptId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete appointment");
      }

      setAppointments(appointments.filter((appt) => appt._id !== apptId));
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(null), 2000);
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p>Please sign in to view your bookings</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center text-white bg-gray-900 pt-20">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {appointments.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="w-full max-w-2xl space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p><strong>Company:</strong> {appt.company.Companyname}</p>
                <p><strong>Date:</strong> {new Date(appt.apptDate).toLocaleDateString()}</p>
                <p><strong>Created At:</strong> {new Date(appt.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(appt)}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(appt._id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingAppt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit Appointment</h2>
            <p><strong>Company:</strong> {editingAppt.company.Companyname}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select New Date"
                value={newDate}
                onChange={(date) => setNewDate(date)}
                className="bg-white w-full mt-4"
                minDate={dayjs("2022-05-10")}
                maxDate={dayjs("2022-05-13")}
              />
            </LocalizationProvider>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setEditingAppt(null)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}