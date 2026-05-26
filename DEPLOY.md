# Deploying Prayan Labels → GitHub + Cloudflare Pages

Follow these steps in order. Total time: ~10 minutes.

---

## Step 1 — GitHub: Create a new repo

1. Go to **https://github.com/new**
2. Repository name: `prayanlabels-website` (or anything you like)
3. Set it to **Private** (you can make it public later)
4. **Do NOT** tick "Add a README" or any other files — leave it blank
5. Click **Create repository**
6. Copy the repo URL shown — it looks like:
   `https://github.com/YOUR-USERNAME/prayanlabels-website.git`

---

## Step 2 — Terminal: Initialize git and push

Open **Terminal** on your Mac and paste these commands one by one:

```bash
# 1. Go to the site folder
cd "/Users/sourav/claudeP/prayanlabels/Prayanlabels.com"

# 2. Initialize git
git init

# 3. Set branch name to main
git branch -M main

# 4. Stage all files
git add -A

# 5. First commit
git commit -m "Initial commit — Prayan Labels brochure site"

# 6. Add your GitHub repo as remote
#    Replace the URL with the one you copied from Step 1
git remote add origin https://github.com/YOUR-USERNAME/prayanlabels-website.git

# 7. Push
git push -u origin main
```

> **If prompted for a password:** GitHub no longer accepts your account password here.
> You need a Personal Access Token instead:
> - Go to https://github.com/settings/tokens
> - Click **Generate new token (classic)**
> - Give it a name, tick the `repo` scope, click **Generate token**
> - Paste that token as the password when git asks

---

## Step 3 — Cloudflare Pages: Connect the repo

1. Go to **https://dash.cloudflare.com** and log in (or sign up — free)
2. In the left sidebar click **Workers & Pages** → **Create**
3. Choose the **Pages** tab → **Connect to Git**
4. Authorise Cloudflare to access your GitHub account
5. Select the `prayanlabels-website` repo → **Begin setup**
6. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/` *(or leave blank)*
7. Click **Save and Deploy**

Cloudflare will deploy in ~30 seconds. You'll get a free URL like:
`https://prayanlabels-website.pages.dev`

---

## Step 4 — Custom Domain (optional but recommended)

Once deployed on Cloudflare Pages:

1. In your Pages project, go to **Custom domains** → **Set up a custom domain**
2. Enter your domain (e.g. `prayanlabels.com`)
3. Cloudflare will walk you through adding a CNAME record
4. If your domain is also registered with Cloudflare, it's one click — SSL is automatic
5. If your domain is at GoDaddy / Namecheap, just update the nameservers to Cloudflare's
   (shown during setup) — free DNS management, faster propagation

---

## Step 5 — Future updates (how to redeploy)

Every time you change a file, run in Terminal:

```bash
cd "/Users/sourav/claudeP/prayanlabels/Prayanlabels.com"
git add -A
git commit -m "describe what you changed"
git push
```

Cloudflare Pages detects the push automatically and redeploys within ~20 seconds. No manual steps needed.

---

## Before launch checklist

- [ ] Replace `YOUR_FORMSPREE_ID` in `contact.html` (get it at formspree.io — free)
- [ ] Replace `gaurav@prayanlabels.com` with your real email in `contact.html`
- [ ] Fill in your actual address in `contact.html`
- [ ] Add real product photos to `images/products/` and update `data-src` in `gallery.html`
- [ ] Replace placeholder testimonials and client logos in `gallery.html`
- [ ] Add Google Analytics (GA4): get a measurement ID at analytics.google.com,
      then add this before `</head>` in all 5 HTML files:
      ```html
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      </script>
      ```
