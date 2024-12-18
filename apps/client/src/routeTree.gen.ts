/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UserReservationsImport } from './routes/user-reservations'
import { Route as SignupImport } from './routes/signup'
import { Route as ProfileImport } from './routes/profile'
import { Route as LoginImport } from './routes/login'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const UserReservationsRoute = UserReservationsImport.update({
  id: '/user-reservations',
  path: '/user-reservations',
  getParentRoute: () => rootRoute,
} as any)

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const ProfileRoute = ProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/user-reservations': {
      id: '/user-reservations'
      path: '/user-reservations'
      fullPath: '/user-reservations'
      preLoaderRoute: typeof UserReservationsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginRoute
  '/profile': typeof ProfileRoute
  '/signup': typeof SignupRoute
  '/user-reservations': typeof UserReservationsRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginRoute
  '/profile': typeof ProfileRoute
  '/signup': typeof SignupRoute
  '/user-reservations': typeof UserReservationsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login': typeof LoginRoute
  '/profile': typeof ProfileRoute
  '/signup': typeof SignupRoute
  '/user-reservations': typeof UserReservationsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/profile' | '/signup' | '/user-reservations'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/profile' | '/signup' | '/user-reservations'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/profile'
    | '/signup'
    | '/user-reservations'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginRoute: typeof LoginRoute
  ProfileRoute: typeof ProfileRoute
  SignupRoute: typeof SignupRoute
  UserReservationsRoute: typeof UserReservationsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginRoute: LoginRoute,
  ProfileRoute: ProfileRoute,
  SignupRoute: SignupRoute,
  UserReservationsRoute: UserReservationsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/profile",
        "/signup",
        "/user-reservations"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/user-reservations": {
      "filePath": "user-reservations.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
