import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface LoginFormProps {
  onLogin: (email: string, role: 'manager' | 'employee' | 'admin') => void;
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'manager' | 'employee' | 'admin'>('employee');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication - in real app, this would call an API
    setTimeout(() => {
      if (email && password) {
        // Auto-detect role based on email or use selected role
        let detectedRole = role;
        if (email.includes('admin')) detectedRole = 'admin';
        else if (email.includes('manager')) detectedRole = 'manager';
        
        onLogin(email, detectedRole);
        toast({ title: 'Login successful!', description: `Welcome back, ${email}` });
      } else {
        toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="role" className="text-gray-700 font-medium">Role</Label>
            <Select value={role} onValueChange={(value: 'manager' | 'employee' | 'admin') => setRole(value)}>
              <SelectTrigger className="mt-1 bg-white/80 border-gray-200">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105" 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Button variant="link" onClick={onSwitchToSignup} className="text-blue-600 hover:text-purple-600">
            Don't have an account? Sign up
          </Button>
        </div>
        
        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Admin:</strong> admin@company.com</p>
            <p><strong>Manager:</strong> manager@company.com</p>
            <p><strong>Employee:</strong> gagan@company.com</p>
            <p className="text-gray-500 mt-2">Password: any</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;