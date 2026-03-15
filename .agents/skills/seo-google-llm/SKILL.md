---
name: seo-google-llm
description: 'Plan, write, and optimize pages and blog posts for Google SEO and LLM discoverability. Use when creating new content, refreshing underperforming pages, improving metadata, internal links, structured data, and answer-style sections for AI overviews and chat assistants.'
argument-hint: 'What URL, topic, or draft should be optimized?'
---

# SEO For Google And LLMs

Use this skill to optimize content so it ranks in traditional search and is easier for LLMs to extract, cite, and summarize accurately.

## When To Use
- Creating a new landing page or article
- Updating content with low impressions, clicks, or conversions
- Aligning metadata, schema, and on-page copy with user intent
- Turning generic copy into answer-rich, citation-friendly content for LLMs

## Inputs
- Target URL or draft content
- Primary audience and locale
- Primary keyword plus 3 to 8 related entities/questions
- Business goal: lead, booking, trust, education, or local visibility

If any input is missing, state assumptions explicitly before writing.

## Workflow
1. Define search intent and success metric.
2. Build an outline that satisfies both SERP and answer-engine needs.
3. Draft or rewrite the page with entity-rich, scannable sections.
4. Optimize metadata and structured data.
5. Strengthen internal linking and source grounding.
6. Run scoring gates and produce a publish decision.

## Step 1: Intent And Query Mapping
1. Classify intent: informational, commercial, transactional, or navigational.
2. Map one primary keyword to exactly one page.
3. Add supporting queries:
- What is it?
- Who is it for?
- Benefits and risks
- Pricing or process
- Comparison or alternatives
- FAQ
4. Define one measurable KPI:
- organic clicks
- qualified leads
- conversion rate
- average position for target query set

Decision point:
- If intent is mixed, split into separate sections with clear subheadings.
- If two intents conflict, create a dedicated page for the secondary intent.

## Step 2: Content Architecture
1. Produce a clear H1 with the core topic and locale/context when relevant.
2. Build H2/H3 sections that mirror real user questions.
3. Include a short answer-first block near the top (40 to 80 words).
4. Add evidence blocks:
- experience and process details
- constraints, side effects, or who should avoid the service
- before/after expectations and timeline
5. Add a concise FAQ section (4 to 8 questions) with direct answers.

Decision point:
- If the page is local-service focused, include location terms naturally and add local proof elements.
- If the page is educational, prioritize definitions, mechanisms, examples, and references.

## Step 3: Writing Rules For Google And LLMs
1. Keep paragraphs short and literal. Avoid vague claims.
2. Prefer explicit entities (service names, conditions, locations, tools, ingredients).
3. Use concrete numbers when possible (duration, frequency, recovery, pricing ranges).
4. Use comparison language where helpful: "vs", "difference", "best for".
5. Include one "When this is not recommended" section for trust and disambiguation.
6. Keep terminology consistent across headings and body.

LLM retrieval guidelines:
- Put the direct answer in the first sentence of each major section.
- Avoid pronoun ambiguity; restate the subject in key answers.
- Use stable phrasing for critical facts so they are easy to quote.
- Add sourceable statements (own process, credentials, or cited references).

## Step 4: Metadata And Structured Data
1. Title tag:
- include primary topic early
- include locale or differentiator
- avoid duplicate titles across pages
2. Meta description:
- summarize value and include one strong CTA
3. Canonical:
- verify canonical points to the preferred URL
4. Open Graph and Twitter metadata:
- keep title/description aligned with search intent
5. Schema:
- use relevant schema type (Article, FAQPage, LocalBusiness, Service, BreadcrumbList)
- ensure schema reflects visible on-page content

Decision point:
- If FAQ content is thin or promotional, do not force FAQ schema.
- If the page is primarily conversion-focused, prioritize Service/LocalBusiness + strong FAQ.

## Step 5: Linking And Grounding
1. Add internal links to adjacent topics, category hubs, and conversion pages.
2. Ensure anchor text is descriptive, not generic (avoid "click here").
3. Link out to authoritative references only when they add trust or clarification.
4. Add image alt text that describes intent-relevant content naturally.

## Step 6: Scoring Gates
Score each category from 0 to 5. A page is publish-ready only if all category scores are 4 or higher and the total is at least 24 out of 30.

Categories:
- Intent alignment: single clear intent, no mixed-goal confusion.
- Answer quality: each major section starts with a direct and accurate answer.
- Entity and evidence depth: concrete facts, constraints, and process detail.
- Technical SEO: title, description, canonical, schema, and OG consistency.
- Link architecture: contextual internal links and clean anchor relevance.
- Conversion clarity: CTA placement, relevance, and friction reduction.

Hard fail conditions (must be fixed before publish):
- Conflicting primary intents on one page.
- Misleading or ungrounded medical/service claims.
- Schema contradicts visible content.
- Duplicate title/meta that cannibalizes another page.

Publish decision:
- If score is below threshold, output a prioritized fix plan (highest impact first).
- If score meets threshold, output final copy plus implementation checklist.

## Output Format
When invoked, return:
1. Search intent summary and target query map
2. Improved title, meta description, H1, and heading outline
3. Full rewritten page/post draft in answer-first style
4. Suggested schema types and required fields to verify
5. Internal link opportunities (source page -> target page)
6. Scoring table (0 to 5 per category), hard fail review, and publish decision

## Prompt Starters
- Optimize this draft for Google and LLM retrieval: <paste draft>
- Build an SEO plus LLM outline for topic: <topic> in <location>
- Refresh this URL for better rankings and AI answer extraction: <url>
- Create metadata and schema recommendations for this page: <url or draft>
