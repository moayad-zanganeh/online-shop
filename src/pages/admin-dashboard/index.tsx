import AadminDashboard from '@/components/admin-dashboard';
import AdminLayout from '@/layout/admin-layout';
import { ReactElement } from 'react';

export default function AdminDashboardPage() {
  return <AadminDashboard />;
}

AdminDashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
