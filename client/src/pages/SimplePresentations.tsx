import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Eye, Lock, LogOut } from 'lucide-react';
import { saveLessons as saveToIndexedDB, loadLessons as loadFromIndexedDB } from '@/lib/storageManager';

/**
 * Simplified Presentations System with Admin Password Protection
 * Two sections: Explanations (شروحات) and Exercises (تدريبات)
 * Admin password: AdminMode
 */

interface Lesson {
  id: string;
  name: string;
  fileName: string;
  fileData: string;
  uploadedAt: string;
  type: 'explanation' | 'exercise';
}

interface SimplePresentationsProps {
  onBack?: () => void;
}

const ADMIN_PASSWORD = 'AdminMode';

export default function SimplePresentations({ onBack }: SimplePresentationsProps = {}) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [newLessonName, setNewLessonName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'explanation' | 'exercise'>('explanation');
  const [adminTab, setAdminTab] = useState<'explanation' | 'exercise'>('explanation');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  // Load lessons from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await loadFromIndexedDB();
        setLessons(saved);
      } catch (error) {
        console.error('Error loading lessons:', error);
      }
    };
    loadData();
    
    // Check if admin from localStorage
    const adminMode = localStorage.getItem('adminMode') === 'true';
    setIsAdmin(adminMode);
  }, []);

  // Save lessons to IndexedDB
  const saveLessons = async (updatedLessons: Lesson[]) => {
    try {
      setLessons(updatedLessons);
      await saveToIndexedDB(updatedLessons);
    } catch (error) {
      console.error('Error saving lessons:', error);
      alert('خطأ في حفظ الدرس. الرجاء المحاولة مرة أخرى.');
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Add new lesson
  const handleAddLesson = async () => {
    if (!newLessonName.trim() || !selectedFile) {
      alert('الرجاء إدخال اسم الدرس واختيار ملف');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert('حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const fileData = e.target?.result as string;
        const newLesson: Lesson = {
          id: Date.now().toString(),
          name: newLessonName,
          fileName: selectedFile.name,
          fileData: fileData,
          uploadedAt: new Date().toLocaleString('ar-SA'),
          type: adminTab,
        };

        const updatedLessons = [...lessons, newLesson];
        await saveLessons(updatedLessons);

        setNewLessonName('');
        setSelectedFile(null);
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
        alert('تم حفظ الدرس بنجاح!');
      } catch (error) {
        console.error('Error adding lesson:', error);
        alert('خطأ في إضافة الدرس. الرجاء المحاولة مرة أخرى.');
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  // Delete lesson
  const handleDeleteLesson = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الدرس؟')) {
      const updatedLessons = lessons.filter(l => l.id !== id);
      await saveLessons(updatedLessons);
    }
  };

  // Handle admin password
  const handleAdminAccess = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('adminMode', 'true');
      setPasswordInput('');
      setShowPasswordPrompt(false);
      alert('تم الدخول بنجاح! أنت الآن في وضع الإدارة.');
    } else {
      alert('كلمة المرور خاطئة!');
      setPasswordInput('');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminMode');
    setPasswordInput('');
    alert('تم تسجيل الخروج بنجاح!');
  };

  // Preview file
  const handlePreviewFile = (lesson: Lesson) => {
    const blob = new Blob([atob(lesson.fileData.split(',')[1])], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  // Filter lessons by type
  const filteredLessons = lessons.filter(l => l.type === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                ← رجوع
              </button>
            )}
            <h1 className="text-4xl font-bold text-purple-900">The Duha Way</h1>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={20} />
                تسجيل خروج
              </button>
            ) : (
              <button
                onClick={() => setShowPasswordPrompt(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <Lock size={20} />
                إدارة
              </button>
            )}
          </div>
        </div>

        {/* Password Prompt */}
        {showPasswordPrompt && !isAdmin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-center text-purple-900">إدارة الدروس</h2>
              <p className="text-gray-600 mb-4 text-center">أدخل كلمة المرور للوصول إلى لوحة الإدارة</p>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
                placeholder="كلمة المرور"
                className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg mb-4 focus:outline-none focus:border-purple-500"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdminAccess}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
                >
                  دخول
                </button>
                <button
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setPasswordInput('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              activeTab === 'explanation'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white text-purple-900 border-2 border-purple-300 hover:bg-purple-50'
            }`}
          >
            📖 الشروحات
          </button>
          <button
            onClick={() => setActiveTab('exercise')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              activeTab === 'exercise'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white text-green-900 border-2 border-green-300 hover:bg-green-50'
            }`}
          >
            ✏️ التدريبات
          </button>
        </div>

        {/* Admin Panel */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-yellow-300">
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">🔧 لوحة الإدارة</h2>
            
            {/* Tab selector for admin */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setAdminTab('explanation')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  adminTab === 'explanation'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                إضافة شرح
              </button>
              <button
                onClick={() => setAdminTab('exercise')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  adminTab === 'exercise'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                إضافة تدريب
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={newLessonName}
                onChange={(e) => setNewLessonName(e.target.value)}
                placeholder="اسم الدرس"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAddLesson}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-bold"
              >
                <Plus size={20} />
                إضافة درس
              </button>
            </div>
          </div>
        )}

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600">لا توجد دروس في هذا القسم حالياً</p>
            </div>
          ) : (
            filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition border-2 border-purple-200"
              >
                <h3 className="text-xl font-bold text-purple-900 mb-2">{lesson.name}</h3>
                <p className="text-sm text-gray-600 mb-2">📄 {lesson.fileName}</p>
                <p className="text-xs text-gray-500 mb-4">📅 {lesson.uploadedAt}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePreviewFile(lesson)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    <Eye size={18} />
                    عرض
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                      حذف
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
