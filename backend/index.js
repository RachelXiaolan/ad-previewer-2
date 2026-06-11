import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const PORT = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_FILE = process.env.CONFIG_FILE
  ? path.resolve(process.env.CONFIG_FILE)
  : path.join(__dirname, 'config.local.json');
const FRONTEND_DIST = path.resolve(__dirname, '../dist');

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
  newApiChatModel: process.env.NEW_API_CHAT_MODEL || 'gpt-4o-mini',
  tavilyApiKey: process.env.TAVILY_API_KEY || '',
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
    newApiChatModel: runtimeConfig.newApiChatModel,
    hasNewApiKey: Boolean(runtimeConfig.newApiKey),
    newApiKeyPreview: maskSecret(runtimeConfig.newApiKey),
    hasTavilyApiKey: Boolean(runtimeConfig.tavilyApiKey),
    tavilyApiKeyPreview: maskSecret(runtimeConfig.tavilyApiKey),
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
  if ('newApiChatModel' in nextConfig && String(nextConfig.newApiChatModel).trim()) {
    next.newApiChatModel = String(nextConfig.newApiChatModel).trim();
  }
  if ('newApiKey' in nextConfig && String(nextConfig.newApiKey).trim()) {
    next.newApiKey = String(nextConfig.newApiKey).trim();
  }
  if (nextConfig.clearNewApiKey) next.newApiKey = '';

  if ('tavilyApiKey' in nextConfig && String(nextConfig.tavilyApiKey).trim()) {
    next.tavilyApiKey = String(nextConfig.tavilyApiKey).trim();
  }
  if (nextConfig.clearTavilyApiKey) next.tavilyApiKey = '';

  if ('fallbackProvider' in nextConfig && String(nextConfig.fallbackProvider).trim()) {
    next.fallbackProvider = String(nextConfig.fallbackProvider).trim();
  }
  if ('fallbackApiKey' in nextConfig && String(nextConfig.fallbackApiKey).trim()) {
    next.fallbackApiKey = String(nextConfig.fallbackApiKey).trim();
  }
  if (nextConfig.clearFallbackApiKey) next.fallbackApiKey = '';

  runtimeConfig = next;
  fs.mkdirSync(path.dirname(CONFIG_FILE), { recursive: true });
  fs.writeFileSync(CONFIG_FILE, `${JSON.stringify(runtimeConfig, null, 2)}\n`);
}

