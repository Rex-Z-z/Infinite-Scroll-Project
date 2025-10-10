import NavBar from '@/components/ui/navbar'
import React from 'react'

const page = () => {
    return (
        <div>
            <NavBar />
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-4xl font-semibold tracking-tight text-balance text-white">Profile Page</h1>
            </div>
        </div>
    )
}

export default page
