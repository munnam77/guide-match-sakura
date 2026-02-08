'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { messages, conversations } from '@/data/messages';
import { guides } from '@/data/guides';
import { travelers } from '@/data/travelers';
import { useAuth } from '@/contexts/AuthContext';
import { getAvatarGradient, getInitials } from '@/lib/utils';
import { Send, Paperclip, AlertCircle, Shield } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">メッセージ</h1>
          <p className="text-gray-500 mt-1">ガイドや旅行者との会話</p>
        </div>

        <Card className="overflow-hidden shadow-xl border-0 rounded-2xl" style={{ height: 'calc(100vh - 220px)' }}>
          <div className="grid grid-cols-3 h-full">
            {/* Conversations List */}
            <div className="col-span-1 border-r bg-white overflow-y-auto">
              <div className="p-5 border-b bg-gradient-to-r from-gray-50 to-white">
                <h2 className="font-bold text-gray-900 text-lg">会話一覧</h2>
              </div>
              <div className="divide-y">
                {userConversations.map((conv) => {
                  const other = getOtherParticipant(conv);
                  if (!other) return null;
                  const isSelected = selectedConversation?.id === conv.id;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-4 text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-l-4 border-pink-400'
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarGradient(other.name)} flex items-center justify-center shadow-md flex-shrink-0 ring-2 ${isSelected ? 'ring-pink-300' : 'ring-white'}`}>
                          <span className="text-sm font-bold text-white">{getInitials(other.name)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`font-semibold truncate ${isSelected ? 'text-pink-700' : 'text-gray-900'}`}>{other.name}</p>
                            {conv.unreadCount > 0 && (
                              <Badge className="bg-gradient-to-r from-pink-400 to-rose-500 text-white border-0 text-xs px-2">{conv.unreadCount}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 truncate">
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
                <div className="p-5 border-b bg-gradient-to-r from-white to-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarGradient(otherUser.name)} flex items-center justify-center shadow-md ring-2 ring-white`}>
                      <span className="text-sm font-bold text-white">{getInitials(otherUser.name)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{otherUser.name}</p>
                      <p className="text-sm text-gray-500">{otherUser.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
                {conversationMessages.map((msg) => {
                  const isOwn = msg.senderId === currentUser.id;
                  return (
                    <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl px-5 py-3 shadow-sm ${
                            isOwn
                              ? 'bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-br-md'
                              : 'bg-white text-gray-900 rounded-bl-md border border-gray-100'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                          {msg.filtered && (
                            <div className="flex items-center space-x-1 mt-2 text-xs opacity-75">
                              <AlertCircle className="h-3 w-3" />
                              <span>フィルター適用済み</span>
                            </div>
                          )}
                        </div>
                        <p className={`text-xs text-gray-400 mt-1.5 ${isOwn ? 'text-right' : 'text-left'}`}>
                          {format(new Date(msg.timestamp), 'HH:mm', { locale: ja })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-xl p-3 mb-3 flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-pink-600">
                    安全なやり取りのため、価格交渉や直接連絡先の交換に関する単語は自動的にフィルタリングされます。
                  </p>
                </div>
                <div className="flex items-end space-x-3">
                  <Button variant="outline" size="icon" className="flex-shrink-0 rounded-xl h-11 w-11" aria-label="ファイル添付">
                    <Paperclip className="h-5 w-5 text-gray-400" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      placeholder="メッセージを入力..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="bg-gray-50 border-gray-200 rounded-xl h-11 focus:ring-pink-300"
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white flex-shrink-0 rounded-xl h-11 px-5 shadow-md"
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
