import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated-routes)/dashboard/user/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/(authenticated-routes)/dashboard/user/"!</div>
}
