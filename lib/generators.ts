export type Industry = 'health-wellness' | 'beauty-skincare' | 'financial' | 'weight-loss' | 'essential-oils' | 'travel' | 'pet-products' | 'other'
export type ProductType = 'supplements' | 'skincare' | 'digital' | 'services' | 'physical'
export type Audience = 'busy-moms' | 'fitness' | 'entrepreneurs' | 'seniors' | 'college' | 'work-from-home' | 'health-conscious'
export type ContentGoal = 'awareness' | 'leads' | 'book-calls' | 'recruit' | 'retain' | 'launch' | 'team-culture'

export interface ContentConfig {
  industry: Industry
  productType: ProductType
  audience: Audience
  goal: ContentGoal
}

export interface DayContent {
  day: number
  facebook: string
  instagram: string
  hashtags: string[]
}

export interface ReelsScript {
  title: string
  hook: string
  body: string
  cta: string
}

export interface StorySequence {
  title: string
  frames: { frame: number; text: string; tip: string }[]
}

export interface ProspectingDM {
  scenario: string
  message: string
}

export interface FollowUpSequence {
  scenario: string
  messages: { day: number; text: string }[]
}

export interface ContentPack {
  config: ContentConfig
  days: DayContent[]
  reelsScripts: ReelsScript[]
  storySequences: StorySequence[]
  ctas: string[]
  prospectingDMs: ProspectingDM[]
  followUpSequences: FollowUpSequence[]
}

interface Ctx {
  productLabel: string
  audienceLabel: string
  benefit1: string
  benefit2: string
  pain1: string
  pain2: string
  transformation: string
  e1: string
  e2: string
  cta: string
  hashtags: string[]
}

function buildCtx(config: ContentConfig): Ctx {
  const industryData: Record<Industry, Partial<Ctx>> = {
    'health-wellness': { productLabel: 'wellness products', benefit1: 'more energy and vitality', benefit2: 'better sleep and sharper focus', pain1: 'running on empty', pain2: 'constant fatigue and brain fog', transformation: 'went from exhausted to genuinely thriving', e1: '💪', e2: '✨', hashtags: ['#WellnessJourney', '#HealthyLiving', '#EnergyBoost', '#NaturalHealth', '#Vitality', '#WellnessLife', '#FeelAmazing', '#NaturalWellness', '#HealthFirst', '#WellnessTips'] },
    'beauty-skincare': { productLabel: 'skincare system', benefit1: 'glowing, radiant skin', benefit2: 'fewer breakouts and even tone', pain1: 'struggling with my skin', pain2: 'dull, tired-looking skin that never cooperated', transformation: 'went from hiding behind makeup to going bare-faced with confidence', e1: '✨', e2: '🌸', hashtags: ['#SkincareRoutine', '#GlowingSkin', '#SkincareCommunity', '#NaturalBeauty', '#SkinGoals', '#ClearSkin', '#BeautyTips', '#GlowUp', '#SkincareJunkie', '#NaturalGlow'] },
    'financial': { productLabel: 'income opportunity', benefit1: 'extra income and real financial flexibility', benefit2: 'time freedom and a business I own', pain1: 'living paycheck to paycheck', pain2: 'never having enough at the end of the month', transformation: 'went from stressed about bills to building real wealth', e1: '💰', e2: '🎯', hashtags: ['#FinancialFreedom', '#WorkFromHome', '#SideHustle', '#PassiveIncome', '#MoneyMindset', '#WealthBuilding', '#FinancialGoals', '#IncomeOpportunity', '#BusinessOwner', '#Entrepreneur'] },
    'weight-loss': { productLabel: 'weight management system', benefit1: 'sustainable, real weight loss', benefit2: 'more confidence and unstoppable energy', pain1: 'struggling with my weight', pain2: 'trying every diet with no lasting results', transformation: 'finally found something that actually works long-term', e1: '🔥', e2: '💪', hashtags: ['#WeightLossJourney', '#HealthyLifestyle', '#FatLoss', '#TransformationTuesday', '#BodyGoals', '#HealthFirst', '#WeightLossTips', '#FitLife', '#GetFit', '#HealthyChoices'] },
    'essential-oils': { productLabel: 'essential oils', benefit1: 'a naturally healthier home and family', benefit2: 'clean solutions that actually work', pain1: 'relying on harsh chemicals and synthetic products', pain2: 'wanting a more natural lifestyle but not knowing where to start', transformation: 'created a toxin-free, thriving home environment', e1: '🌿', e2: '💚', hashtags: ['#EssentialOils', '#NaturalLiving', '#CleanHome', '#WellnessFamily', '#Aromatherapy', '#NaturalRemedies', '#OilLife', '#HolisticHealth', '#CleanLiving', '#NaturalHealth'] },
    'travel': { productLabel: 'travel membership', benefit1: 'luxury travel at prices that actually make sense', benefit2: 'the freedom to see the world on your terms', pain1: 'watching others travel while feeling stuck', pain2: 'travel always feeling out of reach financially', transformation: 'started living the travel lifestyle I only used to dream about', e1: '✈️', e2: '🌍', hashtags: ['#TravelLife', '#TravelMore', '#WorldTravel', '#TravelOpportunity', '#ExploreTheWorld', '#TravelGoals', '#Wanderlust', '#TravelBusiness', '#TravelHacks', '#TravelCommunity'] },
    'pet-products': { productLabel: 'premium pet products', benefit1: 'a healthier, happier fur baby', benefit2: 'peace of mind knowing my pet is thriving', pain1: 'worrying about my pet\'s health', pain2: 'spending a fortune on vet bills while my pet still wasn\'t thriving', transformation: 'transformed my pet\'s health with natural solutions', e1: '🐾', e2: '❤️', hashtags: ['#PetHealth', '#DogMom', '#CatMom', '#PetWellness', '#NaturalPetCare', '#FurBaby', '#PetParent', '#HealthyPets', '#PetLife', '#AnimalLover'] },
    'other': { productLabel: 'these products', benefit1: 'incredible, life-changing results', benefit2: 'a lifestyle I\'m proud of', pain1: 'struggling with the same old problems', pain2: 'not seeing the results you know you deserve', transformation: 'completely changed my life for the better', e1: '🌟', e2: '✨', hashtags: ['#NetworkMarketing', '#DirectSales', '#WorkFromHome', '#Entrepreneur', '#BusinessOpportunity', '#SuccessMindset', '#HustelCulture', '#BuildYourDream', '#MLM', '#SideHustle'] }
  }
  const audienceData: Record<Audience, { label: string }> = {
    'busy-moms': { label: 'busy moms' },
    'fitness': { label: 'fitness enthusiasts' },
    'entrepreneurs': { label: 'entrepreneurs' },
    'seniors': { label: 'active seniors' },
    'college': { label: 'college students' },
    'work-from-home': { label: 'work-from-home professionals' },
    'health-conscious': { label: 'health-conscious go-getters' }
  }
  const goalData: Record<ContentGoal, { cta: string }> = {
    'awareness': { cta: 'Comment "TELL ME MORE" below if you want to know what finally worked for me! 👇' },
    'leads': { cta: 'Drop your email below or DM me "INFO" and I\'ll send you all the details! 📩' },
    'book-calls': { cta: 'Ready to see if this is right for you? DM me "CALL" and let\'s chat! 📞' },
    'recruit': { cta: 'Looking for 3 people who want to turn this into a real business. DM me "TEAM" if that\'s you! 🚀' },
    'retain': { cta: 'Already on this journey with me? Drop a ❤️ below — I love seeing our community thrive!' },
    'launch': { cta: 'NEW product launching this week. Comment "LAUNCH" to be the first to know! 🎉' },
    'team-culture': { cta: 'Tag a teammate who needs to see this today! You know who they are. 👇' }
  }
  const i = industryData[config.industry]
  const a = audienceData[config.audience]
  const g = goalData[config.goal]
  return {
    productLabel: i.productLabel!, audienceLabel: a.label,
    benefit1: i.benefit1!, benefit2: i.benefit2!,
    pain1: i.pain1!, pain2: i.pain2!,
    transformation: i.transformation!,
    e1: i.e1!, e2: i.e2!, cta: g.cta, hashtags: i.hashtags!
  }
}

