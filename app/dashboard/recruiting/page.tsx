"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Copy, CheckCircle, Zap, MessageSquare } from "lucide-react"
import { generateRecruitingMessages } from "@/lib/generators"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button onClick={copy} className="copy-btn flex items-center gap-1">
      {copied ? <><CheckCircle className="h-3 w-3" />Copied!</> : <><Copy className="h-3 w-3" />Copy</>}
    </button>
  )
}

const prospectTypes = [
  { value: "stay-at-home-mom", label: "Stay-at-Home Mom" },
  { value: "burnt-out-employee", label: "Burnt-Out Employee" },
  { value: "side-hustle-seeker", label: "Side Hustle Seeker" },
  { value: "recent-graduate", label: "Recent Graduate" },
  { value: "entrepreneur", label: "Fellow Entrepreneur" },
  { value: "stay-at-home-dad", label: "Stay-at-Home Dad" },
  { value: "fitness-enthusiast", label: "Fitness Enthusiast" },
  { value: "teacher", label: "Teacher / Educator" },
  { value: "nurse-healthcare", label: "Nurse / Healthcare Worker" },
  { value: "other", label: "Other" },
]

const toneLabels: Record<string, string> = { casual: "Casual & Friendly", professional: "Professional & Polished", urgent: "Urgent & Exciting" }
const toneDescriptions: Record<string, string> = {
  casual: "Like a text to a friend. Warm, relaxed, no pressure.",
  professional: "Respectful and thoughtful. Great for LinkedIn or professional contacts.",
  urgent: "Creates a sense of opportunity. Best for people you know are actively looking."
}

export default function RecruitingPage() {
  const [prospectType, setProspectType] = useState("")
  const [situation, setSituation] = useState("")
  const [tone, setTone] = useState<"casual" | "professional" | "urgent">("casual")
  const [messages, setMessages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const isReady = prospectType && situation.trim().length > 5

  const generate = () => {
    if (!isReady) return
    setLoading(true)
    setTimeout(() => {
      setMessages(generateRecruitingMessages({ prospectType, situation, tone }))
      setLoading(false)
    }, 1400)
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare className="h-5 w-5 text-purple-600" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Recruiting Message Generator</h1>
        </div>
        <p className="text-gray-500 text-sm">Generate 5 personalized recruiting messages for any prospect scenario. No more freezing up, no more generic copy-paste messages.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-sm mb-4">Tell us about your prospect</h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Prospect Type</label>
              <Select onValueChange={setProspectType}>
                <SelectTrigger className="text-sm"><SelectValue placeholder="Who is your prospect?" /></SelectTrigger>
                <SelectContent>
                  {prospectTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Message Tone</label>
              <div className="flex gap-2 flex-wrap">
                {(["casual", "professional", "urgent"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`text-xs px-3 py-2 rounded-lg border transition-all font-medium ${tone === t ? "bg-violet-600 text-white border-violet-600" : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"}`}
                  >
                    {toneLabels[t]}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">{toneDescriptions[tone]}</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Their Current Situation <span className="text-gray-400 font-normal">(the more specific, the better)</span></label>
            <Textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder='e.g. "She just posted about being exhausted from her 9-to-5 and wishing she could be home with her kids" or "He mentioned he\'s been looking for a side hustle for 6 months"'
              className="text-sm resize-none"
              rows={3}
            />
          </div>
          <Button onClick={generate} disabled={!isReady || loading} className="bg-violet-600 hover:bg-violet-700 text-white font-bold">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Crafting your messages...</> : <><Zap className="mr-2 h-4 w-4" />Generate 5 Recruiting Messages</>}
          </Button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
          <Loader2 className="h-8 w-8 text-violet-500 animate-spin mx-auto mb-3" />
          <p className="font-semibold text-gray-600 text-sm">Crafting personalized recruiting messages...</p>
        </div>
      )}

      {/* Results */}
      {messages.length > 0 && !loading && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="font-bold text-gray-900 text-sm">5 Recruiting Messages Ready</span>
            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Copy & Send</Badge>
          </div>
          <p className="text-xs text-gray-400 mb-4">💡 Replace [Name] with your prospect's name before sending. Add personal touches based on what you know about them.</p>
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center">{i + 1}</div>
                    <span className="text-xs font-semibold text-gray-500">Message Option {i + 1}</span>
                  </div>
                  <CopyButton text={msg} />
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs font-bold text-amber-800 mb-1">💡 Pro Tip: Personalize Before Sending</p>
            <p className="text-xs text-amber-700">The best recruiting messages feel personal, not scripted. Add one specific detail you know about them (their kids' names, their job, something from their social media) before hitting send. That personal touch is the difference between a response and silence.</p>
          </div>
        </div>
      )}
    </div>
  )
}
