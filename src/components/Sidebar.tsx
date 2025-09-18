import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { PageKey } from "../AppBankio";
import { IconArrows, IconCard, IconChart, IconCog, IconGift, IconGrid, IconLifeRing, IconList, IconShield, IconTrend, Logo } from "./common/Icons";

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick?.();
            }}
            className={`leftnav-item ${active ? "active" : ""}`}
        >
            <span className="h-5 w-5 shrink-0">{icon}</span>
            <span className="text-[15px] font-semibold">{label}</span>
        </a>
    );
}

type SidebarProps = {
    page: PageKey;
    onNavigate: (p: PageKey) => void;
    /** mobile-only */
    mobileOpen?: boolean;
    onCloseMobile?: () => void;
};

export function Sidebar({ page, onNavigate, mobileOpen = false, onCloseMobile }: SidebarProps) {
    // ===== Swipe to close (mobile) =====
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [dragX, setDragX] = useState(0);
    const startXRef = useRef<number | null>(null);

    // ESC để đóng
    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseMobile?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [mobileOpen, onCloseMobile]);

    // Nội dung chung của sidebar
    const Content = (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 px-2 py-2 pt-[env(safe-area-inset-top)]">
                <Logo />
                <div className="font-extrabold tracking-tight">Bankio</div>
                {/* Close button chỉ hiện trên mobile drawer */}
                {onCloseMobile && (
                    <button
                        onClick={onCloseMobile}
                        className="ml-auto inline-flex lg:hidden h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                        aria-label="Close sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            <div className="mt-3 text-xs uppercase tracking-wide text-slate-500 px-2">Main Menu</div>
            <nav className="leftnav mt-2 grid gap-1 px-2 pb-2">
                <NavItem
                    icon={<IconList />}
                    label="Spending"
                    active={page === "spending"}
                    onClick={() => {
                        onNavigate("spending" as PageKey);
                        onCloseMobile?.();
                    }}
                />
                <NavItem
                    icon={<IconGrid />}
                    label="Dashboard"
                    active={page === "dashboard"}
                    onClick={() => {
                        onNavigate("dashboard");
                        onCloseMobile?.();
                    }}
                />
                <NavItem
                    icon={<IconChart />}
                    label="Analytics"
                    active={page === "analytics"}
                    onClick={() => {
                        onNavigate("analytics");
                        onCloseMobile?.();
                    }}
                />
                <NavItem icon={<IconTrend />} label="Investments" />
                <NavItem icon={<IconArrows />} label="Transfers" />
                <NavItem icon={<IconCard />} label="Card" />
                <NavItem icon={<IconGift />} label="Rewards" />
            </nav>

            <div className="mt-4 text-xs uppercase tracking-wide text-slate-500 px-2">Others</div>
            <nav className="leftnav mt-2 grid gap-1 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
                <NavItem icon={<IconShield />} label="Security" />
                <NavItem icon={<IconCog />} label="Settings" />
                <NavItem icon={<IconLifeRing />} label="Support" />
            </nav>
        </div>
    );

    // Handlers vuốt
    const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
        startXRef.current = e.touches[0].clientX;
        setDragX(0);
    };
    const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
        if (startXRef.current == null) return;
        const delta = e.touches[0].clientX - startXRef.current;
        // Vuốt sang trái để đóng
        setDragX(Math.min(0, delta));
    };
    const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
        if (dragX < -60) onCloseMobile?.();
        startXRef.current = null;
        setDragX(0);
    };

    return (
        <>
            {/* Desktop sidebar (lg+) — nằm trong grid, không overlay */}
            <aside className="box elev p-4 hidden lg:block h-full sticky top-6">{Content}</aside>

            {/* Mobile drawer (<lg) — overlay, slide-in */}
            <div className={`lg:hidden ${mobileOpen ? "visible" : "invisible"}`} aria-hidden={!mobileOpen}>
                {/* Backdrop */}
                <div
                    onClick={onCloseMobile}
                    className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
                />
                {/* Panel */}
                <aside
                    ref={panelRef}
                    className={`fixed z-50 top-0 left-0 h-full w-[82vw] max-w-[320px] box elev p-4
            transition-transform duration-300 ease-out touch-pan-y will-change-transform
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
                    style={{ transform: `translateX(calc(${mobileOpen ? "0px" : "-100%"} + ${dragX}px))` }}
                    role="dialog"
                    aria-modal="true"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {Content}
                </aside>
            </div>
        </>
    );
}
