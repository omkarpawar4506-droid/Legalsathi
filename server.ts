import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.status(503).json({ error: 'Gemini API not configured' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction: `You are LegalSaathi (न्याय & सुरक्षा), an authoritative public legal literacy and civic safety assistant for Indian citizens.
Your mission is to provide plain-language, accurate explanations of Indian statutes (such as Bharatiya Nyaya Sanhita (BNS), Consumer Protection Act 2019, Information Technology Act, POSH Act 2013, NALSA Free Legal Aid under Sec 12, and Model Tenancy Act).

Formatting rules:
1. Speak warmly and respectfully ('Namaste').
2. Always break your answer into clear, numbered, actionable steps (e.g., Step 1: Golden Window, Step 2: Formal Notice/FIR, Step 3: Escalation).
3. Mention verified statutory helplines when relevant (e.g., Cybercrime 1930, National Consumer Helpline 1915, NALSA Free Legal Aid 15100, Emergency 112).
4. Always clarify that this guidance is for legal awareness and education, not formal advocate representation.`
      }
    });

    return res.json({ reply: response.text });
  } catch (err: any) {
    console.error('Error calling Gemini API:', err);
    return res.status(500).json({ error: 'Failed to generate guidance', details: err.message });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true }
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`LegalSaathi server running on http://0.0.0.0:${port}`);
  });
}

startServer();
