import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';

import type { FontStyleExtend } from './core/typography';
import type { CustomShadows } from './core/custom-shadows';
import type {
  GreyExtend,
  TypeTextExtend,
  CommonColorsExtend,
  PaletteColorExtend,
  TypeBackgroundExtend,
} from './core/palette';

// ----------------------------------------------------------------------

/** **************************************
 * EXTEND CORE
 * Palette, typography, shadows...
 *************************************** */

/**
 * Palette
 * https://mui.com/customization/palette/
 * @from {@link file://./core/palette.ts}
 */
declare module '@mui/material/styles' {
  // grey
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Color extends GreyExtend {}
  // text
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TypeText extends TypeTextExtend {}
  // black & white
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface CommonColors extends CommonColorsExtend {}
  // background
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TypeBackground extends TypeBackgroundExtend {}
  // primary, secondary, info, success, warning, error
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PaletteColor extends PaletteColorExtend {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface SimplePaletteColorOptions extends Partial<PaletteColorExtend> {}
}

/**
 * Typography
 * https://mui.com/customization/typography/
 * @from {@link file://./core/typography.ts}
 */
declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TypographyVariants extends FontStyleExtend {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TypographyVariantsOptions extends Partial<FontStyleExtend> {}
}

declare module '@mui/material/styles' {
  /**
   * Custom shadows
   * @from {@link file://./core/custom-shadows.ts}
   */
  interface Theme {
    customShadows: CustomShadows;
  }
  interface ThemeOptions {
    customShadows?: CustomShadows;
  }
  interface ThemeVars {
    customShadows: CustomShadows;
    typography: Theme['typography'];
    transitions: Theme['transitions'];
  }
}
