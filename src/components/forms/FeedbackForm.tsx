import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { FeedbackFormData, User } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface FeedbackFormProps {
  employeeName: string;
  teamMembers?: User[];
  selectedEmployeeId?: string | null;
  onEmployeeSelect?: (id: string) => void;
  onSubmit: (data: FeedbackFormData) => void;
  onCancel: () => void;
  initialData?: FeedbackFormData;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  employeeName,
  teamMembers = [],
  selectedEmployeeId,
  onEmployeeSelect,
  onSubmit,
  onCancel,
  initialData
}) => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    strengths: initialData?.strengths || '',
    improvements: initialData?.improvements || '',
    sentiment: initialData?.sentiment || 'neutral'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.strengths.trim() || !formData.improvements.trim()) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    if (!selectedEmployeeId && teamMembers.length > 0) {
      toast({ title: 'Error', description: 'Please select an employee', variant: 'destructive' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onSubmit(formData);
      setLoading(false);
    }, 500);
  };

  const selectedEmployee = teamMembers.find(m => m.id === selectedEmployeeId);
  const displayName = selectedEmployee?.name || employeeName;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={onCancel} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Give Feedback
          </h1>
          <p className="text-gray-600">Share constructive feedback with your team member</p>
        </div>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Feedback Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {teamMembers.length > 0 && (
              <div>
                <Label htmlFor="employee" className="text-blue-700 font-semibold">Select Employee</Label>
                <Select value={selectedEmployeeId || ''} onValueChange={onEmployeeSelect}>
                  <SelectTrigger className="border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="Choose an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map(member => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} - {member.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {displayName !== 'Select Employee' && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <p className="text-lg font-semibold text-gray-800">Giving feedback to: {displayName}</p>
              </div>
            )}

            <div>
              <Label htmlFor="strengths" className="text-green-700 font-semibold">💪 Strengths & Achievements</Label>
              <Textarea
                id="strengths"
                value={formData.strengths}
                onChange={(e) => setFormData(prev => ({ ...prev, strengths: e.target.value }))}
                placeholder="What are this employee's key strengths and recent achievements?"
                className="min-h-[100px] border-green-200 focus:border-green-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="improvements" className="text-orange-700 font-semibold">🎯 Areas for Growth</Label>
              <Textarea
                id="improvements"
                value={formData.improvements}
                onChange={(e) => setFormData(prev => ({ ...prev, improvements: e.target.value }))}
                placeholder="What areas could benefit from development or improvement?"
                className="min-h-[100px] border-orange-200 focus:border-orange-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="sentiment" className="text-purple-700 font-semibold">Overall Assessment</Label>
              <Select value={formData.sentiment} onValueChange={(value: 'positive' | 'neutral' | 'negative') => 
                setFormData(prev => ({ ...prev, sentiment: value }))
              }>
                <SelectTrigger className="border-purple-200 focus:border-purple-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">🟢 Positive - Exceeding expectations</SelectItem>
                  <SelectItem value="neutral">🟡 Neutral - Meeting expectations</SelectItem>
                  <SelectItem value="negative">🔴 Needs Improvement - Below expectations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={loading || (!selectedEmployeeId && teamMembers.length > 0)} 
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackForm;