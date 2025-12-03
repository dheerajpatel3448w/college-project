# Hamming Code Generator & Error Detection Simulator
Computer Networks Project – IIST, IT Department

## 1. Project Title
Interactive Hamming Code Generator and Single-Bit Error Detection Simulator

## 2. Project Objective
The objective of this project is to demonstrate Error Detection and Correction using Hamming Code (Even Parity) through a fully interactive web application.

This system allows users to:
- Generate Hamming code from user-entered binary data
- Calculate required parity bit positions
- Visualize step-by-step encoding
- Simulate 1-bit error
- Detect error using syndrome bits
- Identify and display error position

This project helps students clearly understand how Hamming Code works internally.

## 3. Live Project Link
Hosted on Vercel:
👉 https://hammingcode-woad.vercel.app/

## 4. GitHub Repository
👉 https://github.com/dheerajpatel3448w/college-project

## 5. Technologies Used
- **React (v19)** — UI Development
- **Vite (v7)** — Fast Dev & Build Tool
- **Tailwind CSS (v4)** — Styling
- **Lucide Icons** — UI Icons
- **JavaScript (ES Modules)** — Logic Implementation
- **Vercel** — Deployment

## 6. Core Features
### 6.1 Hamming Code Generator
- Automatically calculates parity bits r using: 2^r ≥ m + r + 1
- Places parity bits at positions: 1, 2, 4, 8...
- Fills data bits in remaining positions
- Computes parity using Even Parity
- Shows entire encoding process step-by-step

### 6.2 Detailed Parity Calculation
Each parity bit displays:
- Positions checked
- Values of bits checked
- Count of 1s
- Final parity (0 or 1)

### 6.3 Error Simulation
- Users can click any bit to flip it
- Parity recalculates automatically
- Syndrome generated
- Error bit position identified
- Correction suggestion shown

## 7. How This Project Was Built (Step-by-Step)
**Step 1: Setting up React + Vite**
```bash
npm create vite@latest hamming_code --template react
cd hamming_code
npm install
```

**Step 2: Adding Tailwind CSS 4**
Installed using:
```bash
npm install tailwindcss @tailwindcss/vite
```
Configured in `vite.config.js`:
```js
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()]
}
```

**Step 3: Implementing Hamming Logic**
(a) Calculating required parity bits
- Formula: `while (2^r < m + r + 1)`

(b) Filling positions
- Parity Bits → 1, 2, 4, 8…
- Data Bits → Other positions

(c) Calculating Even Parity
- Used bitwise: `if ((position & parityPosition) !== 0)`

(d) Detailed Logs
- All internal steps stored and shown on UI.

**Step 4: Implementing Error Detection**
When a bit is flipped:
- Parity bits recalculate
- Syndrome generated (binary)
- Final error position computed

**Step 5: Building UI Components**
- Navbar
- Hamming Code Generator
- Deep Dive (Error Detector)
- Step Logs
- Final Result Card

**Step 6: Deployment on Vercel**
```bash
npm run build
vercel deploy
```

## 8. Configuration File (`package.json`)
As required by sir, full configuration is included:

```json
{
  "name": "hamming_code",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "lucide-react": "^0.555.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "tailwindcss": "^4.1.17"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
```

## 9. Folder Structure
```
src/
 ├── components/
 │    ├── navbar.jsx
 │    ├── hummnigcode.jsx
 │    ├── hammingcodeerror.jsx
 ├── App.jsx
 ├── main.jsx
public/
package.json
vite.config.js
README.md
```

## 10. How to Run Locally
```bash
git clone https://github.com/dheerajpatel3448w/college-project
cd college-project
npm install
npm run dev
```


## 11. Team Details
| Name | Branch | Year | Role |
| --- | --- | --- | --- |
| Dheeraj Patel | IT | 3rd Year | Hamming Logic + UI + Deployment |
| Daksh Nimje | IT | 3rd Year | Documentation + Testing |
| Honey Chilhate | IT | 3rd Year | UI Enhancements |

## 12. Submitted To
Prof. Rakesh Verma Sir
Department of Information Technology
Indore Institute of Science & Technology (IIST)

## 13. Conclusion
This project successfully demonstrates how Hamming Code performs error detection and correction.
The interactive UI helps students understand parity calculation, syndrome generation, and error correction with clarity.
