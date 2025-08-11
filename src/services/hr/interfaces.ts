export interface EmployeeOnboarding {
  employeeId: string;
  status: 'pending' | 'in_progress' | 'completed';
  steps: OnboardingStep[];
}

export interface PerformanceReview {
  employeeId: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  metrics: PerformanceMetric[];
}

export interface LeaveRequest {
  employeeId: string;
  type: 'vacation' | 'sick' | 'personal';
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
}

interface OnboardingStep {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  dueDate: Date;
}

interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  weight: number;
}