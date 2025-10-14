import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, DocumentTextIcon, CodeBracketIcon, ClockIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ReviewData {
  id: number;
  filename: string;
  filetype: string;
  original_code: string;
  review_report: string;
  created_at: string;
}

const ReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<ReviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'code' | 'review'>('review');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/reviews/${id}`);
        setReview(response.data);
      } catch (error) {
        console.error('Error fetching review:', error);
        toast.error('Failed to load code review');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 animate-fade-in">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mb-4"></div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading review...</p>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="mb-6">
          <DocumentTextIcon className="mx-auto h-20 w-20 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Review not found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          The requested code review could not be found. It may have been deleted or the link is incorrect.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CodeBracketIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white truncate">
                  {review.filename}
                </h1>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-4 w-4 mr-1.5" />
                <span>Reviewed {formatDate(review.created_at)}</span>
                <span className="mx-2">•</span>
                <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-md text-xs font-medium uppercase">
                  {review.filetype}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('review')}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'review'
                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <DocumentTextIcon className="h-4 w-4 inline-block mr-1.5" />
                Review
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <CodeBracketIcon className="h-4 w-4 inline-block mr-1.5" />
                Code
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        {activeTab === 'code' ? (
          <div className="overflow-auto max-h-[75vh]">
            <SyntaxHighlighter
              language={review.filetype}
              style={vscDarkPlus}
              showLineNumbers
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                fontSize: '0.875rem',
                lineHeight: '1.7',
                borderRadius: '0',
              }}
            >
              {review.original_code}
            </SyntaxHighlighter>
          </div>
        ) : (
          <div className="p-8 prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-pre:bg-gray-900">
            <ReactMarkdown
                components={{
                    code({ node, className, children, ...props }: { node?: any; className?: string; children?: React.ReactNode }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !className || !match;
                    
                    if (isInline) {
                        return <code className={className} {...props}>{children}</code>;
                    }
                    
                    return (
                        <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className={className}
                        customStyle={{
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                        }}
                        {...props}
                        >
                        {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    );
                    }
                }}
                >
                {review.review_report}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
