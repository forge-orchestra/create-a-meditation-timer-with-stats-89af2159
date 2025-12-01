'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader, AlertCircle } from 'lucide-react';
import { type NextPage } from 'next';
import 'tailwindcss/tailwind.css';

const HomePage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate data fetching
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="text-red-500" size={48} />
          <p className="mt-4 text-lg text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Forge App</h1>
          <p className="mt-2 text-gray-600">Manage your meditation sessions effectively</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800">Customizable Timer</h2>
              <p className="mt-4 text-gray-600">
                Set your meditation sessions with a customizable timer to fit your needs.
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img src="/images/timer.png" alt="Timer" className="w-full h-auto" />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <img src="/images/stats.png" alt="Statistics" className="w-full h-auto" />
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-2xl font-bold text-gray-800">Session Statistics</h2>
              <p className="mt-4 text-gray-600">
                Track your meditation history and visualize your progress with intuitive charts.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800">User Profiles</h2>
              <p className="mt-4 text-gray-600">
                Create and manage user profiles to personalize your meditation experience.
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img src="/images/profiles.png" alt="Profiles" className="w-full h-auto" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white shadow mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-600">© 2023 Forge App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;