"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Copy, CheckCircle, Zap, Calendar, Play, MessageSquare, Hash } from "lucide-react"
import { generate30DayContent, type ContentConfig, type ContentPack, type Industry, type ProductType, type Audience, type ContentGoal } from "@/lib/generators"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="copy-btn flex items-center gap-1 ml-auto flex-shrink-0">
      {copied ? <><CheckCircle className="h-3 w-3" />Copied!</> : <><Copy className="h-3 w-3" />Copy</>}
    </button>
  )
}

function ContentCard({ title, content, badge }: { title?: string; content: string; badge?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm animate-fade-in">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {badge && <Badge className="bg-violet-100 text-violet-700 border-violet-200 text-xs">{badge}</Badge>}
          {title && <span className="text-xs font-semibold text-gray-500">{title}</span>}
        </div>
        <CopyButton text={content} />
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
  )
}

export default function ContentGeneratorPage() {
  const [config, setConfig] = useState<Partial<ContentConfig>>({})
  const [pack, setPack] = useState<ContentPack | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeDay, setActiveDay] = useState<number | null>(null)

  const isReady = config.industry && config.productType && config.audience && config.goal

  const generate = useCallback(() => {
    if (!isReady) return
    setLoading(true)
    setPack(null)
    setTimeout(() => {
      const result = generate30DayContent(config as ContentConfig)
      setPack(result)
      setLoading(false)
    }, 1800)
  }, [config, isReady])

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="h-5 w-5 text-violet-600" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">30-Day Content Pack Generator</h1>
        </div>
        <p className="text-gray-500 text-sm">Configure your niche below and generate 135+ pieces of content instantly.</p>
      </div>

      {/* Config Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-sm mb-4">Step 1: Tell us about your business</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Industry</label>
            <Select onValueChange={(v) => setConfig(c => ({ ...c, industry: v as Industry }))}>
              <SelectTrigger className="text-sm"><SelectValue placeholder="Select industry" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="health-wellness">Health & Wellness</SelectItem>
                <SelectItem value="beauty-skincare">Beauty & Skincare</SelectItem>
                <SelectItem value="financial">Financial Services</SelectItem>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="essential-oils">Essential Oils</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="pet-products">Pet Products</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Product Type</label>
            <Select onValueChange={(v) => setConfig(c => ({ ...c, productType: v as ProductType }))}>
              <SelectTrigger className="text-sm"><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="supplements">Supplements</SelectItem>
                <SelectItem value="skincare">Skincare</SelectItem>
                <SelectItem value="digital">Digital Products</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="physical">Physical Products</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Target Audience</label>
            <Select onValueChange={(v) => setConfig(c => ({ ...c, audience: v as Audience }))}>
              <SelectTrigger className="text-sm"><SelectValue placeholder="Select audience" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="busy-moms">Busy Moms</SelectItem>
                <SelectItem value="fitness">Fitness Enthusiasts</SelectItem>
                <SelectItem value="entrepreneurs">Entrepreneurs</SelectItem>
                <SelectItem value="seniors">Active Seniors</SelectItem>
                <SelectItem value="college">College Students</SelectItem>
                <SelectItem value="work-from-home">Work-From-Home</SelectItem>
                <SelectItem value="health-conscious">Health-Conscious</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Content Goal</label>
            <Select onValueChange={(v) => setConfig(c => ({ ...c, goal: v as ContentGoal }))}>
              <SelectTrigger className="text-sm"><SelectValue placeholder="Select goal" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="awareness">Build Awareness</SelectItem>
                <SelectItem value="leads">Generate Leads</SelectItem>
                <SelectItem value="book-calls">Book Calls</SelectItem>
                <SelectItem value="recruit">Recruit Distributors</SelectItem>
                <SelectItem value="retain">Retain Customers</SelectItem>
                <SelectItem value="launch">Launch a Product</SelectItem>
                <SelectItem value="team-culture">Team Culture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={generate}
          disabled={!isReady || loading}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8"
        >
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating your content pack...</> : <><Zap className="mr-2 h-4 w-4" />Generate My 30-Day Content Pack</>}
        </Button>
        {!isReady && <p className="text-xs text-gray-400 mt-2">Please select all 4 options above to generate.</p>}
      </div>

      {/* Output */}
      {loading && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <Loader2 className="h-10 w-10 text-violet-500 animate-spin mx-auto mb-4" />
          <p className="font-semibold text-gray-700">Building your content pack...</p>
          <p className="text-sm text-gray-400 mt-1">Generating 135+ pieces of personalized content</p>
        </div>
      )}

      {pack && !loading && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h2 className="font-bold text-gray-900">Your Content Pack is Ready!</h2>
            <Badge className="bg-green-100 text-green-700 border-green-200">135+ Assets Generated</Badge>
          </div>

          <Tabs defaultValue="posts">
            <TabsList className="bg-gray-100 mb-4 flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="posts" className="text-xs data-[state=active]:bg-white"><Calendar className="h-3 w-3 mr-1" />30 Days</TabsTrigger>
              <TabsTrigger value="reels" className="text-xs data-[state=active]:bg-white"><Play className="h-3 w-3 mr-1" />Reels</TabsTrigger>
              <TabsTrigger value="stories" className="text-xs data-[state=active]:bg-white">📱 Stories</TabsTrigger>
              <TabsTrigger value="dms" className="text-xs data-[state=active]:bg-white"><MessageSquare className="h-3 w-3 mr-1" />DMs</TabsTrigger>
              <TabsTrigger value="ctas" className="text-xs data-[state=active]:bg-white"><Hash className="h-3 w-3 mr-1" />CTAs</TabsTrigger>
            </TabsList>

            {/* 30 DAYS TAB */}
            <TabsContent value="posts">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {pack.days.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                    className={`rounded-xl border p-3 text-left transition-all ${activeDay === day.day ? "border-violet-400 bg-violet-50 shadow-sm" : "border-gray-100 bg-white hover:border-violet-200"}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Badge className="bg-violet-100 text-violet-700 border-violet-200 text-xs">Day {day.day}</Badge>
                      <span className="text-xs text-gray-400">{activeDay === day.day ? "▲ Hide" : "▼ View"}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{day.facebook.split('\n')[0]}</p>
                  </button>
                ))}
              </div>

              {activeDay !== null && (() => {
                const day = pack.days.find(d => d.day === activeDay)!
                return (
                  <div className="space-y-3 animate-fade-in border-t border-gray-100 pt-4">
                    <h3 className="font-bold text-gray-900 text-sm">Day {activeDay} Content</h3>
                    <ContentCard title="Facebook Post" content={day.facebook} badge="FB" />
                    <ContentCard title="Instagram Caption" content={day.instagram} badge="IG" />
                    <ContentCard title="Hashtags" content={day.hashtags.join(' ')} badge="#" />
                  </div>
                )
              })()}
            </TabsContent>

            {/* REELS TAB */}
            <TabsContent value="reels">
              <div className="space-y-4">
                {pack.reelsScripts.map((script, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 text-xs">Reel {i + 1}</Badge>
                        <span className="font-semibold text-gray-900 text-sm">{script.title}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-amber-50 rounded-lg p-3"><p className="text-xs font-bold text-amber-700 mb-1">🎣 HOOK</p><div className="flex items-start justify-between gap-2"><p className="text-sm text-gray-700">{script.hook}</p><CopyButton text={script.hook} /></div></div>
                      <div className="bg-blue-50 rounded-lg p-3"><p className="text-xs font-bold text-blue-700 mb-1">📖 BODY</p><div className="flex items-start justify-between gap-2"><p className="text-sm text-gray-700">{script.body}</p><CopyButton text={script.body} /></div></div>
                      <div className="bg-green-50 rounded-lg p-3"><p className="text-xs font-bold text-green-700 mb-1">🎯 CTA</p><div className="flex items-start justify-between gap-2"><p className="text-sm text-gray-700">{script.cta}</p><CopyButton text={script.cta} /></div></div>
                      <div className="flex justify-end"><CopyButton text={`HOOK: ${script.hook}\n\nBODY: ${script.body}\n\nCTA: ${script.cta}`} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* STORIES TAB */}
            <TabsContent value="stories">
              <div className="space-y-6">
                {pack.storySequences.map((seq, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 text-xs">Story Sequence {i + 1}</Badge>
                      <span className="font-semibold text-gray-900 text-sm">{seq.title}</span>
                    </div>
                    <div className="grid sm:grid-cols-5 gap-3">
                      {seq.frames.map((frame) => (
                        <div key={frame.frame} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <div className="text-xs font-bold text-violet-600 mb-2">Frame {frame.frame}</div>
                          <p className="text-xs text-gray-700 mb-2 leading-relaxed">{frame.text}</p>
                          <p className="text-xs text-gray-400 italic">{frame.tip}</p>
                          <CopyButton text={frame.text} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* DMs TAB */}
            <TabsContent value="dms">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Prospecting DMs</h3>
                  <div className="space-y-3">
                    {pack.prospectingDMs.map((dm, i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">Scenario</Badge>
                          <span className="text-xs font-semibold text-gray-600">{dm.scenario}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-gray-700 leading-relaxed">{dm.message}</p>
                          <CopyButton text={dm.message} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Follow-Up Sequences</h3>
                  <div className="space-y-4">
                    {pack.followUpSequences.map((seq, i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                        <Badge className="bg-violet-100 text-violet-700 border-violet-200 text-xs mb-3 block w-fit">{seq.scenario}</Badge>
                        <div className="space-y-2">
                          {seq.messages.map((msg) => (
                            <div key={msg.day} className="flex items-start gap-3">
                              <div className="w-12 text-xs font-bold text-violet-600 flex-shrink-0 pt-1">Day {msg.day}</div>
                              <div className="flex-1 bg-gray-50 rounded-lg p-3 flex items-start justify-between gap-2">
                                <p className="text-xs text-gray-700 leading-relaxed">{msg.text}</p>
                                <CopyButton text={msg.text} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* CTAs TAB */}
            <TabsContent value="ctas">
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm mb-3">15 Call-to-Action Templates</h3>
                {pack.ctas.map((cta, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <Badge className="bg-gray-100 text-gray-500 border-gray-200 text-xs flex-shrink-0">{i + 1}</Badge>
                      <p className="text-sm text-gray-700 truncate">{cta}</p>
                    </div>
                    <CopyButton text={cta} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
