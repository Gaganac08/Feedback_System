import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

interface AddEmployeeFormProps {
  onSubmit: (name: string, email: string) => void;
  onCancel: () => void;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onSubmit(name.trim(), email.trim());
      setLoading(false);
    }, 500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Add New Employee
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter employee's full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter employee's email"
              required
            />
          </div>
          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Adding...' : 'Add Employee'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEmployeeForm;