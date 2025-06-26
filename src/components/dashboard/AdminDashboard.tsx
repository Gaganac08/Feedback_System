import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, TrendingUp, Settings, UserPlus, Eye, Shield } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { users, feedbacks, setView, logout } = useAppContext();

  const totalUsers = users.length;
  const totalManagers = users.filter(u => u.role === 'manager').length;
  const totalEmployees = users.filter(u => u.role === 'employee').length;
  const totalFeedbacks = feedbacks.length;
  const positiveFeedbacks = feedbacks.filter(f => f.sentiment === 'positive').length;
  const recentFeedbacks = feedbacks.slice(-5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">System Overview & Management</p>
          </div>
          <Button onClick={logout} variant="outline" className="bg-white/80 backdrop-blur-sm">
            <Shield className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{totalUsers}</div>
                <Users className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{totalFeedbacks}</div>
                <MessageSquare className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Managers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{totalManagers}</div>
                <Settings className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{totalEmployees}</div>
                <UserPlus className="w-8 h-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => setView('viewAllFeedback')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-12"
              >
                <Eye className="w-5 h-5 mr-2" />
                View All Feedback
              </Button>
              <Button 
                onClick={() => setView('teamOverview')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-12"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                System Overview
              </Button>
              <Button 
                onClick={() => setView('addEmployee')}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white h-12"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Recent Feedback Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedbacks.map((feedback) => {
                const manager = users.find(u => u.id === feedback.managerId);
                const employee = users.find(u => u.id === feedback.employeeId);
                return (
                  <div key={feedback.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {manager?.name} → {employee?.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {feedback.strengths.substring(0, 80)}...
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={feedback.sentiment === 'positive' ? 'default' : feedback.sentiment === 'neutral' ? 'secondary' : 'destructive'}
                        className={feedback.sentiment === 'positive' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {feedback.sentiment}
                      </Badge>
                      {feedback.acknowledged && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Acknowledged
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
              {recentFeedbacks.length === 0 && (
                <p className="text-gray-500 text-center py-8">No feedback activity yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;