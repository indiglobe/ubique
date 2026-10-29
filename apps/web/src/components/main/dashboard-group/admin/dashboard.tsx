import { cn } from "@repo/styles/cn";
import {
  TableHeader,
  UsersTable,
} from "@/components/main/dashboard-group/admin/users-table";


export function AdminDashboard() {
  return (
    <section className={cn(``)}>
      <div>
        <TableHeader />
        <UsersTable />
      </div>
    </section>
  );
}
