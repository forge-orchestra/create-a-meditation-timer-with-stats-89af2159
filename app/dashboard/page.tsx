"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import { User, Session } from '@/types';
import { Loader, AlertCircle } from 'lucide-react';

type DashboardProps = {
  user: User;
  sessions: Session[];
};

const Dashboard: React.FC<DashboardProps> = ({ user, sessions }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      const data = sessions.map(session => session.duration);
      setSessionData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load session data');
      setLoading(false);
    }
  }, [user, sessions, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 flex items-center">
          <AlertCircle size={32} />
          <span className="ml-2">{error}</span>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: sessions.map(session => new Date(session.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Meditation Duration (minutes)',
        data: sessionData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <Line data={chartData} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Session History</h2>
        <ul>
          {sessions.map(session => (
            <li key={session.id} className="border-b border-gray-200 py-2">
              {new Date(session.date).toLocaleDateString()} - {session.duration} minutes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;