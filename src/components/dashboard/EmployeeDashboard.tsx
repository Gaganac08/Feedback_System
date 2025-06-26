import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, TrendingUp, BarChart3, Eye, MessageCircle } from 'lucide-react';
import { User, Feedback } from '@/types';

interface EmployeeDashboardProps {
  user: User;
  feedbacks: Feedback[];
  onAcknowledgeFeedback: (feedbackId: string) => void;
  onViewAllFeedback: () => void;
  onRequestFeedback: () => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  user,
  feedbacks,
  onAcknowledgeFeedback,
  onViewAllFeedback,
  onRequestFeedback
}) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const positiveFeedbacks = feedbacks.filter(f => f.sentiment === 'positive').length;
  const growthAreas = feedbacks.filter(f => !f.acknowledged).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">Track your growth journey</p>
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
            <div className="text-3xl font-bold">{positiveFeedbacks}</div>
            <p className="text-xs text-green-200 mt-1">Keep it up!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Growth Areas</CardTitle>
            <BarChart3 className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{growthAreas}</div>
            <p className="text-xs text-purple-200 mt-1">Unread items</p>
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
            <p className="text-gray-600 mb-4">Latest feedback from your manager</p>
            <div className="space-y-3">
              {feedbacks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No feedback received yet</p>
                </div>
              ) : (
                feedbacks.slice(0, 3).map((feedback) => (
                  <div key={feedback.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getSentimentColor(feedback.sentiment)} size="sm">
                        {feedback.sentiment}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{feedback.strengths}</p>
                    {!feedback.acknowledged && (
                      <Button 
                        size="sm" 
                        onClick={() => onAcknowledgeFeedback(feedback.id)}
                        className="mt-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Streamline your feedback workflow</p>
            <div className="space-y-3">
              <Button 
                onClick={onViewAllFeedback} 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Eye className="w-4 h-4 mr-2" />
                View All Feedback
              </Button>
              <Button 
                onClick={onRequestFeedback} 
                variant="outline" 
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Request Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {feedbacks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Feedback Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbacks.slice(0, 5).map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className={getSentimentColor(feedback.sentiment)}>
                      {feedback.sentiment}
                    </Badge>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </span>
                      <div className={`text-xs mt-1 ${feedback.acknowledged ? 'text-green-600' : 'text-orange-600'}`}>
                        {feedback.acknowledged ? '✓ Read' : 'Unread'}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-1">💪 Strengths:</h4>
                      <p className="text-sm text-gray-700">{feedback.strengths}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-1">🎯 Growth Areas:</h4>
                      <p className="text-sm text-gray-700">{feedback.improvements}</p>
                    </div>
                  </div>
                  {!feedback.acknowledged && (
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => onAcknowledgeFeedback(feedback.id)}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        Mark as Read
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeDashboard;