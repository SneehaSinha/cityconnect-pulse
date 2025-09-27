import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  MapPin, 
  Calendar, 
  User, 
  AlertTriangle,
  Clock,
  CheckCircle2,
  Phone,
  Mail
} from 'lucide-react';
import { Issue } from '@/types';
import { formatDistanceToNow, format } from 'date-fns';
import { StatusUpdateDropdown } from './StatusUpdateDropdown';

interface IssueDetailsDrawerProps {
  issue: Issue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (issueId: string, newStatus: Issue['status']) => void;
}

export function IssueDetailsDrawer({ 
  issue, 
  open, 
  onOpenChange, 
  onStatusUpdate 
}: IssueDetailsDrawerProps) {
  if (!issue) return null;

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

  // Mock timeline data - in real app this would come from backend
  const timeline = [
    {
      date: issue.createdAt,
      event: 'Issue Reported',
      description: `Issue reported by ${issue.reporter}`,
      type: 'created'
    },
    {
      date: issue.updatedAt,
      event: 'Status Updated',
      description: `Status changed to ${issue.status.replace('-', ' ')}`,
      type: 'updated'
    }
  ];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="text-left">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DrawerTitle className="text-xl">{issue.title}</DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                Issue #{issue.id}
              </DrawerDescription>
              <div className="flex items-center gap-2">
                {getStatusBadge(issue.status)}
                <span className={`text-sm font-medium ${getPriorityColor(issue.priority)}`}>
                  {issue.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="px-6 pb-6 space-y-6 overflow-y-auto">
          {/* Issue Details */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{issue.description}</p>
            </div>

            {/* Location and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Location:</span>
                <span className="text-muted-foreground">{issue.location}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Reported:</span>
                <span className="text-muted-foreground">
                  {format(issue.createdAt, 'MMM dd, yyyy')} 
                  ({formatDistanceToNow(issue.createdAt, { addSuffix: true })})
                </span>
              </div>
            </div>

            {/* Image placeholder */}
            {issue.image && (
              <div>
                <h4 className="font-semibold mb-2">Attached Image</h4>
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Image would be displayed here</span>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Reporter Information (masked for privacy) */}
          <div>
            <h4 className="font-semibold mb-3">Reporter Information</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Name:</span>
                <span className="text-muted-foreground">{issue.reporter}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span className="text-muted-foreground">****@****.com</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Phone:</span>
                <span className="text-muted-foreground">***-***-1234</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h4 className="font-semibold mb-3">Timeline</h4>
            <div className="space-y-3">
              {timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{event.event}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(event.date, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <StatusUpdateDropdown
              currentStatus={issue.status}
              onStatusUpdate={(newStatus) => onStatusUpdate(issue.id, newStatus)}
            />
            <Button variant="outline" className="flex-1">
              Contact Reporter
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}