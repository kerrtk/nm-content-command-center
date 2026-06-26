"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, ArrowRight, Star, Calendar, MessageSquare, RefreshCw, Shield, Users, TrendingUp, Play, ChevronDown, ChevronUp } from "lucide-react"

const features = [
  { icon: Calendar, title: "30-Day Content Pack", desc: "Full month of posts, captions, and hashtags — tailored to your niche.", color: "bg-violet-100 text-violet-700" },
  { icon: Play, title: "Reels & Story Scripts", desc: "10 Reels scripts + 10 Story sequences ready to film.", color: "bg-indigo-100 text-indigo-700" },
  { icon: MessageSquare, title: "Recruiting Messages", desc: "Cold, warm, and referral DMs for any prospect scenario.", color: "bg-purple-100 text-purple-700" },
  { icon: RefreshCw, title: "Follow-Up Sequences", desc: "7-touch follow-up sequences that convert without being annoying.", color: "bg-fuchsia-100 text-fuchsia-700" },
  { icon: Shield, title: "Objection Crusher", desc: "Confident, proven responses to the 20 most common objections.", color: "bg-violet-100 text-violet-700" },
  { icon: Users, title: "Team Training Content", desc: "Scripts, shoutouts, onboarding, and culture posts for your downline.", color: "bg-indigo-100 text-indigo-700" },
  { icon: Star, title: "Personal Brand Builder", desc: "Your positioning, bio, content pillars, and story hooks — all in one.", color: "bg-amber-100 text-amber-700" },
  { icon: TrendingUp, title: "Unlimited Generation", desc: "Generate as many packs as you want. No limits, ever.", color: "bg-green-100 text-green-700" },
]

const testimonials = [
  { name: "Sarah M.", rank: "Diamond Leader", company: "Health & Wellness", quote: "I used to spend 3 hours a week writing posts. Now I do it in 5 minutes. My engagement is up and I've signed 2 new recruits this month. This tool paid for itself in week one.", stars: 5 },
  { name: "Jessica T.", rank: "Gold Distributor", company: "Skincare", quote: "The Objection Crusher alone was worth the price. I used to freeze when people said 'is this MLM?' Now I have a confident, genuine answer ready every time.", stars: 5 },
  { name: "Mike R.", rank: "Platinum Leader", company: "Financial Services", quote: "My team was struggling to know what to post. I shared this with all 47 of them and our team's engagement tripled in 30 days. Game changer for our whole organization.", stars: 5 },
  { name: "Amanda K.", rank: "Rising Star", company: "Weight Management", quote: "I'm not a writer. I'm not a marketer. I barely knew what hashtags were for. This tool made me look like a pro from day one. I'm not going back.", stars: 5 },
]

