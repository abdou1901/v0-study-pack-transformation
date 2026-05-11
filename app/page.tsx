'use client';

import { useEffect, useState } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';

export default function StudyPage() {
  const [markdown, setMarkdown] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sections, setSections] = useState<Array<{ title: string; id: string }>>([]);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Load markdown data
    fetch('/lib/markdownData.json')
      .then((res) => res.json())
      .then((data) => {
        setMarkdown(data.markdown);

        // Extract section titles from markdown
        const lines = data.markdown.split('\n');
        const foundSections = [];
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('## القسم')) {
            const title = line.replace('## ', '');
            const id = `section-${foundSections.length}`;
            foundSections.push({ title, id });
          }
        }
        setSections(foundSections);
        if (foundSections.length > 0) {
          setActiveSection(foundSections[0].id);
        }
      });
  }, []);

  const scrollToSection = (sectionIndex: number) => {
    setActiveSection(`section-${sectionIndex}`);
    const element = document.getElementById(`section-${sectionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderMarkdown = (md: string) => {
    return md.split('\n').map((line, idx) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-4xl font-bold mb-4 mt-8 text-blue-900">
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        const sectionNum = sections.findIndex((s) => s.title === line.replace('## ', ''));
        const id = sectionNum >= 0 ? `section-${sectionNum}` : undefined;
        return (
          <h2
            key={idx}
            id={id}
            className="text-3xl font-bold mb-4 mt-8 text-blue-800 border-b-2 border-blue-300 pb-2"
          >
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-2xl font-bold mb-3 mt-6 text-blue-700">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-xl font-bold mb-2 mt-4 text-blue-600">
            {line.replace('#### ', '')}
          </h4>
        );
      }

      // Horizontal line
      if (line.trim() === '---') {
        return <hr key={idx} className="my-6 border-t-2 border-gray-300" />;
      }

      // Bold and formatting
      if (line.trim() === '') {
        return <div key={idx} className="h-2"></div>;
      }

      // List items
      if (line.trim().startsWith('- ')) {
        return (
          <li key={idx} className="ml-6 mb-2 text-gray-800">
            {line.replace(/^- /, '').replace(/\*\*/g, '')}
          </li>
        );
      }

      // Numbered list items
      if (line.trim().match(/^\d+\. /)) {
        return (
          <li key={idx} className="ml-6 mb-2 text-gray-800 list-decimal">
            {line.replace(/^\d+\. /, '').replace(/\*\*/g, '')}
          </li>
        );
      }

      // Regular paragraphs
      if (line.trim()) {
        return (
          <p key={idx} className="mb-4 text-gray-800 leading-relaxed text-right" dir="rtl">
            {line}
          </p>
        );
      }

      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">مجموعة الدراسة الشاملة</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden bg-white/20 hover:bg-white/30 p-2 rounded-lg transition"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="md:col-span-1">
            <div className="sticky top-20 bg-white rounded-lg shadow-md p-6 max-h-96 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-gray-800">الأقسام</h2>
              <nav className="space-y-2">
                {sections.map((section, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`w-full text-right px-4 py-2 rounded-lg transition font-semibold text-sm ${
                      activeSection === `section-${idx}`
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-8" dir="rtl">
            <div className="prose prose-invert max-w-none text-right">
              {renderMarkdown(markdown)}
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
          >
            <ChevronUp size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
