import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  Target,
  Users
} from 'lucide-react';
import { mockAnalytics, mockUser } from '@/data/mockData';

export default function Analytics() {
  const pieData = [
    { name: 'Completed', value: mockAnalytics.resolvedIssues, color: '#22c55e' },
    { name: 'Pending', value: mockAnalytics.pendingIssues, color: '#f59e0b' },
    { name: 'In Progress', value: mockAnalytics.totalIssues - mockAnalytics.resolvedIssues - mockAnalytics.pendingIssues, color: '#3b82f6' },
  ];

  const COLORS = ['#22c55e', '#f59e0b', '#3b82f6'];

  const resolutionData = [
    { day: 'Mon', avgHours: 18 },
    { day: 'Tue', avgHours: 24 },
    { day: 'Wed', avgHours: 16 },
    { day: 'Thu', avgHours: 22 },
    { day: 'Fri', avgHours: 20 },
    { day: 'Sat', avgHours: 28 },
    { day: 'Sun', avgHours: 32 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Performance insights for {mockUser.department}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.totalIssues}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((mockAnalytics.resolvedIssues / mockAnalytics.totalIssues) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+3%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.avgResolutionTime} days</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">-0.5 days</span> faster
            </p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.pendingIssues}</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Issues Chart */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle>Monthly Issue Trends</CardTitle>
            <CardDescription>
              Issues reported vs resolved over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="issues" fill="#3b82f6" name="Reported" />
                <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle>Issue Status Distribution</CardTitle>
            <CardDescription>
              Current breakdown of issue statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resolution Time Trend */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle>Resolution Time Trend</CardTitle>
            <CardDescription>
              Average hours to resolve issues by day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="avgHours" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Avg Hours"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>
              Key metrics for {mockUser.department}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">{mockAnalytics.resolvedIssues}</div>
                <p className="text-sm text-muted-foreground">Resolved Issues</p>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-warning">{mockAnalytics.pendingIssues}</div>
                <p className="text-sm text-muted-foreground">Pending Issues</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Resolution Efficiency</span>
                <span className="text-sm font-medium">87%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-success h-2 rounded-full w-[87%]"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Response Time</span>
                <span className="text-sm font-medium">Fast</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[75%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}