type Tpl = (c: Ctx, v: number) => string

const fbTemplates: Tpl[] = [
  (c, v) => {
    const ops = [`Can I be honest with you for a second? 🙋‍♀️`, `Story time — and I promise this one has a happy ending. 📖`, `Real talk, fellow ${c.audienceLabel}...`, `Raise your hand if you know the feeling of ${c.pain1}. 🙋`, `I used to think ${c.pain1} was just my normal.`]
    const mids = [`I was dealing with ${c.pain2}. Every. Single. Day. Until I found ${c.productLabel}.`, `For years, ${c.pain2} was just my life. I tried everything. Nothing stuck. Then I found ${c.productLabel}.`, `Being a ${c.audienceLabel} means juggling everything. ${c.pain2} shouldn't be part of the equation.`, `I spent so much time and money trying to fix ${c.pain2}. Then ${c.productLabel} changed everything.`, `The moment I ${c.transformation}? I knew I had to share this with every ${c.audienceLabel} I know.`]
    return `${ops[v]}\n\n${mids[v]}\n\nThe result? I ${c.transformation}. And now I have ${c.benefit1} that I honestly didn't think was possible for someone like me.\n\n${c.e1} ${c.cta}`
  },
  (c, v) => {
    const hooks = [`3 things I wish someone had told me sooner about ${c.benefit1}:`, `Why are so many ${c.audienceLabel} still struggling with ${c.pain1}? Here's the real answer:`, `Nobody talks about this — but it's exactly why you might still be dealing with ${c.pain1}:`, `Want ${c.benefit1}? Avoid these 3 mistakes most ${c.audienceLabel} make:`, `The overlooked secret to ${c.benefit1} that nobody in the industry wants to talk about:`]
    return `${hooks[v]}\n\n${c.e1} Most approaches only treat the symptom, not the root cause.\n\n${c.e2} Quick fixes give quick results — that disappear just as fast.\n\n✅ Lasting change requires the right tools AND the right support system.\n\nThat's exactly why I started sharing ${c.productLabel} — it checks all three boxes, and my results prove it.\n\nWhich one surprised you most? Comment below! 👇\n\n${c.cta}`
  },
  (c, v) => {
    const tfs = ['30 days', '60 days', 'a few short weeks', 'just one month', '6 weeks']
    const befs = [`I was ${c.pain2}. I was tired. I was frustrated.`, `My energy was at zero. My confidence? Even lower.`, `${c.pain2} had become my "normal." I didn't even realize how far I'd slipped.`, `I'd tried everything. Nothing worked. I was starting to think nothing ever would.`, `Being a ${c.audienceLabel} and dealing with ${c.pain1} at the same time? Completely draining.`]
    return `${tfs[v]} ago:\n\n${befs[v]}\n\nToday?\n\nI ${c.transformation}. I have ${c.benefit1}. I wake up genuinely excited about the day ahead. ${c.e1}\n\nWhat changed? ${c.productLabel}.\n\nNot magic. Not hype. Just the exact thing I needed — and I have a feeling it might be what you need too.\n\n${c.cta}`
  },
  (c, v) => {
    const qs = [`Quick question for my fellow ${c.audienceLabel}: how often do you actually put YOURSELF first?`, `Be honest: are you where you want to be when it comes to ${c.benefit1}?`, `What would your life actually look like if you had ${c.benefit1}?`, `If someone told you they had the real answer to ${c.pain1}, would you even listen?`, `${c.audienceLabel} — what's the ONE thing you'd change about how you feel right now?`]
    return `${qs[v]} ${c.e1}\n\nFor me, the answer used to be "never." I was always the last person on my own to-do list.\n\nThen I started using ${c.productLabel} and experienced ${c.benefit1} for the first time in years. Now I have ${c.benefit2} too.\n\nAnd now I'm the one people come to asking, "What's different about you?"\n\nI love being able to point them to exactly what worked for me. ${c.e2}\n\nWhat's your answer to my question? Drop it in the comments — I read every single one. 👇\n\n${c.cta}`
  },
  (c, v) => {
    const ts = [`FREE tips for every ${c.audienceLabel} dealing with ${c.pain1}:`, `Save this post. You'll want it later. 📌`, `My personal roadmap to ${c.benefit1} — sharing this because it worked:`, `If I could tell every ${c.audienceLabel} just ONE thing today, it would be this:`, `The 3-step approach I used to go from ${c.pain1} to ${c.benefit1}:`]
    return `${ts[v]}\n\n✅ Step 1: Stop trying to do it all alone. The right tools matter.\n\n✅ Step 2: Be consistent. Real transformation doesn't happen overnight — but it does happen.\n\n✅ Step 3: Find your people. Community is the multiplier nobody talks about.\n\nThat's exactly what ${c.productLabel} gave me — tools, results, AND community. ${c.e2}\n\nWant the details? ${c.cta}`
  },
  (c, v) => {
    const us = [`If you've been on the fence...`, `This is your sign. 🪧`, `Let me make this simple:`, `No fluff. No hype. Just facts:`, `I'm going to be direct with you today:`]
    return `${us[v]}\n\nIf you're a ${c.audienceLabel} still dealing with ${c.pain2}...\nIf you've tried solutions that promised everything and delivered nothing...\nIf you're genuinely ready to experience ${c.benefit1}...\n\n...then ${c.productLabel} deserves 5 minutes of your time. That's literally all I'm asking.\n\nI was skeptical too. But I ${c.transformation} — and I've watched it work for dozens of people just like you.\n\n${c.e1} ${c.cta}`
  }
]

