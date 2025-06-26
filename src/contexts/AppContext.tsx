import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { User, Feedback } from '@/types';

interface AppContextType {
  user: User | null;
  users: User[];
  feedbacks: Feedback[];
  currentView: 'auth' | 'dashboard' | 'feedback' | 'addEmployee' | 'viewAllFeedback' | 'teamOverview' | 'requestFeedback';
  selectedEmployeeId: string | null;
  login: (email: string, name: string, role: 'manager' | 'employee' | 'admin') => void;
  logout: () => void;
  setView: (view: 'auth' | 'dashboard' | 'feedback' | 'addEmployee' | 'viewAllFeedback' | 'teamOverview' | 'requestFeedback') => void;
  setSelectedEmployee: (id: string | null) => void;
  addEmployee: (name: string, email: string) => void;
  submitFeedback: (employeeId: string, data: any) => void;
  acknowledgeFeedback: (feedbackId: string) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'auth' | 'dashboard' | 'feedback' | 'addEmployee' | 'viewAllFeedback' | 'teamOverview' | 'requestFeedback'>('auth');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  
  // Initialize with sample data including the requested employee names and admin
  const [users, setUsers] = useState<User[]>([
    { id: '0', email: 'admin@company.com', name: 'Super Admin', role: 'admin' },
    { id: '1', email: 'manager@company.com', name: 'Manager', role: 'manager' },
    { id: '2', email: 'gagan@company.com', name: 'Gagan A C', role: 'employee', managerId: '1' },
    { id: '3', email: 'punith@company.com', name: 'Punith', role: 'employee', managerId: '1' },
    { id: '4', email: 'shivashankar@company.com', name: 'Shivashankar', role: 'employee', managerId: '1' },
    { id: '5', email: 'sharath@company.com', name: 'Sharath', role: 'employee', managerId: '1' },
    { id: '6', email: 'jeevan@company.com', name: 'Jeevan', role: 'employee', managerId: '1' },
    { id: '7', email: 'tejas@company.com', name: 'Tejas', role: 'employee', managerId: '1' }
  ]);
  
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      managerId: '1',
      employeeId: '2',
      strengths: 'Excellent problem-solving skills and great team collaboration. Shows initiative in taking on challenging tasks.',
      improvements: 'Could improve time management and communication with stakeholders. Consider taking leadership training.',
      sentiment: 'positive',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      acknowledged: false
    },
    {
      id: '2',
      managerId: '1',
      employeeId: '3',
      strengths: 'Strong technical skills and attention to detail. Consistently delivers high-quality work.',
      improvements: 'Would benefit from more proactive communication and involvement in team discussions.',
      sentiment: 'positive',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      acknowledged: true
    },
    {
      id: '3',
      managerId: '1',
      employeeId: '4',
      strengths: 'Great leadership potential and excellent communication skills. Always willing to help team members.',
      improvements: 'Focus on technical depth and consider specializing in specific areas.',
      sentiment: 'positive',
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      acknowledged: true
    }
  ]);

  const login = (email: string, name: string, role: 'manager' | 'employee' | 'admin') => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      setUser(existingUser);
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role,
        managerId: role === 'employee' ? '1' : undefined
      };
      setUsers(prev => [...prev, newUser]);
      setUser(newUser);
    }
    setCurrentView('dashboard');
    toast({ title: 'Welcome!', description: `Successfully logged in as ${name}` });
  };

  const logout = () => {
    setUser(null);
    setCurrentView('auth');
    setSelectedEmployeeId(null);
    toast({ title: 'Goodbye!', description: 'Successfully logged out' });
  };

  const addEmployee = (name: string, email: string) => {
    const newEmployee: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'employee',
      managerId: user?.role === 'admin' ? '1' : user?.id
    };
    setUsers(prev => [...prev, newEmployee]);
    setCurrentView('dashboard');
    toast({ title: 'Success', description: `${name} added to the team!` });
  };

  const submitFeedback = (employeeId: string, data: any) => {
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      managerId: user!.id,
      employeeId,
      strengths: data.strengths,
      improvements: data.improvements,
      sentiment: data.sentiment,
      createdAt: new Date().toISOString(),
      acknowledged: false
    };
    setFeedbacks(prev => [...prev, newFeedback]);
    setCurrentView('dashboard');
    setSelectedEmployeeId(null);
    toast({ title: 'Success', description: 'Feedback submitted successfully!' });
  };

  const acknowledgeFeedback = (feedbackId: string) => {
    setFeedbacks(prev => prev.map(f => 
      f.id === feedbackId ? { ...f, acknowledged: true } : f
    ));
    toast({ title: 'Success', description: 'Feedback acknowledged!' });
  };

  return (
    <AppContext.Provider value={{
      user,
      users,
      feedbacks,
      currentView,
      selectedEmployeeId,
      login,
      logout,
      setView: setCurrentView,
      setSelectedEmployee: setSelectedEmployeeId,
      addEmployee,
      submitFeedback,
      acknowledgeFeedback
    }}>
      {children}
    </AppContext.Provider>
  );
};