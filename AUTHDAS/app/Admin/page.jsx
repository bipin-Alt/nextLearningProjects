import AdminTable from '@/components/Admin/adminTable';
import { verifyAdmin, verifySession } from '@/lib/DataAccessLayer';
import React from 'react';

export default async function AdminPage() {
   await verifyAdmin();  const session = await verifyAdmin();
    return (
       <AdminTable
        adminName= {session.name}
        adminEmail={session.email}
       />
    );
}