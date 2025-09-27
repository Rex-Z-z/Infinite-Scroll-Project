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
          <p className='text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl w-3/6'>My Personal Book Collection Project</p>
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

        <section id="projects" className="mt-18 py-8">
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
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div>
  )
}

export default page
