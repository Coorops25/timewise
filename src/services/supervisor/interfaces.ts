export interface TeamMetrics {
  productivity: number;
  attendance: number;
  satisfaction: number;
}

export interface SupervisorDashboard {
  teamPerformance: TeamPerformance[];
  attendance: AttendanceRecord[];
  schedules: Schedule[];
  pendingApprovals: Approval[];
}

interface TeamPerformance {
  teamId: string;
  metrics: TeamMetrics;
  trends: Trend[];
}

interface AttendanceRecord {
  userId: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  timestamp: Date;
}

interface Schedule {
  userId: string;
  shift: string;
  date: Date;
}

interface Approval {
  id: string;
  type: 'leave' | 'overtime' | 'shift_change';
  requesterId: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Trend {
  metric: string;
  value: number;
  change: number;
  period: 'daily' | 'weekly' | 'monthly';
}