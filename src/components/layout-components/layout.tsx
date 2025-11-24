'use client';

import type { Breakpoint } from '@mui/material/styles';

import { merge } from 'es-toolkit';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { NavMobile, NavDesktop } from '@/src/components/layout-components/nav';
import { layoutClasses } from '@/core';
import { dashboardLayoutVars } from '@/src/components/layout-components/css-vars';
import { MainSection } from '@/core/main-section';
import { Searchbar } from '@/src/components/layout-components/Searchbar';
import { MenuButton } from '@/src/components/layout-components/MenuButton';
import { HeaderSection } from '@/core/header-section';
import { LayoutSection } from '@/core/layout-section';

import type { MainSectionProps } from '@/core/main-section';
import type { HeaderSectionProps } from '@/core/header-section';
import type { LayoutSectionProps } from '@/core/layout-section';
import { AccountPopover } from '@/src/components/layout-components/AccountPopover';
import { NotificationsPopover } from '@/src/components/layout-components/NotificationsPopover';
// import { LanguagePopover } from '@/src/components/layout-components/LanguagePopover';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const theme = useTheme();

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
      },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
          />
          <NavMobile data={[]} open={open} onClose={onClose} />
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.75 } }}>
          {/** @slot Searchbar */}
          <Searchbar />

          {/** @slot Language popover */}
          {/* <LanguagePopover data={[
            {
              value: 'en',
              label: 'English',
              icon: 'https://flagcdn.com/us.svg',
            },
            {
              value: 'es',
              label: 'Spanish',
              icon: 'https://flagcdn.com/es.svg',
            },
            {
              value: 'fr',
              label: 'French',
              icon: 'https://flagcdn.com/fr.svg',
            },
          ]} /> */}

          {/** @slot Notifications popover */}
          <NotificationsPopover data={[
            {
              id: '1',
              type: 'info',
              title: 'Notification 1',
              isUnRead: true,
              description: 'Notification 1 description',
              avatarUrl: null,
              postedAt: new Date().toISOString(),
            }
          ]} />

          {/** @slot Account drawer */}
          <AccountPopover accountData={{
            displayName: 'John Doe',
            email: 'john.doe@example.com',
            photoURL: 'https://via.placeholder.com/150',
          }} data={[]} />
        </Box>
      ),
    };

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => null;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={[]} layoutQuery={layoutQuery} />
      }
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...dashboardLayoutVars(theme), ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              pl: 'var(--layout-nav-vertical-width)',
              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}

export default DashboardLayout;
