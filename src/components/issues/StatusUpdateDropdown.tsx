import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Issue } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface StatusUpdateDropdownProps {
  currentStatus: Issue['status'];
  onStatusUpdate: (newStatus: Issue['status']) => void;
}

export function StatusUpdateDropdown({ currentStatus, onStatusUpdate }: StatusUpdateDropdownProps) {
  const { toast } = useToast();

  const statusOptions = [
    {
      value: 'pending' as const,
      label: 'Pending',
      icon: Clock,
      color: 'text-warning'
    },
    {
      value: 'in-progress' as const,
      label: 'In Progress',
      icon: AlertTriangle,
      color: 'text-primary'
    },
    {
      value: 'completed' as const,
      label: 'Resolved',
      icon: CheckCircle2,
      color: 'text-success'
    }
  ];

  const handleStatusUpdate = (newStatus: Issue['status']) => {
    if (newStatus !== currentStatus) {
      onStatusUpdate(newStatus);
      toast({
        title: "Status Updated",
        description: `Issue status changed to ${newStatus.replace('-', ' ')}`,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="min-w-[120px]">
          Update Status
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {statusOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleStatusUpdate(option.value)}
              className={`cursor-pointer ${
                currentStatus === option.value ? 'bg-accent' : ''
              }`}
            >
              <Icon className={`h-4 w-4 mr-2 ${option.color}`} />
              {option.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}