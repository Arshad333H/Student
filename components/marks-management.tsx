"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"

interface Mark {
  id: string
  studentName: string
  subject: string
  marks: number
  totalMarks: number
  date: string
}

export default function MarksManagement() {
  const [marks, setMarks] = useState<Mark[]>([
    { id: "1", studentName: "Aarav Sharma", subject: "Mathematics", marks: 85, totalMarks: 100, date: "2024-10-20" },
    { id: "2", studentName: "Priya Patel", subject: "English", marks: 92, totalMarks: 100, date: "2024-10-20" },
    { id: "3", studentName: "Rohan Kumar", subject: "Science", marks: 78, totalMarks: 100, date: "2024-10-19" },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Mark | null>(null)
  const [newMark, setNewMark] = useState({ studentName: "", subject: "", marks: "", totalMarks: "100", date: "" })
  const [showForm, setShowForm] = useState(false)

  const handleEdit = (mark: Mark) => {
    setEditingId(mark.id)
    setEditData({ ...mark })
  }

  const handleSave = () => {
    if (editData) {
      setMarks(marks.map((m) => (m.id === editingId ? editData : m)))
      setEditingId(null)
      setEditData(null)
    }
  }

  const handleDelete = (id: string) => {
    setMarks(marks.filter((m) => m.id !== id))
  }

  const handleAddMark = () => {
    if (newMark.studentName && newMark.subject && newMark.marks && newMark.date) {
      setMarks([
        ...marks,
        {
          id: Date.now().toString(),
          studentName: newMark.studentName,
          subject: newMark.subject,
          marks: Number.parseInt(newMark.marks),
          totalMarks: Number.parseInt(newMark.totalMarks),
          date: newMark.date,
        },
      ])
      setNewMark({ studentName: "", subject: "", marks: "", totalMarks: "100", date: "" })
      setShowForm(false)
    }
  }

  const getPercentage = (marks: number, total: number) => ((marks / total) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Marks Management</CardTitle>
            <CardDescription>Add and edit student marks for different subjects</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Marks
          </Button>
        </CardHeader>
        <CardContent>
          {showForm && (
            <div className="mb-6 space-y-4 rounded-lg border border-border bg-muted/50 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  placeholder="Student Name"
                  value={newMark.studentName}
                  onChange={(e) => setNewMark({ ...newMark, studentName: e.target.value })}
                />
                <Input
                  placeholder="Subject"
                  value={newMark.subject}
                  onChange={(e) => setNewMark({ ...newMark, subject: e.target.value })}
                />
                <Input
                  placeholder="Marks Obtained"
                  type="number"
                  value={newMark.marks}
                  onChange={(e) => setNewMark({ ...newMark, marks: e.target.value })}
                />
                <Input
                  placeholder="Total Marks"
                  type="number"
                  value={newMark.totalMarks}
                  onChange={(e) => setNewMark({ ...newMark, totalMarks: e.target.value })}
                />
                <Input
                  placeholder="Date"
                  type="date"
                  value={newMark.date}
                  onChange={(e) => setNewMark({ ...newMark, date: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddMark} className="gap-2">
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

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Student</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Subject</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Marks</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Percentage</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((mark) => (
                  <tr key={mark.id} className="border-b border-border hover:bg-muted/50">
                    {editingId === mark.id ? (
                      <>
                        <td className="px-4 py-3">
                          <Input
                            value={editData?.studentName || ""}
                            onChange={(e) => setEditData({ ...editData!, studentName: e.target.value })}
                            className="h-8"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            value={editData?.subject || ""}
                            onChange={(e) => setEditData({ ...editData!, subject: e.target.value })}
                            className="h-8"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            type="number"
                            value={editData?.marks || ""}
                            onChange={(e) => setEditData({ ...editData!, marks: Number.parseInt(e.target.value) })}
                            className="h-8"
                          />
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {getPercentage(editData?.marks || 0, editData?.totalMarks || 100)}%
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            type="date"
                            value={editData?.date || ""}
                            onChange={(e) => setEditData({ ...editData!, date: e.target.value })}
                            className="h-8"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSave} className="h-8 gap-1">
                              <Save className="h-3 w-3" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(null)}
                              className="h-8 gap-1"
                            >
                              <X className="h-3 w-3" />
                              Cancel
                            </Button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-foreground">{mark.studentName}</td>
                        <td className="px-4 py-3 text-foreground">{mark.subject}</td>
                        <td className="px-4 py-3 text-foreground">
                          {mark.marks}/{mark.totalMarks}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            {getPercentage(mark.marks, mark.totalMarks)}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{mark.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(mark)} className="h-8 gap-1">
                              <Edit2 className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(mark.id)}
                              className="h-8 gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
