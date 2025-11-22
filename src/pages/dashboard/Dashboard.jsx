import React, { useState } from "react";
import { Card, Select, Typography } from "antd";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";

const { Title, Text } = Typography;
const { Option } = Select;

const monthlyData = [
  { month: "Jan", registered: 15000, paying: 12000 },
  { month: "Feb", registered: 18000, paying: 14000 },
  { month: "Mar", registered: 22000, paying: 5000 },
  { month: "Apr", registered: 16000, paying: 5000 },
  { month: "May", registered: 13000, paying: 12000 },
  { month: "Jun", registered: 17000, paying: 13000 },
  { month: "Jul", registered: 20000, paying: 11000 },
];

const generateDailyData = () => {
  const data = [];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
  ];

  months.forEach((month) => {
    const daysInMonth = 30;
    for (let day = 1; day <= daysInMonth; day++) {
      data.push({
        date: `${month.slice(0, 3)} ${day}`,
        month,
        revenue: Math.floor(Math.random() * 15000) + 5000,
        newUsers: Math.floor(Math.random() * 5) + 1,
      });
    }
  });

  return data;
};

const dailyData = generateDailyData();

function Dashboard() {
  const [timeRange, setTimeRange] = useState("monthly");
  const [revenueRange, setRevenueRange] = useState("30");

  const getFilteredRevenueData = () => {
    if (revenueRange === "30") {
      return dailyData.slice(-30);
    } else if (revenueRange === "90") {
      return dailyData.slice(-90);
    }
    return dailyData;
  };

  const stats = [
    {
      value: "1320",
      label: "Active Users Today",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      value: "8",
      label: "New Users (Last 7 Days)",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      value: "41",
      label: "Paying Users",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      value: "$500",
      label: "Monthly Revenue",
      icon: <BarChart3 className="w-5 h-5" />,
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8 bg-white p-6 rounded-2xl">
        <Text className="text-gray-600 block mb-1">Hi, Good Morning</Text>
        <Title level={2} className="!mb-0 !mt-0">
          Shah Rukh Khan
        </Title>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 bg-white p-6 rounded-2xl">
        <Title level={4} className="mb-4">
          User's Overview
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className="bg-gradient-to-br from-emerald-100 to-teal-100 border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    {stat.icon}
                  </div>
                  <Title level={3} className="!mb-1 !mt-0">
                    {stat.value}
                  </Title>
                  <Text className="text-gray-600 text-sm">{stat.label}</Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registered vs Paying Users */}

        <Card
          className="shadow-sm"
          title={
            <div className="flex justify-between items-center">
              <span>Registered Users vs Paying Users (Monthly)</span>
              <Select
                value={timeRange}
                onChange={setTimeRange}
                className="w-32"
                size="small"
              >
                <Option value="monthly">Monthly</Option>
                <Option value="weekly">Weekly</Option>
              </Select>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#666", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fill: "#666", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
                formatter={(value) => value.toLocaleString()}
              />
              <Legend wrapperStyle={{ paddingTop: "0px" }} iconType="circle" />
              <Bar
                dataKey="registered"
                fill="#3b82f6"
                name="Registered Users"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="paying"
                fill="#10b981"
                name="Paying Users"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue & New Paying Users */}
        <Card
          className="shadow-sm"
          title={
            <div className="flex justify-between items-center">
              <span>Revenue & New Paying Users</span>
              <Select
                value={revenueRange}
                onChange={setRevenueRange}
                className="w-32"
                size="small"
              >
                <Option value="30">Last 30 Days</Option>
                <Option value="90">Last 90 Days</Option>
                <Option value="all">All Time</Option>
              </Select>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={getFilteredRevenueData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#666", fontSize: 10 }}
                interval={Math.floor(getFilteredRevenueData().length / 10)}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: "#666", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => {
                  if (name === "Daily revenue")
                    return `$${value.toLocaleString()}`;
                  return value;
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                name="Daily revenue"
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="newUsers"
                stroke="#3b82f6"
                strokeWidth={2}
                name="New paying users"
                dot={{ fill: "#3b82f6", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
