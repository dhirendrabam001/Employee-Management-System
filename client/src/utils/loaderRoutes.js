export const SKIP_LOADER_ROUTES = [
  "/",
  "/admin/login",
  "/admin/signup",
  "/admin/password",
  "/employee/login",
  "/employee/signup",
  "/employee/password",
  "/verify",
];

export const shouldShowRouteLoader = (pathname) =>
  !SKIP_LOADER_ROUTES.includes(pathname);
