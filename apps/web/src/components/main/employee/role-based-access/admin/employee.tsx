import {
  TableHeader,
  UsersTable,
} from "@/components/main/employee/role-based-access/admin/users-table";
import { EmployeeDashboardQuickOverview } from "@/components/main/employee/role-based-access/admin/overview";
import { cn } from "@repo/styles/cn";

export default function EmployeePageForAdmin() {
  return (
    <div className={cn(`space-y-4`)}>
      <QuickOverview />
      <AdminTable />
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

function AdminTable() {
  return (
    <section>
      <div>
        <TableHeader />
        <UsersTable />
      </div>
    </section>
  );
}
