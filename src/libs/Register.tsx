// src/components/Register.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
  phonenum: string;
  sex?: 'male' | 'female' | 'other' | 'undefined';
}

interface RegisterResponse {
  success: boolean;
  token?: string;
  message?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phonenum: '',
    sex: 'undefined'
  });
  const [message, setMessage] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = (): boolean => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(formData.email)) {
      setMessage('Please add a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return false;
    }
    if (!formData.name || !formData.phonenum) {
      setMessage('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('https://backend-gilt-five-89.vercel.app/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data: RegisterResponse = await response.json();
      if (response.ok) {
        setMessage('Registration successful!');
        setIsRegistered(true);
        setFormData({
          name: '',
          email: '',
          password: '',
          phonenum: '',
          sex: 'undefined'
        });
      } else {
        setMessage(data.message || 'Registration failed.');
        setIsRegistered(false);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setIsRegistered(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Register</h2>
        {message && (
          <p
            className={`text-center mb-6 ${
              isRegistered ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-white block mb-2 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-white block mb-2 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-white block mb-2 font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
              className="w-full px-4 py-3 bg-gray-700 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-white block mb-2 font-medium">Phone Number:</label>
            <input
              type="text"
              name="phonenum"
              value={formData.phonenum}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-white block mb-2 font-medium">Sex:</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="undefined">Undefined</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-md transition duration-300 ${
              isRegistered
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRegistered ? 'Success' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;