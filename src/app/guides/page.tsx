'use client';

import React, { useState, useMemo } from 'react';
import GuideCard from '@/components/guides/GuideCard';
import GuideFilters from '@/components/guides/GuideFilters';
import { guides } from '@/data/guides';
import { GuideFilters as FilterType, SortOption } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterType>({});
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  const approvedGuides = guides.filter((g) => g.status === 'approved');

  const filteredAndSortedGuides = useMemo(() => {
    let result = approvedGuides.filter((guide) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !guide.name.toLowerCase().includes(query) &&
          !guide.area.toLowerCase().includes(query) &&
          !guide.bio.toLowerCase().includes(query) &&
          !guide.specialties.some((s) => s.toLowerCase().includes(query))
        ) {
          return false;
        }
      }

      // Area filter
      if (filters.area && guide.area !== filters.area) {
        return false;
      }

      // Language filter
      if (filters.language && !guide.languages.includes(filters.language)) {
        return false;
      }

      // Specialty filter
      if (filters.specialty && !guide.specialties.includes(filters.specialty)) {
        return false;
      }

      // Price filter
      if (filters.minPrice && guide.pricePerHour < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && guide.pricePerHour > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.minRating && guide.rating < filters.minRating) {
        return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.pricePerHour - b.pricePerHour;
        case 'price-high':
          return b.pricePerHour - a.pricePerHour;
        case 'recommended':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    return result;
  }, [approvedGuides, searchQuery, filters, sortBy]);

  const handleResetFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ガイドを探す</h1>
          <p className="text-lg text-gray-600">
            {filteredAndSortedGuides.length}名のガイドが見つかりました
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="ガイド名、エリア、専門分野で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <GuideFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Sort */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">{filteredAndSortedGuides.length}</span>
                件のガイド
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">並び替え:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">おすすめ順</SelectItem>
                    <SelectItem value="rating">評価が高い順</SelectItem>
                    <SelectItem value="price-low">料金が安い順</SelectItem>
                    <SelectItem value="price-high">料金が高い順</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Guide Grid */}
            {filteredAndSortedGuides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedGuides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  該当するガイドが見つかりませんでした
                </h3>
                <p className="text-gray-600 mb-6">
                  検索条件を変更してもう一度お試しください
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-pink-500 hover:text-pink-600 font-medium"
                >
                  フィルターをリセット
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
