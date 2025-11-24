import type { AccountPopoverProps } from './AccountPopover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

// ----------------------------------------------------------------------

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const _account: AccountPopoverProps['data'] = [
  {
    label: 'Home',
    href: '/',
    icon: <FontAwesomeIcon width={22} icon={faHome} />,
  },
  {
    label: 'Profile',
    href: '#',
    icon: <FontAwesomeIcon width={22} icon={faUserShield} />,
  },
  {
    label: 'Settings',
    href: '#',
    icon: <FontAwesomeIcon width={22} icon={faGear} />,
  },
];


// export const navData = [
//   {
//     title: 'Dashboard',
//     path: '/',
//     icon: icon('ic-analytics'),
//   },
//   {
//     title: 'User',
//     path: '/user',
//     icon: icon('ic-user'),
//   },
//   {
//     title: 'Product',
//     path: '/products',
//     icon: icon('ic-cart'),
//     info: (
//       <Label color="error" variant="inverted">
//         +3
//       </Label>
//     ),
//   },
//   {
//     title: 'Blog',
//     path: '/blog',
//     icon: icon('ic-blog'),
//   },
//   {
//     title: 'Sign in',
//     path: '/sign-in',
//     icon: icon('ic-lock'),
//   },
//   {
//     title: 'Not found',
//     path: '/404',
//     icon: icon('ic-disabled'),
//   },
// ];