const igTemplates: Tpl[] = [
  (c, v) => { const ls = [`${c.e1} When you're a ${c.audienceLabel} and you FINALLY find something that actually works for ${c.pain1}... you share it. That's just what you do. ✨\n\n${c.cta}`, `Real results > empty promises. ${c.e1} Ask me how I went from ${c.pain1} to ${c.benefit1}. DM me or comment below! 👇`, `Before ${c.productLabel}: ${c.pain2}.\nAfter: ${c.transformation} ${c.e2}\n\n${c.cta}`, `Not a coincidence. Not luck. Just the right ${c.productLabel} doing exactly what it says it will. ${c.e1}\n\n${c.cta}`, `If ${c.pain1} is your story right now... it genuinely doesn't have to be. ${c.e2}\n\n${c.cta}`]; return ls[v] },
  (c, v) => { const ls = [`"${c.benefit1}? I'll believe it when I see it." — Me, 6 months ago ${c.e1}\n\nNow? I'm a believer. And I want the same for you.\n\n${c.cta}`, `The thing about ${c.productLabel} that surprised me most:\n\nIt actually works. ${c.e2}\n\n${c.cta}`, `${c.audienceLabel}: you deserve ${c.benefit1}. Not someday. NOW. ${c.e1}\n\n${c.cta}`, `I stopped making excuses and started seeing results. Here's how. ${c.e2}\n\nDM me "HOW" and I'll tell you everything.`, `If I can ${c.transformation}, you absolutely can too. ${c.e1}\n\n${c.cta}`]; return ls[v] },
  (c, v) => { const ls = [`Day 1 vs Day 30. The difference? ${c.productLabel}. ${c.e1}\n\nThe results don't lie. ${c.cta}`, `Plot twist: the answer to ${c.pain1} wasn't another diet, another product, or another program.\n\nIt was finding the RIGHT one. ${c.e2}\n\n${c.cta}`, `${c.e1} ${c.benefit1}\n${c.e2} ${c.benefit2}\n✅ ${c.transformation}\n\nAll from ${c.productLabel}. DM me to learn more.`, `Honest review of ${c.productLabel} after using it consistently:\n\n✅ Actually works\n✅ Worth every penny\n✅ Changed my life\n\n${c.e1} ${c.cta}`, `What if ${c.pain1} wasn't something you had to live with? ${c.e2}\n\nBecause it isn't. ${c.cta}`]; return ls[v] }
]

function pickHashtags(ctx: Ctx, day: number): string[] {
  const general = ['#NetworkMarketing', '#DirectSales', '#MLM', '#BusinessOwner', '#WorkFromHome', '#SmallBusiness', '#Entrepreneur', '#OnlineBusiness']
  const all = [...ctx.hashtags, ...general]
  const start = (day * 3) % all.length
  return [...all.slice(start, start + 8), ...all.slice(0, Math.max(0, 8 - (all.length - start)))].slice(0, 8)
}

