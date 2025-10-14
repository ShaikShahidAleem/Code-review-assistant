import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpTrayIcon, DocumentTextIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
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
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to process code review. Please try again.');
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
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          AI-Powered Code Review
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Get instant feedback on your code quality, best practices, and potential issues
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50 dark:bg-gray-800/50'
            : 'border-gray-300 hover:border-indigo-400 dark:border-gray-600 dark:hover:border-indigo-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="space-y-4">
          <div className="mx-auto h-16 w-16 text-indigo-500">
            <ArrowUpTrayIcon className="mx-auto h-12 w-12" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {isDragging ? 'Drop your file here' : 'Drag and drop your code file here'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              or <span className="text-indigo-600 dark:text-indigo-400 font-medium">click to browse</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Supports: {'.js, .ts, .py, .java, .c, .cpp, .go, .rb, .php, .cs, .html, .css, .scss, .json'}
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
          accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.go,.rb,.php,.cs,.html,.css,.scss,.json"
        />
      </div>

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Analyzing your code...</p>
        </div>
      )}

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 mr-4">
              <DocumentTextIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Comprehensive Analysis</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Get detailed feedback on code quality, best practices, and potential bugs with actionable suggestions for improvement.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 mr-4">
              <CodeBracketIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Multiple Languages</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Supports a wide range of programming languages including JavaScript, Python, Java, C++, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
