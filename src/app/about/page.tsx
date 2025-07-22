export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-16 sm:pb-24">
          <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">About This</span>
                <span className="block text-blue-600">Project</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                A comprehensive full-stack application demonstrating modern web development practices with the MERN stack.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology stack section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Technology Stack</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Built with cutting-edge technologies
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our application leverages the power of the MERN stack to deliver a seamless user experience.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* MongoDB */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">MongoDB</h3>
                  <p className="mt-2 text-base text-gray-500">
                    A flexible NoSQL database that provides high performance, high availability, and easy scalability.
                  </p>
                </div>
              </div>

              {/* Express.js */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gray-600 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Express.js</h3>
                  <p className="mt-2 text-base text-gray-500">
                    A minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.
                  </p>
                </div>
              </div>

              {/* React */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-400 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">React</h3>
                  <p className="mt-2 text-base text-gray-500">
                    A JavaScript library for building user interfaces, allowing us to create reusable UI components.
                  </p>
                </div>
              </div>

              {/* Node.js */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Node.js</h3>
                  <p className="mt-2 text-base text-gray-500">
                    A JavaScript runtime built on Chrome&apos;s V8 JavaScript engine for building fast and scalable network applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key features section */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Key Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Designed for modern web development
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-lg leading-6 font-medium text-gray-900">Authentication & Authorization</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Secure user authentication with role-based access control to protect your data.
                </dd>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <p className="text-lg leading-6 font-medium text-gray-900">Responsive Design</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Modern, responsive UI that works seamlessly across desktop, tablet, and mobile devices.
                </dd>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-lg leading-6 font-medium text-gray-900">Security</p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Built with security best practices to protect against common web vulnerabilities.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Built by developers, for developers
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our team is passionate about creating tools that make web development easier and more efficient.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}