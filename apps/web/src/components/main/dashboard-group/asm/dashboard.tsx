import { cn } from "@repo/styles/cn";
import {
  TableHeader,
  UsersTable,
} from "@/components/main/dashboard-group/asm/users-table";

export function ASMDashboard() {
  return (
    <section className={cn(``)}>
      <div>
        <TableHeader />
        <UsersTable />
      </div>
    </section>
  );
}