function generateReelsScripts(ctx: Ctx): ReelsScript[] {
  const scripts: ReelsScript[] = [
    { title: 'The Before & After', hook: `POV: You're a ${ctx.audienceLabel} who finally found the solution to ${ctx.pain1} 👀`, body: `Okay so real talk — I was ${ctx.pain2}. I tried EVERYTHING. Then I found ${ctx.productLabel} and within weeks I ${ctx.transformation}. Here's exactly what changed...`, cta: `Comment "HOW" below and I'll send you all the details! ${ctx.e1}` },
    { title: 'The 3 Mistakes', hook: `3 reasons why most ${ctx.audienceLabel} are STILL dealing with ${ctx.pain1} (and how to fix it)`, body: `Mistake #1: Trying to do it all alone. Mistake #2: Going for the cheapest option. Mistake #3: Giving up before the results kick in. Sound familiar? Here's what actually works instead...`, cta: `Drop "MISTAKES" in the comments if this hit home! ${ctx.e2}` },
    { title: 'Day In My Life', hook: `How I went from ${ctx.pain1} to ${ctx.benefit1} — a real day in my life`, body: `Morning used to be rough. Now with ${ctx.productLabel} in my routine, everything shifted. Here's what a typical day looks like now vs. before...`, cta: `Want my exact routine? DM me "ROUTINE" and I'll share it! ${ctx.e1}` },
    { title: 'Myth Busting', hook: `Everything you think you know about fixing ${ctx.pain1} is wrong`, body: `Myth 1: You need willpower. FALSE. Myth 2: It takes forever to see results. FALSE. Myth 3: It's expensive. FALSE. Here's what actually worked for me and dozens of other ${ctx.audienceLabel}...`, cta: `Share this with a ${ctx.audienceLabel} who needs to hear this! ${ctx.e2}` },
    { title: 'The Honest Review', hook: `Honest review of ${ctx.productLabel} — no sugarcoating`, body: `What I expected: moderate results. What I got: ${ctx.transformation}. The good, the great, and the "why didn't I start sooner" — here's my real experience...`, cta: `Questions? Drop them below or DM me! ${ctx.e1}` },
    { title: 'This or That', hook: `${ctx.pain1} vs ${ctx.benefit1} — which is your reality right now?`, body: `If you said ${ctx.pain1}... you're not alone. That was me too. But here's the thing — it doesn't have to stay that way. ${ctx.productLabel} changed everything for me and I want to show you how...`, cta: `Comment your current reality below! ${ctx.e2}` },
    { title: 'The 30-Day Challenge', hook: `I challenged myself to use ${ctx.productLabel} for 30 days straight. Here's what happened:`, body: `Week 1: Skeptical but committed. Week 2: Started noticing something. Week 3: People were asking what was different. Week 4: ${ctx.transformation}. Full breakdown in the comments...`, cta: `Comment "30 DAYS" if you want to try this yourself! ${ctx.e1}` },
    { title: 'Get Ready With Me', hook: `Get ready with me while I talk about how I finally fixed ${ctx.pain1}`, body: `So while I'm doing my thing here, let me tell you about the one change that made the biggest difference for my ${ctx.audienceLabel} life. It started when I discovered ${ctx.productLabel}...`, cta: `Save this video for later and DM me "TELL ME MORE" ${ctx.e2}` },
    { title: 'Responding to DMs', hook: `Responding to DMs about how I ${ctx.transformation}`, body: `You guys keep asking me what changed, so here's your answer: ${ctx.productLabel}. I get this question literally every day now and I want to answer it publicly because so many of you need to hear this...`, cta: `DM me "INFO" and I'll send you everything you need! ${ctx.e1}` },
    { title: 'Green Flag List', hook: `Green flags that ${ctx.productLabel} is actually going to work for you 🟢`, body: `Green flag ✅ You're a ${ctx.audienceLabel} dealing with ${ctx.pain1}. Green flag ✅ You want ${ctx.benefit1}. Green flag ✅ You're tired of solutions that don't deliver. Green flag ✅ You're ready to actually commit. If you checked all four...`, cta: `Comment "ALL FOUR" below! This is for you. ${ctx.e2}` }
  ]
  return scripts
}

