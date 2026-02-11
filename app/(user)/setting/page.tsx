import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col w-full gap-4'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-2xl font-semibold'>Account</h1>
                <div className="flex flex-1 flex-col gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className='flex gap-2'>
                            <div className='bg-muted/50 h-8 w-1/8 rounded-2xl'/>
                            <div className='bg-muted/50 h-8 w-full rounded-2xl'/>
                        </div>
                    ))}

                    <div className='flex gap-2'>
                        <div className='bg-muted/50 h-10 w-1/9 rounded-lg'/>
                        <div className='bg-muted/50 h-10 w-1/9 rounded-lg'/>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <h1 className='text-2xl font-semibold'>Password</h1>
                <div className="flex flex-1 flex-col gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className='flex gap-2'>
                            <div className='bg-muted/50 h-8 w-1/8 rounded-2xl'/>
                            <div className='bg-muted/50 h-8 w-full rounded-2xl'/>
                        </div>
                    ))}

                    <div className='flex gap-2'>
                        <div className='bg-muted/50 h-10 w-1/9 rounded-lg'/>
                        <div className='bg-muted/50 h-10 w-1/9 rounded-lg'/>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <h1 className='text-2xl font-semibold'>Comic Source</h1>
                <div className="flex flex-1 flex-col gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className='flex gap-2'>
                            <div className='bg-muted/50 h-8 w-1/8 rounded-2xl'/>
                            <div className='bg-muted/50 h-8 w-full rounded-2xl'/>
                        </div>
                    ))}

                    <div className='flex gap-2'>
                        <div className='bg-muted/50 h-10 w-1/9 rounded-lg'/>
                        <div className='bg-muted/50 h-10 w-1/9 rounded-lg'/>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <h1 className='text-2xl font-semibold'>Preference</h1>
                <div className="flex flex-1 flex-col gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className='flex gap-2'>
                            <div className='bg-muted/50 h-8 w-1/8 rounded-2xl'/>
                            <div className='bg-muted/50 h-8 w-full rounded-2xl'/>
                        </div>
                    ))}

                    <div className='flex gap-2'>
                        <div className='bg-muted/50 h-10 w-1/9 rounded-lg'/>
                        <div className='bg-muted/50 h-10 w-1/9 rounded-lg'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page