import React from 'react'
import { motion } from 'framer-motion'
export const Avatar = ({
    src,
    alt,
    size = 'md',
    className = '',
    hasDoubleBorder = false,
}: {
    src: string
    alt: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
    hasDoubleBorder?: boolean
}) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20',
    }
    
    const borderStyle = hasDoubleBorder 
        ? 'ring-2 ring-brand ring-offset-2 ring-offset-white border-none' 
        : 'border-2 border-white'

    return (
        <img
            src={src}
            alt={alt}
            className={`${sizes[size]} rounded-full object-cover shadow-sm ${borderStyle} ${className}`}
        />
    )
}
export const Button = ({
    children,
    variant = 'primary',
    className = '',
    disabled = false,
    onClick,
    icon: Icon,
}: {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    className?: string
    disabled?: boolean
    onClick?: () => void
    icon?: React.ElementType
}) => {
    const baseStyle =
        'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ease-in-out active:scale-[0.98]'
    const variants = {
        primary:
            'bg-brand text-white hover:bg-brand-dark shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none',
        secondary: 'bg-brand-50 text-brand-dark hover:bg-brand-light',
        outline:
            'border-2 border-border text-text-main hover:border-brand hover:text-brand',
        ghost: 'text-text-muted hover:text-text-main hover:bg-surface-alt',
    }
    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
            disabled={disabled}
            onClick={onClick}
        >
            {Icon && <Icon className="w-5 h-5" />}
            {children}
        </button>
    )
}
export const FadeIn = ({
    children,
    delay = 0,
    className = '',
}: {
    children: React.ReactNode
    delay?: number
    className?: string
}) => (
    <motion.div
        initial={{
            opacity: 0,
            y: 10,
        }}
        animate={{
            opacity: 1,
            y: 0,
        }}
        exit={{
            opacity: 0,
            y: -10,
        }}
        transition={{
            duration: 0.4,
            delay,
            ease: 'easeOut',
        }}
        className={className}
    >
        {children}
    </motion.div>
)
export const StepIndicator = ({
    current,
    total,
}: {
    current: number
    total: number
}) => (
    <div className="flex gap-2 justify-center mb-8">
        {Array.from({
            length: total,
        }).map((_, i) => (
            <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-brand' : i < current ? 'w-4 bg-brand-light' : 'w-4 bg-border'}`}
            />
        ))}
    </div>
)
export const Chip = ({
    children,
    selected,
    onClick,
    onRemove,
}: {
    children: React.ReactNode
    selected?: boolean
    onClick?: () => void
    onRemove?: () => void
}) => (
    <button
        onClick={onClick}
        className={`
      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
      ${selected ? 'bg-brand text-white border-brand shadow-md scale-105' : 'bg-white text-text-body border-border hover:border-brand hover:text-brand'}
      flex items-center gap-2
    `}
    >
        {children}
        {onRemove && (
            <span
                onClick={(e) => {
                    e.stopPropagation()
                    onRemove()
                }}
                className="ml-1 hover:bg-white/20 rounded-full p-0.5"
            >
                <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </span>
        )}
    </button>
)
