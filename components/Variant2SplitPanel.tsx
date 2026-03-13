import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CalendarIcon,
    SparklesIcon,
    CheckIcon,
    VideoIcon,
    SendIcon,
    ClockIcon,
} from 'lucide-react'
import { MOCK_DATA } from './data'
import { Avatar, Button, FadeIn, Chip } from './shared'
interface ViewProps {
    onNext: () => void
}
const LeftPanel = ({ currentView }: { currentView: number }) => {
    const isMentorPOV = currentView === 2
    const profile = isMentorPOV ? MOCK_DATA.mentee : MOCK_DATA.mentor
    return (
        <div className="w-full md:w-2/5 bg-gradient-to-br from-brand-dark to-brand p-8 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-light opacity-10 rounded-full -ml-10 -mb-10 blur-xl" />

            <div className="relative z-10">
                <div className="mb-12">
                    <h1 className="text-2xl font-heading font-bold mb-2">Mentor.io</h1>
                    <div className="h-1 w-12 bg-accent rounded-full" />
                </div>

                <motion.div
                    key={profile.name}
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="mb-8"
                >
                    <Avatar
                        src={profile.avatar}
                        alt={profile.name}
                        size="xl"
                        className="mb-6 border-4 border-white/20"
                    />
                    <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
                    <p className="text-brand-100 text-lg">{profile.title}</p>
                    {!isMentorPOV && (
                        <p className="text-brand-100/80 text-sm mt-1">
                            {MOCK_DATA.mentor.company}
                        </p>
                    )}
                </motion.div>

                {!isMentorPOV && currentView < 3 && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-2 mb-4 font-semibold text-brand-50">
                            <SparklesIcon className="w-5 h-5 text-accent" />
                            <h3>Match Highlights</h3>
                        </div>
                        <ul className="space-y-3">
                            {MOCK_DATA.aiBrief.slice(0, 3).map((point, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-3 text-sm text-brand-50/90"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {currentView === 3 && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <h3 className="font-semibold mb-4 text-brand-50">
                            Meeting Details
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <CalendarIcon className="w-5 h-5 text-accent" />
                                <span>Thursday, Jan 15</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <ClockIcon className="w-5 h-5 text-accent" />
                                <span>10:30 AM EST</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <VideoIcon className="w-5 h-5 text-accent" />
                                <span>30 min Video Call</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative z-10 mt-12 text-sm text-brand-100/60 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Secure connection
            </div>
        </div>
    )
}
const RightPanelMatch = ({ onNext }: ViewProps) => (
    <FadeIn className="max-w-md mx-auto w-full flex flex-col justify-center h-full py-12">
        <div className="bg-brand-50 text-brand-dark px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-2 w-fit mb-8">
            <CheckIcon className="w-4 h-4" /> Request Accepted
        </div>

        <h2 className="text-4xl font-heading font-bold mb-4 text-text-main leading-tight">
            Ready to connect with Victor?
        </h2>
        <p className="text-lg text-text-muted mb-12">
            Skip the back-and-forth. Propose a few times that work for you, and Victor
            will confirm with one tap.
        </p>

        <div className="space-y-4">
            <Button
                className="w-full py-4 text-lg shadow-warm"
                icon={CalendarIcon}
                onClick={onNext}
            >
                Add my availability
            </Button>
            <p className="text-center text-sm text-text-muted">
                Takes less than 30 seconds
            </p>
        </div>
    </FadeIn>
)
const RightPanelAvailability = ({ onNext }: ViewProps) => {
    const [selectedDate, setSelectedDate] = useState(MOCK_DATA.dates[0].id)
    const [selectedSlots, setSelectedSlots] = useState<string[]>([])
    const toggleSlot = (timeId: string) => {
        const slotId = `${selectedDate}-${timeId}`
        if (selectedSlots.includes(slotId)) {
            setSelectedSlots(selectedSlots.filter((id) => id !== slotId))
        } else {
            setSelectedSlots([...selectedSlots, slotId])
        }
    }
    const isValid = selectedSlots.length >= 2
    return (
        <FadeIn className="max-w-md mx-auto w-full flex flex-col h-full py-8">
            <h2 className="text-3xl font-heading font-bold mb-2">Select times</h2>
            <p className="text-text-muted mb-8">
                Choose at least 2 options to give Victor flexibility.
            </p>

            <div className="bg-surface-alt rounded-2xl p-2 mb-6 flex gap-1 overflow-x-auto scrollbar-hide">
                {MOCK_DATA.dates.map((date) => (
                    <button
                        key={date.id}
                        onClick={() => setSelectedDate(date.id)}
                        className={`flex-1 py-3 px-4 rounded-xl text-center transition-all whitespace-nowrap ${selectedDate === date.id ? 'bg-white shadow-sm font-bold text-brand-dark' : 'text-text-muted hover:text-text-main'}`}
                    >
                        <div className="text-xs uppercase tracking-wide mb-1">
                            {date.label}
                        </div>
                        <div className="text-lg">{date.date}</div>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-auto">
                {MOCK_DATA.times.map((time) => {
                    const slotId = `${selectedDate}-${time.id}`
                    const isSelected = selectedSlots.includes(slotId)
                    return (
                        <button
                            key={time.id}
                            onClick={() => toggleSlot(time.id)}
                            className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${isSelected ? 'border-brand bg-brand-50 text-brand-dark' : 'border-border bg-white text-text-body hover:border-brand-light'}`}
                        >
                            {time.label}
                        </button>
                    )
                })}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex -space-x-2">
                        {selectedSlots.slice(0, 3).map((_, i) => (
                            <div
                                key={i}
                                className="w-8 h-8 rounded-full bg-brand-100 border-2 border-white flex items-center justify-center"
                            >
                                <ClockIcon className="w-4 h-4 text-brand-dark" />
                            </div>
                        ))}
                        {selectedSlots.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-surface-alt border-2 border-white flex items-center justify-center text-xs font-bold">
                                +{selectedSlots.length - 3}
                            </div>
                        )}
                    </div>
                    <span
                        className={`text-sm font-bold ${isValid ? 'text-success' : 'text-accent'}`}
                    >
                        {selectedSlots.length} / 2 selected {isValid && '✓'}
                    </span>
                </div>
                <Button
                    className="w-full py-4 text-lg"
                    disabled={!isValid}
                    onClick={onNext}
                >
                    Send to Victor
                </Button>
            </div>
        </FadeIn>
    )
}
const RightPanelApproval = ({ onNext }: ViewProps) => {
    const [selected, setSelected] = useState<string | null>(null)
    const proposedSlots = [
        {
            id: 'p1',
            date: 'Thursday, Jan 15',
            time: '10:30 AM',
            duration: '30 min',
        },
        {
            id: 'p2',
            date: 'Thursday, Jan 15',
            time: '2:30 PM',
            duration: '30 min',
        },
        {
            id: 'p3',
            date: 'Friday, Jan 16',
            time: '9:00 AM',
            duration: '30 min',
        },
    ]
    return (
        <FadeIn className="max-w-md mx-auto w-full flex flex-col justify-center h-full py-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-hover px-4 py-2 rounded-full text-sm font-bold w-fit mb-6">
                Action Required
            </div>

            <h2 className="text-3xl font-heading font-bold mb-2">Confirm a time</h2>
            <p className="text-text-muted mb-8">
                Sarah proposed these times. Tap one to lock it in.
            </p>

            <div className="space-y-4 mb-8">
                {proposedSlots.map((slot) => (
                    <button
                        key={slot.id}
                        onClick={() => setSelected(slot.id)}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${selected === slot.id ? 'border-brand bg-brand-50 shadow-md' : 'border-border bg-white hover:border-brand-light hover:shadow-sm'}`}
                    >
                        <div>
                            <p className="font-bold text-lg text-text-main group-hover:text-brand-dark transition-colors">
                                {slot.date}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <ClockIcon className="w-4 h-4 text-text-muted" />
                                <p className="text-text-muted">
                                    {slot.time} ({slot.duration})
                                </p>
                            </div>
                        </div>
                        <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${selected === slot.id ? 'border-brand bg-brand text-white' : 'border-border group-hover:border-brand-light'}`}
                        >
                            {selected === slot.id && <CheckIcon className="w-5 h-5" />}
                        </div>
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: 20,
                        }}
                    >
                        <Button
                            className="w-full py-4 text-lg shadow-warm"
                            onClick={onNext}
                        >
                            Confirm Meeting
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </FadeIn>
    )
}
const RightPanelLocked = () => {
    const [messages, setMessages] = useState<
        {
            text: string
            sender: 'me' | 'them'
        }[]
    >([])
    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const sendSuggestion = (text: string) => {
        setMessages([
            ...messages,
            {
                text,
                sender: 'me',
            },
        ])
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    text: MOCK_DATA.mentorReplies[Math.floor(Math.random() * 3)],
                    sender: 'them',
                },
            ])
            setShowInput(true)
        }, 1000)
    }
    const handleSend = () => {
        if (!inputValue.trim()) return
        setMessages([
            ...messages,
            {
                text: inputValue,
                sender: 'me',
            },
        ])
        setInputValue('')
    }
    return (
        <FadeIn className="max-w-lg mx-auto w-full flex flex-col h-full py-8">
            <div className="bg-success/10 text-success px-4 py-3 rounded-xl flex items-center gap-3 mb-8">
                <div className="bg-success text-white p-1 rounded-full">
                    <CheckIcon className="w-4 h-4" />
                </div>
                <span className="font-bold">Meeting locked in!</span>
            </div>

            <div className="flex-1 flex flex-col bg-surface-alt rounded-3xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border bg-white flex justify-between items-center">
                    <span className="font-semibold text-text-main">Logistics Chat</span>
                    <span className="text-xs text-text-muted bg-surface px-2 py-1 rounded-md">
                        End-to-end encrypted
                    </span>
                </div>

                <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-end space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center my-auto">
                            <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <SparklesIcon className="w-6 h-6 text-brand" />
                            </div>
                            <p className="text-sm text-text-muted">
                                Break the ice with a quick message
                            </p>
                        </div>
                    )}
                    <AnimatePresence>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`px-5 py-3 rounded-2xl max-w-[80%] text-sm ${msg.sender === 'me' ? 'bg-brand text-white rounded-br-sm' : 'bg-white text-text-main border border-border rounded-bl-sm shadow-sm'}`}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="p-4 bg-white border-t border-border">
                    {!showInput ? (
                        <div className="flex flex-wrap gap-2">
                            {MOCK_DATA.initialSuggestions.map((sug, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => sendSuggestion(sug)}
                                    className="bg-surface-alt text-text-main px-4 py-2.5 rounded-full text-sm hover:bg-brand-50 hover:text-brand-dark transition-colors"
                                >
                                    {sug}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Message..."
                                className="flex-1 bg-surface-alt border-none rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-brand text-white p-3 rounded-full hover:bg-brand-dark transition-colors shadow-sm"
                            >
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}
export const Variant2SplitPanel = ({
    currentView,
    setView,
}: {
    currentView: number
    setView: (v: number) => void
}) => {
    return (
        <div className="h-[85vh] min-h-[600px] flex rounded-3xl overflow-hidden shadow-warm-lg border border-border bg-white m-4">
            <LeftPanel currentView={currentView} />
            <div className="w-full md:w-3/5 p-8 relative overflow-y-auto">
                <AnimatePresence mode="wait">
                    {currentView === 0 && (
                        <RightPanelMatch key="v1" onNext={() => setView(1)} />
                    )}
                    {currentView === 1 && (
                        <RightPanelAvailability key="v2" onNext={() => setView(2)} />
                    )}
                    {currentView === 2 && (
                        <RightPanelApproval key="v3" onNext={() => setView(3)} />
                    )}
                    {currentView === 3 && <RightPanelLocked key="v4" />}
                </AnimatePresence>
            </div>
        </div>
    )
}
