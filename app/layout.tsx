"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect } from "react"; 
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  function isTokenExpired(token:string) {
      if (!token) {
          return true;
      }

      try {
          // Split the token and get the payload
          const payload = token.split('.')[1];
          
          // Decode the base64 payload
          const decodedPayload = JSON.parse(atob(payload));
          
          // Get expiration time (exp claim is in seconds)
          const expirationTime = decodedPayload.exp;
          
          if (!expirationTime) {
              return true; // No expiration time means treat as expired
          }
          
          // Get current time in seconds
          const currentTime = Math.floor(Date.now() / 1000);
          
          // Check if token is expired
          return currentTime >= expirationTime;
          
      } catch (error) {
          console.error('Error parsing token:', error);
          return true; // If we can't parse it, treat as expired
      }
  }
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (isTokenExpired(accessToken || "")) {
      localStorage.removeItem("access_token");
    }
  }, []);
  const HomeIcon: React.FC = () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
      </svg>
    );
  
  const BlogIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
    </svg>
  );
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <div className="bg-[#BBC2C0] min-h-screen">
            {typeof window !== "undefined" && window.location.pathname !== "/login" && (
            <div className="bg-[#243831] text-white px-6 py-3 flex justify-between items-center">
              <h1 className="text-xl font-semibold">a.Board</h1>
              {isTokenExpired(localStorage.getItem("access_token") || "") ? 
              <button className="font-semibold bg-[#49A569] hover:bg-[#3B7A52] px-4 py-2 rounded text-sm font-medium transition-colors" onClick={() => window.location.replace('/login')}>
                Sign In
              </button>
              :<div className="flex items-center space-x-4">
                <div className="space-x-2 mb-2">
                  <span className="font-medium text-white font-semibold">{JSON.parse(localStorage.getItem('user')).username}</span>
                </div>
                <img 
                  src={`https://i.pravatar.cc/48?u=${JSON.parse(localStorage.getItem('user')).username}`} 
                  alt={JSON.parse(localStorage.getItem('user')).username} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-medium transition-colors" onClick={() => {
                  localStorage.removeItem("access_token");
                  window.location.replace('/posts');
                }}>
                  Sign Out
                </button>
              </div>
            }

            </div>
            )}
          
          <div className="flex">
            {/* Sidebar */}
            {typeof window !== "undefined" && window.location.pathname !== "/login" && (
              <aside className="bg-[#BBC2C0] w-64 min-h-screen p-4">
                <nav className="space-y-2">
                  <a href="/posts" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 py-2 transition-colors">
                    <HomeIcon />
                    <span>Home</span>
                  </a>
                  <a href="/posts/our" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 py-2 transition-colors">
                    <BlogIcon />
                    <span>Our Blog</span>
                  </a>
                </nav>
              </aside>
            )}
              {children}
          </div>
        </div>
       
      </body>
    </html>
  );
}
