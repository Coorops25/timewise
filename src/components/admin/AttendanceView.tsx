'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { timeHistory, users } from '@/lib/data';

export function AttendanceView() {

  const getUserName = (userId: string) => {
    return users.find(u => u.id === userId)?.name || 'Unknown User';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Attendance Records</CardTitle>
        <CardDescription>
          A complete log of all recorded hours across all users.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            {timeHistory.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{getUserName(log.userId)}</TableCell>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.clockIn}</TableCell>
                <TableCell>{log.clockOut ? log.clockOut : <Badge variant="secondary">In Progress</Badge>}</TableCell>
                <TableCell className="text-right font-medium">{log.totalHours || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
