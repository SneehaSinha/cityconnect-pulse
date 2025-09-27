import { Issue, User, Notification, AnalyticsData } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@cityconnect.gov',
  role: 'potholes',
  department: 'Road Maintenance Authority'
};

export const mockIssues: Issue[] = [
  {
    id: 'POT-001',
    title: 'Large Pothole on Elm Street',
    description: 'Deep pothole causing vehicle damage near the intersection',
    reporter: 'Sarah Johnson',
    category: 'potholes',
    status: 'in-progress',
    priority: 'high',
    location: 'Elm Street & Main Ave',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'POT-002',
    title: 'Multiple Potholes on Highway 101',
    description: 'Several potholes along the southbound lane',
    reporter: 'Mike Chen',
    category: 'potholes',
    status: 'pending',
    priority: 'medium',
    location: 'Highway 101, Mile 23',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: 'POT-003',
    title: 'Dangerous Pothole Near School',
    description: 'Large pothole in school zone creating safety hazard',
    reporter: 'Anna Williams',
    category: 'potholes',
    status: 'completed',
    priority: 'high',
    location: 'Oak Street School Zone',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-13'),
  },
  {
    id: 'POT-004',
    title: 'Small Potholes on Park Road',
    description: 'Multiple small potholes affecting traffic flow',
    reporter: 'David Brown',
    category: 'potholes',
    status: 'pending',
    priority: 'low',
    location: 'Park Road, Block 200',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    issueId: 'POT-002',
    title: 'New Issue Reported',
    message: 'Multiple Potholes on Highway 101 reported by Mike Chen',
    type: 'new-issue',
    read: false,
    createdAt: new Date('2024-01-14T10:30:00'),
  },
  {
    id: '2',
    issueId: 'POT-001',
    title: 'Issue Updated',
    message: 'Large Pothole on Elm Street status changed to In Progress',
    type: 'status-update',
    read: false,
    createdAt: new Date('2024-01-16T09:15:00'),
  },
  {
    id: '3',
    issueId: 'POT-004',
    title: 'Reminder',
    message: 'Small Potholes on Park Road pending for 3 days',
    type: 'reminder',
    read: true,
    createdAt: new Date('2024-01-13T14:20:00'),
  }
];

export const mockAnalytics: AnalyticsData = {
  totalIssues: 47,
  resolvedIssues: 32,
  pendingIssues: 15,
  avgResolutionTime: 2.3,
  monthlyData: [
    { month: 'Aug', issues: 12, resolved: 10 },
    { month: 'Sep', issues: 18, resolved: 15 },
    { month: 'Oct', issues: 24, resolved: 20 },
    { month: 'Nov', issues: 15, resolved: 12 },
    { month: 'Dec', issues: 22, resolved: 18 },
    { month: 'Jan', issues: 14, resolved: 8 },
  ],
};