function generateStorySequences(ctx: Ctx): StorySequence[] {
  return [
    { title: 'My Transformation Story', frames: [{ frame: 1, text: `This time last year, I was ${ctx.pain2}. 😔`, tip: 'Use a "before" photo or sad face emoji' }, { frame: 2, text: `I tried everything. Nothing worked. I was ready to give up.`, tip: 'Relate to the struggle — be vulnerable' }, { frame: 3, text: `Then a friend introduced me to ${ctx.productLabel}. I was skeptical. But I tried it anyway.`, tip: 'Build curiosity — don\'t reveal the results yet' }, { frame: 4, text: `Today? I ${ctx.transformation}. I have ${ctx.benefit1}. ${ctx.e1}`, tip: 'Show the after — photo, celebration emoji, etc.' }, { frame: 5, text: `Swipe up / DM me "STORY" if you want to know exactly what I did! 👆`, tip: 'Clear call to action — make it easy to respond' }] },
    { title: '3 Tips for Fellow ' + ctx.audienceLabel, frames: [{ frame: 1, text: `3 tips every ${ctx.audienceLabel} dealing with ${ctx.pain1} needs RIGHT NOW ${ctx.e1}`, tip: 'Bold text, bright background — stop the scroll' }, { frame: 2, text: `Tip 1: Stop fighting it alone. The right support system changes everything.`, tip: 'Keep text short — one idea per frame' }, { frame: 3, text: `Tip 2: Consistency beats perfection. 5 minutes a day beats 5 hours once a week.`, tip: 'Add a related emoji or graphic' }, { frame: 4, text: `Tip 3: Invest in the RIGHT solution, not just the cheapest one. Quality matters.`, tip: 'This sets up your product naturally' }, { frame: 5, text: `DM me "TIPS" if you want to know my full approach! ${ctx.e2}`, tip: 'Easy, low-barrier CTA' }] },
    { title: 'Behind the Scenes', frames: [{ frame: 1, text: `Ever wonder what my morning actually looks like? Let me show you 👀`, tip: 'Curiosity hook — people love BTS content' }, { frame: 2, text: `6am: ${ctx.productLabel} is the FIRST thing I do. Non-negotiable.`, tip: 'Real routine = relatability + subtle product mention' }, { frame: 3, text: `By 8am, I have ${ctx.benefit1} that lasts all day. Game changer.`, tip: 'Share the benefit naturally, not salesy' }, { frame: 4, text: `Before this routine: ${ctx.pain2}. After: ${ctx.transformation} ${ctx.e1}`, tip: 'Before/after in one frame = powerful' }, { frame: 5, text: `Want my full routine? Comment "ROUTINE" on my latest post! 👇`, tip: 'Drive them to your feed — boosts post engagement too' }] }
  ]
}

function generateCTAs(ctx: Ctx): string[] {
  return [
    `Comment "TELL ME MORE" below and I'll send you all the details! ${ctx.e1}`,
    `DM me "INFO" right now and let's talk. ${ctx.e2}`,
    `Drop a ❤️ if this resonated — I love connecting with my people!`,
    `Share this with someone who NEEDS to see it today. You know who. 👇`,
    `Save this post — you'll want to come back to it. 📌`,
    `Tag a ${ctx.audienceLabel} who's been dealing with ${ctx.pain1}. Tag them below! 👇`,
    `Click the link in my bio to learn everything. ${ctx.e1}`,
    `DM me the word "YES" and I'll reach out personally. ${ctx.e2}`,
    `Reply to this with your biggest struggle and let's figure it out together! 💬`,
    `Comment "READY" if you're finally ready to stop settling for ${ctx.pain1}! 🔥`,
    `Follow me for daily tips on achieving ${ctx.benefit1}! ${ctx.e1}`,
    `Share your story in the comments — I want to hear where you're at! 👇`,
    `Hit the "like" button if you've ever dealt with ${ctx.pain1}. Let me know I'm not talking to myself! 😄`,
    `DM me "SAMPLE" and I'll hook you up. Seriously. ${ctx.e2}`,
    `Screenshot this and send it to your best friend. They need this too. 📸`
  ]
}

function generateProspectingDMs(ctx: Ctx): ProspectingDM[] {
  return [
    { scenario: 'Cold outreach — mutual connection', message: `Hey [Name]! We have [mutual friend] in common and I've loved seeing your posts lately. Quick question — are you currently open to learning about something that could help with ${ctx.pain1}? No pressure at all, just thought of you! ${ctx.e1}` },
    { scenario: 'Warm lead — posted about a struggle', message: `Hey [Name]! I saw your post about ${ctx.pain1} and it literally made me stop scrolling. I was in the exact same boat not long ago. I know you didn't ask, but would you be open to hearing what finally worked for me? ${ctx.e2}` },
    { scenario: 'Referral outreach', message: `Hey [Name]! [Referrer's name] told me I had to reach out to you. They said you've been dealing with ${ctx.pain1} and honestly — that's literally why I started sharing ${ctx.productLabel}. Is it cool if I share a little more? ${ctx.e1}` },
    { scenario: 'Re-engaging a past contact', message: `Hey [Name]! It's been a while — hope you're doing amazing! I was just thinking about you and wanted to check in. Are you still dealing with ${ctx.pain1}? I've found something that made a huge difference for me and I'd love to share if you're open to it. ${ctx.e2}` },
    { scenario: 'Comment to DM conversion', message: `Hey [Name]! Thanks so much for commenting on my post — I saw you said [their comment]. It sounds like you might be in a similar spot to where I was. Would you be open to a quick 10-minute chat? I'd love to share what's been working! ${ctx.e1}` }
  ]
}

function generateFollowUpSequences(ctx: Ctx): FollowUpSequence[] {
  return [
    {
      scenario: 'Prospect watched the video / saw info but hasn\'t responded',
      messages: [
        { day: 1, text: `Hey [Name]! Just wanted to make sure you got a chance to check out everything I sent over. No rush at all — just let me know if you have any questions! ${ctx.e1}` },
        { day: 3, text: `Hey [Name]! Checking back in. I know life gets busy! I just thought of you because [specific reason related to their situation]. Still happy to chat if you're curious! ${ctx.e2}` },
        { day: 7, text: `Hey [Name]! Last thing I'll say on this — I totally get it if it's not the right time. But I'd hate for you to keep dealing with ${ctx.pain1} when there's a real solution available. If you ever want to revisit this, I'm here! ${ctx.e1}` }
      ]
    },
    {
      scenario: 'Prospect said "maybe later" or "let me think about it"',
      messages: [
        { day: 3, text: `Hey [Name]! Just circling back from our chat. No pressure at all — I just wanted to share something that might help you make your decision: [testimonial or result]. Has anything changed on your end? ${ctx.e2}` },
        { day: 10, text: `Hey [Name]! Hope everything's going well! I had a customer who was in a similar situation to yours and they finally decided to give it a shot — and wow, the results were incredible. Thought of you right away! ${ctx.e1}` },
        { day: 21, text: `Hey [Name]! Checking in one last time. I don't want to keep bugging you — but I do care about your results. If ${ctx.pain1} is still something you're dealing with, I'm still here. Always. ${ctx.e2}` }
      ]
    }
  ]
}

