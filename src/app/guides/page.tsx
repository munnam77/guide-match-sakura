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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Find Your Guide
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ガイドを探す
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            {filteredAndSortedGuides.length}名のガイドが見つかりました
          </p>
        </div>

        {/* Search Bar with Glass Morphism */}
        <div className="mb-8">
          <div className="relative backdrop-blur-xl bg-white/90 border-2 border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-pink-500" />
            <Input
              type="text"
              placeholder="ガイド名、エリア、専門分野で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-16 py-7 text-lg border-0 bg-transparent focus-visible:ring-2 focus-visible:ring-pink-400"
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
            <div className="mb-8 flex items-center justify-between bg-white p-5 rounded-xl shadow-md border border-gray-200">
              <p className="text-base text-gray-700 font-medium">
                <span className="font-bold text-gray-900 text-lg">{filteredAndSortedGuides.length}</span>
                件のガイド
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 font-semibold">並び替え:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-52 border-2 border-gray-300 font-medium">
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAndSortedGuides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
                <div className="text-7xl mb-6">🔍</div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
                  該当するガイドが見つかりませんでした
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  検索条件を変更してもう一度お試しください
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
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
