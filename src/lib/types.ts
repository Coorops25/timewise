export type TimeLog = {
  id: string;
  userId: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  totalHours: string | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  jobTitle: string;
  department: string;
  hireDate: string;
  role: 'Admin' | 'Employee';
  phone: string;
  address: string;
  shift: string;
  avatar: string;
  isAdmin?: boolean;
};
