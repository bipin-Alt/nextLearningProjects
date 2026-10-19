import UserDashboard from '@/components/Dashboard/dashboard';
import { verifySession } from '@/lib/DataAccessLayer';
import { getCurrentSession } from '@/lib/session';

import React from 'react';

export default async function UserDashboardpage() {
const sessionData = await verifySession();
console.log(sessionData);
return (
       <UserDashboard 
        userName={sessionData.name}
        userEmail={sessionData.email}
       />
    );
}