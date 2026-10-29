import { cn } from "@repo/styles/cn";
import {
  TableHeader,
  UsersTable,
} from "@/components/main/dashboard-group/manager/users-table";

export function ManagerDashboard() {
  return (
    <section className={cn(``)}>
      <div>
        <TableHeader />
        <UsersTable />
      </div>
    </section>
  );
}
