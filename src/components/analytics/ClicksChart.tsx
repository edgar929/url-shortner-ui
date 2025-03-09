import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ClickData } from '../../types/analytics';
import { format, parseISO } from 'date-fns';

interface ClicksChartProps {
  data: ClickData[];
}

export const ClicksChart = ({ data }: ClicksChartProps) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => format(parseISO(date), 'MMM d')}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => format(parseISO(date as string), 'MMM d, yyyy')}
          />
          <Line 
            type="monotone" 
            dataKey="clicks" 
            stroke="#0ea5e9" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 