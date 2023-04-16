// components/common/Layouts.tsx
import DefaultLayout from '../DefaultLayout';
import NoFooterLayout from '../NoFooterLayout';
export const Layouts = {
  Default: DefaultLayout,
  NoFooter: NoFooterLayout,
};
export type LayoutKeys = keyof typeof Layouts; // "Main" | "Admin"
