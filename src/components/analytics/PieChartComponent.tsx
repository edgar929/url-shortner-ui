import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

interface PieChartComponentProps {
  data: DataItem[];
  title: string;
}

const COLORS = ['#0ea5e9', '#6366f1', '#ec4899', '#f59e0b', '#10b981'];

export const PieChartComponent = ({ data, title }: PieChartComponentProps) => {
  return (
    <div className="h-[300px] w-full">
      <h3 className="text-center text-gray-700 font-medium mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}; 