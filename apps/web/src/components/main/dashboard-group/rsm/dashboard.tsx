import { cn } from "@repo/styles/cn";
import {
  TableHeader,
  UsersTable,
} from "@/components/main/dashboard-group/rsm/users-table";

export function RSMDashboard() {
  return (
    <section className={cn(``)}>
      <div>
        <TableHeader />
        <UsersTable />
      </div>
    </section>
  );
}
