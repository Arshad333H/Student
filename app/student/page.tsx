'use client'; 
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const termPerformanceData = [
  { name: 'Fall 2023', gpa: 3.2, score: 85 },
  { name: 'Spring 2024', gpa: 3.5, score: 89 },
  { name: 'Fall 2024', gpa: 3.7, score: 92 },
];
const radialData = [{ name: 'Progress', uv: 75, fill: '#6366f1' }]; // Indigo-500

const StatCard: React.FC<{ title: string; value: string; color: string }> = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-400 transition hover:shadow-lg">
    <div className="text-sm font-medium text-gray-500">{title}</div>
    <div className={`text-4xl font-extrabold mt-1 ${color}`}>{value}</div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Academic Overview 🏠</h1>
      
      {/* Quick Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Cumulative GPA" value="3.47" color="text-indigo-600" />
        <StatCard title="Upcoming Deadlines" value="3" color="text-red-600" />
        <StatCard title="Overall Average" value="86%" color="text-teal-600" />
      </div>

      {/* Charts Section - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Semester Progress Chart (Radial Bar) */}
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Semester Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart innerRadius="70%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
              <RadialBar startAngle={15} background  dataKey="uv" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-4xl font-bold text-indigo-600">
                75%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trends Chart (Line Chart) */}
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Performance Trends (GPA History)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={termPerformanceData} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis domain={[3.0, 4.0]} stroke="#666" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #ddd' }} />
              <Line type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} name="Term GPA" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;