import React from 'react'
import { Button } from '@/components/ui/button'
import NavBar from '@/components/ui/navbar'

const page = () => {
  return (
    <div>
      <NavBar page="landing"/>
      <div className="relative isolate">
        {/* Background */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        
        {/* Content */}
        <section id="home" className='flex flex-col justify-center items-center h-[80vh] text-center mt-6'>
          <p className='text-5xl font-bold tracking-tight text-balance text-white sm:text-7xl w-3/6'>My Personal Book Collection Project</p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8 w-[55%]">
              This project is my first independent work after completing the full-stack development program. 
              I built it to store my personal book collection and to challenge myself to create something 
              simple, functional, and meaningful for me.
          </p>
        </section>

        {/* Background */}
        <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-100rem)]">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
        
        {/* Content */}
        <section id="about">
          <div className="gap-16 mt-2 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            {/* Text Section */}
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                About This Project
              </h2>
              <p className="mb-4">
                This project started as a simple idea: to create a personal system for 
                managing my book collection. It’s my first independent project after 
                completing a full-stack development program, built to challenge myself 
                and to apply the skills I’ve learned.
              </p>
              <p>
                The goal was to keep it simple yet functional. Along the way, I gained 
                hands-on experience in building with React and Tailwind CSS, structuring 
                a backend, and turning an idea into a working application. For me, this 
                project represents an important milestone in my journey as a developer.
              </p>
            </div>

            {/* Project Images */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <img
                className="w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                alt="screenshot of the project"
              />
              <img
                className="mt-4 w-full lg:mt-10 rounded-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                alt="screenshot of the project"
              />
            </div>
          </div>
        </section>

        <section id="projects" className="mt-32 py-8">
          <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
              Projects
            </h2>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Independent Project */}
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="h-96 rounded-lg mb-6 overflow-hidden">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" // replace with your screenshot
                    alt="Book Collection Project screenshot"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Personal Book Collection Website
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  My first independent full-stack project after completing my development program. 
                  I created this website to store and organize my personal book collection while 
                  applying what I learned in both frontend and backend development.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  <span className="font-semibold">My Role:</span> Designed and developed the entire project independently — 
                  from frontend (React + Tailwind) to backend integration and deployment.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Tech Stack:</span> React, Tailwind CSS, Node.js, Database (MongoDB/MySQL)
                </p>
              </div>

              {/* Team Project */}
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="h-96 rounded-lg mb-6 overflow-hidden">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" // replace with your screenshot
                    alt="Team Project screenshot"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Team Project: Course Management System
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A collaborative project built during my full-stack development program. 
                  The system allowed instructors to create and manage classes, while students 
                  could view and enroll in courses.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  <span className="font-semibold">My Role:</span> Developed the backend APIs for course and schedule 
                  management, and built instructor dashboard components using React. 
                  I also helped integrate authentication and role-based access control.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Tech Stack:</span> React, Tailwind CSS, Node.js, Express, MySQL
                </p>
                <div className="text-right mt-10">
                  <a href="https://num-digital-scheduler.fit/signin" target="_blank" className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Read more
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Background */}
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-50rem)]">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>

        <footer className="bg-white dark:bg-gray-900 mt-20">
            <div className="mx-auto w-full p-4 py-6 lg:py-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                  <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
                  </span>
                  <div className="flex mt-4 sm:justify-center sm:mt-0">
                      <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                            </svg>
                          <span className="sr-only">Facebook page</span>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                            </svg>
                          <span className="sr-only">Discord community</span>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                            <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                        </svg>
                          <span className="sr-only">Twitter page</span>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                          </svg>
                          <span className="sr-only">GitHub account</span>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
                        </svg>
                          <span className="sr-only">Dribbble account</span>
                      </a>
                  </div>
              </div>
            </div>
        </footer>
      </div>
    </div>
  )
}

export default page
