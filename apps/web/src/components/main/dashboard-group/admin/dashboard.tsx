import { cn } from "@repo/styles/cn";
import { Tableheader, UsersTable } from "./users-table";

export function AdminDashboard() {
  return (
    <section className={cn(``)}>
      <div>
        <Tableheader />
        <UsersTable />
      </div>
    </section>
  );
}
