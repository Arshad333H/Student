"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Save, X } from "lucide-react"

interface Assignment {
  id: string
  title: string
  description: string
  dueDate: string
  subject: string
  status: "Pending" | "Submitted" | "Graded"
}

export default function AssignmentsManagement() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Algebra Problem Set",
      description: "Solve 20 algebra problems from chapter 5",
      dueDate: "2024-10-25",
      subject: "Mathematics",
      status: "Pending",
    },
    {
      id: "2",
      title: "Essay on Climate Change",
      description: "Write a 500-word essay on climate change",
      dueDate: "2024-10-28",
      subject: "English",
      status: "Submitted",
    },
    {
      id: "3",
      title: "Science Project",
      description: "Create a model of the solar system",
      dueDate: "2024-11-05",
      subject: "Science",
      status: "Pending",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Assignment | null>(null)
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    subject: "",
    status: "Pending" as const,
  })
  const [showForm, setShowForm] = useState(false)

  const handleEdit = (assignment: Assignment) => {
    setEditingId(assignment.id)
    setEditData({ ...assignment })
  }

  const handleSave = () => {
    if (editData) {
      setAssignments(assignments.map((a) => (a.id === editingId ? editData : a)))
      setEditingId(null)
      setEditData(null)
    }
  }

  const handleDelete = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id))
  }

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.dueDate && newAssignment.subject) {
      setAssignments([
        ...assignments,
        {
          id: Date.now().toString(),
          ...newAssignment,
        },
      ])
      setNewAssignment({ title: "", description: "", dueDate: "", subject: "", status: "Pending" })
      setShowForm(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-blue-100 text-blue-800"
      case "Submitted":
        return "bg-purple-100 text-purple-800"
      case "Graded":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Assignments Management</CardTitle>
            <CardDescription>Create, edit, and manage student assignments</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Assignment
          </Button>
        </CardHeader>
        <CardContent>
          {showForm && (
            <div className="mb-6 space-y-4 rounded-lg border border-border bg-muted/50 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  placeholder="Assignment Title"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                />
                <Input
                  placeholder="Subject"
                  value={newAssignment.subject}
                  onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                />
                <Input
                  placeholder="Description"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  className="sm:col-span-2"
                />
                <Input
                  placeholder="Due Date"
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                />
                <select
                  value={newAssignment.status}
                  onChange={(e) => setNewAssignment({ ...newAssignment, status: e.target.value as any })}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Graded">Graded</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddAssignment} className="gap-2">
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

          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="rounded-lg border border-border p-4 hover:bg-muted/50">
                {editingId === assignment.id ? (
                  <div className="space-y-4">
                    <Input
                      value={editData?.title || ""}
                      onChange={(e) => setEditData({ ...editData!, title: e.target.value })}
                      placeholder="Title"
                    />
                    <Input
                      value={editData?.description || ""}
                      onChange={(e) => setEditData({ ...editData!, description: e.target.value })}
                      placeholder="Description"
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Input
                        value={editData?.subject || ""}
                        onChange={(e) => setEditData({ ...editData!, subject: e.target.value })}
                        placeholder="Subject"
                      />
                      <Input
                        type="date"
                        value={editData?.dueDate || ""}
                        onChange={(e) => setEditData({ ...editData!, dueDate: e.target.value })}
                      />
                    </div>
                    <select
                      value={editData?.status || "Pending"}
                      onChange={(e) => setEditData({ ...editData!, status: e.target.value as any })}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Graded">Graded</option>
                    </select>
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
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{assignment.description}</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <span className="text-xs text-muted-foreground">
                          <strong>Subject:</strong> {assignment.subject}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          <strong>Due:</strong> {assignment.dueDate}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(assignment.status)}`}
                        >
                          {assignment.status}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(assignment)} className="h-8 gap-1">
                        <Edit2 className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(assignment.id)}
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
