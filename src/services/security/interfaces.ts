export interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  action: string;
  resource: string;
  details: any;
  ip: string;
  userAgent: string;
}

export interface ComplianceReport {
  type: string;
  timestamp: Date;
  findings: ComplianceFinding[];
  status: 'in_progress' | 'completed' | 'failed';
}

export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  rules: SecurityRule[];
  version: string;
  lastUpdated: Date;
}

interface ComplianceFinding {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  regulation: string;
  status: 'open' | 'resolved' | 'in_progress';
}

interface SecurityRule {
  id: string;
  type: 'access' | 'data' | 'network';
  condition: string;
  action: 'allow' | 'deny' | 'alert';
  priority: number;
}