
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
import { dailySummary } from '@/lib/data';

export function DailySummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Summary</CardTitle>
        <CardDescription>Your clocked hours for today.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Clock In</TableHead>
              <TableHead>Clock Out</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dailySummary.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.clockIn}</TableCell>
                <TableCell>
                  {log.clockOut ? (
                    log.clockOut
                  ) : (
                    <Badge variant="secondary">In Progress</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {log.totalHours || '-'}
                </TableCell>
              </TableRow>
            ))}
            {!dailySummary.length && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">No hours logged today.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
