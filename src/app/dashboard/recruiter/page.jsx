'use client'
import { useSession } from '@/lib/auth-client';
import { h1 } from 'motion/react-client';
import React from 'react';

const RecruiterPage = () => {

    const {data: session , isPending} = useSession() ;

    if(isPending){
        <h1>Loading...</h1>
    }

    const user = session?.user ;

    // console.log(user)
    return (
        <div>
            <h1>This is recruiter</h1>
            
        </div>
    );
};

export default RecruiterPage   ;