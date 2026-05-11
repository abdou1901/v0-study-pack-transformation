'use client';

import { useState } from 'react';
import { FileText, BookOpen, Lightbulb, ChevronRight, Menu, X } from 'lucide-react';
import Summary from '@/components/Summary';
import Quiz from '@/components/Quiz';
import Flashcards from '@/components/Flashcards';
import { sectionsData } from '@/lib/sectionData';

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'summary' | 'quiz' | 'flashcards'>('home');
  const [selectedSection, setSelectedSection] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectSection = (index: number) => {
    setSelectedSection(index);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    const section = sectionsData[selectedSection];
    
    switch (currentView) {
      case 'summary':
        return <Summary section={section} />;
      case 'quiz':
        return <Quiz section={section} />;
      case 'flashcards':
        return <Flashcards section={section} />;
      case 'home':
      default:
        return (
          <div className="text-center py-12 px-4 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-blue-900">مجموعة الدراسة الشاملة</h1>
            <p className="text-xl text-gray-700 mb-4">تاريخ الجزائر من القرن السادس عشر إلى 1830</p>
            <p className="text-lg text-gray-600 mb-12">اختر قسماً من الجانب واختر وسيلة الدراسة المناسبة</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <button
                onClick={() => setCurrentView('summary')}
                className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition"
              >
                <FileText className="mx-auto mb-3 text-blue-600" size={32} />
                <h3 className="font-bold text-lg mb-2">الملخصات</h3>
                <p className="text-gray-600 text-sm">اقرأ الملخصات التفصيلية والنقاط الرئيسية</p>
              </button>
              
              <button
                onClick={() => setCurrentView('quiz')}
                className="p-6 bg-green-50 border-2 border-green-200 rounded-lg hover:border-green-500 hover:shadow-lg transition"
              >
                <BookOpen className="mx-auto mb-3 text-green-600" size={32} />
                <h3 className="font-bold text-lg mb-2">الاختبارات</h3>
                <p className="text-gray-600 text-sm">اختبر معلوماتك مع أسئلة متنوعة</p>
              </button>
              
              <button
                onClick={() => setCurrentView('flashcards')}
                className="p-6 bg-purple-50 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:shadow-lg transition"
              >
                <Lightbulb className="mx-auto mb-3 text-purple-600" size={32} />
                <h3 className="font-bold text-lg mb-2">البطاقات</h3>
                <p className="text-gray-600 text-sm">تعلم باستخدام البطاقات التعليمية</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative w-64 h-screen bg-blue-900 text-white overflow-y-auto transition-transform duration-300 z-40`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-8">الأقسام</h2>
          <div className="space-y-2">
            {sectionsData.map((section, index) => (
              <button
                key={index}
                onClick={() => handleSelectSection(index)}
                className={`w-full text-right p-3 rounded-lg transition ${
                  selectedSection === index
                    ? 'bg-blue-600'
                    : 'hover:bg-blue-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{section.title}</span>
                  {selectedSection === index && <ChevronRight size={16} />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {currentView !== 'home' && (
            <button
              onClick={() => setCurrentView('home')}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ← العودة للرئيسية
            </button>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
