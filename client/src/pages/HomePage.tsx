import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpTrayIcon, DocumentTextIcon, CodeBracketIcon, ClockIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const HomePage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    const validTypes = [
      '.js', '.jsx', '.ts', '.tsx', 
      '.py', '.java', '.c', '.cpp',
      '.go', '.rb', '.php', '.cs',
      '.html', '.css', '.scss', '.json'
    ];
    
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!fileExt || !validTypes.includes(`.${fileExt}`)) {
      toast.error('Unsupported file type. Please upload a code file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5001/api/review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(`/review/${response.data.id}`);
      toast.success('Code review completed!');
    } catch (error: any) {
      console.error('Error uploading file:', error);
      
      // Show more specific error message
      const errorMessage = error.response?.data?.error || error.response?.data?.details || 'Failed to process code review. Please try again.';
      
      if (errorMessage.includes('OpenAI API key')) {
        toast.error('OpenAI API key not configured. Check the server console for setup instructions.', { duration: 6000 });
      } else {
        toast.error(errorMessage, { duration: 5000 });
      }
    } finally {
      setIsLoading(false);
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AI-Powered Code Review
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get instant, intelligent feedback on your code quality, best practices, and potential issues
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-105 shadow-xl'
            : 'border-gray-300 hover:border-indigo-400 dark:border-gray-600 dark:hover:border-indigo-500 hover:shadow-lg'
        } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="space-y-6">
          <div className={`mx-auto h-20 w-20 transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
            <ArrowUpTrayIcon className={`mx-auto h-16 w-16 ${isDragging ? 'text-indigo-600 dark:text-indigo-400' : 'text-indigo-500'}`} />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {isDragging ? '📂 Drop your file here' : '📁 Drag and drop your code file'}
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400">
              or <span className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">click to browse</span>
            </p>
            <div className="pt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Supported Languages:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {['JavaScript', 'TypeScript', 'Python', 'Java', 'C/C++', 'Go', 'Ruby', 'PHP', 'C#', 'HTML/CSS'].map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
          accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.go,.rb,.php,.cs,.html,.css,.scss,.json"
          disabled={isLoading}
        />
      </div>

      {isLoading && (
        <div className="mt-8 text-center animate-fade-in">
          <div className="inline-flex items-center space-x-2">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Analyzing your code...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">This may take a few moments</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:scale-105">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 mr-4">
              <DocumentTextIcon className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Comprehensive Analysis</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Get detailed feedback on code quality, best practices, and potential bugs with actionable suggestions.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:scale-105">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 mr-4">
              <CodeBracketIcon className="h-7 w-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Multiple Languages</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Supports JavaScript, TypeScript, Python, Java, C++, Go, Ruby, PHP, and many more languages.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:scale-105">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 mr-4">
              <ClockIcon className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Review History</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Access your past code reviews anytime and track improvements over time with full history.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
