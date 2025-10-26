'use client';
import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

const courseData = [
  {
    name: 'Calculus I', currentGrade: 92, creditHours: 4,
    categoryGrades: [
      { name: 'Assignments', score: 95 },
      { name: 'Exams', score: 88 },
      { name: 'Quizzes', score: 98 },
    ],
  },
  {
    name: 'CS Fundamentals', currentGrade: 85, creditHours: 3,
    categoryGrades: [
      { name: 'Assignments', score: 80 },
      { name: 'Exams', score: 87 },
      { name: 'Project', score: 90 },
    ],
  },
  {
    name: 'Physics', currentGrade: 78, creditHours: 4,
    categoryGrades: [
      { name: 'Labs', score: 90 },
      { name: 'Midterm', score: 70 },
      { name: 'Final', score: 75 },
    ],
  },
];

const getGradeColor = (grade: number) => {
  if (grade >= 90) return 'text-teal-600';
  if (grade >= 80) return 'text-yellow-600';
  return 'text-red-600';
};

const MarksView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState(courseData[0]);

  const radarChartData = selectedCourse.categoryGrades.map(cat => ({
    subject: cat.name,
    score: cat.score,
    fullMark: 100,
  }));

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Academic Marks 📊</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Course List Sidebar (Responsive) */}
        <div className="w-full lg:w-1/3 bg-white p-4 rounded-xl shadow-lg border h-fit order-2 lg:order-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Courses</h2>
          {courseData.map(course => (
            <div
              key={course.name}
              onClick={() => setSelectedCourse(course)}
              className={`p-3 mb-2 rounded-lg cursor-pointer transition duration-200 border-l-4 ${
                selectedCourse.name === course.name
                  ? 'bg-indigo-50 border-indigo-600 shadow-inner'
                  : 'hover:bg-gray-100 border-transparent'
              }`}
            >
              <div className="font-bold text-lg text-gray-800">{course.name}</div>
              <div className={`text-sm font-semibold ${getGradeColor(course.currentGrade)}`}>
                {course.currentGrade}%
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View and Chart */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border">
            <h2 className="text-3xl font-bold text-gray-800">{selectedCourse.name}</h2>
            <div className={`text-6xl font-extrabold mt-2 ${getGradeColor(selectedCourse.currentGrade)}`}>
              {selectedCourse.currentGrade}<span className="text-3xl font-normal">%</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="subject" stroke="#333" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Your Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarksView;