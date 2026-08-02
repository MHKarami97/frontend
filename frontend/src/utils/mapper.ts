export const orderStatusMap: Record<string, string> = {
  pending: 'در انتظار',
  confirmed: 'تأییدشده',
  processing: 'در حال پردازش',
  shipped: 'ارسال‌شده',
  delivered: 'تحویل‌شده',
  cancelled: 'لغوشده'
};

export const genderMap: Record<string, string> = {
  male: 'مرد',
  female: 'زن',
  other: 'سایر'
};

export const sourceMap: Record<string, string> = {
  instagram: 'اینستاگرام',
  telegram: 'تلگرام',
  whatsapp: 'واتساپ',
  website: 'وب‌سایت',
  other: 'سایر'
};

export const shopStatusMap: Record<string, string> = {
  pending: 'در انتظار تایید',
  active: 'فعال',
  banned: 'مسدود'
};

export const roleMap: Record<string, string> = {
  system_admin: 'مدیر کل سیستم',
  shop_owner: 'مدیر فروشگاه',
  shop_operator: 'اپراتور فروشگاه'
};

export const translateEnum = (map: Record<string, string>, key: string | null | undefined): string => {
  if (!key) return 'نامشخص';
  return map[key] || key;
};
