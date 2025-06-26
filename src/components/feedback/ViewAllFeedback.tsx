import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { User, Feedback } from '@/types';

interface ViewAllFeedbackProps {
  feedbacks: Feedback[];
  users: User[];
  currentUser: User;
  onBack: () => void;
}

const ViewAllFeedback: React.FC<ViewAllFeedbackProps> = ({
  feedbacks,
  users,
  currentUser,
  onBack
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState<string>('all');

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const employee = users.find(u => u.id === feedback.employeeId);
    const matchesSearch = employee?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.strengths.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.improvements.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSentiment = filterSentiment === 'all' || feedback.sentiment === filterSentiment;
    return matchesSearch && matchesSentiment;
  });

  const sentimentCounts = feedbacks.reduce((acc, feedback) => {
    acc[feedback.sentiment] = (acc[feedback.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              All Feedback
            </h1>
            <p className="text-gray-600">Complete feedback history</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-700">{feedbacks.length}</div>
            <p className="text-sm text-blue-600">Total Feedback</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-700">{sentimentCounts.positive || 0}</div>
            <p className="text-sm text-green-600">Positive</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-700">{sentimentCounts.neutral || 0}</div>
            <p className="text-sm text-yellow-600">Neutral</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-700">{sentimentCounts.negative || 0}</div>
            <p className="text-sm text-red-600">Negative</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Feedback History</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterSentiment}
                onChange={(e) => setFilterSentiment(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFeedbacks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No feedback found matching your criteria.</p>
              </div>
            ) : (
              filteredFeedbacks.map((feedback) => {
                const employee = users.find(u => u.id === feedback.employeeId);
                const manager = users.find(u => u.id === feedback.managerId);
                return (
                  <div key={feedback.id} className="border rounded-lg p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getSentimentColor(feedback.sentiment)}>
                          {feedback.sentiment}
                        </Badge>
                        <div>
                          <p className="font-semibold">
                            {currentUser.role === 'manager' ? `For: ${employee?.name}` : `From: ${manager?.name}`}
                          </p>
                          <p className="text-sm text-gray-600">{employee?.email || manager?.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </span>
                        <div className={`text-xs mt-1 ${feedback.acknowledged ? 'text-green-600' : 'text-orange-600'}`}>
                          {feedback.acknowledged ? '✓ Acknowledged' : 'Pending'}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">💪 Strengths:</h4>
                        <p className="text-sm text-gray-700 bg-green-50 p-3 rounded">{feedback.strengths}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-700 mb-2">🎯 Areas to Improve:</h4>
                        <p className="text-sm text-gray-700 bg-orange-50 p-3 rounded">{feedback.improvements}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewAllFeedback;