import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package,
  PackageCheck,
  ShoppingCart,
  Wrench,
  TrendingUp,
  AlertTriangle,
  Calendar,
  DollarSign,
  Eye,
  ArrowRight,
} from "lucide-react";
import { mockAssets, mockInventoryItems, mockPurchaseOrders, mockMaintenanceLogs } from "@/data/mockData";

export default function Dashboard() {
  const totalAssets = mockAssets.length;
  const assignedAssets = mockAssets.filter(a => a.status === 'assigned').length;
  const lowStockItems = mockInventoryItems.filter(i => i.quantity <= i.minThreshold).length;
  const pendingPOs = mockPurchaseOrders.filter(po => po.status === 'pending').length;
  const recentMaintenances = mockMaintenanceLogs.slice(0, 3);
  const assetsNeedingMaintenance = mockAssets.filter(a => a.status === 'maintenance').length;

  const stats = [
    {
      title: "Total Assets",
      value: totalAssets.toString(),
      description: `${assignedAssets} assigned`,
      icon: Package,
      trend: "+12%",
      color: "text-blue-600",
    },
    {
      title: "Inventory Items",
      value: mockInventoryItems.reduce((sum, item) => sum + item.quantity, 0).toString(),
      description: `${lowStockItems} low stock`,
      icon: PackageCheck,
      trend: "-5%",
      color: "text-green-600",
    },
    {
      title: "Purchase Orders",
      value: mockPurchaseOrders.length.toString(),
      description: `${pendingPOs} pending`,
      icon: ShoppingCart,
      trend: "+8%",
      color: "text-purple-600",
    },
    {
      title: "Maintenance",
      value: mockMaintenanceLogs.length.toString(),
      description: `${assetsNeedingMaintenance} scheduled`,
      icon: Wrench,
      trend: "+3%",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your asset management system</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            This Month
          </Button>
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <Badge variant="outline" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest asset and inventory updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">MacBook Pro assigned to Priya Patel</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New purchase order created for Dell XPS</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Cisco Switch maintenance completed</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Activity
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg dark:border-orange-800 dark:bg-orange-950">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Low Stock
                  </Badge>
                </div>
                <p className="text-sm mt-1">Wireless Mouse (12 units left)</p>
              </div>
              <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg dark:border-blue-800 dark:bg-blue-950">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Warranty
                  </Badge>
                </div>
                <p className="text-sm mt-1">iPhone 15 Pro expires in 30 days</p>
              </div>
              <div className="p-3 border border-red-200 bg-red-50 rounded-lg dark:border-red-800 dark:bg-red-950">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Maintenance
                  </Badge>
                </div>
                <p className="text-sm mt-1">Cisco Switch needs attention</p>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                AI Insights
              </CardTitle>
              <CardDescription>Powered by AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg dark:bg-purple-950 dark:border-purple-800">
                <p className="text-sm font-medium">Predicted Reorder</p>
                <p className="text-xs text-muted-foreground mt-1">
                  USB-C Cables will run out in 15 days based on usage patterns
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-950 dark:border-green-800">
                <p className="text-sm font-medium">Cost Optimization</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Consolidate vendors to save ₹45,000 annually
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All Insights
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}