import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Impact } from './components/Impact';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { CallToAction } from './components/CallToAction';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { Profile } from './pages/dashboard/Profile';
import { Activity } from './pages/dashboard/Activity';
import { BloodSugar } from './pages/dashboard/BloodSugar';
import { Medication } from './pages/dashboard/Medication';
import { Diet } from './pages/dashboard/Diet';
import { Rewards } from './pages/dashboard/Rewards';
import { AuthProvider } from './lib/auth';
import { useAuth } from './hooks/useAuth';
import { Menu, X } from 'lucide-react';
import { Button } from './components/ui/Button';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuth();

  return (
    <nav className="glass-effect fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold gradient-text">
              NirogPath
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#impact" className="text-gray-300 hover:text-white transition">Impact</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition">Success Stories</a>
            {!user && (
              <Link to="/login">
                <Button>Get Started Now</Button>
              </Link>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass-effect absolute top-16 left-0 right-0 p-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-300 hover:text-white transition px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#impact" 
                className="text-gray-300 hover:text-white transition px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Impact
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-300 hover:text-white transition px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Success Stories
              </a>
              {!user && (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started Now
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <Features />
      <Impact />
      <Testimonials />
      <CallToAction />
    </>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="activity" element={<Activity />} />
            <Route path="blood-sugar" element={<BloodSugar />} />
            <Route path="medication" element={<Medication />} />
            <Route path="diet" element={<Diet />} />
            <Route path="rewards" element={<Rewards />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}