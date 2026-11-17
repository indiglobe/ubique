import {
  TableHeader,
  UsersTable,
} from "@/components/main/employee/employee-id/individual-employee/role-based-access/super-admin/users-table";

export function EmployeePageForSuperAdmin() {
  return (
    <>
      <SuperAdminTable />
    </>
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
