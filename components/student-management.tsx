"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string
  class: string
}

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Aarav Sharma", email: "aarav@school.com", rollNumber: "001", class: "10-A" },
    { id: "2", name: "Priya Patel", email: "priya@school.com", rollNumber: "002", class: "10-A" },
    { id: "3", name: "Rohan Kumar", email: "rohan@school.com", rollNumber: "003", class: "10-B" },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Student | null>(null)
  const [newStudent, setNewStudent] = useState({ name: "", email: "", rollNumber: "", class: "" })
  const [showForm, setShowForm] = useState(false)

  const handleEdit = (student: Student) => {
    setEditingId(student.id)
    setEditData({ ...student })
  }

  const handleSave = () => {
    if (editData) {
      setStudents(students.map((s) => (s.id === editingId ? editData : s)))
      setEditingId(null)
      setEditData(null)
    }
  }

  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.rollNumber && newStudent.class) {
      setStudents([
        ...students,
        {
          id: Date.now().toString(),
          ...newStudent,
        },
      ])
      setNewStudent({ name: "", email: "", rollNumber: "", class: "" })
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Student List</CardTitle>
            <CardDescription>Manage all students in your class</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </CardHeader>
        <CardContent>
          {showForm && (
            <div className="mb-6 space-y-4 rounded-lg border border-border bg-muted/50 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  placeholder="Student Name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
                <Input
                  placeholder="Roll Number"
                  value={newStudent.rollNumber}
                  onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                />
                <Input
                  placeholder="Class"
                  value={newStudent.class}
                  onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddStudent} className="gap-2">
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
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Roll Number</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Class</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-muted/50">
                    {editingId === student.id ? (
                      <>
                        <td className="px-4 py-3">
                          <Input
                            value={editData?.name || ""}
                            onChange={(e) => setEditData({ ...editData!, name: e.target.value })}
                            className="h-8"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            value={editData?.email || ""}
                            onChange={(e) => setEditData({ ...editData!, email: e.target.value })}
                            className="h-8"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            value={editData?.rollNumber || ""}
                            onChange={(e) => setEditData({ ...editData!, rollNumber: e.target.value })}
                            className="h-8"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            value={editData?.class || ""}
                            onChange={(e) => setEditData({ ...editData!, class: e.target.value })}
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
                        <td className="px-4 py-3 text-foreground">{student.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{student.email}</td>
                        <td className="px-4 py-3 text-foreground">{student.rollNumber}</td>
                        <td className="px-4 py-3 text-foreground">{student.class}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(student)}
                              className="h-8 gap-1"
                            >
                              <Edit2 className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(student.id)}
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
