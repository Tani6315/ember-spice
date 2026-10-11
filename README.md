# Ember & Spice — Restaurant Demo Website

Next.js 15 + TypeScript + Tailwind CSS 4. Fiverr portfolio ke liye demo restaurant website.

## Sections
Navbar (mobile menu), Hero, About, Menu (category tabs), Gallery, Reviews, Table booking form, Contact + opening hours, Footer, floating WhatsApp button.

## Apne computer par chalana

1. Node.js 20 ya naya install hona chahiye (`node -v` se check karein)
2. Is folder mein terminal kholein (VS Code: Terminal → New Terminal)
3. Packages install karein:
   ```
   npm install
   ```
4. Site chalayein:
   ```
   npm run dev
   ```
5. Browser mein kholein: http://localhost:3000

## Content badalna (naye client ke liye)

Sab content ek hi file mein hai: **`data/site.ts`**
- Naam, phone, WhatsApp number, address, hours
- Menu items aur prices
- Reviews
- Photos ke links

Photos: abhi Unsplash ki free photos hain. Client ki photos `public/images/` mein daalein aur `data/site.ts` mein link `"/images/photo.jpg"` kar dein.

Colors: `app/globals.css` mein `@theme` ke andar `--color-ember` aur `--color-saffron` badlein.

## Vercel par free deploy (live link)

1. GitHub par naya repository banayein aur yeh folder push karein:
   ```
   git init
   git add .
   git commit -m "Restaurant demo"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ember-spice.git
   git push -u origin main
   ```
2. vercel.com par GitHub se sign in karein
3. "Add New → Project" → apna repository select → "Deploy"
4. 1–2 minute mein live link mil jayega (jaise `ember-spice.vercel.app`)
5. Yeh link Fiverr portfolio aur gig mein lagayein

## Static build (kisi bhi hosting / cPanel ke liye)

```
npm run build
```
Poori site `out/` folder mein ban jati hai. Is folder ki files cPanel ke `public_html` mein upload kar dein.
