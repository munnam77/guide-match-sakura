'use client';

import React, { useState } from 'react';
import { Guide, TourPlan } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar as CalendarIcon, Users, CreditCard, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guide: Guide;
}

export default function BookingDialog({ open, onOpenChange, guide }: BookingDialogProps) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [selectedTourPlan, setSelectedTourPlan] = useState<TourPlan | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTourPlanChange = (tourPlanId: string) => {
    const tourPlan = guide.tourPlans.find((tp) => tp.id === tourPlanId);
    setSelectedTourPlan(tourPlan || null);
  };

  const calculateTotal = () => {
    if (!selectedTourPlan) return 0;
    return selectedTourPlan.price * parseInt(numberOfPeople || '1');
  };

  const handleBooking = async () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    if (!selectedTourPlan || !selectedDate) {
      alert('ツアープランと日付を選択してください。');
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsProcessing(false);
    onOpenChange(false);

    // Show success message
    alert('予約が完了しました！ダッシュボードで詳細をご確認ください。');

    if (currentUser.role === 'traveler') {
      router.push('/dashboard/traveler');
    }
  };

  const isDateAvailable = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return guide.availability[dateStr] === true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">予約リクエスト</DialogTitle>
          <DialogDescription>
            {guide.name}さんのガイドツアーを予約します
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tour Plan Selection */}
          <div className="space-y-2">
            <Label htmlFor="tourPlan">ツアープラン *</Label>
            <Select onValueChange={handleTourPlanChange}>
              <SelectTrigger id="tourPlan">
                <SelectValue placeholder="ツアープランを選択してください" />
              </SelectTrigger>
              <SelectContent>
                {guide.tourPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.title} - ¥{plan.price.toLocaleString()} ({plan.duration}時間)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTourPlan && (
              <div className="mt-3 p-4 bg-pink-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">{selectedTourPlan.description}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">含まれるもの:</span>
                  <span className="ml-2">{selectedTourPlan.includes.join(', ')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>日付 *</Label>
            <div className="border rounded-lg p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => !isDateAvailable(date) || date < new Date()}
                locale={ja}
                className="mx-auto"
              />
            </div>
            {selectedDate && (
              <p className="text-sm text-gray-600 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2 text-pink-400" />
                選択日: {format(selectedDate, 'yyyy年M月d日(E)', { locale: ja })}
              </p>
            )}
          </div>

          {/* Number of People */}
          <div className="space-y-2">
            <Label htmlFor="people">人数 *</Label>
            <Select value={numberOfPeople} onValueChange={setNumberOfPeople}>
              <SelectTrigger id="people">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {selectedTourPlan &&
                  [...Array(selectedTourPlan.maxPeople)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}名
                    </SelectItem>
                  ))}
                {!selectedTourPlan && <SelectItem value="1">まずツアープランを選択</SelectItem>}
              </SelectContent>
            </Select>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="requests">特別なリクエスト（任意）</Label>
            <Textarea
              id="requests"
              placeholder="アレルギー、アクセス要件、その他のリクエストをご記入ください"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={4}
            />
          </div>

          {/* Price Breakdown */}
          {selectedTourPlan && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">料金内訳</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {selectedTourPlan.title} × {numberOfPeople}名
                  </span>
                  <span className="text-gray-900">
                    ¥{(selectedTourPlan.price * parseInt(numberOfPeople)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">サービス料</span>
                  <span className="text-gray-900">¥0</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">合計</span>
                  <span className="text-2xl font-bold text-pink-500">
                    ¥{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Safety Notice */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">安心の返金保証</p>
                <p className="text-xs text-blue-700">
                  ツアー開始48時間前までのキャンセルは全額返金いたします。
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isProcessing}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleBooking}
              className="flex-1 bg-pink-400 hover:bg-pink-500 text-white"
              disabled={!selectedTourPlan || !selectedDate || isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  処理中...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  予約リクエストを送信
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
