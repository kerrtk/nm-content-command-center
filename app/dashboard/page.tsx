"use client"

import Link from "next/link"
import { Calendar, MessageSquare, RefreshCw, Shield, Users, Star, ArrowRight, Zap, TrendingUp, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const tools = [
  { href: "/dashboard/content", icon: Calendar, label: "30-Day Content Pack", desc: "Generate a full month of posts, captions, hashtags, Reels scripts, and Story sequences.", badge: "Most Used", color: "from-violet-500 to-indigo-600" },
  { href: "/dashboard/recruiting", icon: MessageSquare, label: "Recruiting Messages", desc: "Craft the perfect message for any prospect — cold, warm, referral, or re-engagement.", badge: null, color: "from-purple-500 to-fuchsia-600" },
  { href: "/dashboard/followup", icon: RefreshCw, label: "Follow-Up Sequences", desc: "Never lose a prospect. 7-touch follow-up sequences for any pipeline stage.", badge: null, color: "from-fuchsia-500 to-pink-600" },
  { href: "/dashboard/objections", icon: Shield, label: "Objection Crusher", desc: "Confident responses to the 20 most common objections — empathetic, logical, and story-based.", badge: "🔥 Hot", color: "from-indigo-500 to-violet-600" },
  { href: "/dashboard/team", icon: Users, label: "Team Training Generator", desc: "Onboarding scripts, motivation posts, skill builders, and culture content for your downline.", badge: null, color: "from-violet-500 to-purple-600" },
  { href: "/dashboard/brand", icon: Star, label: "Personal Brand Builder", desc: "Your positioning statement, content pillars, bios for every platform, and story hooks.", badge: "New", color: "from-amber-500 to-orange-600" },
]

const stats = [
  { label: "Tools Available", value: "7", icon: Zap, color: "text-violet-600 bg-violet-50" },
  { label: "Content Per Pack", value: "135+", icon: TrendingUp, color: "text-indigo-600 bg-indigo-50" },
  { label: "Objections Handled", value: "20+", icon: Shield, color: "text-purple-600 bg-purple-50" },
  { label: "Generations", value: "∞", icon: CheckCircle, color: "text-green-600 bg-green-50" },
]

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Welcome */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg gradient-card flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <Badge className="bg-violet-100 text-violet-700 border-violet-200">Welcome to your Command Center</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">What are we building today?</h1>
        <p className="text-gray-500 text-sm sm:text-base">Pick a tool below and generate professional content in under 60 seconds. No more blank screens.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="border-gray-100 shadow-sm">
            <CardContent className="p-4">
              <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="h-4 w-4" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-lg mb-1">🚀 Start Here: Generate Your First Content Pack</h2>
          <p className="text-violet-100 text-sm">Select your industry, audience, and goal — get 30 days of content instantly.</p>
        </div>
        <Link href="/dashboard/content">
          <Button className="bg-white text-violet-700 hover:bg-violet-50 font-bold shadow-lg flex-shrink-0">
            Generate Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Tools Grid */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">All 7 Tools</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="h-full border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-sm`}>
                    <tool.icon className="h-5 w-5 text-white" />
                  </div>
                  {tool.badge && <Badge className="bg-violet-100 text-violet-700 border-violet-200 text-xs">{tool.badge}</Badge>}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-violet-700 transition-colors">{tool.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{tool.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-violet-600 text-xs font-semibold">Open Tool <ArrowRight className="h-3 w-3" /></div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <h3 className="font-bold text-amber-800 text-sm mb-3">💡 Pro Tips to Get the Most Out of Content Command Center</h3>
        <ul className="space-y-2">
          {["Start with the 30-Day Content Pack to build your content calendar for the whole month.", "Use the Objection Crusher before your next sales conversation — study the responses until they feel natural.", "Run the Personal Brand Builder first if you're just starting out. Your brand voice makes every other tool more effective.", "Share the Team Training generator with your downline — it multiplies the value across your whole team."].map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-amber-700"><CheckCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-amber-500" />{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
