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
import { timeHistory } from '@/lib/data';

export function TimeHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Time History</CardTitle>
        <CardDescription>
          A complete log of your recorded hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Clock In</TableHead>
              <TableHead>Clock Out</TableHead>
              <TableHead className="text-right">Total Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeHistory.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.date}</TableCell>
                <TableCell>{log.clockIn}</TableCell>
                <TableCell>{log.clockOut || '-'}</TableCell>
                <TableCell className="text-right font-medium">{log.totalHours || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
