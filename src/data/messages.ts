import { Message, Conversation } from '@/types';

export const messages: Message[] = [
  // Conversation between traveler-1 and guide-1
  {
    id: 'msg-1',
    senderId: 'traveler-1',
    receiverId: 'guide-1',
    content: 'こんにちは。2月20日のツアーを予約しました山田と申します。当日の集合場所について教えていただけますか？',
    filtered: false,
    timestamp: '2026-02-06T09:00:00Z',
    read: true,
  },
  {
    id: 'msg-2',
    senderId: 'guide-1',
    receiverId: 'traveler-1',
    content: '山田様、ご予約ありがとうございます！集合場所は浅草寺の雷門前になります。朝9時にお待ちしております。当日はお天気も良さそうなので、素晴らしい写真が撮れると思います。',
    filtered: false,
    timestamp: '2026-02-06T10:30:00Z',
    read: true,
  },
  {
    id: 'msg-3',
    senderId: 'traveler-1',
    receiverId: 'guide-1',
    content: 'ありがとうございます！楽しみにしています。写真をたくさん撮りたいので、よろしくお願いします。',
    filtered: false,
    timestamp: '2026-02-06T11:00:00Z',
    read: true,
  },

  // Conversation between traveler-2 and guide-2
  {
    id: 'msg-4',
    senderId: 'traveler-2',
    receiverId: 'guide-2',
    content: 'Hello Kenta! I booked your temple tour for Feb 18th. I\'m very interested in Buddhist philosophy. Could we spend more time at Kiyomizu-dera?',
    filtered: false,
    timestamp: '2026-02-03T14:00:00Z',
    read: true,
  },
  {
    id: 'msg-5',
    senderId: 'guide-2',
    receiverId: 'traveler-2',
    content: 'Hello John! Of course, I can adjust the schedule. Kiyomizu-dera is wonderful, and I\'d be happy to discuss Buddhist philosophy in depth. We can also visit a quieter temple nearby for meditation.',
    filtered: false,
    timestamp: '2026-02-03T15:30:00Z',
    read: true,
  },
  {
    id: 'msg-6',
    senderId: 'traveler-2',
    receiverId: 'guide-2',
    content: 'That sounds perfect! Thank you for being so flexible. Looking forward to it!',
    filtered: false,
    timestamp: '2026-02-03T16:00:00Z',
    read: true,
  },

  // Conversation between traveler-4 and guide-5
  {
    id: 'msg-7',
    senderId: 'traveler-4',
    receiverId: 'guide-5',
    content: 'Bonjour Sakura! Je ne parle pas très bien anglais. Est-ce que c\'est un problème?',
    filtered: false,
    timestamp: '2026-02-05T08:00:00Z',
    read: true,
  },
  {
    id: 'msg-8',
    senderId: 'guide-5',
    receiverId: 'traveler-4',
    content: 'Hello Marie! No problem at all! I can speak slowly and use simple English. I also have translation app if needed. Don\'t worry, we will have great time! 😊',
    filtered: false,
    timestamp: '2026-02-05T09:30:00Z',
    read: true,
  },
  {
    id: 'msg-9',
    senderId: 'traveler-4',
    receiverId: 'guide-5',
    content: 'Thank you so much! You are very kind. I am excited about the tour!',
    filtered: false,
    timestamp: '2026-02-05T10:00:00Z',
    read: true,
  },

  // Conversation between traveler-2 and guide-4
  {
    id: 'msg-10',
    senderId: 'traveler-2',
    receiverId: 'guide-4',
    content: 'Hi Yuichi! Can I bring my professional camera equipment? I have a DSLR with telephoto lens.',
    filtered: false,
    timestamp: '2026-02-04T13:00:00Z',
    read: true,
  },
  {
    id: 'msg-11',
    senderId: 'guide-4',
    receiverId: 'traveler-2',
    content: 'Absolutely! As a photographer myself, I encourage it. The telephoto will be perfect for wildlife shots. We\'ll have plenty of opportunities for amazing photos. What kind of subjects are you most interested in?',
    filtered: false,
    timestamp: '2026-02-04T14:30:00Z',
    read: true,
  },
  {
    id: 'msg-12',
    senderId: 'traveler-2',
    receiverId: 'guide-4',
    content: 'Great! I love landscape and wildlife photography. Looking forward to capturing Hokkaido\'s beauty!',
    filtered: false,
    timestamp: '2026-02-04T15:00:00Z',
    read: true,
  },

  // Conversation between traveler-2 and guide-6 (with filtered content)
  {
    id: 'msg-13',
    senderId: 'traveler-2',
    receiverId: 'guide-6',
    content: 'Hey Ken! I want to buy some anime figures. Any recommendations for shops?',
    filtered: false,
    timestamp: '2026-02-07T10:00:00Z',
    read: true,
  },
  {
    id: 'msg-14',
    senderId: 'guide-6',
    receiverId: 'traveler-2',
    content: 'Sure! I know several great shops. What kind of figures are you looking for? New releases or vintage? Also, what\'s your *** budget?',
    filtered: true,
    timestamp: '2026-02-07T11:30:00Z',
    read: true,
  },
  {
    id: 'msg-15',
    senderId: 'traveler-2',
    receiverId: 'guide-6',
    content: 'I\'m interested in One Piece and Demon Slayer figures. Budget is around 50,000 yen.',
    filtered: false,
    timestamp: '2026-02-07T12:00:00Z',
    read: false,
  },

  // Admin message to guide-7 (pending approval)
  {
    id: 'msg-16',
    senderId: 'admin-1',
    receiverId: 'guide-7',
    content: '伊藤様、ガイド登録のご申請ありがとうございます。現在、提出いただいた資格書類を確認中です。1-2営業日以内にご連絡いたします。',
    filtered: false,
    timestamp: '2026-01-29T10:00:00Z',
    read: true,
  },
  {
    id: 'msg-17',
    senderId: 'guide-7',
    receiverId: 'admin-1',
    content: 'ご確認ありがとうございます。ご連絡をお待ちしております。よろしくお願いいたします。',
    filtered: false,
    timestamp: '2026-01-29T14:00:00Z',
    read: true,
  },
];

export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: ['traveler-1', 'guide-1'],
    lastMessage: messages[2],
    unreadCount: 0,
  },
  {
    id: 'conv-2',
    participants: ['traveler-2', 'guide-2'],
    lastMessage: messages[5],
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    participants: ['traveler-4', 'guide-5'],
    lastMessage: messages[8],
    unreadCount: 0,
  },
  {
    id: 'conv-4',
    participants: ['traveler-2', 'guide-4'],
    lastMessage: messages[11],
    unreadCount: 0,
  },
  {
    id: 'conv-5',
    participants: ['traveler-2', 'guide-6'],
    lastMessage: messages[14],
    unreadCount: 1,
  },
  {
    id: 'conv-6',
    participants: ['admin-1', 'guide-7'],
    lastMessage: messages[16],
    unreadCount: 0,
  },
];
