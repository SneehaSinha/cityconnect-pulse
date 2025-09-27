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

export default function Dashboard() {
  // Filter issues by user's authority role
  const authorityIssues = mockIssues.filter(issue => issue.category === mockUser.role);
  const pendingIssues = authorityIssues.filter(issue => issue.status === 'pending');
  const inProgressIssues = authorityIssues.filter(issue => issue.status === 'in-progress');
  const completedIssues = authorityIssues.filter(issue => issue.status === 'completed');

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
      <div className="bg-gradient-to-r from-primary to-primary-hover rounded-lg p-6 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name}</h1>
        <p className="text-primary-foreground/90">
          {mockUser.department} • Managing {authorityIssues.length} total issues
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authorityIssues.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingIssues.length}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressIssues.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently working
            </p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedIssues.length}</div>
            <p className="text-xs text-success text-xs">
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