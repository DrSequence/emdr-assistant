### 🧠 EMDR Assistant

A simple web-based EMDR (Eye Movement Desensitization and Reprocessing) simulation tool built with React + TypeScript + Vite.
It provides a configurable visual stimulation pattern for relaxation, therapy training, or demo purposes.

### 🧘‍♂️ Purpose

This project is a personal experiment to simulate bilateral visual stimulation used in EMDR therapy.
It’s not a medical tool and should not be used for clinical treatment.

### 🚀 Features
	•	🎨 Adjustable stimulation speed and color
	•	⏱️ Built-in session timer
	•	🖥️ Minimalistic and responsive UI
	•	⚙️ Built with Vite for lightning-fast development
	•	🌐 GitHub Pages deployment ready

### 🧩 Tech Stack
	•	React + TypeScript
	•	Vite
	•	CSS Modules
	•	GitHub Actions for CI/CD

### 🛠️ Installation

Clone the repository and install dependencies:

```
git clone https://github.com/<your-username>/emdr-assistant.git
cd emdr-assistant
npm install
```

### 🧪 Development

Run the local dev server:
```
npm run dev
```
Then open http://localhost:5173￼ in your browser.


### 🏗️ Build

Create a production build:
```
npm run build
```
Preview it locally:
```
npm run preview
```

### 🌍 Deployment (GitHub Pages)

This project uses GitHub Actions to automatically build and deploy the app to GitHub Pages whenever you push to the main branch.

Workflow example (.github/workflows/deploy.yml):
```
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: dist
```

### 📁 Project Structure

```
src/
├── components/
│   ├── ControlPanel.tsx
│   ├── SettingsPanel.tsx
│   ├── StimulationDisplay.tsx
│   └── TimerDisplay.tsx
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```
