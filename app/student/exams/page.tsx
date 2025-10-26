'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const pastExamPerformance = [
  { name: 'Midterm 1', yourScore: 82, classAvg: 78 },
  { name: 'Quiz 3', yourScore: 95, classAvg: 85 },
  { name: 'Final Exam (Calc)', yourScore: 75, classAvg: 70 },
  { name: 'Project Milestone', yourScore: 90, classAvg: 85 },
];

const upcomingExams = [
  { course: 'CS Fundamentals', exam: 'Final Exam', date: 'Dec 15, 9:00 AM', location: 'Room 301' },
  { course: 'Physics', exam: 'Lab Practical', date: 'Dec 18, 2:00 PM', location: 'Lab B' },
];

const ExamsView: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Exam Details 🧠</h1>

      {/* Upcoming Exams (Card Grid) */}
      <div className="bg-white p-6 rounded-xl shadow-lg border mb-8">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Upcoming Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingExams.map((exam, index) => (
            <div key={index} className="p-4 rounded-lg bg-indigo-50 border border-indigo-200 hover:shadow-md transition">
              <div className="text-lg font-bold text-gray-800">{exam.exam} - {exam.course}</div>
              <div className="text-sm text-red-600 font-semibold mt-1">🗓️ {exam.date}</div>
              <div className="text-sm text-gray-500">📍 {exam.location}</div>
              <button className="mt-2 text-xs text-blue-600 hover:underline">Add to Calendar</button>
            </div>
          ))}
        </div>
      </div>

      {/* Past Performance Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Past Performance Comparison</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={pastExamPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="yourScore" fill="#3b82f6" name="Your Score" radius={[10, 10, 0, 0]} />
            <Bar dataKey="classAvg" fill="#6366f1" name="Class Average" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExamsView;