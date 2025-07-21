import "./globals.css";
import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "@/components/SessionProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MERN Full-Stack App",
  description: "A production-grade web application using Next.js 15",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        <SessionProvider>
          <NavBar />
          <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8 sm:py-8">
            {children}
          </main>
          <footer className="bg-white shadow-sm py-6 border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-gray-600">
                  &copy; {new Date().getFullYear()} MERN Full-Stack App. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition text-sm">
                    Privacy
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition text-sm">
                    Terms
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition text-sm">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
