"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Copy, CheckCircle, Zap, Star } from "lucide-react"
import { generatePersonalBrand, type BrandConfig, type BrandPackage } from "@/lib/generators"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button onClick={copy} className="copy-btn flex items-center gap-1">
      {copied ? <><CheckCircle className="h-3 w-3" />Copied!</> : <><Copy className="h-3 w-3" />Copy</>}
    </button>
  )
}

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "bg-gradient-to-r from-pink-500 to-purple-600",
  facebook: "bg-blue-600",
  linkedin: "bg-blue-700",
  tiktok: "bg-gray-900",
}
const PLATFORM_LABELS: Record<string, string> = {
  instagram: "📸 Instagram",
  facebook: "👥 Facebook",
  linkedin: "💼 LinkedIn",
  tiktok: "🎵 TikTok",
}

export default function BrandPage() {
  const [form, setForm] = useState<BrandConfig>({ name: "", strength: "", audience: "", story: "" })
  const [brand, setBrand] = useState<BrandPackage | null>(null)
  const [loading, setLoading] = useState(false)

  const isReady = form.name.trim() && form.strength.trim() && form.audience.trim() && form.story.trim()

  const generate = () => {
    if (!isReady) return
    setLoading(true)
    setBrand(null)
    setTimeout(() => {
      setBrand(generatePersonalBrand(form))
      setLoading(false)
    }, 1600)
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Star className="h-5 w-5 text-amber-500" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Personal Brand Builder</h1>
        </div>
        <p className="text-gray-500 text-sm">People don't join companies — they join people. Build the personal brand that makes you magnetic to the right audience.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-sm mb-1">Tell us about YOU</h2>
        <p className="text-xs text-gray-400 mb-4">Answer these 4 questions as specifically as possible — the more real you are, the better your brand will land.</p>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Your Name <span className="text-gray-400 font-normal">(first name or full name you want to use publicly)</span></label>
            <Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Sarah, Todd, Jennifer K." className="text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Your Unique Strength <span className="text-gray-400 font-normal">(what quality or background makes you different?)</span></label>
            <Input value={form.strength} onChange={(e) => setForm(f => ({ ...f, strength: e.target.value }))} placeholder='e.g. "Former nurse turned wellness entrepreneur" or "Busy mom of 4 who figured out how to work smarter not harder"' className="text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Who You Serve <span className="text-gray-400 font-normal">(be specific about your ideal person)</span></label>
            <Input value={form.audience} onChange={(e) => setForm(f => ({ ...f, audience: e.target.value }))} placeholder='e.g. "Busy moms who want more energy and income without sacrificing family time"' className="text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Your Origin Story <span className="text-gray-400 font-normal">(what's the short version of why you do this?)</span></label>
            <Textarea value={form.story} onChange={(e) => setForm(f => ({ ...f, story: e.target.value }))} placeholder='e.g. "After hitting rock bottom with my health and finances in 2021, I found a community and products that changed everything. Now I help other moms do the same."' className="text-sm resize-none" rows={3} />
          </div>
          <Button onClick={generate} disabled={!isReady || loading} className="bg-violet-600 hover:bg-violet-700 text-white font-bold">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Building your brand package...</> : <><Zap className="mr-2 h-4 w-4" />Build My Personal Brand</>}
          </Button>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-600">Building your personal brand package...</p>
          <p className="text-xs text-gray-400 mt-1">Positioning statement • Content pillars • Bios • Story hooks</p>
        </div>
      )}

      {brand && !loading && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="font-bold text-gray-900 text-sm">Your Personal Brand Package</span>
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">✨ Ready to Publish</Badge>
          </div>

          <Tabs defaultValue="positioning">
            <TabsList className="bg-gray-100 mb-4 flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="positioning" className="text-xs data-[state=active]:bg-white">🎯 Positioning</TabsTrigger>
              <TabsTrigger value="pillars" className="text-xs data-[state=active]:bg-white">💡 Content Pillars</TabsTrigger>
              <TabsTrigger value="bios" className="text-xs data-[state=active]:bg-white">📝 Platform Bios</TabsTrigger>
              <TabsTrigger value="hooks" className="text-xs data-[state=active]:bg-white">🪝 Story Hooks</TabsTrigger>
            </TabsList>

            <TabsContent value="positioning">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900 text-sm">Your Brand Positioning Statement</h3>
                  <CopyButton text={brand.positioningStatement} />
                </div>
                <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-5 border border-violet-100">
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{brand.positioningStatement}</p>
                </div>
                <p className="text-xs text-gray-400 mt-3">💡 Fill in the [result] and [pain point] brackets with specifics from your experience. Then use this everywhere — your bio, your elevator pitch, your first message to new contacts.</p>
              </div>
            </TabsContent>

            <TabsContent value="pillars">
              <div className="space-y-4">
                {brand.contentPillars.map((pillar, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-sm">{pillar.pillar}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{pillar.description}</p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-600">Post Ideas:</p>
                      {pillar.postIdeas.map((idea, j) => (
                        <div key={j} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <p className="text-xs text-gray-700">{idea}</p>
                          <CopyButton text={idea} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bios">
              <div className="space-y-4">
                {Object.entries(brand.bios).map(([platform, bio]) => (
                  <div key={platform} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className={`${PLATFORM_COLORS[platform]} px-4 py-2.5 flex items-center justify-between`}>
                      <span className="text-white font-bold text-sm">{PLATFORM_LABELS[platform]}</span>
                      <CopyButton text={bio} />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hooks">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-1">10 Story Hook Templates</h3>
                <p className="text-xs text-gray-400 mb-4">Fill in the brackets with your specific story. Use one per week as the opening line of a post, Reel, or Story.</p>
                <div className="space-y-2">
                  {brand.storyHooks.map((hook, i) => (
                    <div key={i} className="flex items-start justify-between bg-gray-50 rounded-xl p-3 border border-gray-100 gap-3">
                      <div className="flex items-start gap-2 min-w-0">
                        <span className="text-xs font-bold text-violet-500 flex-shrink-0 mt-0.5">{i + 1}.</span>
                        <p className="text-xs text-gray-700 leading-relaxed">{hook}</p>
                      </div>
                      <CopyButton text={hook} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
