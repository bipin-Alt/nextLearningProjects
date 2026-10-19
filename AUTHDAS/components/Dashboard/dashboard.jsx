"use client"
import React from 'react';
import { Button } from '../ui/button';
import { handleLogout } from '@/lib/actions/Auth';

export default function UserDashboard({userName, userEmail}) {
    return (
        <div>
            <p>Hello, {userName}</p>
            <p>You are registered under the email : {userEmail}</p>
            <p> This is the user Dashboard</p>
            <p>Wanna logout ?</p>
            <form action={handleLogout}>
            <Button type="submit">Logout</Button>
            </form>
        </div>
    );
} 