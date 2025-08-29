import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

  export default function PostPieChart({data}) {
    return data.length<2? <div className="h-full flex flex-col items-center justify-center text-center p-4">
    <span className="text-3xl mb-2">📉</span>
    <p className="text-lg font-medium">
      Not enough posts to show meaningful insights!
    </p>
    <p className="text-sm text-gray-500">
      Keep creating content and this pie chart will update automatically 📈✨
    </p>
  </div>:
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
  }
