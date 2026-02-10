import React from 'react';
import Image from 'next/image';
import { X, Clock, Search } from 'lucide-react';
import { ReadItem } from '@/lib/types';

interface SearchPreviewProps {
  results: ReadItem[];
  history: string[];
  isSearching: boolean;
  onSelectResult: (item: ReadItem) => void;
  onSelectHistory: (query: string) => void;
  onClearHistory: () => void;
}

const SearchPreview = ({
  results,
  history,
  isSearching,
  onSelectResult,
  onSelectHistory,
  onClearHistory,
}: SearchPreviewProps) => {
    return (
            <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-50 overflow-hidden">
            
                {/* Show History when not searching (query is empty) */}
                {!isSearching && (
                    <div className="p-2">
                        <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                            <span>Recent Searches</span>
                            {history.length > 0 && (
                            <button onClick={onClearHistory} className="hover:text-red-500 transition-colors">
                                Clear All
                            </button>
                            )}
                        </div>
                        {history.length === 0 ? (
                            <div className="px-3 py-4 text-center text-sm text-gray-500">No recent searches</div>
                        ) : (
                            <ul>
                                {history.map((term, index) => (
                                    <li
                                        key={index}
                                        onClick={() => onSelectHistory(term)}
                                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md"
                                    >
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span>{term}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* Show Search Results when searching */}
                {isSearching && (
                    <div className="p-2">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                            Results
                        </div>
                        {results.length === 0 ? (
                            <div className="px-3 py-4 text-center text-sm text-gray-500">
                                No results found.
                            </div>
                        ) : (
                            <ul>
                                {results.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => onSelectResult(item)}
                                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md"
                                    >
                                        {/* Image Thumbnail */}
                                        <div className="relative w-24 h-28 shrink-0 overflow-hidden rounded">
                                            <Image 
                                            src={item.coverImage} 
                                            alt={item.title} 
                                            fill 
                                            className="object-cover" 
                                            />
                                        </div>
                                        
                                        {/* Text Info */}
                                        <div className="flex flex-col gap-A overflow-hidden">
                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                                {item.title}
                                            </span>
                                            <span className="text-xs text-gray-500 truncate">
                                                {item.altTitle}
                                            </span>
                                            <span className="text-sm font-medium text-gray-400 mt-0.5">
                                                Chapter {item.chapter}
                                            </span>
                                            <span className="text-xs text-blue-500 mt-0.5">
                                                {item.type} • {item.rating}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
    );
};

export default SearchPreview;