export function generate30DayContent(config: ContentConfig): ContentPack {
  const ctx = buildCtx(config)
  const days: DayContent[] = []
  for (let day = 1; day <= 30; day++) {
    const archIdx = (day - 1) % fbTemplates.length
    const varIdx = Math.floor((day - 1) / fbTemplates.length) % 5
    const igArchIdx = (day - 1) % igTemplates.length
    const igVarIdx = Math.floor((day - 1) / igTemplates.length) % 5
    days.push({
      day,
      facebook: fbTemplates[archIdx](ctx, varIdx),
      instagram: igTemplates[igArchIdx % igTemplates.length](ctx, igVarIdx),
      hashtags: pickHashtags(ctx, day)
    })
  }
  return {
    config,
    days,
    reelsScripts: generateReelsScripts(ctx),
    storySequences: generateStorySequences(ctx),
    ctas: generateCTAs(ctx),
    prospectingDMs: generateProspectingDMs(ctx),
    followUpSequences: generateFollowUpSequences(ctx)
  }
}

// Recruiting messages
export interface RecruitingConfig {
  prospectType: string
  situation: string
  tone: 'casual' | 'professional' | 'urgent'
}

export function generateRecruitingMessages(config: RecruitingConfig): string[] {
  const tones = {
    casual: ['Hey', 'Quick thing', 'So random but'],
    professional: ['I hope this message finds you well.', 'I wanted to reach out personally.', 'I\'ve been thinking about you lately.'],
    urgent: ['This is time-sensitive but I had to reach out.', 'I only have a couple spots left and thought of you immediately.', 'I\'m expanding and you came to mind right away.']
  }
  const t = tones[config.tone]
  return [
    `${t[0]} [Name]! I know this is out of nowhere, but I've been watching your journey as a ${config.prospectType} and I think you'd be incredible at what I do. You have [quality you admire]. Would you be open to a 10-minute call just to hear about it? Zero pressure, I promise. 🙌`,
    `${t[1]} [Name] — I'm reaching out because I'm looking for a few ${config.prospectType}s to join my team, and your name kept coming up in my head. You clearly [positive trait]. Have you ever considered creating an income stream outside of [their current situation]?`,
    `${t[2]} [Name]! So I'm in the middle of building something really exciting and I'm being very selective about who I invite. I thought of you because ${config.situation}. Is this something you'd be open to exploring? Even just a quick 10-minute chat?`,
    `[Name], I'll be direct. I'm looking for my next 3 teammates. I've seen how you [positive observation about them]. I think you have exactly the qualities that make someone successful at this. Can I share what I'm working on?`,
    `Hey [Name]! Random question — are you happy with where your income is right now? No judgment either way, I'm just asking because I have something that might be relevant to you as a ${config.prospectType}. Worth a quick chat? ☕`
  ]
}

// Objection responses
export interface ObjectionResponse {
  objection: string
  empathetic: string
  logical: string
  story: string
}

