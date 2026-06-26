"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Copy, CheckCircle, Zap, RefreshCw } from "lucide-react"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button onClick={copy} className="copy-btn flex items-center gap-1 flex-shrink-0">
      {copied ? <><CheckCircle className="h-3 w-3" />Copied!</> : <><Copy className="h-3 w-3" />Copy</>}
    </button>
  )
}

interface FollowUpMessage { day: number; text: string; subject?: string }

function generateFollowUp(stage: string, context: string, tone: string): FollowUpMessage[] {
  const stageMap: Record<string, FollowUpMessage[]> = {
    "just-saw-video": [
      { day: 1, subject: "The soft check-in", text: `Hey [Name]! Just wanted to make sure you got everything I sent over. No rush at all — just let me know if you have any questions. I'm happy to help! 😊` },
      { day: 3, subject: "The value add", text: `Hey [Name]! Checking back in. I know life gets busy! I thought of you because [relate to their specific situation: ${context}]. Still happy to chat if you're curious! ✨` },
      { day: 7, subject: "The real talk", text: `Hey [Name]! One more check-in and then I'll let you be 😄 I'd hate for you to miss out on something that's genuinely made a difference for me. If the timing isn't right, totally understand — but if you're still curious, I'm here! 🙌` },
      { day: 14, subject: "The unexpected value", text: `Hey [Name]! Randomly thought of you today when I saw [a result or testimonial]. Just wanted to share — no agenda, just thought it was relevant to you. How are things going?` },
      { day: 21, subject: "The genuine check-in", text: `Hey [Name]! It's been a few weeks — how have things been? Thinking of you! If that thing we chatted about ever feels relevant again, you know where to find me. 💜` },
    ],
    "ghosted": [
      { day: 1, subject: "The no-pressure text", text: `Hey [Name]! I know you've probably been swamped. No pressure at all — I just wanted to put my name back in your inbox in case this got buried. Still happy to chat whenever you're ready! 😊` },
      { day: 4, subject: "The new angle", text: `Hey [Name]! I know I've reached out before, and I totally get it if the timing wasn't right. I did want to share one thing that just happened: [recent result/testimonial related to their situation]. Thought of you immediately. Still open to connecting if you're curious!` },
      { day: 10, subject: "The last real try", text: `Hey [Name]! I promise this is my last follow-up on this — I don't want to be that person in your DMs 😅 I just want to make sure you have everything you need to make the right decision FOR YOU. Whether that's a yes or a no, I respect it either way. What's your gut saying?` },
      { day: 21, subject: "The far future check-in", text: `Hey [Name]! It's been a bit — totally understand if the timing wasn't right before. Just wanted to check in and see how things are going. No agenda, genuinely! Hope things are well. 🙌` },
    ],
    "said-maybe": [
      { day: 3, subject: "The clarity offer", text: `Hey [Name]! Just following up from our chat. I completely understand "let me think about it" — this is a real decision! Can I ask: is there a specific question I didn't answer well? I want to make sure you have everything you need. 😊` },
      { day: 7, subject: "The social proof drop", text: `Hey [Name]! I was thinking about our conversation and I wanted to share something: [Name of someone similar to them] just [achieved result] after just [timeframe]. She was in a similar spot to where you are now. Just thought it might be helpful! 💜` },
      { day: 14, subject: "The real conversation", text: `Hey [Name]! I want to be genuine with you. My goal was never to "sell" you anything — it's to help you get [result]. If this isn't the right fit, I'd rather know that than have you unsure. What's holding you back? Maybe I can help, maybe I can't. Either way — I'm here!` },
      { day: 30, subject: "The long game", text: `Hey [Name]! It's been a while and I don't want to be a nag 😄 I just genuinely care about the people I connect with. If things ever shift and you want to revisit this conversation, I'm here. Until then, I hope life is treating you well! 🌟` },
    ],
    "after-purchase": [
      { day: 1, subject: "The welcome", text: `Hey [Name]!! Welcome to the family!! 🎉 I'm SO excited for you. First things first: [specific first step]. I'm going to be checking in to make sure you're getting everything you need. Any questions at all — I'm your person! 💜` },
      { day: 3, subject: "The quick check-in", text: `Hey [Name]! It's been a few days — how are things going so far? Any questions? I want to make sure you're set up for success from day one. 🙌` },
      { day: 7, subject: "The week one celebration", text: `Week one done!! 🎉 How are you feeling? I'd love to hear any early wins or questions. This is the stage where most people start to notice [early benefit]. Is that happening for you?` },
      { day: 14, subject: "The progress check", text: `Hey [Name]! Two weeks in! 🥳 I want to hear everything. What's working? What are you loving? And just as importantly — is there anything confusing or frustrating? I'm here for all of it!` },
      { day: 30, subject: "The referral moment", text: `One month milestone!! 🏆 I'm so proud of you for sticking with it! Can I ask — have you noticed changes? If you have, I'd love to ask you something: is there anyone in your life who you think could use the same thing? I'd love to help them the same way I helped you. 🌟` },
    ]
  }
  return stageMap[stage] || stageMap["just-saw-video"]
}

