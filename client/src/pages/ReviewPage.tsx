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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Review not found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The requested code review could not be found.</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
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
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {review.filename}
            </h1>
            <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
              <ClockIcon className="h-4 w-4 mr-1" />
              Reviewed {formatDate(review.created_at)}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'code'
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <CodeBracketIcon className="h-4 w-4 inline-block mr-1" />
              Code
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'review'
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <DocumentTextIcon className="h-4 w-4 inline-block mr-1" />
              Review
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {activeTab === 'code' ? (
          <div className="overflow-auto max-h-[70vh]">
            <SyntaxHighlighter
              language={review.filetype}
              style={vscDarkPlus}
              showLineNumbers
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
              }}
            >
              {review.original_code}
            </SyntaxHighlighter>
          </div>
        ) : (
          <div className="p-6 prose dark:prose-invert max-w-none">
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
