import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send, MessageCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface RequestFeedbackProps {
  onBack: () => void;
  onSubmit: () => void;
}

const RequestFeedback: React.FC<RequestFeedbackProps> = ({
  onBack,
  onSubmit
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Success',
        description: 'Your feedback request has been sent to your manager!'
      });
      setIsSubmitting(false);
      onSubmit();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Request Feedback
          </h1>
          <p className="text-gray-600">Proactively seek feedback from your manager</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                Feedback Request Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Feedback on recent project performance"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low - General feedback</option>
                    <option value="normal">Normal - Regular check-in</option>
                    <option value="high">High - Urgent feedback needed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please provide specific areas you'd like feedback on..."
                    rows={6}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Request
                      </div>
                    )}
                  </Button>
                  <Button type="button" onClick={onBack} variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-lg">💡 Tips for Requesting Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Be Specific</h4>
                <p className="text-sm text-gray-600">
                  Mention specific projects, skills, or situations you want feedback on.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Ask Open Questions</h4>
                <p className="text-sm text-gray-600">
                  "What could I improve?" works better than "Am I doing well?"
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Show Initiative</h4>
                <p className="text-sm text-gray-600">
                  Demonstrate that you're actively seeking growth opportunities.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Be Receptive</h4>
                <p className="text-sm text-gray-600">
                  Show that you value constructive feedback and are ready to act on it.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">📝 Sample Request</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Subject:</strong> Feedback on Q4 Project Leadership</p>
                <p><strong>Message:</strong> Hi [Manager], I'd appreciate your feedback on my leadership during the recent Q4 project. Specifically, I'd like to know how I handled team coordination and if there are areas where I can improve my communication with stakeholders.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestFeedback;