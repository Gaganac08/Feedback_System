import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, TrendingUp, Plus, Eye, BarChart3 } from 'lucide-react';
import { User, Feedback } from '@/types';

interface ManagerDashboardProps {
  user: User;
  teamMembers: User[];
  feedbacks: Feedback[];
  onAddEmployee: () => void;
  onGiveFeedback: (employeeId: string) => void;
  onViewAllFeedback: () => void;
  onTeamOverview: () => void;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  user,
  teamMembers,
  feedbacks,
  onAddEmployee,
  onGiveFeedback,
  onViewAllFeedback,
  onTeamOverview
}) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const sentimentCounts = feedbacks.reduce((acc, feedback) => {
    acc[feedback.sentiment] = (acc[feedback.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const teamImpactScore = Math.round((sentimentCounts.positive || 0) / Math.max(feedbacks.length, 1) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Empower your team with meaningful feedback</p>
        </div>
        <Button onClick={onAddEmployee} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Total Feedback</CardTitle>
            <MessageSquare className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{feedbacks.length}</div>
            <p className="text-xs text-blue-200 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Positive Feedback</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sentimentCounts.positive || 0}</div>
            <p className="text-xs text-green-200 mt-1">Keep it up!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Team Impact</CardTitle>
            <BarChart3 className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamImpactScore}%</div>
            <p className="text-xs text-purple-200 mt-1">Positive rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              Recent Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Feedback you've shared with your team</p>
            <div className="space-y-3">
              {feedbacks.slice(0, 3).map((feedback) => {
                const employee = teamMembers.find(m => m.id === feedback.employeeId);
                return (
                  <div key={feedback.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{employee?.name}</p>
                      <Badge className={getSentimentColor(feedback.sentiment)} size="sm">
                        {feedback.sentiment}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Streamline your feedback workflow</p>
            <div className="space-y-3">
              <Button 
                onClick={() => onGiveFeedback('')} 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Give New Feedback
              </Button>
              <Button 
                onClick={onViewAllFeedback} 
                variant="outline" 
                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                View All Feedback
              </Button>
              <Button 
                onClick={onTeamOverview} 
                variant="outline" 
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Team Overview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => {
              const memberFeedbacks = feedbacks.filter(f => f.employeeId === member.id);
              const positiveFeedbacks = memberFeedbacks.filter(f => f.sentiment === 'positive').length;
              return (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">{memberFeedbacks.length} feedback(s)</Badge>
                      {positiveFeedbacks > 0 && (
                        <Badge className="bg-green-100 text-green-800">
                          {positiveFeedbacks} positive
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button onClick={() => onGiveFeedback(member.id)} size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Give Feedback
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerDashboard;