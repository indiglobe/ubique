import {
  TableHeader,
  UsersTable,
} from "@/components/main/employee/role-based-access/super-admin/employee-table";
import { EmployeeDashboardQuickOverview } from "@/components/main/employee/role-based-access/super-admin/overview";
import { cn } from "@repo/styles/cn";

export default function EmployeePageForSuperAdmin() {
  return (
    <div className={cn(`space-y-4`)}>
      <QuickOverview />
      <SuperAdminTable />
    </div>
  );
}

function QuickOverview() {
  return (
    <section>
      <div>
        <EmployeeDashboardQuickOverview />
      </div>
    </section>
  );
}

function SuperAdminTable() {
  return (
    <section>
      <div>
        <TableHeader />
        <UsersTable />
      </div>
    </section>
  );
}
