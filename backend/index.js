import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_FILE = path.join(__dirname, 'config.local.json');

function normalizeUrl(value = '') {
  return String(value).trim().replace(/\/+$/, '');
}

function readSavedConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch {
    return {};
  }
}

const envConfig = {
  newApiUrl: normalizeUrl(process.env.NEW_API_URL || ''),
  newApiKey: process.env.NEW_API_KEY || '',
  newApiImageModel: process.env.NEW_API_IMAGE_MODEL || 'dall-e-3',
  fallbackProvider: process.env.FALLBACK_PROVIDER || 'openai',
  fallbackApiKey: process.env.FALLBACK_API_KEY || '',
};

let runtimeConfig = {
  ...envConfig,
  ...readSavedConfig(),
};
runtimeConfig.newApiUrl = normalizeUrl(runtimeConfig.newApiUrl);

function maskSecret(value = '') {
  if (!value) return '';
  if (value.length <= 8) return '••••';
  return `${value.slice(0, 4)}••••${value.slice(-4)}`;
}

function publicConfig() {
  return {
    newApiUrl: runtimeConfig.newApiUrl,
    newApiImageModel: runtimeConfig.newApiImageModel,
    hasNewApiKey: Boolean(runtimeConfig.newApiKey),
    newApiKeyPreview: maskSecret(runtimeConfig.newApiKey),
    fallbackProvider: runtimeConfig.fallbackProvider,
    hasFallbackApiKey: Boolean(runtimeConfig.fallbackApiKey),
  };
}

function saveRuntimeConfig(nextConfig) {
  const next = { ...runtimeConfig };

  if ('newApiUrl' in nextConfig) next.newApiUrl = normalizeUrl(nextConfig.newApiUrl);
  if ('newApiImageModel' in nextConfig && String(nextConfig.newApiImageModel).trim()) {
    next.newApiImageModel = String(nextConfig.newApiImageModel).trim();
  }
  if ('newApiKey' in nextConfig && String(nextConfig.newApiKey).trim()) {
    next.newApiKey = String(nextConfig.newApiKey).trim();
  }
  if (nextConfig.clearNewApiKey) next.newApiKey = '';

  if ('fallbackProvider' in nextConfig && String(nextConfig.fallbackProvider).trim()) {
    next.fallbackProvider = String(nextConfig.fallbackProvider).trim();
  }
  if ('fallbackApiKey' in nextConfig && String(nextConfig.fallbackApiKey).trim()) {
    next.fallbackApiKey = String(nextConfig.fallbackApiKey).trim();
  }
  if (nextConfig.clearFallbackApiKey) next.fallbackApiKey = '';

  runtimeConfig = next;
  fs.writeFileSync(CONFIG_FILE, `${JSON.stringify(runtimeConfig, null, 2)}\n`);
}

function buildPrompt(body) {
  const creative = body.creative || body;
  const brandName = creative.brand || creative.advertiser || 'the advertiser';
  const styleName = creative.style || creative.creativeStyle || 'fintech';
  const headline = creative.headline || 'Premium promotional offer';
  const description = creative.description || creative.campaignGoal || 'a promotional offer';
  const primaryColor = creative.primaryColor || '#09294f';
  const accentColor = creative.accentColor || '#e12635';

  const styleHints = {
    fintech: 'clean, trustworthy, modern fintech aesthetic with subtle gradients',
    premium: 'cinematic, high-end, dramatic lighting, premium brand feel',
    retail: 'bright, energetic, promotional, bold colors and offers',
    minimal: 'minimalist, whitespace, elegant typography-forward design',
  };

  const prompt = `Create a premium 16:9 marketing poster background for "${brandName}".
Campaign idea: "${headline}".
Product/theme: ${description}.
Style direction: ${styleHints[styleName] || styleHints.fintech}.
Color palette: primary ${primaryColor}, accent ${accentColor}.
Generate a clean promotional poster background only.
Use cinematic lighting, polished commercial photography or high-end 3D illustration.
Leave clear negative space where headline and call-to-action can be overlaid later.
No readable words, no typography, no logo, no watermark, no product mockup frame, no interface elements.
The result should look like a high-quality advertising poster background asset, not a scene mockup.`;

  return prompt;
}

