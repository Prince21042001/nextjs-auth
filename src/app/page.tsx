export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Our Full-Stack Application</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">A modern web platform built with Next.js, MongoDB, and React</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/register" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
              Get Started
            </a>
            <a href="/about" className="bg-transparent hover:bg-blue-500 text-white border border-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-gray-600">Robust user authentication and authorization with NextAuth.js</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">MongoDB Integration</h3>
              <p className="text-gray-600">Seamless data management with MongoDB Atlas cloud database</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">Granular permission control with user, moderator, and admin roles</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our platform today and experience the full power of our modern web application.
          </p>
          <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
            Create an Account
          </a>
        </div>
      </section>
    </main>
  );
}
