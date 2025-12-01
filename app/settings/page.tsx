'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, User } from 'lucide-react';
import { Switch } from '@headlessui/react';

type UserPreferences = {
  notifications: boolean;
  darkMode: boolean;
};

const SettingsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>({
    notifications: false,
    darkMode: false,
  });

  const router = useRouter();

  useEffect(() => {
    // Simulate fetching user preferences
    const fetchPreferences = async () => {
      try {
        // Simulate API call
        const response = await new Promise<UserPreferences>((resolve) =>
          setTimeout(() => resolve({ notifications: true, darkMode: false }), 1000)
        );
        setPreferences(response);
      } catch (err) {
        setError('Failed to load preferences');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const handleToggle = (field: keyof UserPreferences) => {
    setPreferences((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          <span>Notifications</span>
        </div>
        <Switch
          checked={preferences.notifications}
          onChange={() => handleToggle('notifications')}
          className={`${preferences.notifications ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${preferences.notifications ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          <span>Dark Mode</span>
        </div>
        <Switch
          checked={preferences.darkMode}
          onChange={() => handleToggle('darkMode')}
          className={`${preferences.darkMode ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${preferences.darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default SettingsPage;