'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          مجموعة الدراسة التاريخية
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          تاريخ الجزائر من القرن السادس عشر إلى 1830
        </p>
        <p className="text-lg text-gray-600 mb-12">
          مجموعة دراسية شاملة تتضمن ملخصات مفصلة، أسئلة اختبارات، وبطاقات تعليمية تفاعلية
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ملخصات مفصلة</h3>
            <p className="text-gray-600">معلومات شاملة عن كل قسم من أقسام الدراسة</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">❓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">أسئلة الاختبار</h3>
            <p className="text-gray-600">أكثر من 30 سؤال مع شروحات تفصيلية للإجابات</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🗂️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">بطاقات تعليمية</h3>
            <p className="text-gray-600">بطاقات تفاعلية للمراجعة السريعة والحفظ</p>
          </div>
        </div>

        <Link href="/study">
          <Button size="lg" className="text-lg px-8 py-6">
            ابدأ الدراسة الآن
          </Button>
        </Link>

        <div className="mt-12 text-gray-600">
          <p className="mb-2">محتوى الدراسة:</p>
          <ul className="text-sm space-y-1">
            <li>✓ القسم الأول: المعالم الجيوسياسية للإيالة الجزائرية</li>
            <li>✓ القسم الثاني: العلاقات الجزائرية-العثمانية</li>
            <li>✓ الأقسام 3-8: العلاقات الدولية والظروف قبل الغزو الفرنسي</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
