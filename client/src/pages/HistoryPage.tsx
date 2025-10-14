import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, DocumentTextIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ReviewItem {
  id: number;
  filename: string;
  filetype: string;
  created_at: string;
}

const HistoryPage = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to load review history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFileIcon = (filetype: string) => {
    switch (filetype.toLowerCase()) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
      case 'py':
      case 'java':
      case 'c':
      case 'cpp':
      case 'go':
      case 'rb':
      case 'php':
      case 'cs':
        return <CodeBracketIcon className="h-5 w-5 text-indigo-500" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 animate-fade-in">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mb-4"></div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Review History
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          View and manage your past code reviews and analysis
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center border border-gray-100 dark:border-gray-700">
          <div className="mb-6">
            <DocumentTextIcon className="mx-auto h-20 w-20 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No reviews yet</h3>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Upload a code file to get started with your first AI-powered code review.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Upload Code
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} found
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {reviews.map((review) => (
                <li key={review.id}>
                  <Link
                    to={`/review/${review.id}`}
                    className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group"
                  >
                    <div className="px-6 py-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                          {getFileIcon(review.filetype)}
                        </div>
                        <div className="ml-4 flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400 truncate group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                              {review.filename}
                            </p>
                            <span className="ml-3 px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium uppercase">
                              {review.filetype}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <ClockIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
                            <span>{formatDate(review.created_at)}</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
