'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Settings, LogOut } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: '/app/dashboard', label: 'Home', icon: Home },
  { href: '/app/settings', label: 'Settings', icon: Settings },
];

interface NavRailProps {
  onSignOut: () => void;
}

export default function NavRail({ onSignOut }: NavRailProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop nav rail */}
      <nav
        className="hidden lg:flex flex-col items-center w-16 bg-white border-r border-stone-200 py-4 gap-2 shrink-0"
        aria-label="Main navigation"
      >
        <div className="flex flex-col items-center gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`
                  relative flex items-center justify-center w-12 h-12 rounded-rounded-button transition-colors
                  ${isActive
                    ? 'bg-brand-100 text-brand-700'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-700'
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-500 rounded-r-full" />
                )}
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onSignOut}
          title="Sign out"
          className="flex items-center justify-center w-12 h-12 rounded-button text-stone-500 hover:bg-stone-100 hover:text-stone-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 flex items-center justify-around h-16 safe-pad-bottom"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center gap-0.5 px-3 py-1 min-h-[48px]
                ${isActive ? 'text-brand-700' : 'text-stone-500'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={onSignOut}
          className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 min-h-[48px] text-stone-500"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-medium">Sign out</span>
        </button>
      </nav>
    </>
  );
}
