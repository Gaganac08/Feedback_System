import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface SignupFormProps {
  onSignup: (email: string, name: string, role: 'manager' | 'employee' | 'admin') => void;
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'manager' | 'employee' | 'admin'>('employee');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email && name && password) {
        onSignup(email, name, role);
        toast({ title: 'Account created!', description: `Welcome ${name}!` });
      } else {
        toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Join Our Team
        </CardTitle>
        <p className="text-gray-600 mt-2">Create your account</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-1 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
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
              placeholder="Create a password"
              className="mt-1 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="role" className="text-gray-700 font-medium">Role</Label>
            <Select value={role} onValueChange={(value: 'manager' | 'employee' | 'admin') => setRole(value)}>
              <SelectTrigger className="mt-1 bg-white/80 border-gray-200">
                <SelectValue />
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
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105" 
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Button variant="link" onClick={onSwitchToLogin} className="text-blue-600 hover:text-purple-600">
            Already have an account? Sign in
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;