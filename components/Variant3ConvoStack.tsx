import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CalendarIcon,
    CheckIcon,
    SendIcon,
    SparklesIcon,
    ChevronRightIcon,
} from 'lucide-react'
import { MOCK_DATA } from './data'
import { Avatar, Button, FadeIn } from './shared'
const SystemMessage = ({
    children,
    icon: Icon,
}: {
    children: React.ReactNode
    icon?: any
}) => (
    <motion.div
        initial={{
            opacity: 0,
            scale: 0.9,
        }}
        animate={{
            opacity: 1,
            scale: 1,
        }}
        className="flex justify-center my-6"
    >
        <div className="bg-surface-alt text-text-muted text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2 border border-border/50">
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {children}
        </div>
    </motion.div>
)
const ActionCard = ({
    children,
    align = 'left',
}: {
    children: React.ReactNode
    align?: 'left' | 'right'
}) => (
    <motion.div
        initial={{
            opacity: 0,
            y: 20,
            x: align === 'left' ? -20 : 20,
        }}
        animate={{
            opacity: 1,
            y: 0,
            x: 0,
        }}
        className={`flex w-full mb-6 ${align === 'left' ? 'justify-start' : 'justify-end'}`}
    >
        <div
            className={`max-w-[85%] bg-white rounded-3xl p-5 shadow-sm border border-border ${align === 'left' ? 'rounded-bl-sm' : 'rounded-br-sm bg-brand-50 border-brand-light'}`}
        >
            {children}
        </div>
    </motion.div>
)
export const Variant3ConvoStack = ({
    currentView,
    setView,
}: {
    currentView: number
    setView: (v: number) => void
}) => {
    const [selectedSlots, setSelectedSlots] = useState<string[]>([])
    const [chatMessages, setChatMessages] = useState<
        {
            text: string
            sender: 'me' | 'them'
        }[]
    >([])
    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const sendSuggestion = (text: string) => {
        setChatMessages([
            ...chatMessages,
            {
                text,
                sender: 'me',
            },
        ])
        setTimeout(() => {
            setChatMessages((prev) => [
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
        setChatMessages([
            ...chatMessages,
            {
                text: inputValue,
                sender: 'me',
            },
        ])
        setInputValue('')
    }
    return (
        <div className="flex justify-center py-8 bg-surface min-h-[85vh]">
            {/* Phone Frame */}
            <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] shadow-warm-lg border-[8px] border-surface-alt overflow-hidden flex flex-col relative">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-md border-b border-border p-4 flex items-center gap-3 sticky top-0 z-20">
                    <Avatar
                        src={
                            currentView === 2
                                ? MOCK_DATA.mentee.avatar
                                : MOCK_DATA.mentor.avatar
                        }
                        alt="User"
                        size="sm"
                    />
                    <div>
                        <h3 className="font-bold text-sm">
                            {currentView === 2
                                ? MOCK_DATA.mentee.name
                                : MOCK_DATA.mentor.name}
                        </h3>
                        <p className="text-xs text-text-muted">
                            {currentView === 2 ? 'Mentee' : 'Mentor'}
                        </p>
                    </div>
                    {currentView === 2 && (
                        <div className="ml-auto bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            Mentor View
                        </div>
                    )}
                </div>

                {/* Scrollable Timeline */}
                <div className="flex-1 overflow-y-auto p-4 bg-surface/50 scrollbar-hide flex flex-col">
                    {/* VIEW 1 & 2: Mentee POV */}
                    {(currentView === 0 || currentView === 1) && (
                        <>
                            <SystemMessage icon={CheckIcon}>
                                Match accepted • Today 9:41 AM
                            </SystemMessage>

                            <ActionCard align="left">
                                <div className="flex items-center gap-2 mb-3 text-brand-dark font-semibold text-sm">
                                    <SparklesIcon className="w-4 h-4" /> AI Match Brief
                                </div>
                                <ul className="space-y-2 mb-4">
                                    {MOCK_DATA.aiBrief.slice(0, 2).map((pt, i) => (
                                        <li key={i} className="text-xs text-text-body flex gap-2">
                                            <span className="text-brand">•</span> {pt}
                                        </li>
                                    ))}
                                </ul>
                                {currentView === 0 ? (
                                    <Button
                                        className="w-full text-sm py-2.5"
                                        onClick={() => setView(1)}
                                    >
                                        Add Availability
                                    </Button>
                                ) : (
                                    <div className="text-sm font-medium text-brand flex items-center justify-center gap-1 bg-brand-50 py-2 rounded-xl">
                                        <CheckIcon className="w-4 h-4" /> Availability added
                                    </div>
                                )}
                            </ActionCard>

                            {currentView === 1 && (
                                <ActionCard align="right">
                                    <h4 className="font-bold text-sm mb-3">
                                        Select times for Victor
                                    </h4>
                                    <div className="space-y-2 mb-4">
                                        {MOCK_DATA.times.slice(0, 4).map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() =>
                                                    setSelectedSlots((prev) =>
                                                        prev.includes(t.id)
                                                            ? prev.filter((id) => id !== t.id)
                                                            : [...prev, t.id],
                                                    )
                                                }
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${selectedSlots.includes(t.id) ? 'bg-brand text-white border-brand' : 'bg-white border-border hover:border-brand-light'}`}
                                            >
                                                Tomorrow, {t.label}
                                            </button>
                                        ))}
                                    </div>
                                    <Button
                                        className="w-full text-sm py-2.5"
                                        disabled={selectedSlots.length < 2}
                                        onClick={() => setView(2)}
                                    >
                                        Send {selectedSlots.length} slots
                                    </Button>
                                </ActionCard>
                            )}
                        </>
                    )}

                    {/* VIEW 3: Mentor POV */}
                    {currentView === 2 && (
                        <>
                            <SystemMessage>Viewing as Mentor</SystemMessage>
                            <ActionCard align="left">
                                <p className="text-sm mb-4">
                                    <strong>Sarah</strong> proposed times to connect.
                                </p>
                                <div className="space-y-2">
                                    {['Tomorrow, 10:30 AM', 'Tomorrow, 2:30 PM'].map(
                                        (time, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setView(3)}
                                                className="w-full flex items-center justify-between bg-white border border-border p-3 rounded-xl hover:border-brand hover:shadow-sm transition-all group"
                                            >
                                                <span className="text-sm font-medium">{time}</span>
                                                <div className="w-6 h-6 rounded-full bg-surface-alt flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                                                    <ChevronRightIcon className="w-4 h-4" />
                                                </div>
                                            </button>
                                        ),
                                    )}
                                </div>
                            </ActionCard>
                        </>
                    )}

                    {/* VIEW 4: Locked / Chat */}
                    {currentView === 3 && (
                        <>
                            <SystemMessage icon={CalendarIcon}>
                                Meeting confirmed for Tomorrow, 10:30 AM
                            </SystemMessage>
                            {chatMessages.map((msg, idx) => (
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
                                    className={`flex w-full mb-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm ${msg.sender === 'me' ? 'bg-brand text-white rounded-br-sm' : 'bg-white text-text-main border border-border rounded-bl-sm'}`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            <div className="mt-auto" /> {/* Push input to bottom */}
                        </>
                    )}
                </div>

                {/* Chat Input Area (Only View 4) */}
                {currentView === 3 && (
                    <div className="bg-white border-t border-border p-3 z-20">
                        {!showInput ? (
                            <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
                                {MOCK_DATA.initialSuggestions.map((sug, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => sendSuggestion(sug)}
                                        className="whitespace-nowrap bg-brand-50 text-brand-dark border border-brand-light px-4 py-2 rounded-full text-sm font-medium"
                                    >
                                        {sug}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 bg-surface-alt rounded-full px-4 py-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="iMessage"
                                    className="flex-1 bg-transparent border-none text-sm outline-none"
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button onClick={handleSend} className="text-brand p-1">
                                    <SendIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
