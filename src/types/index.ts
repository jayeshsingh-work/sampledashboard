export interface Organization {
  id: string;
  name: string;
  domain: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee' | 'auditor';
  orgId: string;
  avatarUrl?: string;
  lastLogin: string;
}

export interface Asset {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  serialNumber: string;
  purchaseDate: string;
  purchasePrice: number;
  vendor: string;
  status: 'available' | 'assigned' | 'maintenance' | 'retired';
  locationId: string;
  assignedToUserId?: string;
  warrantyExpiry: string;
  tags: string[];
  notes?: string;
  category?: Category;
  location?: Location;
  assignedTo?: User;
}

export interface InventoryItem {
  id: string;
  assetId?: string;
  name: string;
  quantity: number;
  unit: string;
  locationId: string;
  minThreshold: number;
  reorderPoint: number;
  location?: Location;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  contact: string;
}

export interface Category {
  id: string;
  name: string;
  depreciationMethod: string;
  usefulLifeYears: number;
}

export interface Vendor {
  id: string;
  name: string;
  contact: string;
  paymentTerms: string;
}

export interface PurchaseOrder {
  id: string;
  vendorId: string;
  items: { sku: string; qty: number; price: number; name: string }[];
  status: 'draft' | 'pending' | 'approved' | 'received';
  createdBy: string;
  createdAt: string;
  vendor?: Vendor;
}

export interface MaintenanceLog {
  id: string;
  assetId: string;
  date: string;
  vendorId: string;
  cost: number;
  summary: string;
  attachments: string[];
  asset?: Asset;
  vendor?: Vendor;
}

export interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  timestamp: string;
  user?: User;
}