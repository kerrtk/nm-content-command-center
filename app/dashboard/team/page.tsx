"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Copy, CheckCircle, Zap, Users } from "lucide-react"
import { generateTeamContent, type TeamTrainingConfig } from "@/lib/generators"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button onClick={copy} className="copy-btn flex items-center gap-1">
      {copied ? <><CheckCircle className="h-3 w-3" />Copied!</> : <><Copy className="h-3 w-3" />Copy</>}
    </button>
  )
}

const topicOptions: { value: TeamTrainingConfig['topic']; label: string; desc: string; emoji: string; color: string }[] = [
  { value: "onboarding", label: "New Rep Onboarding", desc: "Welcome message + 24-hour action checklist for new team members.", emoji: "🎉", color: "from-green-500 to-emerald-600" },
  { value: "motivation", label: "Monday Motivation", desc: "Weekly mindset reset to fire up your team at the start of the week.", emoji: "🔥", color: "from-orange-500 to-red-500" },
  { value: "skills", label: "Skill Builder", desc: "Specific sales or communication skill training for your group.", emoji: "📚", color: "from-blue-500 to-indigo-600" },
  { value: "recognition", label: "Recognition Post", desc: "Celebrate top performers and milestones with a shoutout post.", emoji: "🏆", color: "from-amber-500 to-yellow-500" },
  { value: "culture", label: "Culture & Values", desc: "Build team identity, belonging, and shared mission.", emoji: "💜", color: "from-violet-500 to-purple-600" },
  { value: "launch", label: "Launch Week Gameplan", desc: "Orchestrate your team for a new product or promotion launch.", emoji: "🚀", color: "from-fuchsia-500 to-pink-600" },
]

export default function TeamPage() {
  const [topic, setTopic] = useState<TeamTrainingConfig['topic'] | null>(null)
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const generate = (t: TeamTrainingConfig['topic']) => {
    setTopic(t)
    setLoading(true)
    setContent("")
    setTimeout(() => {
      setContent(generateTeamContent({ topic: t }))
      setLoading(false)
    }, 1100)
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Users className="h-5 w-5 text-indigo-600" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Team Training Generator</h1>
        </div>
        <p className="text-gray-500 text-sm">Your team is your business. Generate professional training content, culture posts, and recognition shoutouts that keep your downline motivated and moving.</p>
      </div>

      {/* Topic Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {topicOptions.map((t) => (
          <button
            key={t.value}
            onClick={() => generate(t.value)}
            className={`rounded-2xl border p-5 text-left transition-all hover:shadow-md hover:-translate-y-0.5 ${topic === t.value ? "border-violet-400 bg-violet-50 shadow-md" : "border-gray-100 bg-white shadow-sm"}`}
          >
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-3 text-xl shadow-sm`}>{t.emoji}</div>
            <div className="font-bold text-gray-900 text-sm mb-1">{t.label}</div>
            <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
            {topic === t.value && loading && <div className="flex items-center gap-1 mt-2 text-violet-600 text-xs"><Loader2 className="h-3 w-3 animate-spin" />Generating...</div>}
            {topic === t.value && !loading && content && <div className="flex items-center gap-1 mt-2 text-green-600 text-xs"><CheckCircle className="h-3 w-3" />Generated!</div>}
          </button>
        ))}
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
          <Loader2 className="h-8 w-8 text-indigo-500 animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-600">Generating your team content...</p>
        </div>
      )}

      {content && !loading && (
        <div className="animate-fade-in">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-bold text-gray-900 text-sm">{topicOptions.find(t => t.value === topic)?.label} Content</span>
                <Badge className="bg-violet-100 text-violet-700 border-violet-200 text-xs">Ready to Post</Badge>
              </div>
              <CopyButton text={content} />
            </div>
            <div className="p-5">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{content}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-xs font-bold text-green-800 mb-1">✅ Where to Post This</p>
              <ul className="space-y-1 text-xs text-green-700">
                <li>• Your team Facebook group</li>
                <li>• WhatsApp / Telegram group chat</li>
                <li>• Team Slack or Discord</li>
                <li>• Email to your team list</li>
              </ul>
            </div>
            <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
              <p className="text-xs font-bold text-violet-800 mb-1">💡 Personalize It</p>
              <p className="text-xs text-violet-700">Replace [Name] brackets with actual names. Add specific numbers, dates, and personal details to make this feel genuine and not templated. The more personal it feels, the more impact it has.</p>
            </div>
          </div>
        </div>
      )}

      {!topic && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
          <p className="text-xs font-bold text-amber-800 mb-2">🏆 Why Team Content Matters</p>
          <p className="text-xs text-amber-700 leading-relaxed">The #1 reason people quit network marketing isn't the products or the income potential — it's feeling alone and unsupported. Consistent team communication changes that. Even one post per week to your team group can dramatically reduce dropout and increase activity. Start here.</p>
        </div>
      )}
    </div>
  )
}
