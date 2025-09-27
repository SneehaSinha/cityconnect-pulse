import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Clock
} from 'lucide-react';
import { Issue } from '@/types';
import { IssueCard } from './IssueCard';
import { IssueDetailsDrawer } from './IssueDetailsDrawer';

interface PendingIssuesSectionProps {
  issues: Issue[];
  onStatusUpdate: (issueId: string, newStatus: Issue['status']) => void;
}

export function PendingIssuesSection({ issues, onStatusUpdate }: PendingIssuesSectionProps) {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter issues based on search term
  const filteredIssues = issues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.reporter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (issue: Issue) => {
    setSelectedIssue(issue);
    setDrawerOpen(true);
  };

  const handleStatusUpdate = (issueId: string, newStatus: Issue['status']) => {
    onStatusUpdate(issueId, newStatus);
    // Update the selected issue if it's the one being updated
    if (selectedIssue?.id === issueId) {
      setSelectedIssue({ ...selectedIssue, status: newStatus });
    }
  };

  return (
    <>
      <Card className="card-professional">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-warning" />
                <span>All Issues</span>
              </CardTitle>
              <CardDescription>
                Manage and track all reported issues ({filteredIssues.length} total)
              </CardDescription>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues by title, location, or reporter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="default">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Issues Grid/List */}
          {filteredIssues.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No issues found</h3>
              <p className="text-sm">
                {searchTerm ? 'Try adjusting your search terms' : 'No issues have been reported yet'}
              </p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
                : "space-y-4"
            }>
              {filteredIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onViewDetails={handleViewDetails}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Issue Details Drawer */}
      <IssueDetailsDrawer
        issue={selectedIssue}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onStatusUpdate={handleStatusUpdate}
      />
    </>
  );
}