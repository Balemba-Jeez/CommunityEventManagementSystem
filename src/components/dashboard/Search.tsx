import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, Trash2 } from 'lucide-react';

interface SearchComponentProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ 
  placeholder = "What are you looking for?", 
  onSearch, 
  className = "" 
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'windows 11 file explorer',
    'Community event website',
    'Mobile app design',
    'Logo inspiration'
  ]);
  
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (query: string): void => {
    if (!query.trim()) return;
    
    // Add to recent searches if it's new
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
    
    setSearchQuery(query);
    setShowSuggestions(false);
    
    // Call parent's search function if provided
    if (onSearch) {
      onSearch(query);
    }
    
    console.log('Searching for:', query);
  };

  const handleSearchSelect = (search: string): void => {
    setSearchQuery(search);
    setShowSuggestions(false);
    
    // Perform search with selected suggestion
    if (onSearch) {
      onSearch(search);
    }
    
    console.log('Selected search:', search);
  };

  const deleteSuggestion = (index: number): void => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updatedSearches);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Search Input Container */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 text-base bg-white shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-md"
        />
        
        {/* Search Button */}
        <button 
          onClick={() => handleSearch(searchQuery.trim())}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#2C3E94] hover:bg-[#243080] text-white transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && recentSearches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="py-2">
            {recentSearches
              .filter(search => 
                searchQuery === '' || 
                search.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((search: string, index: number) => (
                <div 
                  key={index}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  onClick={() => handleSearchSelect(search)}
                >
                  <div className="flex items-center flex-1">
                    <Clock className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{search}</span>
                  </div>
                  
                  <button 
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      deleteSuggestion(index);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-150 ml-2 flex-shrink-0"
                    aria-label="Delete suggestion"
                  >
                    <Trash2 className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              ))}
            
            {/* No results message */}
            {searchQuery && recentSearches.filter(search => 
              search.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No recent searches found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage component
// const App: React.FC = () => {
//   const handleSearch = (query: string): void => {
//     // Handle your search logic here
//     console.log('Parent received search:', query);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           Dribbble-Style Search Component (TypeScript)
//         </h1>
        
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <SearchComponent 
//             placeholder="What are you looking for?"
//             onSearch={handleSearch}
//             className="max-w-2xl mx-auto"
//           />
//         </div>
        
//         <div className="mt-8 text-center text-gray-600">
//           <p>Try searching or click on recent suggestions</p>
//         </div>
//       </div>
//     </div>
//   );
// };

export default SearchComponent;