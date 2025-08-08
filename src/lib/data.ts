import type { TimeLog, User } from './types';

export const user: User = {
  id: '1',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  employeeId: 'E12345',
  jobTitle: 'Software Engineer',
  department: 'Technology',
  hireDate: '2022-08-15',
  role: 'Employee',
  phone: '555-123-4567',
  address: '123 Tech Way, Silicon Valley, CA 94043',
  shift: '9 AM - 5 PM PT',
  avatar: `https://placehold.co/100x100.png`
};

export const users: User[] = [
  user,
  {
    id: '2',
    name: 'Samantha Smith',
    email: 'samantha.smith@example.com',
    employeeId: 'E67890',
    jobTitle: 'Project Manager',
    department: 'Management',
    hireDate: '2021-02-20',
    role: 'Admin',
    phone: '555-987-6543',
    address: '456 Innovation Dr, Tech City, CA 94043',
    shift: '9 AM - 5 PM PT',
    avatar: `https://placehold.co/100x100.png`
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    employeeId: 'E13579',
    jobTitle: 'UI/UX Designer',
    department: 'Design',
    hireDate: '2023-01-10',
    role: 'Employee',
    phone: '555-246-8135',
    address: '789 Creative Blvd, Designville, CA 94043',
    shift: '10 AM - 6 PM PT',
    avatar: `https://placehold.co/100x100.png`
  }
];

export const dailySummary: TimeLog[] = [
  {
    id: '1',
    userId: '1',
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '09:02 AM',
    clockOut: '01:00 PM',
    totalHours: '3h 58m',
  },
  {
    id: '2',
    userId: '1',
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
    userId: '1',
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '08:58 AM',
    clockOut: '05:30 PM',
    totalHours: '8h 32m',
  },
  {
    id: '4',
    userId: '1',
    date: new Date(Date.now() - 2 * 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '09:15 AM',
    clockOut: '06:00 PM',
    totalHours: '8h 45m',
  },
    {
    id: '5',
    userId: '1',
    date: new Date(Date.now() - 3 * 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '09:05 AM',
    clockOut: '05:05 PM',
    totalHours: '8h 0m',
  },
    {
    id: '6',
    userId: '1',
    date: new Date(Date.now() - 4 * 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '09:00 AM',
    clockOut: '05:00 PM',
    totalHours: '8h 0m',
  },
   {
    id: '7',
    userId: '2',
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '09:30 AM',
    clockOut: '05:30 PM',
    totalHours: '8h 0m',
  },
  {
    id: '8',
    userId: '3',
    date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    clockIn: '10:00 AM',
    clockOut: null,
    totalHours: null,
  }
];