const faqs = [
  { q: "Will this work for my company and product?", a: "Yes — the system is 100% company-agnostic. You select your industry and product type, and the AI tailors everything to match. It works for any direct sales or network marketing company." },
  { q: "Do I need to know anything about AI or tech?", a: "Zero tech skills required. It's point-and-click simple. If you can fill out a form online, you can use this tool. We built it specifically for people who aren't 'techies.'" },
  { q: "Will the content sound generic or copy-pasted?", a: "The content is generated based on your specific industry, audience, and goals. Every pack is unique to your selections. You can also edit anything to add your personal voice." },
  { q: "How many times can I use it?", a: "Unlimited. Generate as many content packs as you want, for as many niches or products as you work with. There are no per-use fees." },
  { q: "What if I'm in multiple companies?", a: "No problem. Simply run the generator with different settings for each business. Each generation creates a completely new, unique pack." },
]

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const step = end / 60
    const timer = setInterval(() => {
      setCount(prev => { if (prev >= end) { clearInterval(timer); return end } return Math.min(prev + step, end) })
    }, 20)
    return () => clearInterval(timer)
  }, [end])
  return <span>{Math.floor(count).toLocaleString()}{suffix}</span>
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-card flex items-center justify-center"><Zap className="h-4 w-4 text-white" /></div>
            <span className="font-bold text-gray-900 text-sm">Content Command Center</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block">Login</Link>
            <Link href="/dashboard"><Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white text-sm">Get Started Free →</Button></Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="gradient-hero pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-6 text-sm px-4 py-1.5">✨ AI-Powered • Built for Network Marketers</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Never Wonder<br />What to Post Again
          </h1>
          <p className="text-xl text-violet-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            In 60 seconds, generate 30 days of posts, Reels scripts, DMs, follow-ups, and objection responses — perfectly matched to <em>your</em> product, audience, and goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="/dashboard/content">
              <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50 font-bold px-8 py-6 text-base shadow-xl">
                Generate My Content Pack <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 py-6 text-base">
                Explore All 7 Tools
              </Button>
            </Link>
          </div>
          <p className="text-violet-200 text-sm">No credit card required • Works for any company • Instant access</p>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { end: 135, suffix: "+", label: "Assets per pack" },
            { end: 20, suffix: "+", label: "Objections crushed" },
            { end: 30, suffix: "", label: "Days of content" },
            { end: 7, suffix: "", label: "Powerful tools" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold text-white"><Counter end={stat.end} suffix={stat.suffix} /></div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM / AGITATION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">You Got Into Network Marketing<br />Because You Believe in the Products.</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">But nobody told you that 90% of the job is <strong>content</strong> — and content is <em>hard</em>. What do you post today? How do you message a prospect without sounding desperate? How do you follow up without being annoying?</p>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-left max-w-xl mx-auto mb-8">
            {["I don't know what to post today", "I'm copying other people's content and it feels fake", "My follow-ups feel pushy and I freeze up", "I blank out when someone objects", "I run out of steam after the first week"].map((pain) => (
              <div key={pain} className="flex items-center gap-3 py-2 text-gray-700 text-sm">
                <span className="text-red-400">✗</span> {pain}
              </div>
            ))}
          </div>
          <p className="text-xl font-semibold text-gray-900">Most distributors quit not because the products don't work — but because they run out of things to <em>say.</em></p>
          <p className="text-violet-700 font-bold text-xl mt-4">Content Command Center fixes that. Permanently.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Generate a Month of Content in 60 Seconds</h2>
            <p className="text-gray-500 mt-3">Four clicks. That's all it takes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Select Your Industry", desc: "Health, Beauty, Financial, Weight Loss, Essential Oils, Travel, or Pets." },
              { step: "02", title: "Pick Your Audience", desc: "Busy Moms, Entrepreneurs, Fitness, Work-From-Home, Seniors, and more." },
              { step: "03", title: "Choose Your Goal", desc: "Build awareness, generate leads, recruit teammates, or retain customers." },
              { step: "04", title: "Get 135+ Assets", desc: "Instant generation: posts, captions, scripts, DMs, hashtags, CTAs — all ready to use." },
            ].map((step) => (
              <div key={step.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 rounded-full gradient-card text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{step.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything You Need. Nothing You Don't.</h2>
            <p className="text-gray-500 mt-3">8 powerful tools, one simple dashboard.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-violet-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Network Marketers Love It</h2>
            <p className="text-gray-500 mt-3">Real results from real distributors.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-violet-100">
                <div className="flex mb-3">{Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-card flex items-center justify-center text-white text-sm font-bold">{t.name[0]}</div>
                  <div><p className="font-semibold text-gray-900 text-sm">{t.name}</p><p className="text-xs text-gray-400">{t.rank} • {t.company}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Simple, Honest Pricing</h2>
            <p className="text-gray-500 mt-3">No subscriptions to worry about. One price. Unlimited use.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "$97", period: "one-time", badge: null, features: ["Full Content Command Center", "All 7 AI generators", "Unlimited generations", "30-day content packs", "Recruiting & follow-up tools", "Objection Crusher", "Email support"], cta: "Get Starter Access", href: "/dashboard", popular: false },
              { name: "Pro", price: "$197", period: "one-time", badge: "Most Popular", features: ["Everything in Starter", "Agency License (5 users)", "Team Training Generator", "Personal Brand Builder", "Priority support", "Lifetime updates", "Bonus: Launch Templates"], cta: "Get Pro Access", href: "/dashboard", popular: true },
              { name: "Monthly", price: "$27", period: "per month", badge: null, features: ["Full app access", "New monthly content packs", "Live community access", "Weekly AI campaigns", "Group coaching calls", "Cancel anytime"], cta: "Start Monthly", href: "/dashboard", popular: false },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-6 border ${plan.popular ? "border-violet-400 shadow-xl shadow-violet-100 relative" : "border-gray-200"}`}>
                {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-violet-600 text-white px-3">{plan.badge}</Badge></div>}
                <h3 className="font-bold text-gray-900 text-lg mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-1"><span className="text-4xl font-extrabold text-gray-900">{plan.price}</span></div>
                <p className="text-xs text-gray-400 mb-5">{plan.period}</p>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />{f}</li>)}
                </ul>
                <Link href={plan.href}>
                  <Button className={`w-full ${plan.popular ? "bg-violet-600 hover:bg-violet-700 text-white" : "bg-gray-900 hover:bg-gray-800 text-white"}`}>{plan.cta}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Questions? Answered.</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button className="w-full text-left p-5 flex items-center justify-between font-semibold text-gray-900 text-sm" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="gradient-hero py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Never Run Out of Content Again?</h2>
          <p className="text-violet-100 text-lg mb-8">Join network marketers who are growing faster, recruiting more confidently, and posting every single day — with AI doing the heavy lifting.</p>
          <Link href="/dashboard/content">
            <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50 font-bold px-10 py-6 text-base shadow-xl">
              Generate My First Content Pack — Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-violet-200 text-xs mt-4">No credit card required. Access all 7 tools instantly.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg gradient-card flex items-center justify-center"><Zap className="h-3 w-3 text-white" /></div>
          <span className="font-bold text-white text-sm">Content Command Center</span>
        </div>
        <p className="text-gray-500 text-xs">Built for network marketers who are serious about growth. © 2025. All rights reserved.</p>
      </footer>
    </div>
  )
}
