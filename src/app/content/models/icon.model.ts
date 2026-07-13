/** أسماء الأيقونات المتاحة في المكوّن app-icon. مشتركة بين عدة أقسام. */
export type IconName =
  | 'courses' | 'video' | 'user-dash' | 'quiz' | 'certificate' | 'survey'
  | 'admin' | 'institute' | 'transfer' | 'devices' | 'users' | 'workflow'
  | 'chat' | 'report' | 'shield' | 'trophy' | 'chart' | 'bookmark' | 'play' | 'star';

/** كل الأيقونات كمصفوفة — تستخدمها لوحة الأدمن لعرض قائمة اختيار. */
export const ICON_NAMES: IconName[] = [
  'courses', 'video', 'user-dash', 'quiz', 'certificate', 'survey',
  'admin', 'institute', 'transfer', 'devices', 'users', 'workflow',
  'chat', 'report', 'shield', 'trophy', 'chart', 'bookmark', 'play', 'star',
];