export function generateObjectionResponse(objection: string): ObjectionResponse {
  const responses: Record<string, ObjectionResponse> = {
    "I don't have time": { objection: "I don't have time", empathetic: `I totally hear you — and I'd be worried if you said you had tons of free time, because that would mean something's off! That's exactly why I got involved: this works around YOUR schedule. I spend about [X hours] per week on it, and it fits between everything else in my life. Can I show you how?`, logical: `Here's the thing about time: we all have the same 24 hours. The question is what we do with a few of them. Most people in this find they can fit it in with 30-60 minutes a day — during commutes, lunch breaks, or evenings. What does your day look like? Let's see if there's a fit.`, story: `I said the exact same thing when [upline name] first approached me. I was juggling [your situation] and I literally laughed when she suggested I could build a business. But she showed me how she was doing it in 45 minutes a day, and I decided to try. 6 months later, I have more time freedom than I've ever had in my life. Ironic, right?` },
    "Is this an MLM?": { objection: "Is this an MLM?", empathetic: `I get it — that word carries a lot of baggage! And honestly? Your skepticism is smart. There ARE bad actors out there. Here's what I'd say: look at the products, look at the compensation structure, and look at real results from real people. What specifically concerns you about the MLM model?`, logical: `Multi-level marketing is just a distribution model — the same way Amazon uses affiliates or Starbucks uses franchise locations. The FTC has clear guidelines, and any company doing it right follows them. What matters is: are the products real? Do they work? Is the income opportunity transparent? I can show you all of that.`, story: `I asked the same question, and I almost walked away because of it. What made me stay was actually doing the research. I looked at the products (which I now use every day), I talked to people making real money, and I decided the stigma wasn't worth missing out on something that's genuinely changed my life. Would you be open to just seeing the info?` },
    "I'm not a salesperson": { objection: "I'm not a salesperson", empathetic: `Good — I'm not either! And honestly, the best people in this business aren't "salespeople." They're just people who love a product and share it naturally. If you've ever recommended a restaurant, a Netflix show, or a product you love to a friend — you've already done what this requires.`, logical: `Traditional sales is about convincing people to buy things they don't need. What we do is share something we genuinely believe in with people who might actually benefit. The "sales" part is just having conversations. You clearly know how to have conversations. The rest is just learning a few simple systems.`, story: `I thought the same thing! I was terrified of "selling." Then someone reminded me: every time you recommend something to a friend, that's sharing. Not selling. The day I stopped thinking of it as sales and started thinking of it as sharing something I love — everything changed. My "sales" tripled because I stopped trying to sell.` },
    "It's too expensive": { objection: "It's too expensive", empathetic: `I hear you — and that's a fair thing to consider. Can I ask: too expensive compared to what? Because when I look at what I was spending on [alternative solutions that didn't work], this actually costs me less. But I want to make sure we're comparing apples to apples. What are you currently investing in [problem it solves]?`, logical: `Let's break it down. [Price] divided by 30 days = [daily cost]. That's less than a Starbucks coffee. And unlike coffee, this [specific benefit]. Also, there's a [satisfaction guarantee/trial period] so there's no real risk. Does that math work for you?`, story: `I almost said the same thing. Then I did the math: I was spending way more than that every month on [alternatives] that weren't working. When I switched to this, my overall spend actually went DOWN and my results went WAY up. Sometimes "expensive" is actually the cheap option in disguise.` },
    "I need to talk to my spouse": { objection: "I need to talk to my spouse", empathetic: `That's awesome — it means you make decisions together and I respect that so much. Of course! Would it help if I put together a simple overview you could share with them? Or even better — could we set up a quick call where you're both on? I love meeting supportive partners.`, logical: `Totally makes sense. Here's what I'd suggest: let me give you a quick overview of the key things they'll probably want to know — the cost, the time commitment, and the income potential. Then you'll have all the facts ready. What are their biggest questions likely to be?`, story: `My husband was skeptical at first too. I was nervous to even bring it up! What actually helped us was me putting together a simple one-pager with the cost, time commitment, and realistic income timeline. He saw the numbers and gave me 3 months to prove it. I proved it in 6 weeks. Now he's my biggest cheerleader. Would a resource like that help?` },
    "I tried this before and it didn't work": { objection: "I tried this before and it didn't work", empathetic: `That's real, and I'm sorry that happened. Can I ask — what specifically didn't work? The product, the business side, or both? Because a lot of people who tried a different company come to this one and have completely different results. I want to understand what went wrong before I say anything else.`, logical: `Not all companies in this space are created equal. The product quality, the support system, the training, and the compensation plan vary wildly. What company was it? I'd love to show you specifically where we're different — because if we weren't different, I wouldn't have gotten involved either.`, story: `I heard you — I was actually burned before too. Different company, similar product category. And I almost let that experience stop me from even looking at this. What made me try again was seeing the difference in the product quality and the community. It's not the same experience. Not even close. Can I share what changed my mind?` }
  }
  return responses[objection] || {
    objection,
    empathetic: `That's a completely valid concern and I'm glad you brought it up. Tell me more — what's behind that hesitation? I want to make sure I actually address what matters to you, not just give you a script. ${objection} is something I've heard before and there's always a real answer. What specifically is worrying you?`,
    logical: `Great question. Here's how I'd think through it: [Acknowledge the concern + data/facts that reframe it]. The key thing to understand is that [core value proposition]. Does that address what you were thinking about?`,
    story: `You know what? I had the exact same hesitation. And here's what changed my mind: [personal story related to this objection]. I realized that [insight]. Does that resonate with where you're at?`
  }
}

// Team training content
export interface TeamTrainingConfig {
  topic: 'onboarding' | 'motivation' | 'skills' | 'recognition' | 'culture' | 'launch'
  teamName?: string
}

