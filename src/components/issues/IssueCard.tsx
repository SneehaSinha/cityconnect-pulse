import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Calendar, 
  Eye, 
  AlertTriangle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Issue } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { StatusUpdateDropdown } from './StatusUpdateDropdown';

interface IssueCardProps {
  issue: Issue;
  onViewDetails: (issue: Issue) => void;
  onStatusUpdate: (issueId: string, newStatus: Issue['status']) => void;
}

export function IssueCard({ issue, onViewDetails, onStatusUpdate }: IssueCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'in-progress':
        return <AlertTriangle className="h-4 w-4 text-primary" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-warning/10 text-warning border-warning/20">🟡 Pending</Badge>;
      case 'in-progress':
        return <Badge className="bg-primary/10 text-primary border-primary/20">🔵 In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-success/10 text-success border-success/20">🟢 Resolved</Badge>;
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
    <Card className="card-elevated group hover-lift animate-fade-in">
      <CardContent className="p-5 space-y-4">
        {/* Header with Title and Priority */}
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg leading-tight pr-2 group-hover:text-primary transition-colors">{issue.title}</h3>
          <div className={`px-2 py-1 rounded-md text-xs font-semibold ${getPriorityColor(issue.priority)} bg-current/10 whitespace-nowrap`}>
            {issue.priority.toUpperCase()}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between">
          {getStatusBadge(issue.status)}
          <span className="text-xs text-muted-foreground">#{issue.id}</span>
        </div>

        {/* Meta Information */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDistanceToNow(issue.createdAt, { addSuffix: true })}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{issue.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {issue.description}
        </p>

        {/* Reporter */}
        <div className="text-xs text-muted-foreground">
          Reported by {issue.reporter}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(issue)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          
          <StatusUpdateDropdown
            currentStatus={issue.status}
            onStatusUpdate={(newStatus) => onStatusUpdate(issue.id, newStatus)}
          />
        </div>
      </CardContent>
    </Card>
  );
}