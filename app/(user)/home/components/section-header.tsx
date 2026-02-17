'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  href?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description, 
  icon: Icon,
  href,
  action
}) => {
  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
      <div className='flex items-start gap-3 flex-1'>
        <div className='flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
          <Icon className='size-5 text-primary' />
        </div>
        <div className='flex-1'>
          <h2 className='text-2xl font-bold tracking-tight'>
            {href ? (
              <a 
                href={href} 
                className='hover:text-primary transition-colors inline-flex items-center gap-2'
                aria-label={`View all ${title}`}
              >
                {title}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  className="size-5 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </a>
            ) : (
              title
            )}
          </h2>
          {description && (
            <p className='text-sm text-muted-foreground mt-1'>{description}</p>
          )}
        </div>
      </div>
      
      {action && (
        <Button 
          variant="outline" 
          onClick={action.onClick}
          className='flex-shrink-0'
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
