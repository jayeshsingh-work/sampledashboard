import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

interface AssetUtilizationChartProps {
  data: Array<{
    location: string;
    assigned: number;
    available: number;
    maintenance: number;
  }>;
}

export const AssetUtilizationChart = ({ data }: AssetUtilizationChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="location" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="assigned" stackId="a" fill="hsl(var(--primary))" name="Assigned" />
      <Bar dataKey="available" stackId="a" fill="hsl(var(--secondary))" name="Available" />
      <Bar dataKey="maintenance" stackId="a" fill="hsl(var(--destructive))" name="Maintenance" />
    </BarChart>
  </ResponsiveContainer>
);

interface AssetStatusPieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export const AssetStatusPieChart = ({ data }: AssetStatusPieChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

interface MaintenanceCostChartProps {
  data: Array<{
    month: string;
    cost: number;
    count: number;
  }>;
}

export const MaintenanceCostChart = ({ data }: MaintenanceCostChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="cost" fill="hsl(var(--primary))" name="Cost (₹)" />
      <Line yAxisId="right" type="monotone" dataKey="count" stroke="hsl(var(--secondary))" name="Count" />
    </LineChart>
  </ResponsiveContainer>
);

interface CostCenterChartProps {
  data: Array<{
    location: string;
    totalCosts: number;
    assetCount: number;
  }>;
}

export const CostCenterChart = ({ data }: CostCenterChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="location" />
      <YAxis />
      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Total Cost']} />
      <Legend />
      <Bar dataKey="totalCosts" fill="hsl(var(--primary))" name="Total Cost (₹)" />
    </BarChart>
  </ResponsiveContainer>
);

interface DepreciationChartProps {
  data: Array<{
    name: string;
    purchasePrice: number;
    currentValue: number;
  }>;
}

export const DepreciationChart = ({ data }: DepreciationChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data.slice(0, 10)}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
      <YAxis />
      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} />
      <Legend />
      <Bar dataKey="purchasePrice" fill="hsl(var(--secondary))" name="Purchase Price" />
      <Bar dataKey="currentValue" fill="hsl(var(--primary))" name="Current Value" />
    </BarChart>
  </ResponsiveContainer>
);