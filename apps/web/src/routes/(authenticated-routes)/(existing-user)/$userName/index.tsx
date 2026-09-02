import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated-routes)/(existing-user)/$userName/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authenticated-routes)/$userName/"!</div>
}
