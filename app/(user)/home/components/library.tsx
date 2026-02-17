'use client'

import React from 'react'
import { fetchAllReads } from '@/services/home/comic.service';
import ComicSection from './comic-section';

const fetcher = () => fetchAllReads();

const LibraryRead = () => {
    return (
        <ComicSection 
            title="Library"
            fetcher={fetcher}
            swrKey={['all-reads']}
            showAddCard={false}
            loop={true}
        />
    )
}

export default LibraryRead