"use client";


import { useState } from "react";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { Menu, X, LogOut, User, LayoutDashboard, FileText, CheckCircle, Calendar, Edit3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Student Info", href: "/student", icon: User },
  { label: "Marks", href: "/student/marks", icon: FileText },
  { label: "Assignments", href: "/student/assignments", icon: Edit3 },
  { label: "Attendance", href: "/student/attendance", icon: CheckCircle },
  { label: "Exams", href: "/student/exams", icon: Calendar },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = {
    name: "Arshad Shareef",
    avatarUrl: "/avatar.png",
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <nav className="sticky top-0 z-50 w-full bg-white backdrop-blur-md bg-opacity-95 border-b border-gray-100 shadow-lg">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-8xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6 text-indigo-600" />
          <div className="text-xl font-extrabold text-gray-900 tracking-tight">
            <span className="text-indigo-600">Student</span>
            <span className="text-gray-800">Track</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-2">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-9 w-9 border-2 border-indigo-200 hover:border-indigo-400 transition-colors">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-indigo-500 text-white font-medium text-sm">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 shadow-lg rounded-xl p-1">
              <DropdownMenuLabel className="text-sm font-bold text-gray-900 px-3 pt-2 pb-1">
                {user.name}
              </DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs text-gray-500 font-normal px-3 pb-2">
                Student
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-100" />
              <DropdownMenuItem className="p-2 cursor-pointer rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600">
                <User className="w-4 h-4 mr-3" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-100" />
              <DropdownMenuItem
                className="p-2 cursor-pointer rounded-lg text-red-600 font-medium hover:bg-red-50"
                onSelect={(e) => {
                  e.preventDefault(); 
                  console.log("Logging out...");
                }}
              >
                <LogOut className="w-4 h-4 mr-3" />
                <LogoutLink>Logout</LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-[57px] left-0 right-0 bg-white border-t border-gray-100 shadow-xl flex flex-col space-y-1 p-4 transition-all duration-300 ease-in-out transform origin-top">
          {navLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
              onClick={() => setMenuOpen(false)}
            >
              <Icon className="w-5 h-5 mr-3 opacity-80" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}   