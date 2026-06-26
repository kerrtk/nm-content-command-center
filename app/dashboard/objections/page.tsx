"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Copy, CheckCircle, Shield, Heart, Brain, BookOpen } from "lucide-react"
import { generateObjectionResponse } from "@/lib/generators"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button onClick={copy} className="copy-btn flex items-center gap-1 flex-shrink-0">
      {copied ? <><CheckCircle className="h-3 w-3" />Copied!</> : <><Copy className="h-3 w-3" />Copy</>}
    </button>
  )
}

const OBJECTIONS = [
  "I don't have time",
  "Is this an MLM?",
  "I'm not a salesperson",
  "It's too expensive",
  "I need to talk to my spouse",
  "I tried this before and it didn't work",
  "I need to do more research",
  "I don't know enough people",
  "I'm not good on social media",
  "What if my friends and family say no?",
  "Is this legit?",
  "I can't afford the start-up cost",
  "I don't have enough time with kids/family",
  "I'm too old/young for this",
  "What if I can't sell anything?",
  "I've heard bad things about network marketing",
  "I'm already too busy with my job",
  "I don't want to bother my friends",
  "Can I really make money at this?",
  "What if the products don't work for me?",
]

const responseStyles = [
  { key: "empathetic", label: "Empathetic", icon: Heart, color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-100", badge: "bg-pink-100 text-pink-700 border-pink-200", desc: "Leads with understanding and validation. Perfect for emotional objections." },
  { key: "logical", label: "Logical", icon: Brain, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", badge: "bg-blue-100 text-blue-700 border-blue-200", desc: "Facts, reframes, and data. Best for analytical personalities." },
  { key: "story", label: "Story-Based", icon: BookOpen, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100", badge: "bg-violet-100 text-violet-700 border-violet-200", desc: "Personal story that mirrors their situation. Most persuasive approach." },
]

export default function ObjectionsPage() {
  const [selectedObjection, setSelectedObjection] = useState<string | null>(null)
  const [response, setResponse] = useState<{ empathetic: string; logical: string; story: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSelect = (objection: string) => {
    setSelectedObjection(objection)
    setLoading(true)
    setResponse(null)
    setTimeout(() => {
      const res = generateObjectionResponse(objection)
      setResponse({ empathetic: res.empathetic, logical: res.logical, story: res.story })
      setLoading(false)
    }, 900)
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-5 w-5 text-indigo-600" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Objection Crusher</h1>
        </div>
        <p className="text-gray-500 text-sm">Never freeze when someone objects again. Click any objection below to get 3 different proven responses — empathetic, logical, and story-based.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Objection List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h2 className="font-bold text-gray-900 text-sm mb-3">Select an Objection</h2>
            <div className="space-y-1.5">
              {OBJECTIONS.map((obj) => (
                <button
                  key={obj}
                  onClick={() => handleSelect(obj)}
                  className={`w-full text-left text-xs px-3 py-2.5 rounded-xl transition-all font-medium ${selectedObjection === obj ? "bg-violet-600 text-white shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-violet-700"}`}
                >
                  {selectedObjection === obj && loading ? <span className="flex items-center gap-2"><Loader2 className="h-3 w-3 animate-spin" />{obj}</span> : `"${obj}"`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responses */}
        <div className="lg:col-span-3">
          {!selectedObjection && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center h-full flex flex-col items-center justify-center">
              <Shield className="h-12 w-12 text-gray-200 mb-4" />
              <h3 className="font-bold text-gray-600 mb-2">Select an Objection</h3>
              <p className="text-sm text-gray-400">Click any objection on the left to see 3 proven response styles instantly.</p>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
              <Loader2 className="h-8 w-8 text-indigo-500 animate-spin mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-600">Generating responses for: "{selectedObjection}"</p>
            </div>
          )}

          {response && !loading && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
                <p className="text-sm font-bold text-indigo-800">💬 Objection: <span className="italic">"{selectedObjection}"</span></p>
                <p className="text-xs text-indigo-600 mt-0.5">3 response styles below — pick the one that fits your personality and their communication style.</p>
              </div>

              {responseStyles.map((style) => (
                <div key={style.key} className={`${style.bg} ${style.border} rounded-xl border p-5 animate-fade-in`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <style.icon className={`h-4 w-4 ${style.color}`} />
                      <span className={`text-xs font-bold ${style.color}`}>{style.label} Response</span>
                      <Badge className={`${style.badge} text-xs border`}>{style.desc.split('.')[0]}</Badge>
                    </div>
                    <CopyButton text={response[style.key as keyof typeof response]} />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{response[style.key as keyof typeof response]}</p>
                </div>
              ))}

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-xs font-bold text-amber-800 mb-1">🧠 Which Response to Use When?</p>
                <ul className="space-y-1 text-xs text-amber-700">
                  <li><strong>Empathetic:</strong> Use first, especially if they seem emotional or defensive.</li>
                  <li><strong>Logical:</strong> Best for analytical people who want data and facts.</li>
                  <li><strong>Story-Based:</strong> The most persuasive — use when they need to see themselves in your journey.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
