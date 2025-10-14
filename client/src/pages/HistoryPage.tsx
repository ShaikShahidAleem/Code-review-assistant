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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Review History</h1>
        <p className="text-gray-600 dark:text-gray-300">
          View your past code reviews and analysis
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No reviews yet</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Upload a code file to get started with your first code review.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Code
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {reviews.map((review) => (
              <li key={review.id}>
                <Link
                  to={`/review/${review.id}`}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <div className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {getFileIcon(review.filetype)}
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                            {review.filename}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {review.filetype.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <ClockIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          <span>{formatDate(review.created_at)}</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-gray-400"
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
      )}
    </div>
  );
};

export default HistoryPage;
