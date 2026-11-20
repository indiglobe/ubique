import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(authenticated-routes)/dashboard/stock-transfer/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authenticated-routes)/dashboard/stock-transfer/"!</div>
}
