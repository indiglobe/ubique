import { cn } from "@repo/styles/cn";

import {
  TableHeader,
  UsersTable,
} from "@/components/main/dashboard-group/super-admin/users-table";

export function SuperAdminDashboard() {
  return (
    <section className={cn(``)}>
      <div>
        <TableHeader />
        <UsersTable />
      </div>
    </section>
  );
}
