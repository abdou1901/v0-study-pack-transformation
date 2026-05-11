'use client';

import { Section, Question } from '@/lib/studyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface QuizViewProps {
  section: Section;
}

export function QuizView({ section }: QuizViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showAnswers, setShowAnswers] = useState(false);

  const question = section.questions[currentQuestion];
  const answer = selectedAnswers[question.id] || '';
  const isAnswered = answer !== '';

  const handleAnswer = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [question.id]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswers(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswers(false);
    }
  };

  const handleToggleAnswer = () => {
    setShowAnswers(!showAnswers);
  };

  const isCorrect = () => {
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      return answer === question.answer;
    }
    return answer.toLowerCase().includes(question.answer.toLowerCase() || answer.toLowerCase().includes((question.answer as string[])?.join('').toLowerCase()));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>السؤال {currentQuestion + 1} من {section.questions.length}</span>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${((currentQuestion + 1) / section.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-right">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.type === 'multiple-choice' && (
            <div className="space-y-2">
              {question.options?.map((option, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 text-right"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answer === option}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'true-false' && (
            <div className="flex gap-2">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                <input
                  type="radio"
                  name={question.id}
                  value="صحيح"
                  checked={answer === 'صحيح'}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-4 h-4"
                />
                <span>صحيح</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                <input
                  type="radio"
                  name={question.id}
                  value="خطأ"
                  checked={answer === 'خطأ'}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-4 h-4"
                />
                <span>خطأ</span>
              </label>
            </div>
          )}

          {(question.type === 'short-answer' || question.type === 'fill-blank') && (
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="أدخل إجابتك"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </CardContent>
      </Card>

      {showAnswers && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-right text-green-900">
              {isCorrect() ? '✓ إجابة صحيحة!' : 'إجابة اقترحة'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <div>
              <p className="font-semibold text-gray-700">الإجابة الصحيحة:</p>
              <p className="text-gray-700">{question.answer}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">التفسير:</p>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2 justify-center">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
        >
          السؤال السابق
        </Button>

        {isAnswered && (
          <Button
            onClick={handleToggleAnswer}
            variant={showAnswers ? 'default' : 'outline'}
          >
            {showAnswers ? 'إخفاء الإجابة' : 'عرض الإجابة'}
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={currentQuestion === section.questions.length - 1}
        >
          السؤال التالي
        </Button>
      </div>
    </div>
  );
}
