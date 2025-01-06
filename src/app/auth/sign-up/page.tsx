import React from 'react';
import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import { redirect } from 'next/navigation';

const SignUpPage = async () => {
    const isAuthenticated = await checkIsAuthenticated()
    if (isAuthenticated) {
        redirect("/dashboard")
    }
    return (
        <div>
            Sign up
        </div>
    );
};

export default SignUpPage;