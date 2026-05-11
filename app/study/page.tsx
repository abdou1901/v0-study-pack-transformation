'use client';

import { useState } from 'react';
import { sections } from '@/lib/studyData';
import { SummaryView } from '@/components/SummaryView';
import { QuizView } from '@/components/QuizView';
import { FlashcardsView } from '@/components/FlashcardsView';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type ViewMode = 'menu' | 'summary' | 'quiz' | 'flashcards';

export default function StudyPage() {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('menu');

  const section = selectedSection !== null ? sections[selectedSection] : null;

  const handleSelectSection = (index: number) => {
    setSelectedSection(index);
    setViewMode('menu');
  };

  const handleBackToMenu = () => {
    setSelectedSection(null);
    setViewMode('menu');
  };

  const handleBackToSection = () => {
    setViewMode('menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            مجموعة الدراسة الشاملة
          </h1>
          <p className="text-xl text-gray-600">تاريخ الجزائر من القرن السادس عشر إلى 1830</p>
        </header>

        {/* Main Menu */}
        {viewMode === 'menu' && selectedSection === null && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section, idx) => (
                <Card
                  key={section.id}
                  className="p-6 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all"
                  onClick={() => handleSelectSection(idx)}
                >
                  <h3 className="text-lg font-semibold text-blue-900 mb-2 text-right">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-right mb-4">
                    {section.questions.length} أسئلة • {section.flashcards.length} بطاقة
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Section Menu */}
        {viewMode === 'menu' && section && (
          <div className="space-y-6">
            <button
              onClick={handleBackToMenu}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-6"
            >
              ← العودة للقائمة الرئيسية
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 text-right mb-2">
                {section.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => setViewMode('summary')}
                className="h-24 flex flex-col items-center justify-center text-lg"
                variant="outline"
              >
                <span className="text-3xl mb-2">📖</span>
                الملخص والنقاط
              </Button>

              <Button
                onClick={() => setViewMode('quiz')}
                className="h-24 flex flex-col items-center justify-center text-lg"
                variant="outline"
              >
                <span className="text-3xl mb-2">❓</span>
                الاختبار
                <span className="text-xs text-gray-600 mt-1">
                  {section.questions.length} أسئلة
                </span>
              </Button>

              <Button
                onClick={() => setViewMode('flashcards')}
                className="h-24 flex flex-col items-center justify-center text-lg"
                variant="outline"
              >
                <span className="text-3xl mb-2">🗂️</span>
                البطاقات التعليمية
                <span className="text-xs text-gray-600 mt-1">
                  {section.flashcards.length} بطاقة
                </span>
              </Button>
            </div>
          </div>
        )}

        {/* Summary View */}
        {viewMode === 'summary' && section && (
          <div className="space-y-6">
            <button
              onClick={handleBackToSection}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-6"
            >
              ← العودة للقسم
            </button>
            <h2 className="text-3xl font-bold text-gray-900 text-right mb-6">
              {section.title}
            </h2>
            <SummaryView section={section} />
          </div>
        )}

        {/* Quiz View */}
        {viewMode === 'quiz' && section && (
          <div className="space-y-6">
            <button
              onClick={handleBackToSection}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-6"
            >
              ← العودة للقسم
            </button>
            <h2 className="text-3xl font-bold text-gray-900 text-right mb-6">
              اختبار - {section.title}
            </h2>
            <QuizView section={section} />
          </div>
        )}

        {/* Flashcards View */}
        {viewMode === 'flashcards' && section && (
          <div className="space-y-6">
            <button
              onClick={handleBackToSection}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-6"
            >
              ← العودة للقسم
            </button>
            <h2 className="text-3xl font-bold text-gray-900 text-right mb-6">
              البطاقات التعليمية - {section.title}
            </h2>
            <FlashcardsView section={section} />
          </div>
        )}
      </div>
    </div>
  );
}
