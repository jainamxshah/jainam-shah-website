import { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardContent from './DashboardContent';

export const metadata: Metadata = {
  title: 'Dashboard | Admin',
};

export default function DashboardPage() {
  return (
    <AdminLayout title="Dashboard">
      <DashboardContent />
    </AdminLayout>
  );
}


