"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Calendar, MessageSquare, RefreshCw, Shield, Users, Star, Zap, Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home, color: "text-violet-600" },
  { href: "/dashboard/content", label: "30-Day Content", icon: Calendar, color: "text-indigo-600" },
  { href: "/dashboard/recruiting", label: "Recruiting Messages", icon: MessageSquare, color: "text-purple-600" },
  { href: "/dashboard/followup", label: "Follow-Up Generator", icon: RefreshCw, color: "text-fuchsia-600" },
  { href: "/dashboard/objections", label: "Objection Crusher", icon: Shield, color: "text-violet-600" },
  { href: "/dashboard/team", label: "Team Training", icon: Users, color: "text-indigo-600" },
  { href: "/dashboard/brand", label: "Brand Builder", icon: Star, color: "text-amber-500" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md rounded-lg p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5 text-violet-700" /> : <Menu className="h-5 w-5 text-violet-700" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-40 transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-card flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900 leading-tight">Content Command</div>
              <div className="text-xs text-gray-400">Center</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-2 pb-1">Tools</p>
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-violet-50 text-violet-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn("h-4 w-4 flex-shrink-0", active ? "text-violet-600" : item.color)} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom badge */}
        <div className="p-4 border-t border-gray-100">
          <div className="rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 p-3 text-center">
            <p className="text-xs font-semibold text-violet-700">🔥 AI-Powered</p>
            <p className="text-xs text-gray-500 mt-0.5">135+ pieces of content per pack</p>
          </div>
        </div>
      </aside>
    </>
  )
}
