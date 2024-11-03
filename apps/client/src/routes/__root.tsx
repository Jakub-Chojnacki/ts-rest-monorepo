import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 bg-red-500 text-blue-500">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
      
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})