async function generateWithNewAPI(prompt, size = '1792x1024') {
  if (!runtimeConfig.newApiUrl || !runtimeConfig.newApiKey) {
    throw new Error('New API is not configured. Fill New API URL and API Key in the settings panel.');
  }

  const res = await fetch(`${runtimeConfig.newApiUrl}/v1/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${runtimeConfig.newApiKey}`,
    },
    body: JSON.stringify({
      model: runtimeConfig.newApiImageModel,
      prompt,
      n: 1,
      size,
      quality: 'standard',
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'unknown');
    throw new Error(`New API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const firstImage = data.data?.[0];
  const imageUrl = firstImage?.url || data.url || (firstImage?.b64_json ? `data:image/png;base64,${firstImage.b64_json}` : '');

  if (!imageUrl) {
    throw new Error('New API returned no image URL.');
  }

  return {
    url: imageUrl,
    model: runtimeConfig.newApiImageModel,
    provider: 'new-api',
  };
}

async function generateWithFallback(prompt, size = '1792x1024') {
  if (runtimeConfig.fallbackProvider === 'openai' && runtimeConfig.fallbackApiKey) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${runtimeConfig.fallbackApiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size,
        quality: 'standard',
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => 'unknown');
      throw new Error(`OpenAI error ${res.status}: ${text}`);
    }

    const data = await res.json();
    return {
      url: data.data?.[0]?.url,
      model: 'dall-e-3',
      provider: 'openai',
    };
  }

  if (runtimeConfig.fallbackProvider === 'replicate' && runtimeConfig.fallbackApiKey) {
    const res = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-dev/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${runtimeConfig.fallbackApiKey}`,
        Prefer: 'wait',
      },
      body: JSON.stringify({
        input: { prompt, aspect_ratio: '16:9' },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => 'unknown');
      throw new Error(`Replicate error ${res.status}: ${text}`);
    }

    const data = await res.json();
    return {
      url: data.output?.[0] || data.output,
      model: 'flux-dev',
      provider: 'replicate',
    };
  }

  throw new Error('No provider configured. Set NEW_API_URL or FALLBACK_PROVIDER + key.');
}

app.get('/api/config', (_req, res) => {
  res.json({
    success: true,
    config: publicConfig(),
  });
});

app.post('/api/config', (req, res) => {
  try {
    saveRuntimeConfig(req.body || {});
    res.json({
      success: true,
      config: publicConfig(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.post('/api/generate', async (req, res) => {
  try {
    const prompt = buildPrompt(req.body);

    let result;
    if (runtimeConfig.newApiUrl && runtimeConfig.newApiKey) {
      result = await generateWithNewAPI(prompt);
    } else {
      result = await generateWithFallback(prompt);
    }

    res.json({
      success: true,
      imageUrl: result.url,
      prompt,
      model: result.model,
      provider: result.provider,
    });
  } catch (err) {
    console.error('Generate error:', err.message);
    res.status(502).json({
      success: false,
      error: err.message,
      hint: 'Check your NEW_API_URL / NEW_API_KEY or FALLBACK_PROVIDER / FALLBACK_API_KEY env vars.',
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    newApiConfigured: !!(runtimeConfig.newApiUrl && runtimeConfig.newApiKey),
    fallbackConfigured: !!(
      (runtimeConfig.fallbackProvider === 'openai' && runtimeConfig.fallbackApiKey) ||
      (runtimeConfig.fallbackProvider === 'replicate' && runtimeConfig.fallbackApiKey)
    ),
    config: publicConfig(),
  });
});

app.listen(PORT, () => {
  console.log(`Ad Previewer API listening on http://localhost:${PORT}`);
  console.log(`  NEW_API_URL: ${runtimeConfig.newApiUrl || '(not set)'}`);
  console.log(`  NEW_API_IMAGE_MODEL: ${runtimeConfig.newApiImageModel}`);
  console.log(`  FALLBACK_PROVIDER: ${runtimeConfig.fallbackProvider}`);
});
