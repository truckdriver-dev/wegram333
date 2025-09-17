import React, { useState } from 'react';
import { Image, Video, X, Upload } from 'lucide-react';

interface PostComposerProps {
  onPost: (content: string) => void;
  onCancel: () => void;
  placeholder?: string;
}

export const PostComposer: React.FC<PostComposerProps> = ({ 
  onPost, 
  onCancel,
  placeholder = "What's happening? (text only)"
}) => {
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showMediaOptions, setShowMediaOptions] = useState(false);

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
      setContent('');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    if (validFiles.length !== files.length) {
      alert('Only image and video files are allowed');
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setContent('');
    setSelectedFiles([]);
    setShowMediaOptions(false);
  };
  return (
    <div className="card mb-6">
      <h3 className="text-primary font-semibold mb-4">Create Post</h3>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full h-24 bg-transparent text-primary placeholder-gray-400 resize-none outline-none mb-4"
        style={{ fontFamily: 'var(--font-base)' }}
      />
      
      {/* Media Upload Section */}
      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative bg-gray-800 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  {file.type.startsWith('image/') ? (
                    <Image className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Video className="w-4 h-4 text-purple-400" />
                  )}
                  <span className="text-primary text-sm truncate flex-1">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                  >
                    <X className="w-3 h-3 text-red-400" />
                  </button>
                </div>
                <div className="text-xs text-secondary mt-1">
                  {(file.size / (1024 * 1024)).toFixed(1)} MB
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Options */}
      {showMediaOptions && (
        <div className="mb-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
          <div className="flex gap-3">
            <label className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
              <Image className="w-4 h-4" />
              <span className="text-sm">Photo</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <label className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors">
              <Video className="w-4 h-4" />
              <span className="text-sm">Video</span>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowMediaOptions(!showMediaOptions)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            showMediaOptions 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-primary'
          }`}
        >
          <Upload className="w-4 h-4" />
        </button>
        <button
          onClick={handlePost}
          className="btn-primary flex-1"
          disabled={!content.trim() && selectedFiles.length === 0}
        >
          Post
        </button>
        <button
          onClick={() => {
            handleReset();
            onCancel();
          }}
          className="btn-secondary px-6"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};