export function generateTeamContent(config: TeamTrainingConfig): string {
  const scripts: Record<TeamTrainingConfig['topic'], string> = {
    onboarding: `🎉 WELCOME TO THE TEAM, [NAME]! 🎉\n\nWe are SO excited you're here. Here's your quick-start checklist for your first 24 hours:\n\n✅ Step 1: Join our team Facebook/WhatsApp group (link below)\n✅ Step 2: Set up your personal account and profile\n✅ Step 3: Order your starter kit or personal product order\n✅ Step 4: Make your "Dream List" — write down 100 names of people you know\n✅ Step 5: Book your kickoff call with me (link below)\n\n📌 YOUR ONLY JOB THIS WEEK: Learn the products, use the products, share how you feel. That's it. Don't overthink it.\n\nI'm here every single step of the way. You made an incredible decision. Let's GO! 🚀`,
    motivation: `Good morning, team! ${'\n\n'}Here's your Monday mindset reset: 💪${'\n\n'}The people who build big in this business don't wait for motivation. They build discipline. They show up when it's hard, when it's slow, when they feel like nobody cares.${'\n\n'}And then one day — they wake up and the results are undeniable.${'\n\n'}Your only job today:\n→ Make 5 connections\n→ Follow up with 3 people\n→ Post something real and authentic${'\n\n'}That's it. 5-3-1. Can you do that today? Drop a 🔥 if you're in!`,
    skills: `📚 SKILL BUILDER: How to Handle "I Need to Think About It"${'\n\n'}When a prospect says this, most people panic. Here's what the pros do instead:${'\n\n'}Step 1: Don't push. Acknowledge it. "Of course! That's totally fair."\n\nStep 2: Clarify. "Can I ask — is there a specific question you're working through? I want to make sure you have everything you need to decide."\n\nStep 3: Schedule. "When would be a good time to circle back? I just want to make sure you don't get left hanging."\n\nStep 4: Send value. While they're thinking, send a testimonial, a video, or a personal story related to their situation.\n\nThe goal isn't to close them TODAY. It's to stay top of mind with value until they're ready. Practice this script with a teammate this week! 💬`,
    recognition: `🏆 RECOGNITION CORNER — let's celebrate our ROCKSTARS this week! 🏆${'\n\n'}🥇 TOP SELLER: [Name] — absolutely crushed it with [X] sales this week! 👏${'\n\n'}🌟 MOST IMPROVED: [Name] — went from [before] to [after] this month. SO proud of you!${'\n\n'}💪 HUSTLE AWARD: [Name] — making calls, showing up, refusing to quit. This is what it looks like.${'\n\n'}🎯 MILESTONE MOMENT: [Name] just hit [rank/goal]! This is what commitment looks like!${'\n\n'}Every person above started exactly where you are now. Your turn is coming. Keep going. 🚀${'\n\n'}Who do YOU want to shoutout this week? Drop it in the comments! 👇`,
    culture: `Hey team — quick culture check. 💜${'\n\n'}We are building something rare here. A team where:${'\n\n'}✨ We lift each other UP, never tear each other down\n✨ We celebrate each other's wins like they're our own\n✨ We show up even when we don't feel like it\n✨ We tell the truth — even when it's hard\n✨ We play the long game, not the get-rich-quick game${'\n\n'}This isn't just a business. It's a community. And the culture we build together will either attract the right people — or repel them.${'\n\n'}So I'll ask: what kind of teammate are YOU choosing to be this week?${'\n\n'}Drop your commitment below. Let's hold each other to it. 🙌`,
    launch: `🚀 LAUNCH WEEK GAMEPLAN — Let's GOOOO! 🚀${'\n\n'}New product/promotion drops [DATE] and we need ALL HANDS ON DECK. Here's the plan:${'\n\n'}📅 BEFORE LAUNCH:\n→ Tease it on your stories (don't reveal everything — build curiosity!)\n→ DM your top 10 people: "Something BIG is coming and I thought of you"\n→ Prepare your "launch posts" in advance (I'll share templates in the group)${'\n\n'}📅 LAUNCH DAY:\n→ Post at [TIME] — we're going LIVE together\n→ Go to your warm list and personally invite each person\n→ Share customer reactions in real time${'\n\n'}📅 AFTER LAUNCH:\n→ Follow up with everyone who engaged\n→ Share early results and testimonials\n→ Keep the momentum going for 48 hours${'\n\n'}ANY QUESTIONS? Drop them below. We're doing this TOGETHER. 🔥`
  }
  return scripts[config.topic]
}

// Personal brand builder
export interface BrandConfig {
  name: string
  strength: string
  audience: string
  story: string
}

export interface BrandPackage {
  positioningStatement: string
  contentPillars: { pillar: string; description: string; postIdeas: string[] }[]
  bios: Record<string, string>
  storyHooks: string[]
}

export function generatePersonalBrand(config: BrandConfig): BrandPackage {
  return {
    positioningStatement: `I'm ${config.name}, and I help ${config.audience} achieve [result] through [method]. My unique edge is ${config.strength}, and I know firsthand what it's like to [pain point] — because I've been there. Now I'm on a mission to [bigger purpose].`,
    contentPillars: [
      { pillar: '🌟 Personal Story & Transformation', description: 'Your journey is your brand. Share the before, the turning point, and the after.', postIdeas: ['My rock-bottom moment and what changed', 'The day I made the decision that changed everything', 'What nobody tells you about [your transformation]'] },
      { pillar: '💡 Education & Value', description: 'Position yourself as the go-to expert. Teach generously.', postIdeas: ['3 mistakes I see [audience] making constantly', 'The truth about [common misconception in your niche]', 'Here\'s exactly what I did to achieve [result]'] },
      { pillar: '👥 Community & Connection', description: 'Build belonging. Make your audience feel seen and understood.', postIdeas: ['Can I get a show of hands if you\'ve ever dealt with [pain]', 'Tag someone who needs to hear this today', 'Tell me your biggest struggle in the comments — I read all of them'] }
    ],
    bios: {
      instagram: `${config.strength} ✨ Helping ${config.audience} [achieve result] 💪 ${config.story} ⬇️ Free resource for you below`,
      facebook: `Hi! I'm ${config.name} — ${config.strength.toLowerCase()}. I'm passionate about helping ${config.audience} [achieve result] without [common frustration]. After [your story/background], I discovered [what changed things], and now I share what's working for me and the people I work with. If you're on a journey toward [goal], you're in the right place. 💜`,
      linkedin: `${config.name} | Helping ${config.audience} achieve [result] | ${config.strength} | [Your title/company] | Connect with me to learn about [your mission].`,
      tiktok: `${config.name} | ${config.strength} | ${config.audience} | [Signature content type, e.g. "daily tips for..."] | DM me "START" to begin 👇`
    },
    storyHooks: [
      `I used to be the [negative thing]. Now I [positive outcome]. Here's the exact moment everything changed:`,
      `The thing about being a ${config.audience} that nobody warns you about:`,
      `[Controversial opinion about your niche]. Here's why I believe this so strongly:`,
      `I got a DM last week that stopped me cold. It said "[vulnerable quote]." And it reminded me why I do this.`,
      `3 years ago I was [hard situation]. If you had told me then that I'd be [current situation], I would have laughed. Here's what changed:`,
      `The hardest thing I ever admitted publicly: [vulnerable truth].`,
      `I almost quit [X times]. Here's what kept me going:`,
      `What I wish I could go back and tell myself when I was first starting:`,
      `The one thing that separates people who succeed at [goal] from those who don't:`,
      `My [mentor/friend/stranger] said one thing to me that completely changed how I see [topic]:`
    ]
  }
}
