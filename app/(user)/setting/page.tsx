import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col w-full gap-2'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-2xl font-semibold'>Setting</h1>
                <div className="flex flex-1 flex-col gap-4">
                    {Array.from({ length: 24 }).map((_, index) => (
                        <div
                        key={index}
                        className="bg-muted/50 h-12 w-full rounded-lg"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page