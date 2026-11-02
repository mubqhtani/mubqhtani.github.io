# Assets Guide

## How images work

Put an image in the right folder with the right name and it appears on the site. If the file isn't there, nothing is shown — the site never displays empty placeholder boxes.

- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
- After adding a file, restart `npm run dev`, or run `npm run assets` and refresh. `npm run build` picks new images up automatically.
- Every photo on the page can be clicked to open at full size, uncropped.

## Images on the site now

These are optimized copies of the original photos (re-compressed, metadata/EXIF removed). The originals were not changed.

| Image | File | Note |
|---|---|---|
| Defenseathon | `public/images/achievements/defenseathon/cover.jpg` | A 6px strip was trimmed from the top edge |
| Future of Mobility | `public/images/achievements/future-of-mobility/cover.jpg` | Full image. The page crops it to 4:5 using `position` in `achievements.ts` |
| Tuwaiq CTF | `public/images/achievements/tuwaiq-ctf-leap-2026/cover.jpg` | Cropped to remove the Snapchat caption and location sticker |
| PCEP certificate | `public/images/certificates/pcep.jpg` | Shown in full, never cropped |
| Project showcase | `public/images/learning/project-showcase-1.jpg`, `-2.jpg` | Added to the entry through `photos` in `education.ts`. The selfie was rotated upright |

## Adding more

| What | Where |
|---|---|
| Portrait (optional, small round photo above your name) | `public/images/profile/portrait.jpg` (vertical, 4:5) |
| Extra photos for a competition | `public/images/achievements/<id>/gallery/01.jpg`, `02.jpg`, … (shown as small thumbnails under the entry) |
| Black Hat photos | `public/images/achievements/black-hat-bug-bounty-jr/gallery/01.jpg`, … |
| Project screenshot | `public/images/projects/<project-id>/cover.jpg` (16:9) |
| New certificate | `public/images/certificates/<id>.jpg`, plus an entry in `src/data/certifications.ts` |

**Changing how a photo is cropped:** add `position: "50% 30%"` to its `image` in the data file. The first value moves the crop horizontally, the second vertically.

## Before uploading

- Remove location data (GPS/EXIF) from phone photos.
- Only publish photos of other people if they're okay with it.
- Hide private details (ID numbers, addresses) on any document.

## Text and links (all in `src/data/`)

| What | File | When it appears |
|---|---|---|
| Email, GitHub, LinkedIn | `profile.ts` → `socials` | Add `href`. The Contact section appears once at least one link has one |
| Projects | `projects.ts` | The Projects section appears once there is at least one entry |
| A hackathon's project | `achievements.ts` → `project: { summary, href }` | As soon as you add it |
| Competition date | `achievements.ts` → `date: "YYYY-MM-DD"` | As soon as you add it |

All text is plain English strings in `src/data/`.
