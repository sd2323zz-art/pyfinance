"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LESSONS, STAGES } from "@/data/lessons";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[90] lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`w-[300px] min-w-[300px] bg-bg-sec border-r border-border flex flex-col overflow-hidden
          fixed left-0 top-0 bottom-0 z-[100] transition-transform duration-300
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="pl-6 pr-5 pt-7 pb-5 border-b border-border">
          <Link href="/" onClick={onClose} className="no-underline">
            <div className="font-display text-[22px] font-black bg-gradient-to-br from-accent to-green bg-clip-text text-transparent tracking-tight">
              PyFinance
            </div>
          </Link>
          <div className="text-[11px] text-t-muted mt-1.5 tracking-[2px] uppercase">
            數金 MA 面試衝刺
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto pl-5 pr-4 py-5">
          <Link
            href="/"
            onClick={onClose}
            className={`block w-full text-left text-[13.5px] px-4 py-3 rounded-lg cursor-pointer transition-all no-underline mb-2 ${
              pathname === "/"
                ? "bg-accent/15 text-accent font-medium border-l-[3px] border-accent"
                : "text-t-secondary hover:bg-accent/15 hover:text-t-primary"
            }`}
          >
            🏠 課程總覽
          </Link>
          <Link
            href="/notes"
            onClick={onClose}
            className={`block w-full text-left text-[13.5px] px-4 py-3 rounded-lg cursor-pointer transition-all no-underline mb-4 ${
              pathname === "/notes"
                ? "bg-accent/15 text-accent font-medium border-l-[3px] border-accent"
                : "text-t-secondary hover:bg-accent/15 hover:text-t-primary"
            }`}
          >
            📝 我的筆記
          </Link>
          {STAGES.map((stage) => (
            <div key={stage.id}>
              <div className="text-[10px] font-bold text-t-muted tracking-[2px] uppercase px-4 pt-5 pb-2">
                階段 {stage.id}：{stage.title}
              </div>
              {LESSONS.filter((l) => l.stage === stage.id).map((lesson) => {
                const isActive = pathname === `/lesson/${lesson.id}`;
                return (
                  <Link
                    key={lesson.id}
                    href={`/lesson/${lesson.id}`}
                    onClick={onClose}
                    className={`block w-full text-left text-[13.5px] px-4 py-3 rounded-lg cursor-pointer transition-all leading-snug no-underline ${
                      isActive
                        ? "bg-accent/15 text-accent font-medium border-l-[3px] border-accent"
                        : "text-t-secondary hover:bg-accent/15 hover:text-t-primary"
                    }`}
                  >
                    <span className="text-[10px] text-t-muted">{lesson.day}</span>{" "}
                    {lesson.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
