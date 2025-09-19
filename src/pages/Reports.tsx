import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3,
  Download,
  TrendingUp,
  Package,
  DollarSign,
  Calendar,
  FileText,
  PieChart,
  Users,
  MapPin,
  Sparkles,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  generateAssetUtilizationReport, 
  generateDepreciationAnalysis, 
  generateWarrantyTrackingReport,
  generateCostCenterAnalysis,
  generateProcurementSummary,
  generateMaintenanceCostsReport,
  generateAIInsights,
  exportToCSV
} from "@/utils/reportUtils";
import { 
  AssetUtilizationChart, 
  AssetStatusPieChart, 
  MaintenanceCostChart, 
  CostCenterChart, 
  DepreciationChart 
} from "@/components/reports/ReportCharts";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const [expandedReports, setExpandedReports] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
  // Generate report data
  const utilizationReport = generateAssetUtilizationReport();
  const depreciationAnalysis = generateDepreciationAnalysis();
  const warrantyReport = generateWarrantyTrackingReport();
  const costCenterAnalysis = generateCostCenterAnalysis();
  const procurementSummary = generateProcurementSummary();
  const maintenanceCosts = generateMaintenanceCostsReport();
  const aiInsights = generateAIInsights();
  
  const toggleReportExpansion = (reportId: string) => {
    setExpandedReports(prev => ({
      ...prev,
      [reportId]: !prev[reportId]
    }));
  };
  
  const handleExport = (reportType: string, data: any[], filename: string) => {
    try {
      exportToCSV(data, filename);
      toast({
        title: "Export Successful",
        description: `${reportType} has been exported successfully.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the report.",
        variant: "destructive",
      });
    }
  };
  
  const handleExportAll = () => {
    try {
      // Export all reports
      exportToCSV(utilizationReport.byLocation, 'asset-utilization-report');
      exportToCSV(depreciationAnalysis, 'depreciation-analysis');
      exportToCSV(warrantyReport, 'warranty-tracking-report');
      exportToCSV(costCenterAnalysis, 'cost-center-analysis');
      exportToCSV(maintenanceCosts.monthlyData, 'maintenance-costs-report');
      
      toast({
        title: "All Reports Exported",
        description: "All reports have been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the reports.",
        variant: "destructive",
      });
    }
  };
  
  // Calculate real stats from data
  const totalAssetValue = depreciationAnalysis.reduce((sum, asset) => sum + asset.purchasePrice, 0);
  const currentAssetValue = depreciationAnalysis.reduce((sum, asset) => sum + asset.currentValue, 0);
  const utilizationRate = parseFloat(utilizationReport.utilizationRate);
  const totalMaintenanceCost = maintenanceCosts.totalCost;
  const roiPercentage = ((currentAssetValue / totalAssetValue - 1) * 100);
  
  const assetStatusData = [
    { name: 'Assigned', value: utilizationReport.assignedAssets },
    { name: 'Available', value: utilizationReport.availableAssets },
    { name: 'Maintenance', value: utilizationReport.maintenanceAssets },
    { name: 'Retired', value: utilizationReport.retiredAssets },
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into asset performance and costs</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button variant="outline" onClick={handleExportAll}>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asset Utilization</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilizationRate}%</div>
            <div className="mt-2">
              <Progress value={utilizationRate} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {utilizationReport.assignedAssets} of {utilizationReport.totalAssets} assets assigned
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Costs</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalMaintenanceCost / 100000).toFixed(1)}L</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-600">{maintenanceCosts.totalMaintenanceEvents} events</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Maintenance costs this year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {warrantyReport.filter(w => w.status === 'Active').length}
            </div>
            <div className="mt-2">
              <Progress value={(warrantyReport.filter(w => w.status === 'Active').length / warrantyReport.length) * 100} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Assets under warranty
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {roiPercentage >= 0 ? '+' : ''}{roiPercentage.toFixed(1)}%
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-600">Asset value retention</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Current vs purchase value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Asset Reports
            </CardTitle>
            <CardDescription>
              Asset utilization, lifecycle, and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Asset Utilization Report</p>
                      <p className="text-sm text-muted-foreground">Usage patterns and efficiency</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => toggleReportExpansion('utilization')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {expandedReports['utilization'] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExport('Asset Utilization Report', utilizationReport.byLocation, 'asset-utilization-report')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {expandedReports['utilization'] && (
                <div className="bg-background border rounded-lg p-4">
                  <Tabs defaultValue="chart" className="w-full">
                    <TabsList>
                      <TabsTrigger value="chart">Chart View</TabsTrigger>
                      <TabsTrigger value="table">Table View</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chart">
                      <AssetUtilizationChart data={utilizationReport.byLocation} />
                    </TabsContent>
                    <TabsContent value="table">
                      <div className="space-y-2">
                        {utilizationReport.byLocation.map((location, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border rounded">
                            <span className="font-medium">{location.location}</span>
                            <div className="text-sm text-muted-foreground">
                              A: {location.assigned} | V: {location.available} | M: {location.maintenance}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Depreciation Analysis</p>
                      <p className="text-sm text-muted-foreground">Asset value over time</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => toggleReportExpansion('depreciation')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {expandedReports['depreciation'] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExport('Depreciation Analysis', depreciationAnalysis, 'depreciation-analysis')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {expandedReports['depreciation'] && (
                <div className="bg-background border rounded-lg p-4">
                  <DepreciationChart data={depreciationAnalysis} />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Warranty Tracking</p>
                      <p className="text-sm text-muted-foreground">Expiring warranties and coverage</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => toggleReportExpansion('warranty')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {expandedReports['warranty'] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExport('Warranty Tracking Report', warrantyReport, 'warranty-tracking-report')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {expandedReports['warranty'] && (
                <div className="bg-background border rounded-lg p-4">
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {warrantyReport.map((asset, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <span className="font-medium">{asset.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">({asset.vendor})</span>
                        </div>
                        <div className="text-right">
                          <Badge variant={asset.status === 'Expired' ? 'destructive' : asset.status === 'Expiring Soon' ? 'secondary' : 'outline'}>
                            {asset.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {asset.daysUntilExpiry > 0 ? `${asset.daysUntilExpiry} days` : 'Expired'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Financial Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Reports
            </CardTitle>
            <CardDescription>
              Cost analysis, budgeting, and financial insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Cost Center Analysis</p>
                      <p className="text-sm text-muted-foreground">Location-wise expenses</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => toggleReportExpansion('costcenter')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {expandedReports['costcenter'] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExport('Cost Center Analysis', costCenterAnalysis, 'cost-center-analysis')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {expandedReports['costcenter'] && (
                <div className="bg-background border rounded-lg p-4">
                  <CostCenterChart data={costCenterAnalysis} />
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Procurement Summary</p>
                      <p className="text-sm text-muted-foreground">Purchase order trends</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => toggleReportExpansion('procurement')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {expandedReports['procurement'] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExport('Procurement Summary', Object.entries(procurementSummary.byVendor).map(([vendor, data]) => ({vendor, ...data})), 'procurement-summary')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {expandedReports['procurement'] && (
                <div className="bg-background border rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{procurementSummary.totalOrders}</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">₹{(procurementSummary.totalValue / 100000).toFixed(1)}L</div>
                      <div className="text-sm text-muted-foreground">Total Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{procurementSummary.pendingOrders}</div>
                      <div className="text-sm text-muted-foreground">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{procurementSummary.approvedOrders}</div>
                      <div className="text-sm text-muted-foreground">Approved</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">By Vendor</h4>
                    {Object.entries(procurementSummary.byVendor).map(([vendor, data]) => (
                      <div key={vendor} className="flex justify-between items-center p-2 border rounded">
                        <span className="font-medium">{vendor}</span>
                        <div className="text-sm text-muted-foreground">
                          {data.orders} orders - ₹{(data.value / 100000).toFixed(1)}L
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Costs</p>
                      <p className="text-sm text-muted-foreground">Service and repair expenses</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => toggleReportExpansion('maintenance')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {expandedReports['maintenance'] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleExport('Maintenance Costs Report', maintenanceCosts.monthlyData, 'maintenance-costs-report')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {expandedReports['maintenance'] && (
                <div className="bg-background border rounded-lg p-4">
                  <MaintenanceCostChart data={maintenanceCosts.monthlyData} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Operational Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Operational Reports
            </CardTitle>
            <CardDescription>
              Performance metrics and operational efficiency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Location Performance</p>
                <p className="text-sm text-muted-foreground">Asset distribution by location</p>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">User Activity Report</p>
                <p className="text-sm text-muted-foreground">Asset assignment patterns</p>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Audit Trail</p>
                <p className="text-sm text-muted-foreground">Complete activity log</p>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>
              Machine learning analytics and predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div 
                key={index}
                className={`p-4 bg-gradient-to-r border rounded-lg ${
                  insight.type === 'prediction' 
                    ? 'from-purple-50 to-blue-50 border-purple-200 dark:from-purple-950 dark:to-blue-950 dark:border-purple-800'
                    : insight.type === 'optimization'
                    ? 'from-green-50 to-teal-50 border-green-200 dark:from-green-950 dark:to-teal-950 dark:border-green-800'
                    : 'from-orange-50 to-red-50 border-orange-200 dark:from-orange-950 dark:to-red-950 dark:border-orange-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={
                    insight.type === 'prediction' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                      : insight.type === 'optimization'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                  }>
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </Badge>
                  {insight.savings && (
                    <Badge variant="outline" className="bg-white dark:bg-gray-900">
                      Save ₹{(insight.savings / 100000).toFixed(1)}L
                    </Badge>
                  )}
                </div>
                <p className="font-medium">{insight.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {insight.description}
                </p>
              </div>
            ))}
            
            {/* Asset Status Overview */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Asset Status Overview</h4>
              <AssetStatusPieChart data={assetStatusData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Scheduled Reports
          </CardTitle>
          <CardDescription>
            Automated report generation and delivery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Weekly Asset Summary</p>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Active
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Every Monday at 9:00 AM
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Edit Schedule
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Monthly Financial Report</p>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Active
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                1st of every month
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Edit Schedule
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Quarterly Compliance</p>
                <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                  Paused
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                End of each quarter
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Edit Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}