const stageOptions = [
  { value: "just-saw-video", label: "Just saw my video / got my info" },
  { value: "ghosted", label: "Ghosted me after showing interest" },
  { value: "said-maybe", label: 'Said "maybe later" or "let me think" ' },
  { value: "after-purchase", label: "Just made a purchase (customer care)" },
]

const dayColors: Record<number, string> = {
  1: "bg-green-100 text-green-700 border-green-200",
  3: "bg-blue-100 text-blue-700 border-blue-200",
  4: "bg-blue-100 text-blue-700 border-blue-200",
  7: "bg-violet-100 text-violet-700 border-violet-200",
  10: "bg-orange-100 text-orange-700 border-orange-200",
  14: "bg-amber-100 text-amber-700 border-amber-200",
  21: "bg-gray-100 text-gray-600 border-gray-200",
  30: "bg-gray-100 text-gray-600 border-gray-200",
}

export default function FollowUpPage() {
  const [stage, setStage] = useState("")
  const [context, setContext] = useState("")
  const [messages, setMessages] = useState<FollowUpMessage[]>([])
  const [loading, setLoading] = useState(false)

  const generate = () => {
    if (!stage) return
    setLoading(true)
    setTimeout(() => {
      setMessages(generateFollowUp(stage, context, "casual"))
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <RefreshCw className="h-5 w-5 text-fuchsia-600" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Follow-Up Generator</h1>
        </div>
        <p className="text-gray-500 text-sm">The fortune is in the follow-up. Generate a complete sequence for any prospect scenario — so you never lose a lead to silence again.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Where is your prospect right now?</label>
            <Select onValueChange={setStage}>
              <SelectTrigger className="text-sm"><SelectValue placeholder="Select their current stage" /></SelectTrigger>
              <SelectContent>
                {stageOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Anything specific about them? <span className="text-gray-400 font-normal">(optional but helpful)</span></label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder='e.g. "She\'s a busy mom of 3, seemed really interested in the energy benefits, asked about the price but didn\'t say it was too expensive"'
              className="text-sm resize-none"
              rows={2}
            />
          </div>
          <Button onClick={generate} disabled={!stage || loading} className="bg-violet-600 hover:bg-violet-700 text-white font-bold">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Building your sequence...</> : <><Zap className="mr-2 h-4 w-4" />Generate Follow-Up Sequence</>}
          </Button>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
          <Loader2 className="h-8 w-8 text-fuchsia-500 animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-600">Building your follow-up sequence...</p>
        </div>
      )}

      {messages.length > 0 && !loading && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="font-bold text-gray-900 text-sm">Your Follow-Up Sequence</span>
            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">{messages.length} Messages</Badge>
          </div>
          <p className="text-xs text-gray-400 mb-4">💡 Use these in order, spaced by the day number shown. Skip any that don't fit your conversation.</p>
          <div className="space-y-4 relative before:absolute before:left-6 before:top-8 before:bottom-8 before:w-0.5 before:bg-gray-100">
            {messages.map((msg, i) => (
              <div key={i} className="relative flex gap-4 animate-fade-in">
                <div className={`w-12 h-12 rounded-full flex-shrink-0 flex flex-col items-center justify-center text-center border-2 ${dayColors[msg.day] || "bg-violet-100 text-violet-700 border-violet-200"} z-10 bg-white`}>
                  <span className="text-xs font-bold leading-tight">Day</span>
                  <span className="text-sm font-extrabold leading-tight">{msg.day}</span>
                </div>
                <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    {msg.subject && <span className="text-xs font-semibold text-gray-500 italic">"{msg.subject}"</span>}
                    <CopyButton text={msg.text} />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <p className="text-xs font-bold text-indigo-800 mb-1">📌 The Golden Rule of Follow-Up</p>
            <p className="text-xs text-indigo-700">Always lead with value, never with a pitch. Your goal is to stay top of mind as a helpful, genuine person — not a salesperson. When they're ready, they'll come to you.</p>
          </div>
        </div>
      )}
    </div>
  )
}
