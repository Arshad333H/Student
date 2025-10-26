"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

interface Student {
  id: string
  name: string
  rollNumber: string
  class: string
}

interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  date: string
  time: string
  status: "Present" | "Absent" | "Leave"
}

export default function AttendanceManagement() {
  // Mock student data - in real app, this would come from database
  const [students] = useState<Student[]>([
    { id: "1", name: "Aarav Sharma", rollNumber: "001", class: "10-A" },
    { id: "2", name: "Priya Patel", rollNumber: "002", class: "10-A" },
    { id: "3", name: "Rohan Kumar", rollNumber: "003", class: "10-B" },
    { id: "4", name: "Ananya Singh", rollNumber: "004", class: "10-A" },
    { id: "5", name: "Vikram Desai", rollNumber: "005", class: "10-B" },
    { id: "6", name: "Neha Gupta", rollNumber: "006", class: "10-A" },
  ])

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: "1",
      studentId: "1",
      studentName: "Aarav Sharma",
      date: "2024-10-20",
      time: "09:00 AM",
      status: "Present",
    },
    {
      id: "2",
      studentId: "3",
      studentName: "Rohan Kumar",
      date: "2024-10-20",
      time: "09:05 AM",
      status: "Absent",
    },
  ])

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set())
  const [view, setView] = useState<"mark" | "history">("mark")

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
  }

  const toggleStudentSelection = (studentId: string) => {
    const newSelected = new Set(selectedStudents)
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId)
    } else {
      newSelected.add(studentId)
    }
    setSelectedStudents(newSelected)
  }

  const markAttendance = (status: "Absent" | "Present") => {
    if (selectedStudents.size === 0) return

    const currentTime = getCurrentTime()

    // Remove existing records for this date
    const filteredRecords = attendanceRecords.filter((record) => record.date !== selectedDate)

    // Create records for selected students with the chosen status
    const selectedRecords = Array.from(selectedStudents).map((studentId) => {
      const student = students.find((s) => s.id === studentId)
      return {
        id: Date.now().toString() + Math.random(),
        studentId,
        studentName: student?.name || "Unknown",
        date: selectedDate,
        time: currentTime,
        status: status as const,
      }
    })

    // Create records for non-selected students with the opposite status
    const oppositeStatus = status === "Absent" ? "Present" : "Absent"
    const oppositeRecords = students
      .filter((student) => !selectedStudents.has(student.id))
      .map((student) => ({
        id: Date.now().toString() + Math.random(),
        studentId: student.id,
        studentName: student.name,
        date: selectedDate,
        time: currentTime,
        status: oppositeStatus as const,
      }))

    setAttendanceRecords([...filteredRecords, ...selectedRecords, ...oppositeRecords])
    setSelectedStudents(new Set())
  }

  const markAbsent = () => markAttendance("Absent")
  const markPresent = () => markAttendance("Present")

  const getStudentStatus = (studentId: string) => {
    return attendanceRecords.find((record) => record.studentId === studentId && record.date === selectedDate)
  }

  const todayRecords = attendanceRecords.filter((record) => record.date === selectedDate)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800"
      case "Absent":
        return "bg-red-100 text-red-800"
      case "Leave":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border">
        <Button
          variant={view === "mark" ? "default" : "ghost"}
          onClick={() => setView("mark")}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Mark Attendance
        </Button>
        <Button
          variant={view === "history" ? "default" : "ghost"}
          onClick={() => setView("history")}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          History
        </Button>
      </div>

      {view === "mark" ? (
        <Card>
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
            <CardDescription>
              Select students and mark them. All other students will automatically get the opposite status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <label className="font-medium">Date:</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40"
              />
              <span className="text-sm text-muted-foreground">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Students ({students.length})</h3>
              <div className="max-h-96 space-y-2 overflow-y-auto rounded-lg border border-border p-4">
                {students.map((student) => {
                  const status = getStudentStatus(student.id)
                  const isSelected = selectedStudents.has(student.id)

                  return (
                    <div
                      key={student.id}
                      className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50"
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleStudentSelection(student.id)}
                        className="h-5 w-5"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">Roll: {student.rollNumber}</div>
                      </div>
                      {status && (
                        <div className="flex items-center gap-2">
                          {status.status === "Present" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(status.status)}`}
                          >
                            {status.status}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {status.time}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3 border-t border-border pt-4">
              <Button
                onClick={markAbsent}
                disabled={selectedStudents.size === 0}
                variant="destructive"
                className="gap-2"
              >
                <XCircle className="h-4 w-4" />
                Mark {selectedStudents.size > 0 ? `${selectedStudents.size}` : ""} as Absent
              </Button>
              <Button onClick={markPresent} disabled={selectedStudents.size === 0} variant="default" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Mark {selectedStudents.size > 0 ? `${selectedStudents.size}` : ""} as Present
              </Button>
            </div>

            {todayRecords.length > 0 && (
              <div className="rounded-lg bg-muted/50 p-4">
                <h3 className="mb-3 font-semibold">Today's Attendance Summary</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-background p-3">
                    <div className="text-2xl font-bold text-green-600">
                      {todayRecords.filter((r) => r.status === "Present").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Present</div>
                  </div>
                  <div className="rounded-lg bg-background p-3">
                    <div className="text-2xl font-bold text-red-600">
                      {todayRecords.filter((r) => r.status === "Absent").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Absent</div>
                  </div>
                  <div className="rounded-lg bg-background p-3">
                    <div className="text-2xl font-bold text-blue-600">{students.length - todayRecords.length}</div>
                    <div className="text-sm text-muted-foreground">Not Marked</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>View all attendance records with date and time stamps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Student Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Roll Number</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        No attendance records yet
                      </td>
                    </tr>
                  ) : (
                    attendanceRecords
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((record) => (
                        <tr key={record.id} className="border-b border-border hover:bg-muted/50">
                          <td className="px-4 py-3 text-foreground">{record.studentName}</td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {students.find((s) => s.id === record.studentId)?.rollNumber}
                          </td>
                          <td className="px-4 py-3 text-foreground">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{record.time}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(record.status)}`}
                            >
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
