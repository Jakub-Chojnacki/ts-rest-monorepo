import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 bg-black text-white">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
      
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})