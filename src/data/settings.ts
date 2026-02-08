import { AppSettings } from '@/types';

export const appSettings: AppSettings = {
  wordFilter: {
    enabled: true,
    bannedWords: [
      '価格',
      '料金',
      '支払',
      '銀行',
      '現金',
      'price',
      'payment',
      'cash',
      'money',
      'bank',
      'paypal',
      'venmo',
      'discount',
      '割引',
      '値引',
      '直接',
      'direct',
      'outside',
      'WhatsApp',
      'LINE',
      'WeChat',
      '電話番号',
      'phone number',
      'email',
      'メール',
    ],
  },
  commission: {
    rate: 15, // 15% platform commission
  },
  paymentMethods: ['クレジットカード', 'デビットカード', 'PayPay', 'コンビニ決済'],
};

// Helper function to filter message content
export function filterMessage(content: string): { filtered: string; isFiltered: boolean } {
  let filtered = content;
  let isFiltered = false;

  if (appSettings.wordFilter.enabled) {
    appSettings.wordFilter.bannedWords.forEach((word) => {
      const regex = new RegExp(word, 'gi');
      const replaced = filtered.replace(regex, '***');
      if (replaced !== filtered) {
        isFiltered = true;
        filtered = replaced;
      }
    });
  }

  return { filtered, isFiltered };
}
