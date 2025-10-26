"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentManagement from "@/components/student-management"
import MarksManagement from "@/components/marks-management"
import AttendanceManagement from "@/components/attendance-management"
import AssignmentsManagement from "@/components/assignments-management"
import ExamsManagement from "@/components/exams-management"

export default function TeacherAdminPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Teacher Admin Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage student academic records and performance</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <span className="text-sm font-medium text-foreground">System Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-5 gap-2 bg-muted p-1">
            <TabsTrigger value="students" className="text-xs sm:text-sm">
              Students
            </TabsTrigger>
            <TabsTrigger value="marks" className="text-xs sm:text-sm">
              Marks
            </TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs sm:text-sm">
              Attendance
            </TabsTrigger>
            <TabsTrigger value="assignments" className="text-xs sm:text-sm">
              Assignments
            </TabsTrigger>
            <TabsTrigger value="exams" className="text-xs sm:text-sm">
              Exams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6">
            <StudentManagement />
          </TabsContent>

          <TabsContent value="marks" className="mt-6">
            <MarksManagement />
          </TabsContent>

          <TabsContent value="attendance" className="mt-6">
            <AttendanceManagement />
          </TabsContent>

          <TabsContent value="assignments" className="mt-6">
            <AssignmentsManagement />
          </TabsContent>

          <TabsContent value="exams" className="mt-6">
            <ExamsManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
