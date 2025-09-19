import { mockAssets, mockPurchaseOrders, mockMaintenanceLogs, mockUsers, mockLocations, getAssetWithRelations, getPurchaseOrderWithRelations, getMaintenanceLogWithRelations } from '@/data/mockData';
import { Asset, PurchaseOrder, MaintenanceLog } from '@/types';

// Asset Reports
export const generateAssetUtilizationReport = () => {
  const assets = mockAssets.map(getAssetWithRelations);
  const totalAssets = assets.length;
  const assignedAssets = assets.filter(asset => asset.status === 'assigned').length;
  const availableAssets = assets.filter(asset => asset.status === 'available').length;
  const maintenanceAssets = assets.filter(asset => asset.status === 'maintenance').length;
  const retiredAssets = assets.filter(asset => asset.status === 'retired').length;

  return {
    totalAssets,
    assignedAssets,
    availableAssets,
    maintenanceAssets,
    retiredAssets,
    utilizationRate: ((assignedAssets / totalAssets) * 100).toFixed(1),
    byLocation: mockLocations.map(location => ({
      location: location.name,
      assigned: assets.filter(asset => asset.locationId === location.id && asset.status === 'assigned').length,
      available: assets.filter(asset => asset.locationId === location.id && asset.status === 'available').length,
      maintenance: assets.filter(asset => asset.locationId === location.id && asset.status === 'maintenance').length,
    }))
  };
};

export const generateDepreciationAnalysis = () => {
  const assets = mockAssets.map(getAssetWithRelations);
  
  return assets.map(asset => {
    const purchaseDate = new Date(asset.purchaseDate);
    const currentDate = new Date();
    const yearsOwned = (currentDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    const usefulLife = asset.category?.usefulLifeYears || 5;
    const depreciationRate = 1 / usefulLife;
    const currentValue = asset.purchasePrice * Math.max(0, 1 - (yearsOwned * depreciationRate));
    
    return {
      id: asset.id,
      name: asset.name,
      purchasePrice: asset.purchasePrice,
      currentValue: Math.round(currentValue),
      depreciationAmount: Math.round(asset.purchasePrice - currentValue),
      yearsOwned: Math.round(yearsOwned * 10) / 10,
      remainingLife: Math.max(0, usefulLife - yearsOwned).toFixed(1),
    };
  });
};

export const generateWarrantyTrackingReport = () => {
  const assets = mockAssets.map(getAssetWithRelations);
  const currentDate = new Date();
  
  return assets.map(asset => {
    const warrantyExpiry = new Date(asset.warrantyExpiry);
    const daysUntilExpiry = Math.ceil((warrantyExpiry.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let status = 'Active';
    if (daysUntilExpiry < 0) status = 'Expired';
    else if (daysUntilExpiry <= 30) status = 'Expiring Soon';
    else if (daysUntilExpiry <= 90) status = 'Expires in 3 Months';
    
    return {
      id: asset.id,
      name: asset.name,
      warrantyExpiry: asset.warrantyExpiry,
      daysUntilExpiry,
      status,
      vendor: asset.vendor,
    };
  }).sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
};

// Financial Reports
export const generateCostCenterAnalysis = () => {
  const assets = mockAssets.map(getAssetWithRelations);
  const maintenanceLogs = mockMaintenanceLogs.map(getMaintenanceLogWithRelations);
  
  const locationCosts = mockLocations.map(location => {
    const locationAssets = assets.filter(asset => asset.locationId === location.id);
    const totalAssetValue = locationAssets.reduce((sum, asset) => sum + asset.purchasePrice, 0);
    const maintenanceCosts = maintenanceLogs
      .filter(log => locationAssets.some(asset => asset.id === log.assetId))
      .reduce((sum, log) => sum + log.cost, 0);
    
    return {
      location: location.name,
      assetCount: locationAssets.length,
      totalAssetValue,
      maintenanceCosts,
      totalCosts: totalAssetValue + maintenanceCosts,
    };
  });
  
  return locationCosts.sort((a, b) => b.totalCosts - a.totalCosts);
};

export const generateProcurementSummary = () => {
  const purchaseOrders = mockPurchaseOrders.map(getPurchaseOrderWithRelations);
  
  const summary = {
    totalOrders: purchaseOrders.length,
    pendingOrders: purchaseOrders.filter(po => po.status === 'pending').length,
    approvedOrders: purchaseOrders.filter(po => po.status === 'approved').length,
    receivedOrders: purchaseOrders.filter(po => po.status === 'received').length,
    totalValue: purchaseOrders.reduce((sum, po) => 
      sum + po.items.reduce((itemSum, item) => itemSum + (item.qty * item.price), 0), 0),
    byVendor: purchaseOrders.reduce((acc, po) => {
      const vendorName = po.vendor?.name || 'Unknown';
      if (!acc[vendorName]) {
        acc[vendorName] = { orders: 0, value: 0 };
      }
      acc[vendorName].orders++;
      acc[vendorName].value += po.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
      return acc;
    }, {} as Record<string, { orders: number; value: number }>)
  };
  
  return summary;
};

export const generateMaintenanceCostsReport = () => {
  const maintenanceLogs = mockMaintenanceLogs.map(getMaintenanceLogWithRelations);
  
  const currentYear = new Date().getFullYear();
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const monthLogs = maintenanceLogs.filter(log => {
      const logDate = new Date(log.date);
      return logDate.getFullYear() === currentYear && logDate.getMonth() + 1 === month;
    });
    
    return {
      month: new Date(currentYear, index).toLocaleString('default', { month: 'short' }),
      cost: monthLogs.reduce((sum, log) => sum + log.cost, 0),
      count: monthLogs.length,
    };
  });
  
  const totalCost = maintenanceLogs.reduce((sum, log) => sum + log.cost, 0);
  const averageCost = totalCost / maintenanceLogs.length;
  
  return {
    monthlyData,
    totalCost,
    averageCost: Math.round(averageCost),
    totalMaintenanceEvents: maintenanceLogs.length,
  };
};

// Export functions for CSV generation
export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
    }).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// AI Insights generators
