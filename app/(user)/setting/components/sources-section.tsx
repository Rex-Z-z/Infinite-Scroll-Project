'use client'

import React, { useRef, useState } from 'react'

import {
  Check,
  Globe,
  Pencil,
  Plus,
  Search,
  SearchX,
  Trash2,
  Upload,
  X,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

// Ensure you have this utility or use a standard conditional class approach

const MOCK_SOURCES: Source[] = [
  {
    id: '1',
    name: 'Asura Scans',
    url: 'https://asuratoon.com/',
    icon: '/icons/asura-icon.png',
  },
  {
    id: '2',
    name: 'Flame Scans',
    url: 'https://flamecomics.com/',
    icon: '/icons/flame-icon.png',
  },
  { id: '3', name: 'Webtoon', url: 'https://www.webtoons.com/' },
  { id: '4', name: 'Reaper Scans', url: 'https://reaperscans.com/' },
  { id: '5', name: 'MangaDex', url: 'https://mangadex.org/' },
]

interface Source {
  id: string
  name: string
  url: string
  icon?: string
}

const SourcesSection = () => {
  const [sources, setSources] = useState<Source[]>(MOCK_SOURCES)
  const [searchQuery, setSearchQuery] = useState('')

  // State to track editing and errors
  const [editingId, setEditingId] = useState<string | null>(null)
  const [hasError, setHasError] = useState(false)

  // State for image upload
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredSources = sources.filter(
    (source) =>
      source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.url.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Helper to validate a source
  const validateSource = (id: string): boolean => {
    const sourceToCheck = sources.find((s) => s.id === id)
    if (!sourceToCheck) return true

    const isValid =
      sourceToCheck.name.trim().length > 0 &&
      sourceToCheck.url.trim().length > 0

    if (!isValid) {
      setHasError(true)
    } else {
      setHasError(false)
    }

    return isValid
  }

  const handleAddSource = () => {
    // If we are currently editing, validate before adding a new one
    if (editingId) {
      if (!validateSource(editingId)) {
        return // Stop if current source is invalid
      }
    }

    const newId = Date.now().toString()
    const newSource: Source = {
      id: newId,
      name: '',
      url: '',
      icon: '',
    }

    // Reset error state for the new item
    setHasError(false)
    setSources([newSource, ...sources])
    setEditingId(newId)
  }

  const handleRemoveSource = (id: string) => {
    setSources(sources.filter((s) => s.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setHasError(false)
    }
  }

  const handleUpdateSource = (
    id: string,
    field: keyof Source,
    value: string
  ) => {
    setSources(sources.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleSave = (id: string) => {
    if (validateSource(id)) {
      setEditingId(null)
    }
  }

  const handleEdit = (id: string) => {
    if (editingId && editingId !== id) {
      if (!validateSource(editingId)) return
    }

    setHasError(false)
    setEditingId(id)
  }

  const handleCancel = (id: string) => {
    setEditingId(null)
    setHasError(false)
  }

  const triggerImageUpload = (id: string) => {
    setUploadingId(id)
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && uploadingId) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleUpdateSource(uploadingId, 'icon', reader.result as string)
        setUploadingId(null)
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ''
  }

  return (
    <div id="sources" className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Comic Sources</h1>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <InputGroup className="py-[17px]">
          <InputGroupAddon>
            <Search className="text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        <Button
          variant="default"
          className="hover:cursor-pointer"
          onClick={handleAddSource}
        >
          <Plus />
          Add Source
        </Button>
      </div>

      {/* List */}
      <div
        className={cn(
          'custom-scrollbar flex max-h-[400px] min-h-[400px] flex-col gap-2 overflow-y-auto rounded-lg border p-3',
          filteredSources.length === 0 &&
            'items-center justify-center border-dashed'
        )}
      >
        {filteredSources.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
            <SearchX className="size-10" />
            <div className="item-center text-muted-foreground justify-center text-center">
              No sources found
            </div>
          </div>
        ) : (
          filteredSources.map((source) => {
            const isEditing = editingId === source.id

            return (
              <div
                key={source.id}
                className="bg-muted/50 flex flex-row items-center gap-2 rounded-lg p-3 shadow-lg"
              >
                {/* Icon */}
                <div className="group relative">
                  <Avatar className="block h-14 w-14 rounded-md">
                    <AvatarImage src={source.icon} className="object-cover" />
                    <AvatarFallback className="rounded-none bg-gray-700">
                      <Globe className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>

                  {isEditing && (
                    <div
                      className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-md bg-black/50"
                      onClick={() => triggerImageUpload(source.id)}
                    >
                      <Upload className="h-6 w-6 text-white opacity-80 hover:opacity-100" />
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="flex w-full flex-col">
                  <Label
                    className={cn(
                      'text-xs',
                      isEditing &&
                        hasError &&
                        !source.name.trim() &&
                        'text-destructive',
                      isEditing ? 'mb-1' : 'ml-2'
                    )}
                  >
                    Name
                  </Label>
                  {isEditing ? (
                    <Input
                      placeholder="Source Name"
                      value={source.name}
                      onChange={(e) =>
                        handleUpdateSource(source.id, 'name', e.target.value)
                      }
                      className={cn(
                        'bg-gray-50/50 transition-colors duration-200 dark:bg-gray-900/50',
                        hasError && !source.name.trim()
                          ? 'border-destructive focus-visible:ring-destructive/50'
                          : ''
                      )}
                    />
                  ) : (
                    <div className="text-md flex h-9 items-center truncate px-3 font-medium">
                      {source.name || 'Unnamed Source'}
                    </div>
                  )}
                </div>

                {/* URL */}
                <div className="flex w-full flex-col">
                  <Label
                    className={cn(
                      'text-xs',
                      isEditing &&
                        hasError &&
                        !source.url.trim() &&
                        'text-destructive',
                      isEditing ? 'mb-1' : 'ml-2.5'
                    )}
                  >
                    URL
                  </Label>
                  {isEditing ? (
                    <Input
                      placeholder="https://example.com"
                      value={source.url}
                      onChange={(e) =>
                        handleUpdateSource(source.id, 'url', e.target.value)
                      }
                      className={cn(
                        'bg-gray-50/50 transition-colors duration-200 dark:bg-gray-900/50',
                        hasError && !source.url.trim()
                          ? 'border-destructive focus-visible:ring-destructive/50'
                          : ''
                      )}
                    />
                  ) : (
                    <div className="text-md flex h-9 items-center truncate px-3">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 truncate hover:underline"
                      >
                        {source.url || 'No URL'}
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-2">
                  {isEditing ? (
                    <Button
                      variant="default"
                      size="icon"
                      className="hover:cursor-pointer"
                      onClick={() => handleSave(source.id)}
                      title="Save"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(source.id)}
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}

                  {isEditing ? (
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:cursor-pointer"
                      onClick={() => handleCancel(source.id)}
                      title="Cancel"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="hover:cursor-pointer"
                      onClick={() => handleRemoveSource(source.id)}
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default SourcesSection
