import { cn } from "@repo/styles/cn";
import {
  TableHeader,
  UsersTable,
} from "@/components/main/dashboard-group/mr/users-table";

export function MRDashboard() {
  return (
    <section className={cn(``)}>
      <div>
        <TableHeader />
        <UsersTable />
      </div>
    </section>
  );
}
