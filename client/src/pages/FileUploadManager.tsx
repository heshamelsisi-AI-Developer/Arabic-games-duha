import { useState, useEffect } from 'react';
import { Upload, X, Download, Trash2, ArrowLeft } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  data: string; // Base64 encoded file data
}

interface FileUploadManagerProps {
  onBack: () => void;
}

/**
 * File Upload Manager Component
 * Design: Playful & Vibrant
 * - Upload Word/PDF files for presentations
 * - Simple card display with download/delete options
 * - Persistent storage in localStorage
 */

export default function FileUploadManager({ onBack }: FileUploadManagerProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Load files from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('uploadedFiles');
    if (saved) {
      setFiles(JSON.parse(saved));
    }
  }, []);

  // Save files to localStorage
  const saveFiles = (newFiles: UploadedFile[]) => {
    setFiles(newFiles);
    localStorage.setItem('uploadedFiles', JSON.stringify(newFiles));
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.currentTarget.files;
    if (selectedFiles) {
      Array.from(selectedFiles).forEach(file => {
        processFile(file);
      });
    }
  };

  // Process file and convert to base64
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toLocaleDateString('ar-SA'),
        data: base64,
      };
      saveFiles([...files, newFile]);
    };
    reader.readAsDataURL(file);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    Array.from(droppedFiles).forEach(file => {
      processFile(file);
    });
  };

  // Download file
  const downloadFile = (file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    link.click();
  };

  // Delete file
  const deleteFile = (id: string) => {
    saveFiles(files.filter(f => f.id !== id));
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  // Get file icon
  const getFileIcon = (type: string) => {
    if (type.includes('word') || type.includes('document')) return '📄';
    if (type.includes('pdf')) return '📕';
    if (type.includes('image')) return '🖼️';
    return '📎';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] flex flex-col">
      {/* Header */}
      <header className="bg-white/40 backdrop-blur-md border-b border-[#E8D4E8] py-4 sticky top-0 z-10">
        <div className="container flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#2D1B3D] hover:text-[#FF6B5B] transition-colors font-bold font-poppins"
          >
            <ArrowLeft size={20} />
            الرجوع
          </button>
          <h1 className="text-2xl font-bold text-[#2D1B3D]">📁 إدارة الملفات</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-4 border-dashed rounded-3xl p-12 text-center mb-8 transition-all duration-300
            ${
              isDragging
                ? 'border-[#4ECDC4] bg-[#4ECDC4]/10'
                : 'border-[#E8D4E8] bg-white/40'
            }
          `}
        >
          <div className="mb-4">
            <Upload size={48} className="mx-auto text-[#4ECDC4]" />
          </div>
          <h2 className="text-2xl font-bold text-[#2D1B3D] mb-2">
            رفع الملفات
          </h2>
          <p className="text-[#7A6B8F] font-poppins mb-6">
            اسحب الملفات هنا أو اضغط للاختيار
          </p>
          <label className="inline-block">
            <input
              type="file"
              multiple
              accept=".doc,.docx,.pdf,.ppt,.pptx"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button className="px-8 py-3 bg-[#4ECDC4] text-white rounded-full font-bold font-poppins hover:shadow-lg transition-all duration-200 cursor-pointer">
              ✓ اختر الملفات
            </button>
          </label>
          <p className="text-sm text-[#7A6B8F] font-poppins mt-4">
            الملفات المدعومة: Word, PDF, PowerPoint
          </p>
        </div>

        {/* Files Grid */}
        {files.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md border-2 border-[#E8D4E8]">
            <p className="text-[#7A6B8F] font-poppins text-lg">
              لم تقم برفع أي ملفات حتى الآن
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map(file => (
              <div
                key={file.id}
                className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#E8D4E8] hover:shadow-lg transition-all duration-300"
              >
                {/* File Icon and Name */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{getFileIcon(file.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#2D1B3D] break-words text-sm">
                      {file.name}
                    </h3>
                    <p className="text-xs text-[#7A6B8F] font-poppins mt-1">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                {/* Upload Date */}
                <p className="text-xs text-[#7A6B8F] font-poppins mb-4">
                  تم الرفع: {file.uploadDate}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadFile(file)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#4ECDC4]/20 text-[#4ECDC4] rounded-lg font-bold font-poppins hover:bg-[#4ECDC4]/30 transition-all duration-200 text-sm"
                  >
                    <Download size={16} />
                    تحميل
                  </button>
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#FF6B5B]/20 text-[#FF6B5B] rounded-lg font-bold font-poppins hover:bg-[#FF6B5B]/30 transition-all duration-200 text-sm"
                  >
                    <Trash2 size={16} />
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-sm border-t border-[#E8D4E8] py-4 mt-auto">
        <div className="container text-center">
          <p className="text-[#7A6B8F] font-poppins text-sm">
            إجمالي الملفات: {files.length}
          </p>
        </div>
      </footer>
    </div>
  );
}
