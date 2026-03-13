import React, { useEffect, useState, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CalendarIcon,
    SparklesIcon,
    CheckIcon,
    VideoIcon,
    SendIcon,
    MessageCircleIcon,
    ChevronLeftIcon,
    ClockIcon,
} from 'lucide-react'
import { MOCK_DATA } from './data'
import { Avatar, Button, FadeIn, StepIndicator, Chip } from './shared'
interface ViewProps {
    onNext: () => void
    selectedSlots?: string[]
    setSelectedSlots?: React.Dispatch<React.SetStateAction<string[]>>
}
const View1Match = ({ onNext }: ViewProps) => {
    return (
        <FadeIn className="flex flex-col items-center text-center h-full justify-center py-4">
            <div className="relative mb-6">
                <Avatar
                    src={MOCK_DATA.mentor.avatar}
                    alt={MOCK_DATA.mentor.name}
                    size="xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-success text-white p-1.5 rounded-full border-2 border-white">
                    <CheckIcon className="w-4 h-4" />
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-8">
                {MOCK_DATA.mentor.name} accepted your request
            </h2>

            <div className="w-full bg-brand-50 rounded-2xl p-6 mb-8 text-left border border-brand-light">
                <div className="flex items-center gap-2 mb-4 text-brand-dark font-semibold">
                    <SparklesIcon className="w-5 h-5" />
                    <h3>Why you're a great match</h3>
                </div>
                <ul className="space-y-3">
                    {MOCK_DATA.aiBrief.slice(0, 3).map((point, idx) => (
                        <motion.li
                            key={idx}
                            initial={{
                                opacity: 0,
                                x: -10,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: 0.3 + idx * 0.1,
                            }}
                            className="flex items-start gap-3 text-sm text-text-body"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 flex-shrink-0" />
                            <span>{point}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>

            <div className="sticky bottom-0 mt-auto w-full bg-white pt-4 pb-2">
                <Button
                    className="w-full py-3.5 text-lg"
                    icon={CalendarIcon}
                    onClick={onNext}
                >
                    Add my availability
                </Button>
                <p className="text-sm text-text-muted mt-4">
                    You propose times, Victor confirms what works.
                </p>
            </div>
        </FadeIn>
    )
}
const View2Availability = ({
    onNext,
    selectedSlots = [],
    setSelectedSlots,
}: ViewProps) => {
    const [selectedDate, setSelectedDate] = useState(MOCK_DATA.dates[0].id)
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
        if (!setSelectedSlots) return
        const slotId = `${selectedDate}-${timeId}`
        if (selectedSlots.includes(slotId)) {
            setSelectedSlots(selectedSlots.filter((id) => id !== slotId))
        } else {
            setSelectedSlots([...selectedSlots, slotId])
        }
    }
    const isValid = selectedSlots.length >= 3
    return (
        <FadeIn className="flex flex-col h-full">
            {/* Sticky Header + Dates */}
            <div className="sticky top-0 z-10 bg-white pb-4">
                <h2 className="text-2xl font-bold mb-2 text-center">
                    When are you free?
                </h2>
                <p className="text-text-muted text-center mb-6">
                    Select at least 3 options for Victor
                </p>

                {/* Mini Calendar Row */}
                <div className="overflow-x-auto py-3 scrollbar-hide -mx-2 px-2">
                    <div className="flex gap-2 w-max px-2">
                    {MOCK_DATA.dates.map((date) => {
                        const isWeekend = date.label === 'Sat' || date.label === 'Sun'
                        return (
                            <button
                                key={date.id}
                                onClick={() => handleDateSelect(date.id)}
                                className={`flex flex-col items-center p-3 rounded-xl min-w-[3.5rem] transition-all ${selectedDate === date.id ? 'bg-brand-50 text-brand-dark border border-brand shadow-sm scale-105' : isWeekend ? 'bg-surface-alt/80 text-text-body border border-transparent hover:bg-border' : 'bg-surface-alt text-text-body border border-transparent hover:bg-border'}`}
                            >
                                <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                                    {date.label}
                                </span>
                                <span className="text-xl font-bold mt-1">{date.date}</span>
                                {isWeekend && selectedDate !== date.id && (
                                    <div className="w-1 h-1 rounded-full bg-text-muted/30 mt-1" />
                                )}
                            </button>
                        )
                    })}
                    </div>
                </div>
            </div>

            {/* Time Slots - Two Columns */}
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
                        className="grid grid-cols-2 gap-x-3 gap-y-1.5"
                    >
                        {MOCK_DATA.timesLeft.map((timeL, idx) => {
                            const timeR = MOCK_DATA.timesRight[idx]
                            const slotIdL = `${selectedDate}-${timeL.id}`
                            const slotIdR = `${selectedDate}-${timeR.id}`
                            const isSelectedL = selectedSlots.includes(slotIdL)
                            const isSelectedR = selectedSlots.includes(slotIdR)
                            const showSeparator = idx === 2 || idx === 5
                            return (
                                <Fragment key={idx}>
                                    {showSeparator && (
                                        <div className="col-span-2 border-t border-border/50 my-1" />
                                    )}
                                    <button
                                        onClick={() => toggleSlot(timeL.id)}
                                        className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${isSelectedL ? 'bg-brand-50 text-brand-dark border-brand' : 'bg-white text-text-body border-border hover:border-brand hover:text-brand'}`}
                                    >
                                        {timeL.label}
                                    </button>
                                    <button
                                        onClick={() => toggleSlot(timeR.id)}
                                        className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${isSelectedR ? 'bg-brand-50 text-brand-dark border-brand' : 'bg-white text-text-body border-border hover:border-brand hover:text-brand'}`}
                                    >
                                        {timeR.label}
                                    </button>
                                </Fragment>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Summary & Action */}
            <div className="sticky bottom-0 pt-4 border-t border-border bg-white z-10">
                <div className="flex flex-col items-center mb-4 min-h-[1.5rem]">
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
                <Button className="w-full py-3.5" disabled={!isValid} onClick={onNext}>
                    Send availability to Victor
                </Button>
            </div>
        </FadeIn>
    )
}
const View3Approval = ({ onNext, selectedSlots = [] }: ViewProps) => {
    const [selected, setSelected] = useState<string | null>(null)

    // Parse selected slots into display format
    const proposedSlots = selectedSlots.map((slotId) => {
        const [dateId, timeId] = slotId.split('-')
        const dateObj = MOCK_DATA.dates.find((d) => d.id === dateId)
        const timeObj =
            MOCK_DATA.timesLeft.find((t) => t.id === timeId) ||
            MOCK_DATA.timesRight.find((t) => t.id === timeId)

        return {
            id: slotId,
            date: dateObj ? dateObj.full : 'Unknown Date',
            time: timeObj ? timeObj.label : 'Unknown Time',
            duration: '30 min',
        }
    })
    return (
        <FadeIn className="flex flex-col h-full py-4">
            <div className="flex items-center gap-3 mb-6 p-3 bg-brand-50 rounded-xl">
                <Avatar
                    src={MOCK_DATA.mentee.avatar}
                    alt={MOCK_DATA.mentee.name}
                    size="sm"
                />
                <p className="text-sm font-medium text-brand-dark">
                    <span className="font-bold">{MOCK_DATA.mentee.name}</span> proposed
                    times for your call
                </p>
            </div>

            <h2 className="text-2xl font-bold mb-6">Select a time to confirm</h2>

            <div className="mb-6">
                <a
                    href="#"
                    className="text-sm text-brand hover:text-brand-dark flex items-center gap-1.5 transition-colors"
                    onClick={(e) => e.preventDefault()}
                >
                    <CalendarIcon className="w-4 h-4" />
                    View in your calendar for conflicts
                </a>
            </div>

            <div className="space-y-3 mb-8 flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-hide">
                {proposedSlots.map((slot) => (
                    <button
                        key={slot.id}
                        onClick={() => setSelected(slot.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${selected === slot.id ? 'border-brand bg-brand-50 shadow-md' : 'border-border bg-white hover:border-brand-light'}`}
                    >
                        <div>
                            <p className="font-bold text-text-main">{slot.date}</p>
                            <p className="text-text-muted text-sm mt-0.5">{slot.time}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-medium bg-surface-alt px-2 py-1 rounded-md text-text-muted">
                                {slot.duration}
                            </span>
                            <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === slot.id ? 'border-brand bg-brand text-white' : 'border-border'}`}
                            >
                                {selected === slot.id && <CheckIcon className="w-4 h-4" />}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="sticky bottom-[-32px] -mx-8 px-8 pb-8 pt-4 mt-auto border-t border-border bg-white z-10">
                <AnimatePresence>
                    {selected && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0,
                            }}
                            animate={{
                                opacity: 1,
                                height: 'auto',
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                            }}
                        >
                            <Button className="w-full py-3.5" onClick={onNext}>
                                Confirm this time
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!selected && (
                    <button className="text-sm text-text-muted hover:text-brand transition-colors text-center w-full py-2">
                        None of these work? Propose new times
                    </button>
                )}
            </div>
        </FadeIn>
    )
}
const View4Locked = () => {
    const [messages, setMessages] = useState<
        {
            text: string
            sender: 'me' | 'them'
        }[]
    >([])
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState(MOCK_DATA.initialSuggestions)
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        // Show toast on mount after a tiny delay
        const timer = setTimeout(() => setShowToast(true), 100)
        // Hide after 3 seconds
        const hideTimer = setTimeout(() => setShowToast(false), 3100)
        return () => {
            clearTimeout(timer)
            clearTimeout(hideTimer)
        }
    }, [])

    const sendMessage = (text: string) => {
        if (!text.trim()) return
        const currentLen = messages.length
        setMessages((prev) => [
            ...prev,
            {
                text,
                sender: 'me',
            },
        ])
        setSuggestions([])
        setInputValue('')
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    text: MOCK_DATA.mentorReplies[Math.floor(Math.random() * 3)],
                    sender: 'them',
                },
            ])
            if (currentLen === 0) {
                setSuggestions(['Likewise!', 'Me too! 😊', 'See you then!'])
            }
        }, 1000)
    }
    const handleSend = () => {
        sendMessage(inputValue)
    }
    return (
            {/* Notification Toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{
                            y: -100,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -100,
                            opacity: 0,
                        }}
                        className="fixed top-2 left-0 right-0 z-[100] px-4 pointer-events-none"
                    >
                        <div className="bg-success text-white px-5 py-4 rounded-3xl shadow-2xl flex items-center gap-3 backdrop-blur-md bg-success/90 border border-white/20">
                            <div className="bg-white/20 p-1.5 rounded-full">
                                <CheckIcon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm leading-tight">
                                    Meeting Confirmed!
                                </span>
                                <p className="text-[10px] opacity-90 font-medium">
                                    Calendar invitations have been sent.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Header */}
            <div className="bg-white border-b border-border px-3 py-3 flex items-center gap-3 sticky top-0 z-20">
                <button className="text-text-muted hover:text-text-main transition-colors p-1">
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <Avatar src={MOCK_DATA.mentor.avatar} alt="Mentor" size="sm" />
                <h3 className="font-bold text-sm text-text-main">
                    {MOCK_DATA.mentor.name}
                </h3>
            </div>

            {/* Chat Canvas */}
            <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4 flex flex-col scrollbar-hide">
                {/* Timestamp */}
                <div className="text-center py-4">
                    <span className="text-xs text-text-muted bg-surface-alt px-3 py-1 rounded-full">
                        Today, 10:32 AM
                    </span>
                </div>

                {/* Meeting Details Card */}
                <div className="bg-white rounded-2xl border border-border shadow-sm p-4 mb-4 w-full">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="bg-orange-500/10 p-1 rounded-full">
                            <VideoIcon className="w-3.5 h-3.5 text-orange-500" />
                        </div>
                        <span className="text-xs font-semibold text-text-main">
                            Victor & Julian videocall
                        </span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-3 text-sm font-medium text-text-main">
                            <CalendarIcon className="w-4 h-4 text-brand" />
                            <span>Thursday, Jan 15 at 10:30 AM</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                            <VideoIcon className="w-4 h-4 text-brand" />
                            <span>Video call · 30 minutes</span>
                        </div>
                        <div className="pt-2.5 border-t border-border mt-0.5">
                            <a
                                href="#"
                                className="text-xs text-brand hover:text-brand-dark font-medium"
                                onClick={(e) => e.preventDefault()}
                            >
                                Add to calendar
                            </a>
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-3 flex-1 flex flex-col justify-end">
                    <AnimatePresence>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                    scale: 0.95,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.sender === 'them' && (
                                    <Avatar
                                        src={MOCK_DATA.mentor.avatar}
                                        alt="Mentor"
                                        size="sm"
                                        className="mr-2 mt-1 flex-shrink-0 w-7 h-7"
                                    />
                                )}
                                <div
                                    className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm ${msg.sender === 'me' ? 'bg-brand text-white rounded-br-sm' : 'bg-white text-text-main border border-border rounded-bl-sm shadow-sm'}`}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Input Area */}
            <div className="sticky bottom-0 z-20 pointer-events-none">
                {/* Suggestion Chips — floating above */}
                <AnimatePresence>
                    {suggestions.length > 0 && (
                        <motion.div
                            initial={{
                                height: 0,
                                opacity: 0,
                                y: 10,
                            }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                y: 10,
                            }}
                            className="overflow-hidden pointer-events-auto"
                        >
                            <div className="flex overflow-x-auto gap-2 px-4 pb-3 scrollbar-hide">
                                {suggestions.map((sug, idx) => (
                                    <button
                                        key={`${sug}-${idx}`}
                                        onClick={() => sendMessage(sug)}
                                        className="whitespace-nowrap bg-white border border-border text-brand-dark px-4 py-2 rounded-full text-xs font-medium hover:border-brand transition-all shadow-sm active:scale-95 flex-shrink-0"
                                    >
                                        {sug}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Text Input Container */}
                <div className="bg-white border-t border-border p-3 pointer-events-auto">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-surface-alt rounded-full px-4 py-2.5 text-sm outline-none border border-border focus:border-brand/40 transition-colors"
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-brand text-white p-2.5 rounded-full hover:bg-brand-dark transition-colors flex-shrink-0"
                        >
                            <SendIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const Variant1CardFlow = ({
    currentView,
    setView,
}: {
    currentView: number
    setView: (v: number) => void
}) => {
    const [selectedSlots, setSelectedSlots] = useState<string[]>([])

    return (
        <div className="min-h-[95vh] flex items-center justify-center p-4 bg-surface">
            <div
                className={`w-full max-w-[400px] min-h-[92vh] max-h-[92vh] bg-white rounded-[2.5rem] shadow-warm-lg border-[6px] border-gray-200 relative overflow-hidden flex flex-col ${currentView === 3 ? 'p-0' : 'p-8'}`}
            >
                {/* Only show StepIndicator for Mentee views (0 and 1) */}
                {(currentView === 0 || currentView === 1) && (
                    <StepIndicator current={currentView} total={2} />
                )}
 
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {currentView === 0 && (
                            <div className="p-8 h-full overflow-y-auto scrollbar-hide">
                                <View1Match key="v1" onNext={() => setView(1)} />
                            </div>
                        )}
                        {currentView === 1 && (
                            <div className="p-8 h-full overflow-y-auto scrollbar-hide overflow-x-hidden">
                                <View2Availability
                                    key="v2"
                                    onNext={() => setView(2)}
                                    selectedSlots={selectedSlots}
                                    setSelectedSlots={setSelectedSlots}
                                />
                            </div>
                        )}
                        {currentView === 2 && (
                            <div className="p-8 h-full overflow-y-auto scrollbar-hide">
                                <View3Approval
                                    key="v3"
                                    onNext={() => setView(3)}
                                    selectedSlots={selectedSlots}
                                />
                            </div>
                        )}
                        {currentView === 3 && (
                            <div className="h-full">
                                <View4Locked key="v4" />
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
