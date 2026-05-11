'use client';

import { useState } from 'react';
import { Section, Question } from '@/lib/sectionData';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Quiz({ section }: { section: Section }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  if (section.quiz.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-gray-600 text-lg">لا توجد أسئلة متاحة لهذا القسم بعد</p>
      </div>
    );
  }

  const question = section.quiz[currentQuestion];
  const isAnswered = answers[question.id] !== undefined;
  const isCorrect = answers[question.id] === question.answer;

  const handleAnswer = (value: string) => {
    if (!showResults) {
      setAnswers({ ...answers, [question.id]: value });
      setShowResults(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < section.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResults(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowResults(!!answers[section.quiz[currentQuestion - 1].id]);
    }
  };

  const correctCount = Object.values(answers).filter(
    (val, i) => val === section.quiz[i]?.answer
  ).length;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">الاختبارات - {section.title}</h1>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">السؤال {currentQuestion + 1} من {section.quiz.length}</span>
            <span className="text-blue-600 font-bold">{correctCount} صحيح</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / section.quiz.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6 text-gray-800">{question.question}</h2>

        {question.type === 'multiple' && (
          <div className="space-y-3 mb-8">
            {question.options?.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                disabled={showResults}
                className={`w-full p-4 text-right rounded-lg border-2 transition ${
                  answers[question.id] === option
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {question.type === 'truefalse' && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {['صحيح', 'خطأ'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showResults}
                className={`p-4 rounded-lg border-2 font-bold text-lg transition ${
                  answers[question.id] === option
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-600'
                      : 'border-red-500 bg-red-50 text-red-600'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {question.type === 'fill' && (
          <div className="mb-8">
            <input
              type="text"
              value={answers[question.id] || ''}
              onChange={(e) => !showResults && handleAnswer(e.target.value)}
              placeholder="اكتب الإجابة"
              disabled={showResults}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none text-right"
            />
          </div>
        )}

        {question.type === 'short' && (
          <div className="mb-8">
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => !showResults && handleAnswer(e.target.value)}
              placeholder="اكتب إجابة قصيرة"
              disabled={showResults}
              rows={3}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none text-right"
            />
          </div>
        )}

        {showResults && isAnswered && (
          <div className={`p-6 rounded-lg mb-8 ${isCorrect ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <div className="flex gap-3 mb-3">
              {isCorrect ? (
                <CheckCircle className="text-green-600" size={24} />
              ) : (
                <XCircle className="text-yellow-600" size={24} />
              )}
              <span className={`font-bold text-lg ${isCorrect ? 'text-green-600' : 'text-yellow-600'}`}>
                {isCorrect ? 'إجابة صحيحة' : 'إجابة غير صحيحة'}
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              <strong>الإجابة الصحيحة:</strong> {question.answer}
            </p>
            <p className="text-gray-700">
              <strong>الشرح:</strong> {question.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
          >
            السابق
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestion === section.quiz.length - 1}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}
