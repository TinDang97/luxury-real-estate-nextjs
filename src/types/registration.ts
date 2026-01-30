/**
 * Registration Schema Types
 * Defines the structure for registration documents in Firestore
 */

import { Timestamp } from 'firebase/firestore';

export type RegistrationStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';

export type RegistrationSource = 'website_form' | 'manual_entry' | 'import' | 'api';

/**
 * Registration document structure in Firestore
 */
export interface Registration {
  /** Firestore document ID (auto-generated) */
  id?: string;
  
  /** Full name of the registrant */
  name: string;
  
  /** Phone number (required) */
  phone: string;
  
  /** Email address (optional) */
  email: string | null;
  
  /** Project title they're interested in */
  projectTitle: string;
  
  /** Current status of the registration */
  status: RegistrationStatus;
  
  /** Source of the registration */
  source: RegistrationSource;
  
  /** User agent string from the browser */
  userAgent: string;
  
  /** IP address of the registrant */
  ip: string;
  
  /** Timestamp when the registration was created */
  createdAt: Timestamp | Date;
  
  /** Timestamp when the registration was last updated */
  updatedAt?: Timestamp | Date;
  
  /** Notes or comments about the registration */
  notes?: string;
  
  /** Assigned sales rep or admin */
  assignedTo?: string;
  
  /** Contact history */
  contactHistory?: ContactHistoryEntry[];
}

/**
 * Contact history entry for tracking interactions
 */
export interface ContactHistoryEntry {
  /** Timestamp of the contact */
  timestamp: Timestamp | Date;
  
  /** Type of contact (call, email, meeting, etc.) */
  type: 'call' | 'email' | 'meeting' | 'whatsapp' | 'other';
  
  /** Who made the contact */
  contactedBy: string;
  
  /** Notes about the contact */
  notes: string;
  
  /** Outcome of the contact */
  outcome?: string;
}

/**
 * Data structure for creating a new registration
 */
export interface CreateRegistrationData {
  name: string;
  phone: string;
  email?: string | null;
  projectTitle?: string;
  source?: RegistrationSource;
  userAgent?: string;
  ip?: string;
}

/**
 * Collection name constant
 */
export const REGISTRATIONS_COLLECTION = 'registrations';
