import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <Head>
        <title>Login Portal | Access Selection</title>
        <meta name="description" content="Choose your access: Student Login/Register or Admin Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center w-full max-w-3xl mb-12">
        <h2 className="text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Secure <span className="text-indigo-600">Learning</span> Hub Access
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Select your role to securely proceed to the relevant system dashboard.
        </p>
      </div>

      <div className="w-full sm:max-w-5xl">
        <div className="bg-white p-6 sm:p-10 lg:p-16 rounded-3xl shadow-2xl border border-gray-100">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

            <div className="flex flex-col justify-between relative bg-indigo-700 p-8 rounded-xl shadow-2xl transform hover:scale-[1.01] transition duration-500 ease-in-out">
                
                <div className="absolute inset-0 h-full w-full opacity-5"></div>

                <div>
                    <h3 className="text-4xl font-extrabold text-white mb-3 relative z-10 flex items-center">
                        <span className="mr-3 text-5xl">🧑‍🎓</span> Student Portal
                    </h3>
                    <p className="text-indigo-200 mb-10 text-lg relative z-10">
                        Access your profile, marks, and assignments instantly.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
                    
                    <LoginLink 
                        className="flex-1 flex justify-center py-4 px-4 rounded-xl text-xl font-bold text-indigo-800 bg-white hover:bg-gray-200 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white transition duration-200 transform hover:translate-y-[-2px]"
                    >
                        Login
                    </LoginLink>

                    
                    <RegisterLink 
                        className="flex-1 flex justify-center py-4 px-4 rounded-xl text-xl font-bold text-white border-2 border-indigo-300 hover:bg-indigo-600 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
                    >
                        Register
                    </RegisterLink>
                </div>
            </div>

            
            <div className="flex flex-col justify-between bg-slate-800 p-8 rounded-xl shadow-2xl transform hover:scale-[1.01] transition duration-500 ease-in-out">
                <div>
                    <h3 className="text-4xl font-extrabold text-white mb-3 flex items-center">
                        <span className="mr-3 text-4xl">⚙️</span> Admin
                    </h3>
                    <p className="text-slate-400 mb-10 text-lg">
                        Restricted access for staff and institutional oversight.
                    </p>
                </div>
                
                <Link 
                    href="/admin-login"
                    className="w-full flex justify-center py-4 px-4 rounded-xl shadow-2xl text-xl font-bold text-slate-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-200 transform hover:translate-y-[-2px]"
                >
                    Admin Login
                </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
