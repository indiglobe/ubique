import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated-routes)/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authenticated-routes)/dashboard/"!</div>
}
