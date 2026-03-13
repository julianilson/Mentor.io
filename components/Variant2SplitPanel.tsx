import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CalendarIcon,
    SparklesIcon,
    CheckIcon,
    VideoIcon,
    SendIcon,
    ClockIcon,
    CheckCircle2Icon,
} from 'lucide-react'
import { MOCK_DATA } from './data'
import { Avatar, Button, FadeIn, Chip } from './shared'
interface ViewProps {
    onNext: () => void
}
const LeftPanel = ({ currentView }: { currentView: number }) => {
    const isMentorPOV = currentView >= 2
    const profile = isMentorPOV ? MOCK_DATA.mentee : MOCK_DATA.mentor
    return (
        <div className="w-full md:w-2/5 bg-gradient-to-br from-brand-dark to-brand p-8 text-white flex flex-col justify-between relative overflow-hidden h-full">
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
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-3xl font-bold">{profile.name}</h2>
                        {!isMentorPOV && (
                            <CheckCircle2Icon className="w-5 h-5 text-brand-light" />
                        )}
                    </div>
                    <p className="text-white/75 text-lg font-semibold">{profile.title}</p>
                    <p className="text-white/75 text-sm mt-3 leading-relaxed max-w-xs">
                        {isMentorPOV 
                            ? "Passionate about product-led growth and building scalable community platforms for the next generation."
                            : "Looking to share my experience with young entrepreneurs looking to change the world for the better."
                        }
                    </p>
                </motion.div>

                {/* Match Highlights or Meeting Details Card - Standardized Layout */}
                <div className="mt-8">
                    {currentView < 3 ? (
                        <div className="bg-brand-50 rounded-2xl p-6 border border-brand-light mb-8">
                            <div className="flex items-center gap-2 mb-4 font-semibold text-brand-dark">
                                <SparklesIcon className="w-5 h-5" />
                                <h3>{isMentorPOV ? `Why ${profile.name.split(' ')[0]} is a match` : "Why you're a great match"}</h3>
                            </div>
                            <ul className="space-y-3">
                                {MOCK_DATA.aiBrief.slice(0, 3).map((point, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3 text-sm text-text-body"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 flex-shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="bg-brand-50 rounded-2xl p-6 border border-brand-light mb-8">
                            <div className="flex items-center gap-2 mb-4 font-semibold text-brand-dark">
                                <CalendarIcon className="w-5 h-5" />
                                <h3>Meeting Details</h3>
                            </div>
                            <div className="space-y-4 text-text-body">
                                <div className="flex items-center gap-3 text-sm">
                                    <CalendarIcon className="w-5 h-5 text-brand" />
                                    <span>Thursday, Jan 15</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <ClockIcon className="w-5 h-5 text-brand" />
                                    <span>10:30 AM EST</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <VideoIcon className="w-5 h-5 text-brand" />
                                    <span>30 min Video Call</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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
                You propose times, Victor confirms what works.
            </p>
        </div>
    </FadeIn>
)
const RightPanelAvailability = ({ onNext }: ViewProps) => {
    const [selectedDate, setSelectedDate] = useState(MOCK_DATA.dates[0].id)
    const [selectedSlots, setSelectedSlots] = useState<string[]>([])
    const [direction, setDirection] = useState(0)

    const handleDateSelect = (dateId: string) => {
        const newIndex = MOCK_DATA.dates.findIndex((d) => d.id === dateId)
        const currentIndex = MOCK_DATA.dates.findIndex(
            (d) => d.id === selectedDate
        )
        setDirection(newIndex > currentIndex ? 1 : -1)
        setSelectedDate(dateId)
    }

    const toggleSlot = (timeId: string) => {
        const slotId = `${selectedDate}-${timeId}`
        if (selectedSlots.includes(slotId)) {
            setSelectedSlots(selectedSlots.filter((id) => id !== slotId))
        } else {
            setSelectedSlots([...selectedSlots, slotId])
        }
    }
    const isValid = selectedSlots.length >= 3
    return (
        <FadeIn className="max-w-md mx-auto w-full flex flex-col h-full pt-8 pb-0">
            <h2 className="text-3xl font-heading font-bold mb-2">When are you free?</h2>
            <p className="text-text-muted mb-8">
                Select at least 3 options for Victor.
            </p>

            <div className="bg-surface-alt rounded-2xl p-2 mb-6 flex gap-1 overflow-x-auto scrollbar-hide">
                {MOCK_DATA.dates.map((date) => (
                    <button
                        key={date.id}
                        onClick={() => handleDateSelect(date.id)}
                        className={`flex-1 py-3 px-4 rounded-xl text-center transition-all whitespace-nowrap ${selectedDate === date.id ? 'bg-white shadow-sm font-bold text-brand-dark' : 'text-text-muted hover:text-text-main'}`}
                    >
                        <div className="text-xs uppercase tracking-wide mb-1">
                            {date.label}
                        </div>
                        <div className="text-lg font-bold">{date.date}</div>
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 mb-0 scrollbar-hide overflow-x-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={selectedDate}
                        custom={direction}
                        variants={{
                            enter: (direction: number) => ({
                                x: direction >= 0 ? '100%' : '-100%',
                                opacity: 0,
                            }),
                            center: {
                                x: 0,
                                opacity: 1,
                            },
                            exit: (direction: number) => ({
                                x: direction >= 0 ? '-100%' : '100%',
                                opacity: 0,
                            }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                            mass: 0.8,
                        }}
                        className="grid grid-cols-2 gap-x-3 gap-y-2"
                    >
                        {MOCK_DATA.timesLeft.map((timeL, idx) => {
                            const timeR = MOCK_DATA.timesRight[idx]
                            const slotIdL = `${selectedDate}-${timeL.id}`
                            const slotIdR = `${selectedDate}-${timeR.id}`
                            const isSelectedL = selectedSlots.includes(slotIdL)
                            const isSelectedR = selectedSlots.includes(slotIdR)
                            const showSeparator = idx === 2 || idx === 5
                            
                            return (
                                <React.Fragment key={idx}>
                                    {showSeparator && (
                                        <div className="col-span-2 border-t border-border/50 my-1" />
                                    )}
                                    <button
                                        onClick={() => toggleSlot(timeL.id)}
                                        className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 ${isSelectedL ? 'bg-brand-50 text-brand-dark border-brand' : 'bg-white text-text-body border-border hover:border-brand-light'}`}
                                    >
                                        {timeL.label}
                                    </button>
                                    <button
                                        onClick={() => toggleSlot(timeR.id)}
                                        className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 ${isSelectedR ? 'bg-brand-50 text-brand-dark border-brand' : 'bg-white text-text-body border-border hover:border-brand-light'}`}
                                    >
                                        {timeR.label}
                                    </button>
                                </React.Fragment>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="border-t border-border bg-white sticky bottom-0 -mx-8 px-8 pb-1 z-20">
                <div className="flex flex-col items-center py-1">
                    {!isValid ? (
                        <span className="text-sm font-bold text-accent">
                            {selectedSlots.length} of 3 minimum selected
                        </span>
                    ) : (
                        <motion.span
                            initial={{
                                opacity: 0,
                                y: 4,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="text-xs text-text-muted text-center"
                        >
                            The more options you provide, the better.
                        </motion.span>
                    )}
                </div>
                {isValid && (
                    <div className="pt-1">
                        <Button
                            className="w-full py-4 text-lg"
                            onClick={onNext}
                        >
                            Send availability to Victor
                        </Button>
                    </div>
                )}
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
        <FadeIn className="max-w-md mx-auto w-full flex flex-col h-full pt-8 pb-0">
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
    const [messages, setMessages] = useState<{ text: string; sender: 'me' | 'them' }[]>([])
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState(MOCK_DATA.initialSuggestions)

    const handleSend = () => {
        if (!inputValue.trim()) return
        const newMsg = { text: inputValue, sender: 'me' as const }
        setMessages((prev) => [...prev, newMsg])
        setInputValue('')
        setSuggestions([])

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { text: MOCK_DATA.mentorReplies[Math.floor(Math.random() * MOCK_DATA.mentorReplies.length)], sender: 'them' as const },
            ])
        }, 1000)
    }

    const sendSuggestion = (text: string) => {
        setMessages((prev) => [...prev, { text, sender: 'me' as const }])
        setSuggestions([])
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { text: MOCK_DATA.mentorReplies[Math.floor(Math.random() * MOCK_DATA.mentorReplies.length)], sender: 'them' as const },
            ])
        }, 1000)
    }

    return (
        <FadeIn className="max-w-md mx-auto w-full flex flex-col h-full py-0">
            <div className="bg-success/10 text-success px-4 py-3 rounded-xl flex items-center gap-3 mb-6 mt-4">
                <div className="bg-success text-white p-1 rounded-full">
                    <CheckIcon className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm">Meeting locked in!</span>
            </div>

            <div className="bg-white border border-border rounded-t-2xl p-4 flex items-center gap-3">
                <Avatar src={MOCK_DATA.mentor.avatar} alt="Mentor" size="sm" hasDoubleBorder />
                <h3 className="font-bold text-sm text-text-main">{MOCK_DATA.mentor.name}</h3>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col bg-surface-alt scrollbar-hide">
                <div className="text-center py-4">
                    <span className="text-xs text-text-muted bg-white border border-border px-3 py-1 rounded-full shadow-sm">Today, 10:32 AM</span>
                </div>

                <div className="bg-white rounded-2xl border border-border shadow-sm p-5 mb-6 w-full">
                    <h4 className="text-base font-bold text-text-main mb-4">Victor & Sarah videocall</h4>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-sm font-medium text-text-muted">
                            <CalendarIcon className="w-4 h-4" />
                            <span>Thursday, Jan 15 at 10:30 AM</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium text-text-muted">
                            <VideoIcon className="w-4 h-4" />
                            <span>Video call · 30 minutes</span>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-end">
                        <button className="text-brand text-xs font-bold hover:underline">Add to calendar</button>
                    </div>
                </div>

                <div className="space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'me' ? 'bg-brand text-white rounded-tr-none' : 'bg-white text-text-main border border-border shadow-sm rounded-tl-none'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-white border border-border border-t-0 rounded-b-2xl">
                <AnimatePresence>
                    {suggestions.length > 0 && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-wrap gap-2 mb-4"
                        >
                            {suggestions.map((sug, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => sendSuggestion(sug)}
                                    className="bg-surface-alt text-text-main px-4 py-2 rounded-full text-xs font-medium hover:bg-brand-50 hover:text-brand transition-all border border-border"
                                >
                                    {sug}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-surface-alt rounded-full px-4 py-2.5 text-sm outline-none border border-border focus:border-brand/40 transition-colors"
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} className="bg-brand text-white p-2.5 rounded-full hover:bg-brand-dark transition-colors shadow-sm">
                        <SendIcon className="w-4 h-4" />
                    </button>
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
    const [isTransitioning, setIsTransitioning] = useState(false)

    const handleSendAvailability = () => {
        setIsTransitioning(true)
        setTimeout(() => {
            setView(2)
            setIsTransitioning(false)
        }, 2500)
    }

    return (
        <div className="h-[85vh] min-h-[600px] flex rounded-3xl overflow-hidden shadow-warm-lg border border-border bg-white m-4 relative">
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h2 className="text-4xl font-heading font-bold text-brand-dark mb-4">Switching to Mentor View</h2>
                            <div className="flex gap-2 justify-center">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                        className="w-3 h-3 rounded-full bg-brand"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <LeftPanel currentView={currentView} />
            <div className="w-full md:w-3/5 p-8 relative overflow-y-auto">
                <AnimatePresence mode="wait">
                    {currentView === 0 && (
                        <RightPanelMatch key="v1" onNext={() => setView(1)} />
                    )}
                    {currentView === 1 && (
                        <RightPanelAvailability key="v2" onNext={handleSendAvailability} />
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
