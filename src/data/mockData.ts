import { Asset, Location, Category, Vendor, User, InventoryItem, PurchaseOrder, MaintenanceLog } from '../types';

export const mockLocations: Location[] = [
  { id: '1', name: 'Mumbai Office', address: 'Bandra Kurla Complex, Mumbai', contact: '+91 22 1234 5678' },
  { id: '2', name: 'Delhi Branch', address: 'Connaught Place, New Delhi', contact: '+91 11 1234 5678' },
  { id: '3', name: 'Bangalore Tech Hub', address: 'Electronic City, Bangalore', contact: '+91 80 1234 5678' },
  { id: '4', name: 'Warehouse - Gurgaon', address: 'Industrial Area, Gurgaon', contact: '+91 124 1234 5678' },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Laptops & Computers', depreciationMethod: 'Straight Line', usefulLifeYears: 4 },
  { id: '2', name: 'Office Furniture', depreciationMethod: 'Straight Line', usefulLifeYears: 10 },
  { id: '3', name: 'Mobile Devices', depreciationMethod: 'Straight Line', usefulLifeYears: 3 },
  { id: '4', name: 'Networking Equipment', depreciationMethod: 'Straight Line', usefulLifeYears: 5 },
  { id: '5', name: 'Vehicles', depreciationMethod: 'Reducing Balance', usefulLifeYears: 8 },
];

export const mockVendors: Vendor[] = [
  { id: '1', name: 'Dell Technologies', contact: 'sales@dell.com', paymentTerms: 'Net 30' },
  { id: '2', name: 'Apple India', contact: 'business@apple.com', paymentTerms: 'Net 15' },
  { id: '3', name: 'Herman Miller', contact: 'orders@hermanmiller.com', paymentTerms: 'Net 45' },
  { id: '4', name: 'Cisco Systems', contact: 'sales@cisco.com', paymentTerms: 'Net 30' },
];

export const mockUsers: User[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@company.com', role: 'admin', orgId: '1', lastLogin: '2024-01-15T10:30:00Z' },
  { id: '2', name: 'Priya Patel', email: 'priya@company.com', role: 'manager', orgId: '1', lastLogin: '2024-01-15T09:15:00Z' },
  { id: '3', name: 'Amit Kumar', email: 'amit@company.com', role: 'employee', orgId: '1', lastLogin: '2024-01-14T16:45:00Z' },
  { id: '4', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'auditor', orgId: '1', lastLogin: '2024-01-15T08:00:00Z' },
];

export const mockAssets: Asset[] = [
  {
    id: '1',
    sku: 'LAP-001',
    name: 'MacBook Pro 16" M3',
    categoryId: '1',
    serialNumber: 'MBP2024001',
    purchaseDate: '2024-01-10',
    purchasePrice: 250000,
    vendor: 'Apple India',
    status: 'assigned',
    locationId: '1',
    assignedToUserId: '2',
    warrantyExpiry: '2027-01-10',
    tags: ['laptop', 'development', 'high-end'],
    notes: 'Used for software development',
  },
  {
    id: '2',
    sku: 'DESK-001',
    name: 'Herman Miller Aeron Chair',
    categoryId: '2',
    serialNumber: 'HM2024001',
    purchaseDate: '2024-01-05',
    purchasePrice: 45000,
    vendor: 'Herman Miller',
    status: 'available',
    locationId: '1',
    warrantyExpiry: '2034-01-05',
    tags: ['furniture', 'ergonomic'],
  },
  {
    id: '3',
    sku: 'PHN-001',
    name: 'iPhone 15 Pro',
    categoryId: '3',
    serialNumber: 'IP2024001',
    purchaseDate: '2024-01-12',
    purchasePrice: 135000,
    vendor: 'Apple India',
    status: 'assigned',
    locationId: '2',
    assignedToUserId: '1',
    warrantyExpiry: '2025-01-12',
    tags: ['mobile', 'communication'],
  },
  {
    id: '4',
    sku: 'NET-001',
    name: 'Cisco Catalyst 9300 Switch',
    categoryId: '4',
    serialNumber: 'CS2024001',
    purchaseDate: '2023-12-20',
    purchasePrice: 180000,
    vendor: 'Cisco Systems',
    status: 'maintenance',
    locationId: '3',
    warrantyExpiry: '2026-12-20',
    tags: ['network', 'infrastructure'],
    notes: 'Scheduled maintenance on port 24',
  },
];

export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'USB-C Cables',
    quantity: 45,
    unit: 'pieces',
    locationId: '4',
    minThreshold: 20,
    reorderPoint: 30,
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    quantity: 12,
    unit: 'pieces',
    locationId: '1',
    minThreshold: 15,
    reorderPoint: 25,
  },
  {
    id: '3',
    name: 'Monitor Stands',
    quantity: 8,
    unit: 'pieces',
    locationId: '2',
    minThreshold: 10,
    reorderPoint: 15,
  },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    vendorId: '1',
    items: [
      { sku: 'LAP-002', qty: 5, price: 120000, name: 'Dell XPS 13' },
      { sku: 'ACC-001', qty: 10, price: 2500, name: 'Laptop Bags' },
    ],
    status: 'pending',
    createdBy: '2',
    createdAt: '2024-01-14T14:30:00Z',
  },
  {
    id: '2',
    vendorId: '4',
    items: [
      { sku: 'NET-002', qty: 2, price: 95000, name: 'Cisco Access Points' },
    ],
    status: 'approved',
    createdBy: '1',
    createdAt: '2024-01-13T11:15:00Z',
  },
];

export const mockMaintenanceLogs: MaintenanceLog[] = [
  {
    id: '1',
    assetId: '4',
    date: '2024-01-15',
    vendorId: '4',
    cost: 8500,
    summary: 'Port 24 replacement and firmware update',
    attachments: ['maintenance-receipt-001.pdf'],
  },
  {
    id: '2',
    assetId: '1',
    date: '2024-01-10',
    vendorId: '2',
    cost: 3200,
    summary: 'Battery replacement and system optimization',
    attachments: ['service-report-001.pdf'],
  },
];

// Helper function to get related data
export const getAssetWithRelations = (asset: Asset) => {
  return {
    ...asset,
    category: mockCategories.find(c => c.id === asset.categoryId),
    location: mockLocations.find(l => l.id === asset.locationId),
    assignedTo: asset.assignedToUserId ? mockUsers.find(u => u.id === asset.assignedToUserId) : undefined,
  };
};

export const getPurchaseOrderWithRelations = (po: PurchaseOrder) => {
  return {
    ...po,
    vendor: mockVendors.find(v => v.id === po.vendorId),
  };
};

export const getMaintenanceLogWithRelations = (log: MaintenanceLog) => {
  return {
    ...log,
    asset: mockAssets.find(a => a.id === log.assetId),
    vendor: mockVendors.find(v => v.id === log.vendorId),
  };
};