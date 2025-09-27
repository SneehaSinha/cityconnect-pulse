export interface Issue {
  id: string;
  title: string;
  description: string;
  reporter: string;
  category: 'potholes' | 'streetlights' | 'water' | 'waste' | 'traffic';
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  location: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'potholes' | 'streetlights' | 'water' | 'waste' | 'traffic';
  department: string;
}

export interface Notification {
  id: string;
  issueId: string;
  title: string;
  message: string;
  type: 'new-issue' | 'status-update' | 'reminder';
  read: boolean;
  createdAt: Date;
}

export interface AnalyticsData {
  totalIssues: number;
  resolvedIssues: number;
  pendingIssues: number;
  avgResolutionTime: number;
  monthlyData: Array<{
    month: string;
    issues: number;
    resolved: number;
  }>;
}