function buildPrompt(body) {
  const directPrompt = String(body.prompt || body.report?.imagePrompt || '').trim();
  if (directPrompt) return directPrompt;

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

function sendSse(res, type, payload = {}) {
  res.write(`data: ${JSON.stringify({ type, ...payload })}\n\n`);
}

function truncateText(value = '', maxLength = 4000) {
  const text = String(value || '');
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

function parseToolArguments(value) {
  if (!value) return {};
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function compactJson(value, maxLength = 14000) {
  return truncateText(JSON.stringify(value), maxLength);
}

function normalizeAssistantContent(content) {
  if (Array.isArray(content)) {
    return content
      .map((part) => part?.text || part?.content || '')
      .filter(Boolean)
      .join('\n');
  }
  return String(content || '');
}

function normalizeToolCalls(message = {}) {
  if (Array.isArray(message.tool_calls) && message.tool_calls.length) {
    return message.tool_calls.map((toolCall, index) => ({
      ...toolCall,
      id: toolCall.id || `call_${Date.now()}_${index}`,
      type: toolCall.type || 'function',
      function: toolCall.function || {},
    }));
  }

  if (message.function_call?.name) {
    return [{
      id: `call_${Date.now()}_legacy`,
      type: 'function',
      function: message.function_call,
    }];
  }

  return [];
}

async function callNewApiChat(messages, tools, toolChoice = 'auto') {
  if (!runtimeConfig.newApiUrl || !runtimeConfig.newApiKey) {
    throw new Error('New API is not configured. Fill New API URL and API Key first.');
  }

  const response = await fetch(`${runtimeConfig.newApiUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${runtimeConfig.newApiKey}`,
    },
    body: JSON.stringify({
      model: runtimeConfig.newApiChatModel,
      messages,
      tools,
      tool_choice: toolChoice,
      temperature: 0.35,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => 'unknown');
    throw new Error(`New API chat error ${response.status}: ${text}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message || { role: 'assistant', content: '' };
}

async function tavilyRequest(endpoint, body) {
  if (!runtimeConfig.tavilyApiKey) {
    throw new Error('Tavily API key is not configured.');
  }

  const response = await fetch(`https://api.tavily.com/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${runtimeConfig.tavilyApiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => 'unknown');
    throw new Error(`Tavily ${endpoint} error ${response.status}: ${text}`);
  }

  return response.json();
}

async function searchWeb({ query, maxResults = 5 }) {
  const data = await tavilyRequest('search', {
    query,
    search_depth: 'advanced',
    max_results: Math.min(Math.max(Number(maxResults) || 5, 1), 8),
    include_answer: true,
    include_raw_content: false,
  });

  return {
    query,
    answer: data.answer || '',
    results: (data.results || []).map((item) => ({
      title: item.title || item.url,
      url: item.url,
      content: truncateText(item.content || item.snippet || '', 900),
      score: item.score,
    })),
  };
}

async function scrapeUrls({ urls, query = '' }) {
  const list = Array.isArray(urls) ? urls : [urls].filter(Boolean);
  const data = await tavilyRequest('extract', {
    urls: list.slice(0, 4),
    extract_depth: 'advanced',
    format: 'markdown',
    ...(query ? { query } : {}),
  });

  const rawResults = data.results || data.data || [];
  return {
    results: rawResults.map((item) => ({
      url: item.url,
      title: item.title || item.url,
      content: truncateText(item.raw_content || item.content || item.markdown || '', 3000),
    })),
    failedResults: data.failed_results || data.failedResults || [],
  };
}

function normalizeReport(args = {}) {
  const colors = args.colors || {};
  const sources = Array.isArray(args.sources) ? args.sources : [];
  return {
    advertiser: String(args.advertiser || args.companyName || '').trim(),
    theme: String(args.theme || '').trim(),
    companyBackground: String(args.companyBackground || args.background || '').trim(),
    campaignGoal: String(args.campaignGoal || '').trim(),
    audience: String(args.audience || '').trim(),
    headline: String(args.headline || '').trim(),
    description: String(args.description || '').trim(),
    cta: String(args.cta || 'Learn More').trim(),
    colors: {
      primary: String(colors.primary || args.primaryColor || '#09294f').trim(),
      accent: String(colors.accent || args.accentColor || '#e12635').trim(),
      background: String(colors.background || args.backgroundColor || '#f6f9fc').trim(),
    },
    imagePrompt: String(args.imagePrompt || '').trim(),
    researchSummary: String(args.researchSummary || '').trim(),
    sources: sources.slice(0, 8).map((source) => ({
      title: String(source.title || source.url || '').trim(),
      url: String(source.url || '').trim(),
    })).filter((source) => source.url || source.title),
  };
}

function reportToToolResult(report) {
  return {
    ok: true,
    message: 'Rendered editable advertising research report.',
    report,
  };
}

const chatTools = [
  {
    type: 'function',
    function: {
      name: 'web_search',
      description: 'Search the web for company background, brand colors, current products, market context, or ad strategy references.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string' },
          maxResults: { type: 'number' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'web_fetch',
      description: 'Fetch and extract readable content from one or more web pages. Use this after web_search when you need page details, official company copy, brand background, product context, or source analysis.',
      parameters: {
        type: 'object',
        properties: {
          urls: {
            oneOf: [
              { type: 'string' },
              { type: 'array', items: { type: 'string' } },
            ],
          },
          query: { type: 'string' },
        },
        required: ['urls'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'render_ad_report',
      description: 'Render the final editable advertising report after research is complete. This is the final tool before image generation.',
      parameters: {
        type: 'object',
        properties: {
          advertiser: { type: 'string' },
          theme: { type: 'string' },
          companyBackground: { type: 'string' },
          campaignGoal: { type: 'string' },
          audience: { type: 'string' },
          headline: { type: 'string' },
          description: { type: 'string' },
          cta: { type: 'string' },
          colors: {
            type: 'object',
            properties: {
              primary: { type: 'string' },
              accent: { type: 'string' },
              background: { type: 'string' },
            },
          },
          researchSummary: { type: 'string' },
          imagePrompt: { type: 'string' },
          sources: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                url: { type: 'string' },
              },
            },
          },
        },
        required: ['advertiser', 'companyBackground', 'headline', 'description', 'cta', 'colors', 'imagePrompt'],
      },
    },
  },
];

const renderReportTool = chatTools.find((tool) => tool.function?.name === 'render_ad_report');

const chatSystemPrompt = `You are an advertising research and creative strategy assistant for CTV ad previews.
You maintain conversation context from the messages the user sends.

Workflow:
1. When the user gives a topic, advertiser, company, product, or URL, use tools to research before writing a final report.
2. Use web_search to learn: (a) company background and what it does, (b) visual/brand/theme colors, (c) product or market context that can support a promotional CTV ad.
3. Use web_fetch on official or highly relevant pages from search results when possible.
4. Every single user turn must end by calling render_ad_report, even if the user is only modifying a previous requirement. Do not end with plain chat.
5. The report must be editable and should include clear fields: advertiser, background, campaign goal, audience, headline, description, CTA, colors, research summary, sources, and an image prompt.
6. The imagePrompt should be a polished 16:9 marketing poster background prompt. It must say: no readable text, no typography, no logo, no watermark, leave negative space for overlay copy.
7. If a search or scrape tool is unavailable or fails, still call render_ad_report using the conversation and current report context, and mention the limitation in researchSummary.

Be concise in normal assistant text. The final actionable output should be rendered through render_ad_report.`;

function sanitizeChatMessages(messages = []) {
  return messages
    .filter((message) => ['user', 'assistant'].includes(message.role) && String(message.content || '').trim())
    .slice(-16)
    .map((message) => ({
      role: message.role,
      content: truncateText(message.content, 3000),
    }));
}

async function executeToolCall(toolCall, res) {
  const name = toolCall.function?.name;
  const args = parseToolArguments(toolCall.function?.arguments);
  sendSse(res, 'tool_start', { id: toolCall.id, name, arguments: args });

  let result;
  if (name === 'web_search') {
    result = await searchWeb(args);
  } else if (name === 'scrape_url' || name === 'web_fetch') {
    result = await scrapeUrls(args);
  } else if (name === 'render_ad_report') {
    result = reportToToolResult(normalizeReport(args));
  } else {
    throw new Error(`Unknown tool: ${name}`);
  }

  const summary = name === 'web_search'
    ? `${result.results?.length || 0} search results`
    : name === 'scrape_url' || name === 'web_fetch'
      ? `${result.results?.length || 0} pages extracted`
      : 'Editable report rendered';

  sendSse(res, 'tool_result', { id: toolCall.id, name, summary, result });
  if (name === 'render_ad_report') {
    sendSse(res, 'report', { report: result.report });
  }

  return { name, result };
}

function reportHasContent(report) {
  if (!report || typeof report !== 'object') return false;
  return Boolean(
    report.advertiser ||
    report.companyBackground ||
    report.campaignGoal ||
    report.headline ||
    report.description ||
    report.imagePrompt
  );
}

function reportContextMessage(report) {
  if (!reportHasContent(report)) return null;
  return {
    role: 'system',
    content: `Current editable report context from the UI. Treat this as the baseline when the user asks for changes, then render a complete updated report:\n${compactJson(report, 8000)}`,
  };
}

async function forceRenderReport(messages, res) {
  if (!renderReportTool) {
    throw new Error('render_ad_report tool is not registered.');
  }

  sendSse(res, 'status', { message: 'Forcing final report render.' });
  const assistantMessage = await callNewApiChat(
    messages,
    [renderReportTool],
    { type: 'function', function: { name: 'render_ad_report' } }
  );
  const content = normalizeAssistantContent(assistantMessage.content);
  const toolCalls = normalizeToolCalls(assistantMessage);

  if (content.trim()) {
    sendSse(res, 'assistant_message', { content });
  }

  const reportToolCall = toolCalls.find((toolCall) => toolCall.function?.name === 'render_ad_report');
  if (!reportToolCall) {
    throw new Error('Assistant did not render a report.');
  }

  messages.push({
    role: 'assistant',
    content: content || null,
    tool_calls: [reportToolCall],
  });

  const { result } = await executeToolCall(reportToolCall, res);
  messages.push({
    role: 'tool',
    tool_call_id: reportToolCall.id,
    name: 'render_ad_report',
    content: compactJson(result),
  });
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

app.post('/api/chat/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  try {
    const clientMessages = sanitizeChatMessages(req.body?.messages || []);
    if (!clientMessages.length) {
      throw new Error('Send at least one user message.');
    }

    const currentReportMessage = reportContextMessage(req.body?.report);
    const messages = [
      { role: 'system', content: chatSystemPrompt },
      ...(currentReportMessage ? [currentReportMessage] : []),
      ...clientMessages,
    ];

    sendSse(res, 'status', { message: 'Research assistant started.' });

    for (let round = 0; round < 6; round += 1) {
      const assistantMessage = await callNewApiChat(messages, chatTools);
      const content = normalizeAssistantContent(assistantMessage.content);
      const toolCalls = normalizeToolCalls(assistantMessage);

      if (content.trim()) {
        sendSse(res, 'assistant_message', { content });
      }

      if (!toolCalls.length) {
        await forceRenderReport(messages, res);
        sendSse(res, 'done');
        res.end();
        return;
      }

      messages.push({
        role: 'assistant',
        content: content || null,
        tool_calls: toolCalls,
      });

      for (const toolCall of toolCalls) {
        const name = toolCall.function?.name || 'unknown';

        try {
          const { result } = await executeToolCall(toolCall, res);
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            name,
            content: compactJson(result),
          });

          if (name === 'render_ad_report') {
            sendSse(res, 'done');
            res.end();
            return;
          }
        } catch (toolError) {
          const result = {
            ok: false,
            error: toolError.message,
          };
          sendSse(res, 'tool_result', {
            id: toolCall.id,
            name,
            summary: `Error: ${toolError.message}`,
            result,
          });
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            name,
            content: compactJson(result),
          });
        }
      }
    }

    throw new Error('Tool workflow exceeded the maximum number of rounds.');
  } catch (err) {
    console.error('Chat stream error:', err.message);
    sendSse(res, 'error', { error: err.message });
    res.end();
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

if (fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST));

  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) {
      next();
      return;
    }

    res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Ad Previewer API listening on http://localhost:${PORT}`);
  console.log(`  NEW_API_URL: ${runtimeConfig.newApiUrl || '(not set)'}`);
  console.log(`  NEW_API_IMAGE_MODEL: ${runtimeConfig.newApiImageModel}`);
  console.log(`  FALLBACK_PROVIDER: ${runtimeConfig.fallbackProvider}`);
});
