import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Users, TrendingUp, Award, Target } from 'lucide-react';
import { User, Feedback } from '@/types';

interface TeamOverviewProps {
  teamMembers: User[];
  feedbacks: Feedback[];
  onBack: () => void;
}

const TeamOverview: React.FC<TeamOverviewProps> = ({
  teamMembers,
  feedbacks,
  onBack
}) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTeamMemberStats = (memberId: string) => {
    const memberFeedbacks = feedbacks.filter(f => f.employeeId === memberId);
    const positiveFeedbacks = memberFeedbacks.filter(f => f.sentiment === 'positive').length;
    const totalFeedbacks = memberFeedbacks.length;
    const positiveRate = totalFeedbacks > 0 ? Math.round((positiveFeedbacks / totalFeedbacks) * 100) : 0;
    const acknowledgedCount = memberFeedbacks.filter(f => f.acknowledged).length;
    
    return {
      totalFeedbacks,
      positiveFeedbacks,
      positiveRate,
      acknowledgedCount,
      latestFeedback: memberFeedbacks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    };
  };

  const overallStats = {
    totalFeedbacks: feedbacks.length,
    positiveFeedbacks: feedbacks.filter(f => f.sentiment === 'positive').length,
    neutralFeedbacks: feedbacks.filter(f => f.sentiment === 'neutral').length,
    negativeFeedbacks: feedbacks.filter(f => f.sentiment === 'negative').length,
    acknowledgedFeedbacks: feedbacks.filter(f => f.acknowledged).length
  };

  const teamPositiveRate = overallStats.totalFeedbacks > 0 
    ? Math.round((overallStats.positiveFeedbacks / overallStats.totalFeedbacks) * 100) 
    : 0;

  const acknowledgmentRate = overallStats.totalFeedbacks > 0
    ? Math.round((overallStats.acknowledgedFeedbacks / overallStats.totalFeedbacks) * 100)
    : 0;

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
              Team Overview
            </h1>
            <p className="text-gray-600">Comprehensive team performance insights</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Team Members</CardTitle>
            <Users className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-blue-200 mt-1">Active members</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Positive Rate</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamPositiveRate}%</div>
            <p className="text-xs text-green-200 mt-1">Team performance</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Total Feedback</CardTitle>
            <Award className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overallStats.totalFeedbacks}</div>
            <p className="text-xs text-purple-200 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-400 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Engagement</CardTitle>
            <Target className="h-5 w-5 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{acknowledgmentRate}%</div>
            <p className="text-xs text-orange-200 mt-1">Acknowledged</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Positive Feedback</span>
                <span className="text-sm text-gray-600">{overallStats.positiveFeedbacks}/{overallStats.totalFeedbacks}</span>
              </div>
              <Progress value={teamPositiveRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Acknowledgment Rate</span>
                <span className="text-sm text-gray-600">{overallStats.acknowledgedFeedbacks}/{overallStats.totalFeedbacks}</span>
              </div>
              <Progress value={acknowledgmentRate} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{overallStats.positiveFeedbacks}</div>
                <div className="text-xs text-green-600">Positive</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{overallStats.neutralFeedbacks}</div>
                <div className="text-xs text-yellow-600">Neutral</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{overallStats.negativeFeedbacks}</div>
                <div className="text-xs text-red-600">Negative</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Individual Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => {
                const stats = getTeamMemberStats(member.id);
                return (
                  <div key={member.id} className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{stats.positiveRate}%</div>
                        <div className="text-xs text-gray-500">Positive rate</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Feedback: {stats.totalFeedbacks}</span>
                      <span>Acknowledged: {stats.acknowledgedCount}</span>
                    </div>
                    <Progress value={stats.positiveRate} className="h-1 mt-2" />
                    {stats.latestFeedback && (
                      <div className="mt-2">
                        <Badge className={getSentimentColor(stats.latestFeedback.sentiment)} size="sm">
                          Latest: {stats.latestFeedback.sentiment}
                        </Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamOverview;