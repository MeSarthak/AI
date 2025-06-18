
import React, { useState, useRef } from 'react';
import { Upload, Video, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoUploadProps {
  onVideoUpload: (file: File) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    if (file.type.startsWith('video/')) {
      setUploadedFile(file);
      onVideoUpload(file);
    } else {
      alert('Please upload a valid video file (MP4, AVI, MOV)');
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleChange}
        className="hidden"
      />
      
      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer hover-scale ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-300 bg-white/50 hover:border-slate-400 hover:bg-white/70'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-4 rounded-full transition-colors ${
              dragActive ? 'bg-blue-100' : 'bg-slate-100'
            }`}>
              <Upload className={`w-8 h-8 ${
                dragActive ? 'text-blue-600' : 'text-slate-600'
              }`} />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                Upload Video File
              </h3>
              <p className="text-slate-600">
                Drag and drop your video here, or click to browse
              </p>
            </div>
            
            <Button variant="outline" className="mt-4">
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-6 animate-scale-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">{uploadedFile.name}</h4>
                <p className="text-sm text-slate-600">
                  {formatFileSize(uploadedFile.size)} • Ready for processing
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-slate-600 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
