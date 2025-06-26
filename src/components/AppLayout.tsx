import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import AuthPage from './auth/AuthPage';
import ManagerDashboard from './dashboard/ManagerDashboard';
import EmployeeDashboard from './dashboard/EmployeeDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import FeedbackForm from './forms/FeedbackForm';
import AddEmployeeForm from './forms/AddEmployeeForm';
import ViewAllFeedback from './feedback/ViewAllFeedback';
import TeamOverview from './team/TeamOverview';
import RequestFeedback from './feedback/RequestFeedback';

const AppLayout: React.FC = () => {
  const {
    user,
    users,
    feedbacks,
    currentView,
    selectedEmployeeId,
    login,
    logout,
    setView,
    setSelectedEmployee,
    addEmployee,
    submitFeedback,
    acknowledgeFeedback
  } = useAppContext();

  if (currentView === 'auth' || !user) {
    return <AuthPage onAuthenticated={(userData) => login(userData.email, userData.name, userData.role)} />;
  }

  const teamMembers = user.role === 'manager' 
    ? users.filter(u => u.managerId === user.id)
    : user.role === 'admin'
    ? users.filter(u => u.role === 'employee')
    : [];
  
  const userFeedbacks = user.role === 'employee'
    ? feedbacks.filter(f => f.employeeId === user.id)
    : user.role === 'admin'
    ? feedbacks
    : feedbacks.filter(f => f.managerId === user.id);

  const selectedEmployee = selectedEmployeeId ? users.find(u => u.id === selectedEmployeeId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">FL</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FeedbackLink
                </h1>
                <p className="text-sm text-gray-600">Transform feedback into growth</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.name} ({user.role})</span>
              <Button onClick={logout} variant="outline" className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && user.role === 'admin' && (
          <AdminDashboard />
        )}

        {currentView === 'dashboard' && user.role === 'manager' && (
          <ManagerDashboard
            user={user}
            teamMembers={teamMembers}
            feedbacks={userFeedbacks}
            onAddEmployee={() => setView('addEmployee')}
            onGiveFeedback={(employeeId) => {
              if (employeeId) {
                setSelectedEmployee(employeeId);
                setView('feedback');
              } else {
                setView('feedback');
              }
            }}
            onViewAllFeedback={() => setView('viewAllFeedback')}
            onTeamOverview={() => setView('teamOverview')}
          />
        )}

        {currentView === 'dashboard' && user.role === 'employee' && (
          <EmployeeDashboard
            user={user}
            feedbacks={userFeedbacks}
            onAcknowledgeFeedback={acknowledgeFeedback}
            onViewAllFeedback={() => setView('viewAllFeedback')}
            onRequestFeedback={() => setView('requestFeedback')}
          />
        )}

        {currentView === 'feedback' && (
          <FeedbackForm
            employeeName={selectedEmployee?.name || 'Select Employee'}
            teamMembers={teamMembers}
            selectedEmployeeId={selectedEmployeeId}
            onEmployeeSelect={setSelectedEmployee}
            onSubmit={(data) => {
              if (selectedEmployeeId) {
                submitFeedback(selectedEmployeeId, data);
              }
            }}
            onCancel={() => {
              setSelectedEmployee(null);
              setView('dashboard');
            }}
          />
        )}

        {currentView === 'addEmployee' && (
          <AddEmployeeForm
            onSubmit={addEmployee}
            onCancel={() => setView('dashboard')}
          />
        )}

        {currentView === 'viewAllFeedback' && (
          <ViewAllFeedback
            feedbacks={userFeedbacks}
            users={users}
            currentUser={user}
            onBack={() => setView('dashboard')}
          />
        )}

        {currentView === 'teamOverview' && (user.role === 'manager' || user.role === 'admin') && (
          <TeamOverview
            teamMembers={teamMembers}
            feedbacks={userFeedbacks}
            onBack={() => setView('dashboard')}
          />
        )}

        {currentView === 'requestFeedback' && user.role === 'employee' && (
          <RequestFeedback
            onBack={() => setView('dashboard')}
            onSubmit={() => {
              setView('dashboard');
            }}
          />
        )}
      </main>
    </div>
  );
};

export default AppLayout;