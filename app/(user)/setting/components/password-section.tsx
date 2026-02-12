import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const PasswordSection = () => {
    return (
        <div id="password" className='flex flex-col gap-3 scroll-mt-24'>
            <h1 className='text-2xl font-semibold'>Password Information</h1>
            <div className='flex flex-col gap-2'>
                <div className='w-full flex gap-3'>
                    <div className='w-full flex flex-col gap-2'>
                        <Label>Old Password</Label>
                        <Input type="password" placeholder="Old Password" className='focus:border-2 focus:border-blue-600 focus:dark:border-blue-500'/>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <Label>New Password</Label>
                        <Input type="password" placeholder="New Password"  className='focus:border-2 focus:border-blue-600 focus:dark:border-blue-500'/>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <Label>Confirm Password</Label>
                    <Input type="password" placeholder="Confirm Password"  className='focus:border-2 focus:border-blue-600 focus:dark:border-blue-500'/>
                </div>

                <div className='flex justify-end gap-2'>
                    <Button variant="default" className='w-1/12 text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 hover:cursor-pointer'>Edit</Button>
                </div>
            </div>
        </div>
    )
}

export default PasswordSection