"use client"
import Link from 'next/link';
import { Button } from '../ui/button';
import { handleLogout } from '@/lib/actions/Auth';

interface UserDashboardProps {
    userName: string | null,
    userEmail:string,
}
export default function UserDashboard({userName, userEmail}:UserDashboardProps) {
    return (
        <div>
            <p>Hello, {userName}</p>
            <p>You are registered under the email : {userEmail}</p>
            <p> This is the user Dashboard</p>
            <p>Wanna logout ?</p>
            <form action={handleLogout}>
            <Button type="submit">Logout</Button>
            </form>
            <Link href={"/Dashboard/Profile"} type='submit'><Button>View Profile</Button></Link>
        </div>
    );
} 