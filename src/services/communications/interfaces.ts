export interface Notification {
  id: string;
  userId: string;
  type: 'alert' | 'announcement' | 'reminder';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'sent' | 'delivered' | 'read';
  timestamp: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  targetAudience: string[];
  validFrom: Date;
  validUntil: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface AlertConfig {
  eventType: string;
  conditions: AlertCondition[];
  actions: AlertAction[];
  enabled: boolean;
}

interface AlertCondition {
  field: string;
  operator: 'equals' | 'greater' | 'less' | 'contains';
  value: any;
}

interface AlertAction {
  type: 'notification' | 'email' | 'sms';
  template: string;
  recipients: string[];
}