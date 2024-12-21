import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Droplet, 
  Pill, 
  Activity,
  User,
  LogOut,
  UtensilsCrossed,
  Trophy
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../lib/auth';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Droplet, label: 'Blood Sugar', path: '/dashboard/blood-sugar' },
  { icon: Pill, label: 'Medication', path: '/dashboard/medication' },
  { icon: Activity, label: 'Activity', path: '/dashboard/activity' },
  { icon: UtensilsCrossed, label: 'Diet', path: '/dashboard/diet' },
  { icon: Trophy, label: 'Rewards', path: '/dashboard/rewards' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
];

export function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <div className="h-screen w-64 glass-effect border-r border-white/10 p-4 flex flex-col">
      <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 mb-6">
        <span className="text-xl font-bold gradient-text">NirogPath</span>
      </Link>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-300 hover:bg-white/10'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button 
        onClick={signOut}
        className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/10 rounded-lg transition-colors mt-auto"
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}