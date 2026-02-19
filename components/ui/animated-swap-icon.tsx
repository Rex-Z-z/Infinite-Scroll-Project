import * as React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnimatedSwapIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The default icon to show (when crossfade is false) */
  icon: LucideIcon
  /** The icon to switch to (when crossfade is true) */
  altIcon: LucideIcon
  /** Controls the state of the switch */
  crossfade: boolean
  /** Optional: specific transition duration class (default: duration-300) */
  transitionClass?: string
}

export function AnimatedSwapIcon({
  icon: Icon,
  altIcon: AltIcon,
  crossfade,
  className,
  transitionClass = 'duration-300',
  ...props
}: AnimatedSwapIconProps) {
  return (
    <div
      className={cn(
        'relative flex size-4 items-center justify-center',
        className
      )}
      {...props}
    >
      <Icon
        className={cn(
          'absolute size-4 transition-all ease-in-out',
          transitionClass,
          crossfade
            ? 'scale-0 rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        )}
      />
      <AltIcon
        className={cn(
          'absolute size-4 transition-all ease-in-out',
          transitionClass,
          crossfade
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 -rotate-90 opacity-0'
        )}
      />
    </div>
  )
}
