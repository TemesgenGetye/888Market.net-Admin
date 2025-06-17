import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
} from "recharts";

export default function RevenueChart() {
  const data = [
    { month: "Jan", currentWeek: 10, previousWeek: 8 },
    { month: "Feb", currentWeek: 15, previousWeek: 10 },
    { month: "Mar", currentWeek: 12, previousWeek: 15 },
    { month: "Apr", currentWeek: 8, previousWeek: 20 },
    { month: "May", currentWeek: 15, previousWeek: 18 },
    { month: "Jun", currentWeek: 20, previousWeek: 15 },
  ];

  return (
    <ChartContainer className="h-[300px]" config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            tickFormatter={(value) => `${value}M`}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="border-blue-500"
                    items={[
                      {
                        label: "Current Week",
                        value: `$${payload[0].value}M`,
                        color: "#3b82f6",
                      },
                      {
                        label: "Previous Week",
                        value: `$${payload[1].value}M`,
                        color: "#10b981",
                      },
                    ]}
                  />
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="currentWeek"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="previousWeek"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
