import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { hasProfile } from '../../lib/db';

export function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      if (user?.email) {
        const profileExists = await hasProfile(user.email);
        if (!profileExists) {
          navigate('/dashboard/profile');
        }
      }
    };
    checkProfile();
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}