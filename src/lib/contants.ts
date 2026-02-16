export const APP_NAME = 'TMP Internal System';

export const ROUTES = {
  LOGIN: '/auth/login',
  DASHBOARD: '/dashboard',
  MAKAM: '/dashboard/makam',
  MAKAM_CREATE: '/dashboard/makam/create',
  MAKAM_EDIT: '/dashboard/makam/edit',
  TAMU_UMUM: '/dashboard/tamu-umum',
  TAMU_ROMBONGAN: '/dashboard/tamu-rombongan',
  USERS: '/dashboard/users',
} as const;

export const ROLES = {
  OPERATOR: 'operator',
  MASTER: 'master',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

