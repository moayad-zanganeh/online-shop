import { ReactNode } from 'react';
import HeaderAadminDashboard from './header-admin-dashboard';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderAadminDashboard />
      <main>{children}</main>
    </>
  );
}
