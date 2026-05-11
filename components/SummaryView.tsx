'use client';

import { Section } from '@/lib/studyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SummaryViewProps {
  section: Section;
}

export function SummaryView({ section }: SummaryViewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>الملخص التفصيلي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-right">
            {section.summary}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>النقاط الرئيسية</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {section.keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex gap-3 text-right items-start"
              >
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
