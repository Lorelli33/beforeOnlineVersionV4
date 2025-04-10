import React from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface PageNavigationProps {
  items: NavItem[];
}

export default function PageNavigation({ items }: PageNavigationProps) {
  return (
    <div className="bg-gray-50 border-b border-gray-100 sticky top-[88px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-6 overflow-x-auto py-4 custom-scrollbar">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-gray-600 hover:text-black whitespace-nowrap transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}