import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(authenticated-routes)/dashboard/billing-n-delivery/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/(authenticated-routes)/dashboard/billing-n-delivery/"!</div>
  )
}
