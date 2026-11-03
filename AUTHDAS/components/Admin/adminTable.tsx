"use client"
import React from 'react';
import { Button } from '../ui/button';
import { handleLogout } from '@/lib/actions/Auth';

interface AdminProps{
    adminName: string | null,
    adminEmail: string
}

export default function AdminTable({adminName, adminEmail}: AdminProps) {
    return (
        <div> 
            <p>Hello {adminName}</p>
            <p> You are registered by the email : {adminEmail}</p>
            <p> This is the admin table.</p>
            <p>Wanna logout ?</p>
            <form action={handleLogout}>
            <Button type="submit" >Logout</Button>
            </form>
        </div>
    );
}