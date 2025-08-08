
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { timeHistory, users } from '@/lib/data';
import { Download } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function AttendanceView() {
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const getUserName = (userId: string) => {
    return users.find((u) => u.id === userId)?.name || 'Unknown User';
  };

  const filteredLogs = useMemo(() => {
    return timeHistory.filter((log) => {
      const logDate = new Date(log.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);


      const userMatch = selectedUser === 'all' || log.userId === selectedUser;
      const startDateMatch = !start || logDate >= start;
      const endDateMatch = !end || logDate <= end;

      return userMatch && startDateMatch && endDateMatch;
    });
  }, [selectedUser, startDate, endDate]);

  const handleExportCSV = () => {
    const headers = ['Employee', 'Date', 'Clock In', 'Clock Out', 'Total Hours'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map((log) =>
        [
          getUserName(log.userId).replace(/,/g, ''), // Avoid commas in names
          log.date,
          log.clockIn,
          log.clockOut || 'N/A',
          log.totalHours || 'N/A',
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'attendance_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
                <CardTitle>All Attendance Records</CardTitle>
                <CardDescription>
                A complete log of all recorded hours. Use the filters to narrow your results.
                </CardDescription>
            </div>
            <Button onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border rounded-lg">
            <div className="space-y-2">
                <Label htmlFor="user-filter">Filter by Employee</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger id="user-filter">
                    <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Employees</SelectItem>
                    {users.filter(u => !u.isAdmin).map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                        {user.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Clock In</TableHead>
              <TableHead>Clock Out</TableHead>
              <TableHead className="text-right">Total Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{getUserName(log.userId)}</TableCell>
                  <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
                  <TableCell>{log.clockIn}</TableCell>
                  <TableCell>
                    {log.clockOut ? log.clockOut : <Badge variant="secondary">In Progress</Badge>}
                  </TableCell>
                  <TableCell className="text-right font-medium">{log.totalHours || '-'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No records found for the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
       <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{filteredLogs.length}</strong> of <strong>{timeHistory.length}</strong> records.
        </div>
      </CardFooter>
    </Card>
  );
}
