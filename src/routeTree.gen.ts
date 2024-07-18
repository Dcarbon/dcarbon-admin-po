/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SigninImport } from './routes/signin'
import { Route as SetPasswordImport } from './routes/set-password'
import { Route as ResetPasswordImport } from './routes/reset-password'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthWalletImport } from './routes/_auth/wallet'
import { Route as AuthUpdatePasswordImport } from './routes/_auth/update-password'
import { Route as AuthSlugImport } from './routes/_auth/$slug'

// Create Virtual Routes

const AuthIndexLazyImport = createFileRoute('/_auth/')()

// Create/Update Routes

const SigninRoute = SigninImport.update({
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any)

const SetPasswordRoute = SetPasswordImport.update({
  path: '/set-password',
  getParentRoute: () => rootRoute,
} as any)

const ResetPasswordRoute = ResetPasswordImport.update({
  path: '/reset-password',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexLazyRoute = AuthIndexLazyImport.update({
  path: '/',
  getParentRoute: () => AuthRoute,
} as any).lazy(() => import('./routes/_auth/index.lazy').then((d) => d.Route))

const AuthWalletRoute = AuthWalletImport.update({
  path: '/wallet',
  getParentRoute: () => AuthRoute,
} as any)

const AuthUpdatePasswordRoute = AuthUpdatePasswordImport.update({
  path: '/update-password',
  getParentRoute: () => AuthRoute,
} as any)

const AuthSlugRoute = AuthSlugImport.update({
  path: '/$slug',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordImport
      parentRoute: typeof rootRoute
    }
    '/set-password': {
      id: '/set-password'
      path: '/set-password'
      fullPath: '/set-password'
      preLoaderRoute: typeof SetPasswordImport
      parentRoute: typeof rootRoute
    }
    '/signin': {
      id: '/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninImport
      parentRoute: typeof rootRoute
    }
    '/_auth/$slug': {
      id: '/_auth/$slug'
      path: '/$slug'
      fullPath: '/$slug'
      preLoaderRoute: typeof AuthSlugImport
      parentRoute: typeof AuthImport
    }
    '/_auth/update-password': {
      id: '/_auth/update-password'
      path: '/update-password'
      fullPath: '/update-password'
      preLoaderRoute: typeof AuthUpdatePasswordImport
      parentRoute: typeof AuthImport
    }
    '/_auth/wallet': {
      id: '/_auth/wallet'
      path: '/wallet'
      fullPath: '/wallet'
      preLoaderRoute: typeof AuthWalletImport
      parentRoute: typeof AuthImport
    }
    '/_auth/': {
      id: '/_auth/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthIndexLazyImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthRoute: AuthRoute.addChildren({
    AuthSlugRoute,
    AuthUpdatePasswordRoute,
    AuthWalletRoute,
    AuthIndexLazyRoute,
  }),
  ResetPasswordRoute,
  SetPasswordRoute,
  SigninRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/reset-password",
        "/set-password",
        "/signin"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/$slug",
        "/_auth/update-password",
        "/_auth/wallet",
        "/_auth/"
      ]
    },
    "/reset-password": {
      "filePath": "reset-password.tsx"
    },
    "/set-password": {
      "filePath": "set-password.tsx"
    },
    "/signin": {
      "filePath": "signin.tsx"
    },
    "/_auth/$slug": {
      "filePath": "_auth/$slug.tsx",
      "parent": "/_auth"
    },
    "/_auth/update-password": {
      "filePath": "_auth/update-password.tsx",
      "parent": "/_auth"
    },
    "/_auth/wallet": {
      "filePath": "_auth/wallet.tsx",
      "parent": "/_auth"
    },
    "/_auth/": {
      "filePath": "_auth/index.lazy.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
