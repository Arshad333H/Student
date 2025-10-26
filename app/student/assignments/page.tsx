'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const assignmentStatusData = [
  { name: 'Completed', count: 18, fill: '#10b981' },
  { name: 'Due Soon', count: 4, fill: '#f59e0b' },
  { name: 'Late', count: 1, fill: '#ef4444' },
];

const weeklyWorkloadData = [
  { week: 'Wk 1', assignments: 3, readings: 1 },
  { week: 'Wk 2', assignments: 5, readings: 3 },
  { week: 'Wk 3', assignments: 2, readings: 1 },
  { week: 'Wk 4', assignments: 7, readings: 4 },
  { week: 'Wk 5', assignments: 4, readings: 2 },
];

const AssignmentView: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Assignments 📝</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Status Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Assignment Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assignmentStatusData}>
              <XAxis dataKey="name" stroke="#666" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="fill" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stacked Workload Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Weekly Task Load</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyWorkloadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" stroke="#666" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="assignments" stackId="a" fill="#3b82f6" name="Assignments" />
              <Bar dataKey="readings" stackId="a" fill="#6366f1" name="Readings/Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Deadlines Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
        {/* ... (Table implementation remains the same for responsiveness) ... */}
      </div>
    </div>
  );
};

export default AssignmentView;