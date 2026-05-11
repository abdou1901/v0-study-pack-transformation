'use client';

import { useState } from 'react';
import { Section } from '@/lib/sectionData';
import { RotateCw, Shuffle } from 'lucide-react';

export default function Flashcards({ section }: { section: Section }) {
  const [cards, setCards] = useState(section.flashcards);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  if (cards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-gray-600 text-lg">لا توجد بطاقات متاحة لهذا القسم بعد</p>
      </div>
    );
  }

  const currentCardData = cards[currentCard];
  const isFavorite = favorites.has(currentCardData.id);

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const handleReset = () => {
    setCards(section.flashcards);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const toggleFavorite = () => {
    const newFavorites = new Set(favorites);
    if (isFavorite) {
      newFavorites.delete(currentCardData.id);
    } else {
      newFavorites.add(currentCardData.id);
    }
    setFavorites(newFavorites);
  };

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">البطاقات التعليمية - {section.title}</h1>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">البطاقة {currentCard + 1} من {cards.length}</span>
          <div className="flex gap-2">
            <button
              onClick={handleShuffle}
              className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              title="خلط عشوائي"
            >
              <Shuffle size={20} />
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              title="إعادة تعيين"
            >
              <RotateCw size={20} />
            </button>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentCard + 1) / cards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="h-64 mb-8 cursor-pointer relative"
      >
        <div
          className={`w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg p-8 flex items-center justify-center transition-all transform ${
            isFlipped ? 'bg-gradient-to-br from-green-500 to-green-700' : ''
          }`}
        >
          <div className="text-white text-center">
            <p className="text-sm opacity-75 mb-4">{isFlipped ? 'الخلف' : 'الأمام'}</p>
            <p className="text-2xl font-bold">
              {isFlipped ? currentCardData.back : currentCardData.front}
            </p>
            <p className="text-xs opacity-50 mt-4">انقر للقلب</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 mb-8">
        <button
          onClick={handlePrevious}
          disabled={currentCard === 0}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
        >
          السابق
        </button>
        <button
          onClick={toggleFavorite}
          className={`px-6 py-2 rounded-lg transition ${
            isFavorite
              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          {isFavorite ? '⭐ مفضلة' : '☆ أضف للمفضلة'}
        </button>
        <button
          onClick={handleNext}
          disabled={currentCard === cards.length - 1}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
        >
          التالي
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-bold mb-4 text-blue-900">ملخص البطاقات</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{cards.length}</div>
            <div className="text-gray-600 text-sm">إجمالي البطاقات</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{favorites.size}</div>
            <div className="text-gray-600 text-sm">المفضلة</div>
          </div>
        </div>
      </div>
    </div>
  );
}
