# Mother's Day Tribute Application

This plan outlines the architecture and steps to build the Mother's Day Tribute web application, using the UI designs fetched from Stitch MCP, Next.js 14, Tailwind CSS, and Supabase.

## User Review Required

> [!IMPORTANT]
> **Supabase Configuration:** You will need to provide the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the `.env.local` file. 
> You also need to execute the following SQL in your Supabase project's SQL Editor to create the necessary table and storage bucket:
> ```sql
> -- Create table
> create table public.tributes (
>   id uuid default gen_random_uuid() primary key,
>   created_at timestamp with time zone default timezone('utc'::text, now()) not null,
>   mom_name text not null,
>   fav_color text not null,
>   fav_food text,
>   superpower text,
>   fav_place text,
>   message text,
>   image_urls text[]
> );
> 
> -- Create storage bucket
> insert into storage.buckets (id, name, public) values ('mom-images', 'mom-images', true);
> 
> -- Set up storage policies (allow public inserts and selects for simplicity)
> create policy "Public Access" on storage.objects for select using ( bucket_id = 'mom-images' );
> create policy "Public Insert" on storage.objects for insert with check ( bucket_id = 'mom-images' );
> ```

## Open Questions

> [!NOTE]
> 1. Should we use the exact design tokens (colors, fonts) extracted from the Stitch HTML, or prefer default Tailwind configuration with custom variables? (I plan to copy the custom colors and fonts from the design into `tailwind.config.ts`).
> 2. The form design has fields like `superpower` and `fav_place` which weren't mentioned in your prompt but are in the design. I have included them in the database schema. Is that correct?

## Proposed Changes

### Setup and Dependencies
- Initialize Next.js 14 App Router project.
- Install dependencies: `@supabase/supabase-js`, `framer-motion`, `lucide-react`, `qrcode.react`, `clsx`, `tailwind-merge`.

### Configurations
#### [NEW] `tailwind.config.ts`
- Integrate custom colors, font families (Playfair Display, Montserrat), typography scales, and spacing variables extracted from the Stitch designs.

#### [NEW] `src/lib/supabaseClient.ts`
- Setup Supabase client using environment variables.

#### [NEW] `src/app/globals.css`
- Add custom utility classes (`.soft-glow-shadow`, `.glass-panel`, `.grain-texture`, `.polaroid-tilt-left`, etc.) and font imports.

---

### Components
#### [NEW] `src/components/Navigation.tsx`
- The top app bar and mobile bottom nav shared between pages.

#### [NEW] `src/components/ImageUpload.tsx`
- A drag-and-drop file upload component that previews selected images and handles uploading to Supabase Storage.

#### [NEW] `src/components/ShareModal.tsx`
- The floating action button and modal from the Tribute page, integrating `qrcode.react` for the shareable link.

---

### Pages
#### [NEW] `src/app/page.tsx`
- The Landing/Form page.
- Implements the multi-step form to collect data.
- Handles submission logic: uploads images to Supabase Storage, gets public URLs, inserts record into `tributes` table, and redirects to `/tribute/[id]`.

#### [NEW] `src/app/tribute/[id]/page.tsx`
- The dynamic Tribute page.
- Fetches tribute data from Supabase using the `id` param.
- Uses `fav_color` to set dynamic CSS variables or inline styles for background accents and text colors.
- Renders the personal message with a glassmorphism effect.
- Displays uploaded photos in a responsive polaroid masonry grid.
- Includes Framer Motion animations for soft fade-ins and floating effects.

## Verification Plan

### Manual Verification
- Start the development server and test the Landing Page form submission.
- Verify that images are successfully uploaded to the Supabase `mom-images` bucket.
- Verify that a new record is inserted into the `tributes` table.
- Verify the redirection to `/tribute/[id]` works.
- Check the dynamic color application on the Tribute page based on the `fav_color` field.
- Test the QR code generation in the share modal.
- Verify the responsive design matches the mobile and desktop views from the Stitch designs.
