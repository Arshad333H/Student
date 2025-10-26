"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"

interface Exam {
  id: string
  title: string
  subject: string
  date: string
  time: string
  duration: string
  totalMarks: number
  room: string
}

export default function ExamsManagement() {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: "1",
      title: "Mid-term Mathematics",
      subject: "Mathematics",
      date: "2024-11-10",
      time: "09:00",
      duration: "2 hours",
      totalMarks: 100,
      room: "A-101",
    },
    {
      id: "2",
      title: "Mid-term English",
      subject: "English",
      date: "2024-11-12",
      time: "10:00",
      duration: "2 hours",
      totalMarks: 100,
      room: "A-102",
    },
    {
      id: "3",
      title: "Mid-term Science",
      subject: "Science",
      date: "2024-11-15",
      time: "09:00",
      duration: "2.5 hours",
      totalMarks: 100,
      room: "B-101",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Exam | null>(null)
  const [newExam, setNewExam] = useState({
    title: "",
    subject: "",
    date: "",
    time: "",
    duration: "",
    totalMarks: "100",
    room: "",
  })
  const [showForm, setShowForm] = useState(false)

  const handleEdit = (exam: Exam) => {
    setEditingId(exam.id)
    setEditData({ ...exam })
  }

  const handleSave = () => {
    if (editData) {
      setExams(exams.map((e) => (e.id === editingId ? editData : e)))
      setEditingId(null)
      setEditData(null)
    }
  }

  const handleDelete = (id: string) => {
    setExams(exams.filter((e) => e.id !== id))
  }

  const handleAddExam = () => {
    if (newExam.title && newExam.subject && newExam.date && newExam.time) {
      setExams([
        ...exams,
        {
          id: Date.now().toString(),
          title: newExam.title,
          subject: newExam.subject,
          date: newExam.date,
          time: newExam.time,
          duration: newExam.duration,
          totalMarks: Number.parseInt(newExam.totalMarks),
          room: newExam.room,
        },
      ])
      setNewExam({ title: "", subject: "", date: "", time: "", duration: "", totalMarks: "100", room: "" })
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Exams Management</CardTitle>
            <CardDescription>Schedule and manage exams for your class</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Exam
          </Button>
        </CardHeader>
        <CardContent>
          {showForm && (
            <div className="mb-6 space-y-4 rounded-lg border border-border bg-muted/50 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  placeholder="Exam Title"
                  value={newExam.title}
                  onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                />
                <Input
                  placeholder="Subject"
                  value={newExam.subject}
                  onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                />
                <Input
                  placeholder="Date"
                  type="date"
                  value={newExam.date}
                  onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                />
                <Input
                  placeholder="Time"
                  type="time"
                  value={newExam.time}
                  onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
                />
                <Input
                  placeholder="Duration (e.g., 2 hours)"
                  value={newExam.duration}
                  onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
                />
                <Input
                  placeholder="Total Marks"
                  type="number"
                  value={newExam.totalMarks}
                  onChange={(e) => setNewExam({ ...newExam, totalMarks: e.target.value })}
                />
                <Input
                  placeholder="Room Number"
                  value={newExam.room}
                  onChange={(e) => setNewExam({ ...newExam, room: e.target.value })}
                  className="sm:col-span-2"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddExam} className="gap-2">
                  <Save className="h-4 w-4" />
                  Add
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {exams.map((exam) => (
              <div key={exam.id} className="rounded-lg border border-border p-4 hover:bg-muted/50">
                {editingId === exam.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editData?.title || ""}
                      onChange={(e) => setEditData({ ...editData!, title: e.target.value })}
                      placeholder="Title"
                    />
                    <Input
                      value={editData?.subject || ""}
                      onChange={(e) => setEditData({ ...editData!, subject: e.target.value })}
                      placeholder="Subject"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        value={editData?.date || ""}
                        onChange={(e) => setEditData({ ...editData!, date: e.target.value })}
                      />
                      <Input
                        type="time"
                        value={editData?.time || ""}
                        onChange={(e) => setEditData({ ...editData!, time: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={editData?.duration || ""}
                        onChange={(e) => setEditData({ ...editData!, duration: e.target.value })}
                        placeholder="Duration"
                      />
                      <Input
                        type="number"
                        value={editData?.totalMarks || ""}
                        onChange={(e) => setEditData({ ...editData!, totalMarks: Number.parseInt(e.target.value) })}
                        placeholder="Total Marks"
                      />
                    </div>
                    <Input
                      value={editData?.room || ""}
                      onChange={(e) => setEditData({ ...editData!, room: e.target.value })}
                      placeholder="Room"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSave} className="gap-1">
                        <Save className="h-3 w-3" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="gap-1">
                        <X className="h-3 w-3" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold text-foreground">{exam.title}</h3>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong>Subject:</strong> {exam.subject}
                      </p>
                      <p>
                        <strong>Date:</strong> {exam.date}
                      </p>
                      <p>
                        <strong>Time:</strong> {exam.time}
                      </p>
                      <p>
                        <strong>Duration:</strong> {exam.duration}
                      </p>
                      <p>
                        <strong>Total Marks:</strong> {exam.totalMarks}
                      </p>
                      <p>
                        <strong>Room:</strong> {exam.room}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(exam)} className="h-8 gap-1">
                        <Edit2 className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(exam.id)}
                        className="h-8 gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
