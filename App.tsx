import React, { useState } from 'react'
import { 
    LayoutIcon, 
    LayersIcon, 
    SmartphoneIcon, 
    MonitorIcon, 
    ClockIcon,
    ChevronRightIcon,
    CheckCircle2Icon
} from 'lucide-react'
import { Variant1CardFlow } from './components/Variant1CardFlow'
import { Variant2SplitPanel } from './components/Variant2SplitPanel'
import { Variant3ConvoStack } from './components/Variant3ConvoStack'
import { Avatar } from './components/shared'
import { MOCK_DATA } from './components/data'

export function App() {
    const [activeVariant, setActiveVariant] = useState(0)
    const [activeView, setActiveView] = useState(0)

    const variants = [
        {
            id: 0,
            name: 'Mobile View',
            icon: SmartphoneIcon,
            component: Variant1CardFlow,
        },
        {
            id: 1,
            name: 'Tablet & Desktop',
            icon: MonitorIcon,
            component: Variant2SplitPanel,
        },
        {
            id: 2,
            name: 'Timeline',
            icon: ClockIcon,
            component: Variant3ConvoStack,
        },
    ]

    const views = [
        { id: 0, name: 'Match' },
        { id: 1, name: 'Availability' },
        { id: 2, name: 'Approval' },
        { id: 3, name: 'Confirmed' },
    ]

    const CurrentVariantComponent = variants[activeVariant].component

    const handleVariantChange = (id: number) => {
        setActiveVariant(id)
        setActiveView(0)
    }

    return (
        <div className="flex h-screen bg-surface font-sans text-text-main overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-border flex flex-col z-50 shadow-sm">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        {/* Replaced the div placeholder with the Avatar component */}
                        <Avatar src={MOCK_DATA.mentor.avatar} alt="Mentor" size="sm" hasDoubleBorder />
                        <div>
                            <h1 className="font-heading font-bold text-lg text-brand-dark leading-none">Mentor.io</h1>
                            <p className="text-xs text-text-muted mt-1 font-medium uppercase tracking-wider">Prototype Lab</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                    {/* Devices Section */}
                    <div>
                        <h2 className="px-4 text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Devices</h2>
                        <nav className="space-y-1">
                            {variants.slice(0, 2).map((v) => {
                                const Icon = v.icon
                                const isActive = activeVariant === v.id
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => handleVariantChange(v.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                                            isActive 
                                            ? 'bg-brand-50 text-brand-dark font-semibold shadow-sm' 
                                            : 'text-text-body hover:bg-surface-alt hover:text-text-main'
                                        }`}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-brand' : 'text-text-muted group-hover:text-text-main'}`} />
                                        <span className="flex-1 text-left">{v.name}</span>
                                        {isActive && <ChevronRightIcon className="w-4 h-4 text-brand" />}
                                    </button>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Variants Section */}
                    <div>
                        <h2 className="px-4 text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Variants</h2>
                        <nav className="space-y-1">
                            {variants.slice(2).map((v) => {
                                const Icon = v.icon
                                const isActive = activeVariant === v.id
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => handleVariantChange(v.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                                            isActive 
                                            ? 'bg-brand-50 text-brand-dark font-semibold shadow-sm' 
                                            : 'text-text-body hover:bg-surface-alt hover:text-text-main'
                                        }`}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-brand' : 'text-text-muted group-hover:text-text-main'}`} />
                                        <span className="flex-1 text-left">{v.name}</span>
                                        {isActive && <ChevronRightIcon className="w-4 h-4 text-brand" />}
                                    </button>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Divider */}
                    <div className="px-4">
                        <div className="h-px bg-border w-full" />
                    </div>

                    {/* Views Section */}
                    <div>
                        <div className="mb-6">
                            <h2 className="px-4 text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Mentee Views</h2>
                            <nav className="space-y-1 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/50">
                                {views.slice(0, 2).map((v) => {
                                    const isActive = activeView === v.id
                                    return (
                                        <button
                                            key={v.id}
                                            onClick={() => setActiveView(v.id)}
                                            className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all pl-10 relative ${
                                                isActive 
                                                ? 'text-brand-dark font-semibold' 
                                                : 'text-text-muted hover:text-text-main'
                                            }`}
                                        >
                                            <div className={`absolute left-[22px] w-2.5 h-2.5 rounded-full border-2 transition-all ${
                                                isActive ? 'bg-brand border-brand scale-125' : 'bg-white border-border group-hover:border-text-muted'
                                            }`} />
                                            <span className="text-sm">{v.name}</span>
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>

                        <div>
                            <h2 className="px-4 text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Mentor Views</h2>
                            <nav className="space-y-1 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/50">
                                {views.slice(2).map((v) => {
                                    const isActive = activeView === v.id
                                    return (
                                        <button
                                            key={v.id}
                                            onClick={() => setActiveView(v.id)}
                                            className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all pl-10 relative ${
                                                isActive 
                                                ? 'text-brand-dark font-semibold' 
                                                : 'text-text-muted hover:text-text-main'
                                            }`}
                                        >
                                            <div className={`absolute left-[22px] w-2.5 h-2.5 rounded-full border-2 transition-all ${
                                                isActive ? 'bg-brand border-brand scale-125' : 'bg-white border-border group-hover:border-text-muted'
                                            }`} />
                                            <span className="text-sm">{v.name}</span>
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-border bg-surface-alt/30">
                    <p className="text-[10px] text-text-muted font-medium text-center uppercase tracking-tighter italic">
                        Built for speed with Antigravity
                    </p>
                </div>
            </aside>

            {/* Main Canvas Area */}
            <main className="flex-1 relative bg-surface overflow-auto flex items-center justify-center p-4">
                <CurrentVariantComponent
                    currentView={activeView}
                    setView={setActiveView}
                />
            </main>
        </div>
    )
}
