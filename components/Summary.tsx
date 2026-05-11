import { Section } from '@/lib/sectionData';

export default function Summary({ section }: { section: Section }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">{section.title}</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">الملخص التفصيلي</h2>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {section.summary.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">النقاط الرئيسية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {section.keyPoints.map((point, i) => (
            <div key={i} className="flex gap-3">
              <div className="text-blue-600 font-bold text-lg flex-shrink-0">•</div>
              <p className="text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
