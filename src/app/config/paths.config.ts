import { ROUTES } from '@app/config/routes.config';

export const PATHS = {
  root: () => window.location.hash ? '#' : '',
  home: ROUTES.home,
  employee: `/${ROUTES.employee}`,
  error: `/${ROUTES.error}`
};
