import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const LoginForm = () => {
  return (
    <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                Flowbite
            </a>
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                        Sign in to your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 md:space-y-6">
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Email" className="focus:border-2 dark:focus:border-blue-500 hover:cursor-pointer" />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="email">Password</Label>
                            <Input type="password" id="password" placeholder="Password" className="focus:border-2 dark:focus:border-blue-500 hover:cursor-pointer" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start gap-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">Remember me</Label>
                            </div>
                            <Button variant="link">
                                <a href="#">Forgot password?</a>
                            </Button>
                        </div>
                        <Button variant="default" className="w-full text-black dark:text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-blue-300 hover:cursor-pointer">
                            <a href="/user/home">Sign in</a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </section>
  );
};

export default LoginForm;