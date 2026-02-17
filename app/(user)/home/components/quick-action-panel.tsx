'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Command } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import AddNewModal from '@/components/ui/add-new-modal';

const QuickActionPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // Show keyboard shortcut hint
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open add modal
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hide hint after 5 seconds or on interaction
  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, [showHint]);

  return (
    <>
      {/* Keyboard Shortcut Hint */}
      {showHint && (
        <div className='fixed bottom-24 right-6 bg-card border rounded-lg p-3 shadow-lg animate-in fade-in slide-in-from-bottom-2 z-40'>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-muted-foreground'>Press</span>
            <kbd className='px-2 py-1 bg-muted rounded text-xs font-semibold flex items-center gap-1'>
              <Command className='size-3' />
              <span>K</span>
            </kbd>
            <span className='text-muted-foreground'>to add</span>
            <button 
              onClick={() => setShowHint(false)}
              className='ml-2 text-muted-foreground hover:text-foreground'
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className='fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl transition-shadow'
            title="Add new comic (Cmd + K)"
          >
            <Plus className='size-5' />
            <span className='hidden sm:inline ml-2'>Add Comic</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className='sr-only'>Add a new comic</DialogTitle>
          <AddNewModal comicData={null} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickActionPanel;
