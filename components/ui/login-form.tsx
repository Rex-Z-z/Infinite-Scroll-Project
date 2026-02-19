import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const LoginForm = () => {
  return (
    <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                Flowbite
            </a>
            <Card className="w-full sm:max-w-sm md:max-w-md">
                <CardHeader>
                    <CardTitle className="text-md font-bold leading-tight tracking-tight md:text-2xl">
                        Sign in to your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 md:space-y-6">
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="email" className='text-xs md:text-sm'>Email</Label>
                            <Input type="email" id="email" placeholder="Email" className='text-xs md:text-sm'/>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="email" className='text-xs md:text-sm'>Password</Label>
                            <Input type="password" id="password" placeholder="Password" className='text-xs md:text-sm'/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start gap-2">
                                <Checkbox id="terms"/>
                                <Label htmlFor="terms" className='text-xs md:text-sm'>Remember me</Label>
                            </div>
                            <Button variant="link" className='text-xs md:text-sm'>
                                <a href="#">Forgot password?</a>
                            </Button>
                        </div>
                        <Button className="w-full hover:cursor-pointer" asChild>
                            <a href="/home">Sign in</a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </section>
  );
};

export default LoginForm;