# 🪙 Crypto Trading App

A modern crypto trading interface built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **React Query**, and **Zustand**.  
This app allows users to browse crypto assets, simulate trades between crypto and fiat (USD), and manage basic authentication locally.

---

**Live Demo**: [https://jasjeet-manaise.github.io/Crypto-Trading/](https://jasjeet-manaise.github.io/Crypto-Trading/)

---

##  Features

- 🔐 Local login system (no backend)
- 🧭 Protected Trade route (login required)
- 📈 Real-time crypto prices (via CoinGecko API)
- 🧮 Two-way conversion between crypto & USD
- 🔄 Swap input directions
- 📊 Sortable, expandable crypto asset table
- 🧠 Powered by Zustand & React Query
- 🎨 Responsive, modern UI with Tailwind CSS

---

##  Assumptions & Trade-offs

### Assumptions:

- Local login is sufficient for this demo (no real auth or backend)
- CoinGecko API is reliable and public (no auth required)
- User roles are simulated client-side
- Session persistence is local-only
- Buy/Sell is for simulation only (no transactions)

### Trade-offs:

- No backend: can't store trades, history, or real users
- No JWT/session tokens: reduced security realism
- Zustand for simplicity, but lacks context across tabs
- React Query is used without retry customization initially
- Swap and conversion logic may float slightly due to JS precision

---

---

## Tech Stack

- ⚛️ React + TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- ⚙️ Zustand (authentication)
- 🔍 React Query (data fetching + caching)
- 🌐 CoinGecko API

## Advantages & Disadvantages of Technologies Used

| Technology      | Advantages                                                                 | Disadvantages                                                                 |
|----------------|----------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| **React**       | Large ecosystem, reusable components, fast rendering with virtual DOM     | Can get complex with state management in large apps                           |
| **TypeScript**  | Type safety, better IDE support, reduces runtime errors                   | Requires learning curve, more verbose syntax                                  |
| **Vite**        | Fast startup and HMR, optimized builds out of the box                     | Limited plugin ecosystem compared to Webpack                                  |
| **Tailwind CSS**| Utility-first, responsive design quickly, easy to maintain                | Steeper learning curve for newcomers, verbose HTML                            |
| **Zustand**     | Minimal API, easy to use, no boilerplate                                  | No built-in devtools/state persistence like Redux Toolkit                     |
| **React Query** | Handles caching, background sync, request deduplication                   | Can add complexity if not configured properly                                 |
| **CoinGecko API** | Free, public, and extensive crypto data                                 | Rate limits, no authentication—risk of unavailability or misuse               |


---

## 📂 Folder Structure

```
src/
├── components/       # Reusable UI (Header, Table, Modal, ErrorBoundary)
├── pages/            # Home and Trade pages
├── store/            # Zustand auth state
├── hooks/            # React Query hooks
├── routes/           # App routing + protection
├── utils/            # Utils for the app
├── enums/            # All the global enums
├── App.tsx
├── main.tsx
```

---

## 🔧 Setup & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/jasjeet-manaise/crypto-trading.git
cd crypto-trading

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Visit `http://localhost:5173` to view the app.

---

## Usage

1. **Log In** with any email
2. On **Home Page**:
   - View top 10 assets
   - Sort by name or price
   - Show more assets
   - Use Buy/Sell dropdown
3. On **Trade Page**:
   - Convert crypto ⇄ fiat
   - Swap inputs
   - Live rate updates

---

## Linting, Formatting, and Git Hooks

- Prettier + ESLint
- Husky pre-commit hook
- `lint-staged` config ensures code is clean

---

## 📄 License

MIT License © 2025 Jasjeet Singh Manaise
