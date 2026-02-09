import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const defaultData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 132 },
  { month: "Mar", value: 128 },
  { month: "Apr", value: 145 },
  { month: "May", value: 151 },
  { month: "Jun", value: 160 }
];

export default function TrendChart({ data = defaultData }) {
  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#8ea2b7" />
          <YAxis stroke="#8ea2b7" />
          <Tooltip contentStyle={{ background: "#0f1623", border: "1px solid #1e2a3a" }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#39d0a8"
            strokeWidth={3}
            dot={{ r: 3, fill: "#39d0a8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
