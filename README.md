# Cast AI

Turn text into a podcast: write a script, pick a voice from one of three AI providers, generate a cover image and publish it for others to listen to.

**Live demo:** https://cast-ai-gamma.vercel.app

> Built on top of a course project (JavaScript Mastery "Podcastr"). The base app, player and Convex data model come from the course; the multi-provider voice generation, the Freepik thumbnails, the profile page and the redesigned UI are my additions (see below).

## Features

- **Sign in** with Clerk; users are synced to Convex through a Clerk webhook.
- **Text to speech from three providers:** OpenAI (alloy, echo, fable, onyx, nova, shimmer), ElevenLabs (Rachel, Drew) and Unreal Speech (Scarlett, Dan), with a voice sample to listen to before generating.
- **AI cover images** from the Freepik text-to-image API, or your own upload.
- **Browse and search** podcasts, a trending carousel, top podcasters and author profiles.
- **Persistent player** that keeps playing while you browse.
- Responsive layout for desktop and mobile.

## What I added to the course project

| Area | Course version | This project |
| --- | --- | --- |
| Voices | OpenAI TTS only | OpenAI, ElevenLabs and Unreal Speech, chosen per provider (`convex/openai.ts`, `convex/unreal.ts`, `app/api/elevenlabs/route.ts`) |
| Cover images | DALL-E | Freepik text-to-image API (`convex/freepik.ts`) |
| Generation UI | single provider | rewritten `GeneratePodcast` and `GenerateThumbnail` with provider and voice selection |
| Pages | profile by id | own profile page, discover page, sidebars and branding |

## Tech stack

- **Next.js 14** (App Router) and **TypeScript**
- **Convex** for the database, file storage and server actions
- **Clerk** for authentication
- **Tailwind CSS** and shadcn/ui
- **OpenAI**, **ElevenLabs**, **Unreal Speech** and **Freepik** APIs

## Run locally

```bash
git clone https://github.com/dominikloza/Cast_AI.git
cd Cast_AI
npm install
```

Create `.env.local`:

```bash
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
OPENAI_API_KEY=
ELEVENLABS_API_KEY=
UNREAL_SPEECH_API_KEY=
FREEPIK_API_KEY=
```

The AI keys used by Convex actions (`OPENAI_API_KEY`, `UNREAL_SPEECH_API_KEY`, `FREEPIK_API_KEY`) must also be set in the Convex dashboard (Settings > Environment Variables).

Start Convex and Next.js in two terminals:

```bash
npx convex dev
npm run dev
```

Open http://localhost:3000.
