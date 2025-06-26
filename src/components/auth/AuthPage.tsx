import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthPageProps {
  onAuthenticated: (user: { email: string; name: string; role: 'manager' | 'employee' | 'admin' }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (email: string, role: 'manager' | 'employee' | 'admin') => {
    // Extract name from email for demo purposes
    let name = email.split('@')[0];
    if (email === 'admin@company.com') name = 'Super Admin';
    else if (email === 'manager@company.com') name = 'Manager';
    else if (email === 'gagan@company.com') name = 'Gagan A C';
    else if (email === 'punith@company.com') name = 'Punith';
    else if (email === 'shivashankar@company.com') name = 'Shivashankar';
    else if (email === 'sharath@company.com') name = 'Sharath';
    else if (email === 'jeevan@company.com') name = 'Jeevan';
    else if (email === 'tejas@company.com') name = 'Tejas';
    
    onAuthenticated({ email, name, role });
  };

  const handleSignup = (email: string, name: string, role: 'manager' | 'employee' | 'admin') => {
    onAuthenticated({ email, name, role });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-pink-100/20"></div>
      <div className="relative w-full max-w-md">
        {isLogin ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;