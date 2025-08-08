import type { TimeLog } from './types';

export const user = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  employeeId: 'E12345',
  jobTitle: 'Software Engineer',
  department: 'Technology',
  hireDate: '2022-08-15',
  role: 'Employee',
  phone: '555-123-4567',
  address: '123 Tech Way, Silicon Valley, CA 94043',
  shift: '9 AM - 5 PM PT'
};

export const dailySummary: TimeLog[] = [
  {
    id: '1',
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '09:02 AM',
    clockOut: '01:00 PM',
    totalHours: '3h 58m',
  },
  {
    id: '2',
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '02:00 PM',
    clockOut: null,
    totalHours: null,
  },
];

export const timeHistory: TimeLog[] = [
  ...dailySummary,
  {
    id: '3',
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '08:58 AM',
    clockOut: '05:30 PM',
    totalHours: '8h 32m',
  },
  {
    id: '4',
    date: new Date(Date.now() - 2 * 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '09:15 AM',
    clockOut: '06:00 PM',
    totalHours: '8h 45m',
  },
    {
    id: '5',
    date: new Date(Date.now() - 3 * 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '09:05 AM',
    clockOut: '05:05 PM',
    totalHours: '8h 0m',
  },
    {
    id: '6',
    date: new Date(Date.now() - 4 * 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '09:00 AM',
    clockOut: '05:00 PM',
    totalHours: '8h 0m',
  },
];
