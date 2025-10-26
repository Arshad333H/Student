'use client';
import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from 'recharts';

const overallAttendanceRate = 88;
const courseAttendanceData = [
  { course: 'Calculus I', total: 30, attended: 28, absences: 2, allowed: 4, color: '#6366f1' },
  { course: 'CS Fundamentals', total: 30, attended: 29, absences: 1, allowed: 3, color: '#3b82f6' },
  { course: 'Physics', total: 20, attended: 16, absences: 4, allowed: 2, color: '#10b981' },
];

const radialData = [{ name: 'Attendance', uv: overallAttendanceRate, fill: '#3b82f6' }];

const AttendanceView: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Attendance Tracking 🗓️</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Overall Attendance Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border lg:col-span-1 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Overall Attendance Rate</h2>
          <ResponsiveContainer width="100%" height={300} className="max-w-xs">
            <RadialBarChart innerRadius="70%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
              <RadialBar startAngle={15} background dataKey="uv" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-4xl font-bold text-blue-600">
                {overallAttendanceRate}%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Course Attendance Table (Better Visuals) */}
        <div className="bg-white p-6 rounded-xl shadow-lg border lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Course Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Absences</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Warning Level</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courseAttendanceData.map((data) => (
                  <AttendanceRow key={data.course} {...data} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const AttendanceRow: React.FC<typeof courseAttendanceData[0]> = ({ course, total, attended, absences, allowed }) => {
  const rate = ((attended / total) * 100).toFixed(1);
  const warningLevel = absences / allowed;
  
  let statusClass = 'bg-green-100 text-green-800';
  if (warningLevel >= 0.75) statusClass = 'bg-yellow-100 text-yellow-800';
  if (warningLevel >= 1) statusClass = 'bg-red-100 text-red-800 font-bold';

  return (
    <tr>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course}</td>
      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-semibold">{absences} / {allowed}</td>
      <td className="px-4 py-4 whitespace-nowrap text-center">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
          {warningLevel < 0.75 ? 'Safe' : warningLevel < 1 ? 'Warning' : 'Critical'}
        </span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-bold text-blue-600">{rate}%</td>
    </tr>
  );
};

export default AttendanceView;