import React, { useRef, useState } from 'react'

import { Upload } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Source } from './sources-section'

interface SourceCardProps {
  source: Source
  isNew?: boolean
  onSave?: (data: Omit<Source, 'id'> & { id?: string }) => void
  onCancel?: () => void
}

const SourceCard = ({
  source,
  isNew = false,
  onSave,
  onCancel,
}: SourceCardProps) => {
  // If it's a new card, force it into edit mode immediately
  const [isEdit, setIsEdit] = useState(isNew)

  const [name, setName] = useState(source.name)
  const [url, setUrl] = useState(source.url)
  const [icon, setIcon] = useState(source.icon || '')

  // Validation state
  const [error, setError] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setIcon(URL.createObjectURL(file))
  }

  const handleSave = () => {
    // 1. Validation: Ensure fields aren't empty
    if (!name.trim() || !url.trim()) {
      setError('Name and URL are required')
      return
    }

    setError('')
    setIsEdit(false)

    // 2. Pass data back up to parent
    if (onSave) {
      onSave({ id: source.id, name, url, icon })
    }
  }

  const handleCancel = () => {
    setError('')
    if (isNew && onCancel) {
      // If it's a new card, cancel should remove the card entirely
      onCancel()
    } else {
      // Otherwise, just revert the local edits
      setIsEdit(false)
      setName(source.name)
      setUrl(source.url)
      setIcon(source.icon || '')
    }
  }

  return (
    <div
      className={`bg-muted/50 flex w-full flex-col gap-2 rounded-lg p-4 transition-colors ${isEdit ? 'bg-muted/90' : ''}`}
    >
      {error && (
        <span className="text-xs font-medium text-red-500">{error}</span>
      )}

      <div className="flex flex-row items-center justify-between gap-4">
        <Avatar className="group relative h-18 w-18 rounded-md">
          <AvatarImage src={icon} />
          <AvatarFallback className="rounded-md">UN</AvatarFallback>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />

          {isEdit && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
              <Button
                className="px-2 py-1 text-xs"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="size-3.5" />
              </Button>
            </div>
          )}
        </Avatar>

        <div className="flex w-full flex-col gap-2">
          <h1 className="text-sm font-medium">Source Name</h1>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEdit}
            placeholder="e.g. MangaDex"
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <h1 className="text-sm font-medium">Source Link</h1>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={!isEdit}
            placeholder="https://..."
          />
        </div>

        <div className="flex flex-col justify-end gap-2">
          <div className="mt-6 flex flex-row gap-2">
            {isEdit ? (
              <>
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEdit(true)}>Edit</Button>
                <Button variant="outline">Delete</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SourceCard
