'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { messages, conversations } from '@/data/messages';
import { guides } from '@/data/guides';
import { travelers } from '@/data/travelers';
import { useAuth } from '@/contexts/AuthContext';
import { Send, Paperclip, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { filterMessage } from '@/data/settings';

function MessagesPageContent() {
  const { currentUser } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');

  if (!currentUser) return null;

  const userConversations = conversations.filter((conv) =>
    conv.participants.includes(currentUser.id)
  );

  const getOtherParticipant = (conversation: typeof conversations[0]) => {
    const otherId = conversation.participants.find((id) => id !== currentUser.id);
    const guide = guides.find((g) => g.id === otherId);
    const traveler = travelers.find((t) => t.id === otherId);
    return guide || traveler;
  };

  const conversationMessages = messages.filter((msg) =>
    (msg.senderId === currentUser.id && msg.receiverId === selectedConversation?.participants.find((id) => id !== currentUser.id)) ||
    (msg.receiverId === currentUser.id && msg.senderId === selectedConversation?.participants.find((id) => id !== currentUser.id))
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const { filtered: filteredContent, isFiltered } = filterMessage(messageInput);

    if (isFiltered) {
      alert('メッセージに禁止ワードが含まれています。一部の単語が***に置き換えられました。');
    }

    alert(`メッセージを送信しました: "${filteredContent}"`);
    setMessageInput('');
  };

  const otherUser = selectedConversation ? getOtherParticipant(selectedConversation) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">メッセージ</h1>
        </div>

        <Card className="overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="grid grid-cols-3 h-full">
            {/* Conversations List */}
            <div className="col-span-1 border-r bg-white overflow-y-auto">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="font-semibold text-gray-900">会話</h2>
              </div>
              <div className="divide-y">
                {userConversations.map((conv) => {
                  const other = getOtherParticipant(conv);
                  if (!other) return null;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conv.id ? 'bg-pink-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-pink-100 text-pink-600 font-semibold">
                            {getInitials(other.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-900 truncate">{other.name}</p>
                            {conv.unreadCount > 0 && (
                              <Badge className="bg-pink-400 text-white">{conv.unreadCount}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {conv.lastMessage.content}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {format(new Date(conv.lastMessage.timestamp), 'M月d日 HH:mm', { locale: ja })}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Window */}
            <div className="col-span-2 flex flex-col bg-white">
              {/* Chat Header */}
              {otherUser && (
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-pink-100 text-pink-600 font-semibold">
                        {getInitials(otherUser.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{otherUser.name}</p>
                      <p className="text-sm text-gray-600">{otherUser.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {conversationMessages.map((msg) => {
                  const isOwn = msg.senderId === currentUser.id;
                  return (
                    <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-sm ${isOwn ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            isOwn
                              ? 'bg-pink-400 text-white rounded-br-sm'
                              : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          {msg.filtered && (
                            <div className="flex items-center space-x-1 mt-2 text-xs opacity-75">
                              <AlertCircle className="h-3 w-3" />
                              <span>フィルター適用済み</span>
                            </div>
                          )}
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                          {format(new Date(msg.timestamp), 'HH:mm', { locale: ja })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-gray-50">
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-3 flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-pink-700">
                    <p className="font-medium mb-1">メッセージフィルターについて</p>
                    <p>
                      安全なやり取りのため、価格交渉や直接連絡先の交換に関する単語は自動的にフィルタリングされます。
                    </p>
                  </div>
                </div>
                <div className="flex items-end space-x-2">
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      placeholder="メッセージを入力..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="bg-white"
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    className="bg-pink-400 hover:bg-pink-500 text-white flex-shrink-0"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <ProtectedRoute>
      <MessagesPageContent />
    </ProtectedRoute>
  );
}
