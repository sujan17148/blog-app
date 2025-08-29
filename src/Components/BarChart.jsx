import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function EngagementBarChart({ data }) {
  return data.length < 3 ? (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <span className="text-3xl mb-2">📉</span>
      <p className="text-lg font-medium">
        Not enough posts to show meaningful insights!
      </p>
      <p className="text-sm text-gray-500">
        Keep creating content and this chart will update automatically 📈✨
      </p>
    </div>
  ) : (
    <ResponsiveContainer>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
        <YAxis type="category" dataKey="title" />
        <Tooltip formatter={(val) => val} />
        <Bar dataKey="views" fill="#8884d8" radius={[0, 10, 10, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
