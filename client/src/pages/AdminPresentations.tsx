import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ArrowLeft, Save, X } from 'lucide-react';

interface Presentation {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  descriptionArabic: string;
  content: string;
  contentArabic: string;
  stage: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminPresentationsProps {
  onBack: () => void;
}

/**
 * Admin Presentations Panel
 * Design: Playful & Vibrant
 * - Manage presentations dynamically
 * - Add, edit, delete presentations
 * - No code changes needed
 */

export default function AdminPresentations({ onBack }: AdminPresentationsProps) {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Presentation>>({
    title: '',
    titleArabic: '',
    description: '',
    descriptionArabic: '',
    content: '',
    contentArabic: '',
    stage: 'recognition',
    order: 0,
    isActive: true,
  });

  // Load presentations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('presentations');
    if (saved) {
      setPresentations(JSON.parse(saved));
    }
  }, []);

  // Save presentations to localStorage
  const savePresentations = (data: Presentation[]) => {
    localStorage.setItem('presentations', JSON.stringify(data));
    setPresentations(data);
  };

  const handleAddNew = () => {
    setFormData({
      title: '',
      titleArabic: '',
      description: '',
      descriptionArabic: '',
      content: '',
      contentArabic: '',
      stage: 'recognition',
      order: presentations.length + 1,
      isActive: true,
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (presentation: Presentation) => {
    setFormData(presentation);
    setEditingId(presentation.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.titleArabic || !formData.contentArabic) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (editingId) {
      // Update existing
      const updated = presentations.map(p =>
        p.id === editingId
          ? {
              ...p,
              ...formData,
              updatedAt: new Date().toISOString(),
            }
          : p
      );
      savePresentations(updated);
    } else {
      // Add new
      const newPresentation: Presentation = {
        id: Date.now().toString(),
        title: formData.title || '',
        titleArabic: formData.titleArabic || '',
        description: formData.description || '',
        descriptionArabic: formData.descriptionArabic || '',
        content: formData.content || '',
        contentArabic: formData.contentArabic || '',
        stage: formData.stage || 'recognition',
        order: formData.order || presentations.length + 1,
        isActive: formData.isActive !== false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      savePresentations([...presentations, newPresentation]);
    }

    setShowForm(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الدرس؟')) {
      savePresentations(presentations.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({});
    setEditingId(null);
  };

  const stages = [
    { id: 'recognition', name: 'التعرف على الحروف' },
    { id: 'phonics', name: 'ربط الصوت بالحرف' },
    { id: 'blending', name: 'الدمج والتركيب' },
    { id: 'reading', name: 'القراءة' },
    { id: 'fluency', name: 'الطلاقة' },
    { id: 'writing', name: 'الكتابة' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] flex flex-col">
      {/* Header */}
      <header className="bg-white/40 backdrop-blur-md border-b border-[#E8D4E8] py-4">
        <div className="container flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#2D1B3D] hover:text-[#FF6B5B] transition-colors font-bold font-poppins"
          >
            <ArrowLeft size={20} />
            الرجوع
          </button>
          <h1 className="text-3xl font-bold text-[#2D1B3D]">⚙️ إدارة الدروس</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        {/* Add Button */}
        {!showForm && (
          <button
            onClick={handleAddNew}
            className="mb-8 flex items-center gap-2 bg-gradient-to-r from-[#4ECDC4] to-[#FFD93D] text-white px-6 py-3 rounded-full font-bold font-poppins hover:shadow-lg transition-all duration-200"
          >
            <Plus size={20} />
            إضافة درس جديد
          </button>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] mb-8">
            <h2 className="text-2xl font-bold text-[#2D1B3D] mb-6">
              {editingId ? 'تعديل الدرس' : 'إضافة درس جديد'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Title Arabic */}
              <div>
                <label className="block text-[#2D1B3D] font-bold mb-2 font-poppins">
                  عنوان الدرس (عربي) *
                </label>
                <input
                  type="text"
                  value={formData.titleArabic || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, titleArabic: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-[#E8D4E8] rounded-xl focus:outline-none focus:border-[#4ECDC4]"
                  placeholder="مثال: الحرف الألف"
                />
              </div>

              {/* Title English */}
              <div>
                <label className="block text-[#2D1B3D] font-bold mb-2 font-poppins">
                  عنوان الدرس (English)
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-[#E8D4E8] rounded-xl focus:outline-none focus:border-[#4ECDC4]"
                  placeholder="Example: Letter Alef"
                />
              </div>

              {/* Stage */}
              <div>
                <label className="block text-[#2D1B3D] font-bold mb-2 font-poppins">
                  المرحلة التعليمية *
                </label>
                <select
                  value={formData.stage || 'recognition'}
                  onChange={(e) =>
                    setFormData({ ...formData, stage: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-[#E8D4E8] rounded-xl focus:outline-none focus:border-[#4ECDC4]"
                >
                  {stages.map(stage => (
                    <option key={stage.id} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Order */}
              <div>
                <label className="block text-[#2D1B3D] font-bold mb-2 font-poppins">
                  ترتيب الدرس
                </label>
                <input
                  type="number"
                  value={formData.order || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border-2 border-[#E8D4E8] rounded-xl focus:outline-none focus:border-[#4ECDC4]"
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#2D1B3D] font-bold mb-2 font-poppins">
                  الوصف (عربي)
                </label>
                <textarea
                  value={formData.descriptionArabic || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionArabic: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-[#E8D4E8] rounded-xl focus:outline-none focus:border-[#4ECDC4] h-24"
                  placeholder="وصف قصير للدرس"
                />
              </div>

              <div>
                <label className="block text-[#2D1B3D] font-bold mb-2 font-poppins">
                  الوصف (English)
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-[#E8D4E8] rounded-xl focus:outline-none focus:border-[#4ECDC4] h-24"
                  placeholder="Short description"
                />
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#2D1B3D] font-bold mb-2 font-poppins">
                  محتوى الدرس (عربي) *
                </label>
                <textarea
                  value={formData.contentArabic || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, contentArabic: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-[#E8D4E8] rounded-xl focus:outline-none focus:border-[#4ECDC4] h-32"
                  placeholder="محتوى الدرس الكامل"
                />
              </div>

              <div>
                <label className="block text-[#2D1B3D] font-bold mb-2 font-poppins">
                  محتوى الدرس (English)
                </label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-[#E8D4E8] rounded-xl focus:outline-none focus:border-[#4ECDC4] h-32"
                  placeholder="Lesson content"
                />
              </div>
            </div>

            {/* Active Toggle */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive !== false}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-5 h-5"
                />
                <span className="text-[#2D1B3D] font-bold font-poppins">
                  تفعيل الدرس
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-[#4ECDC4] text-white px-6 py-3 rounded-full font-bold font-poppins hover:shadow-lg transition-all duration-200"
              >
                <Save size={20} />
                حفظ
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-[#FFD93D] text-[#2D1B3D] px-6 py-3 rounded-full font-bold font-poppins hover:shadow-lg transition-all duration-200"
              >
                <X size={20} />
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* Presentations List */}
        {!showForm && (
          <div className="space-y-4">
            {presentations.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border-2 border-[#E8D4E8]">
                <p className="text-[#7A6B8F] font-poppins text-lg">
                  لا توجد دروس حتى الآن. ابدأ بإضافة درس جديد!
                </p>
              </div>
            ) : (
              presentations.map(presentation => (
                <div
                  key={presentation.id}
                  className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#E8D4E8] hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#2D1B3D] mb-2">
                        {presentation.titleArabic}
                      </h3>
                      <p className="text-[#7A6B8F] font-poppins mb-3">
                        {presentation.descriptionArabic}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span className="px-3 py-1 bg-[#4ECDC4]/20 text-[#4ECDC4] rounded-full font-poppins">
                          {stages.find(s => s.id === presentation.stage)?.name}
                        </span>
                        <span className="px-3 py-1 bg-[#FFD93D]/20 text-[#FFD93D] rounded-full font-poppins">
                          الترتيب: {presentation.order}
                        </span>
                        {!presentation.isActive && (
                          <span className="px-3 py-1 bg-[#FF6B5B]/20 text-[#FF6B5B] rounded-full font-poppins">
                            معطّل
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(presentation)}
                        className="p-2 bg-[#B8A8FF] text-white rounded-full hover:shadow-lg transition-all duration-200"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(presentation.id)}
                        className="p-2 bg-[#FF6B5B] text-white rounded-full hover:shadow-lg transition-all duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-sm border-t border-[#E8D4E8] py-4 mt-auto">
        <div className="container text-center">
          <p className="text-[#7A6B8F] font-poppins text-sm">
            إجمالي الدروس: {presentations.length}
          </p>
        </div>
      </footer>
    </div>
  );
}