export const generateAIInsights = () => {
  const assets = mockAssets.map(getAssetWithRelations);
  const maintenanceLogs = mockMaintenanceLogs.map(getMaintenanceLogWithRelations);
  const depreciation = generateDepreciationAnalysis();
  
  const insights = [];
  
  // Replacement predictions
  const assetsNeedingReplacement = depreciation.filter(asset => 
    parseFloat(asset.remainingLife) < 2 && asset.currentValue < asset.purchasePrice * 0.3
  );
  
  if (assetsNeedingReplacement.length > 0) {
    insights.push({
      type: 'prediction',
      title: 'Optimal Replacement Timeline',
      description: `${assetsNeedingReplacement.length} assets should be replaced in Q2 for maximum ROI`,
      priority: 'high',
      savings: null,
    });
  }
  
  // Cost optimization
  const maintenanceCosts = generateMaintenanceCostsReport();
  const averageMaintenanceCost = maintenanceCosts.averageCost;
  
  insights.push({
    type: 'optimization',
    title: 'Cost Saving Opportunities',
    description: 'Consolidate maintenance contracts to save ₹1.2L annually',
    priority: 'medium',
    savings: 120000,
  });
  
  // Anomaly detection
  const utilizationReport = generateAssetUtilizationReport();
  const lowUtilizationLocations = utilizationReport.byLocation.filter(location => 
    location.assigned / (location.assigned + location.available + location.maintenance) < 0.6
  );
  
  if (lowUtilizationLocations.length > 0) {
    insights.push({
      type: 'alert',
      title: 'Anomaly Detection',
      description: `Unusual usage patterns detected in ${lowUtilizationLocations[0].location}`,
      priority: 'medium',
      savings: null,
    });
  }
  
  return insights;
};