import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  MapPin,
  Calendar
} from 'lucide-react';
import { mockIssues, mockUser, mockAnalytics } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { PendingIssuesSection } from '@/components/issues/PendingIssuesSection';
import { Issue } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { toast } = useToast();
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  
  // Filter issues by user's authority role
  const authorityIssues = issues.filter(issue => issue.category === mockUser.role);
  const pendingIssues = authorityIssues.filter(issue => issue.status === 'pending');
  const inProgressIssues = authorityIssues.filter(issue => issue.status === 'in-progress');
  const completedIssues = authorityIssues.filter(issue => issue.status === 'completed');

  const handleStatusUpdate = (issueId: string, newStatus: Issue['status']) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId 
          ? { ...issue, status: newStatus, updatedAt: new Date() }
          : issue
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Issue ${issueId} status changed to ${newStatus.replace('-', ' ')}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="badge-pending">Pending</Badge>;
      case 'in-progress':
        return <Badge className="badge-progress">In Progress</Badge>;
      case 'completed':
        return <Badge className="badge-completed">Completed</Badge>;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="card-hero p-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-3 animate-slide-up">
              Welcome back, {mockUser.name}
            </h1>
            <p className="text-primary-foreground/90 text-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
              {mockUser.department} • Managing {authorityIssues.length} total issues
            </p>
          </div>
          <div className="hidden lg:block animate-float">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Users className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-elevated group hover-glow animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Issues</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{authorityIssues.length}</div>
            <p className="text-sm text-success flex items-center">
              <span className="text-success mr-1">↗</span>
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated group hover-glow animate-scale-in" style={{animationDelay: '0.1s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <div className="p-2 bg-warning/10 rounded-lg group-hover:bg-warning/20 transition-colors">
              <Clock className="h-5 w-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1 text-warning">{pendingIssues.length}</div>
            <p className="text-sm text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated group hover-glow animate-scale-in" style={{animationDelay: '0.2s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1 text-primary">{inProgressIssues.length}</div>
            <p className="text-sm text-muted-foreground">
              Currently working
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated group hover-glow animate-scale-in" style={{animationDelay: '0.3s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <div className="p-2 bg-success/10 rounded-lg group-hover:bg-success/20 transition-colors">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1 text-success">{completedIssues.length}</div>
            <p className="text-sm text-success">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Issues */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-warning" />
              <span>Pending Issues</span>
            </CardTitle>
            <CardDescription>
              Issues requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingIssues.slice(0, 3).map((issue) => (
              <div key={issue.id} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{issue.title}</h4>
                    <span className={`text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{issue.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{issue.location}</span>
                    <span>•</span>
                    <Calendar className="h-3 w-3" />
                    <span>{formatDistanceToNow(issue.createdAt, { addSuffix: true })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Reported by {issue.reporter}
                    </span>
                    {getStatusBadge(issue.status)}
                  </div>
                </div>
              </div>
            ))}
            {pendingIssues.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No pending issues!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* In Progress Issues */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>In Progress</span>
            </CardTitle>
            <CardDescription>
              Issues currently being resolved
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inProgressIssues.slice(0, 3).map((issue) => (
              <div key={issue.id} className="flex items-start space-x-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{issue.title}</h4>
                    <span className={`text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{issue.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{issue.location}</span>
                    <span>•</span>
                    <Calendar className="h-3 w-3" />
                    <span>{formatDistanceToNow(issue.updatedAt, { addSuffix: true })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Reported by {issue.reporter}
                    </span>
                    {getStatusBadge(issue.status)}
                  </div>
                </div>
              </div>
            ))}
            {inProgressIssues.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No issues in progress</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Issues Section */}
      <PendingIssuesSection
        issues={authorityIssues}
        onStatusUpdate={handleStatusUpdate}
      />

      {/* Quick Actions */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks for {mockUser.department}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <AlertTriangle className="h-6 w-6" />
              <span>View All Issues</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Update Status</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Assign Team</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}