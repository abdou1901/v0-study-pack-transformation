'use client';

import { Section } from '@/lib/studyData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface FlashcardsViewProps {
  section: Section;
}

export function FlashcardsView({ section }: FlashcardsViewProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [markedCards, setMarkedCards] = useState<Set<string>>(new Set());

  const card = section.flashcards[currentCard];
  const isMarked = markedCards.has(card.id);

  const handleNext = () => {
    if (currentCard < section.flashcards.length - 1) {
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

  const toggleMark = () => {
    const newMarked = new Set(markedCards);
    if (isMarked) {
      newMarked.delete(card.id);
    } else {
      newMarked.add(card.id);
    }
    setMarkedCards(newMarked);
  };

  const markedCount = markedCards.size;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>بطاقة {currentCard + 1} من {section.flashcards.length}</span>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${((currentCard + 1) / section.flashcards.length) * 100}%` }}
          />
        </div>
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="h-64 cursor-pointer perspective"
      >
        <Card className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300">
          <CardContent className="text-center p-8">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                {isFlipped ? 'الخلف' : 'الأمام'}
              </p>
              <p className="text-2xl font-bold text-blue-900 leading-relaxed">
                {isFlipped ? card.back : card.front}
              </p>
              <p className="text-sm text-gray-500 mt-4">اضغط للقلب</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 justify-center flex-wrap">
        <Button
          onClick={handlePrevious}
          disabled={currentCard === 0}
          variant="outline"
        >
          السابقة
        </Button>

        <Button
          onClick={toggleMark}
          variant={isMarked ? 'default' : 'outline'}
        >
          {isMarked ? `★ (${markedCount})` : `☆ (${markedCount})`}
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentCard === section.flashcards.length - 1}
        >
          التالية
        </Button>
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          onClick={() => setCurrentCard(Math.floor(Math.random() * section.flashcards.length))}
          variant="outline"
        >
          عشوائية
        </Button>

        <Button
          onClick={() => {
            setCurrentCard(0);
            setIsFlipped(false);
          }}
          variant="outline"
        >
          إعادة تعيين
        </Button>
      </div>
    </div>
  );
}
