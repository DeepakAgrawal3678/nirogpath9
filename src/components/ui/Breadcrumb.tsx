import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeNames: Record<string, string> = {
  '': 'Home',
  'login': 'Login',
  'signup': 'Sign Up',
};

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-300 mb-6">
      <Link
        to="/"
        className="flex items-center hover:text-white transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {pathnames.length > 0 && (
        <ChevronRight className="w-4 h-4 text-slate-500" />
      )}

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <Link
              to={routeTo}
              className={`${
                isLast
                  ? 'text-orange-500 pointer-events-none'
                  : 'hover:text-white transition-colors'
              }`}
            >
              {routeNames[name] || name}
            </Link>
            
            {!isLast && (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}