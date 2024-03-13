import { RouteObject, createBrowserRouter, createHashRouter } from 'react-router-dom';
import { ROUTERS } from './constants/common';
import SignInPage from './pages/auth/SignInPage';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/home/HomePage';
import ErrorPage from './pages/Error-page';
import { getDefaultLayout } from './components/layout/layout';

export const routerObjects: (RouteObject & {
  title?: string;
  subtitle?: string;
})[] = [
  {
    title: ROUTERS.LOGIN.TITLE,
    path: ROUTERS.LOGIN.PATH,
    Component: SignInPage
  },
  {
    title: ROUTERS.HOME.TITLE,
    path: ROUTERS.HOME.PATH,
    Component: () => {
      return (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      );
    }
  }
];

export function createRouter(): ReturnType<typeof createHashRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const getLayout = router.Component?.getLayout || getDefaultLayout;
    const Component = router.Component!;
    const page = getLayout(<Component />, router?.title);
    return {
      ...router,
      element: page,
      Component: null,
      ErrorBoundary: ErrorPage
    };
  });
  return createBrowserRouter(routeWrappers);
}
