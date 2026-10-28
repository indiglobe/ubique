import { cn } from "@repo/styles/cn";
import { TableHeader, UsersTable } from "./users-table";

export function ZSMDashboard() {
  return (
    <section className={cn(``)}>
      <div>
        <TableHeader />
        <UsersTable />
      </div>
    </section>
  );
}
