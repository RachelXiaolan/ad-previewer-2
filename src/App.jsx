import { createContext, useContext, useEffect, useState } from 'react';

const i18n = {
  en: {
    header: {
      title: 'CTV Ad Previewer',
      generate: 'Generate Image',
    },
    tabs: {
      config: 'AI Assistant',
      settings: 'Preview Settings',
    },
    panel: {
      configTitle: 'AI Creative Assistant',
      configSubtitle: 'Start with a topic, company, product, or URL. The assistant researches context and renders an editable report.',
      settingsTitle: 'Preview Settings',
      settingsSubtitle: 'Configure image generation and Samsung preview rendering.',
      hint: 'Research chat and image generation are separate flows. The report button sends the final prompt to image generation.',
    },
    assistant: {
      intro: 'Tell me the advertiser or campaign topic. I will search the web, inspect relevant pages, and build an editable report before image generation.',
      placeholder: 'Example: Research Capital One Shopping and create a CTV promo direction',
      send: 'Send',
      working: 'Researching...',
      idleTitle: 'Ready for research',
      idleText: 'Enter a new topic or an adjustment. Each run updates the report below.',
      processingTitle: 'Building report',
      processingText: 'The assistant is using context, research tools, and the current report to produce an updated report.',
      toolStatusTitle: 'Tool activity',
      noTools: 'Tool activity will appear here during research.',
      reportReady: 'Editable report rendered. Review it, make changes, then generate the image.',
      statusStarted: 'Research started',
      errorPrefix: 'Assistant error:',
    },
    report: {
      title: 'Editable Research Report',
      emptyTitle: 'No report yet',
      emptyText: 'The final tool will render a structured report here after research.',
      advertiser: 'Advertiser',
      theme: 'Theme',
      companyBackground: 'Company background',
      campaignGoal: 'Campaign goal',
      audience: 'Audience',
      headline: 'Headline',
      description: 'Description',
      cta: 'CTA',
      primaryColor: 'Primary color',
      accentColor: 'Accent color',
      backgroundColor: 'Background color',
      researchSummary: 'Research summary',
      imagePrompt: 'Image prompt',
      sources: 'Sources',
      generateImage: 'Generate Image',
    },
    form: {
      advertiser: 'Advertiser',
      campaignGoal: 'Campaign goal',
      headline: 'Headline',
      description: 'Description',
      cta: 'CTA',
      creativeStyle: 'Creative style',
      primaryColor: 'Primary color',
      accentColor: 'Accent color',
      backgroundColor: 'Background color',
    },
    settings: {
      previewScale: 'Preview scale',
      viewMode: 'View mode',
      homeScreen: 'Home Screen',
      expanded: 'Expanded',
      stageTheme: 'Stage background',
      apiTitle: 'New API Configuration',
      apiSubtitle: 'Configure the image generation gateway from this panel.',
      newApiUrl: 'New API URL',
      newApiKey: 'New API Key',
      newApiModel: 'Image model',
      newApiChatModel: 'Chat model',
      tavilyTitle: 'Research Tools',
      tavilySubtitle: 'Tavily powers web search and page extraction for the assistant.',
      tavilyApiKey: 'Tavily API Key',
      tavilyConfigured: 'Tavily is configured',
      tavilyNotConfigured: 'Tavily is not configured',
      keySaved: 'API key saved',
      tavilyKeySaved: 'Tavily key saved',
      clearKey: 'Clear saved API key',
      clearTavilyKey: 'Clear saved Tavily key',
      apiConfigured: 'New API is configured',
      apiNotConfigured: 'New API is not configured',
      saveApiConfig: 'Save API Config',
      savingApiConfig: 'Saving...',
      imageTitle: 'Creative Media',
      uploadImage: 'Upload image or video',
      uploadImageHelp: 'Uploaded videos play inside the TV preview. Generated images still apply as static creative.',
      imageReady: 'Media applied',
      clearImage: 'Clear media',
      logoTitle: 'Logo Overlay',
      uploadLogo: 'Upload logo',
      uploadLogoHelp: 'Logo is independent from image generation and can be dragged on the preview.',
      logoReady: 'Logo applied',
      clearLogo: 'Clear logo',
      logoInvalid: 'Please upload an image file',
    },
    stageThemes: {
      light: 'Light studio',
      dark: 'Dark room',
      gradient: 'Blue gradient',
    },
    styles: {
      fintech: 'Clean fintech shopping assistant',
      premium: 'Premium cinematic brand ad',
      retail: 'Bright retail promotion',
      minimal: 'Minimal performance creative',
    },
    preview: {
      title: 'CTV Ad Preview',
      live: 'Live preview',
      samsungTvPlus: 'Samsung TV Plus',
      forYou: 'For You',
      liveTab: 'Live',
      appsTab: 'Apps',
      recent: 'Recent',
      recommended: 'Recommended for You',
    },
    feedback: {
      updated: 'Preview updated',
      generating: 'Generating image with New API...',
      generated: 'AI image generated and applied to the TV preview',
      generateFailed: 'AI image generation failed. Check backend env settings.',
      configSaved: 'API configuration saved',
      configSaveFailed: 'Unable to save API configuration',
      imageUploaded: 'Media uploaded and applied to the TV preview',
      imageCleared: 'Preview media cleared',
      imageInvalid: 'Please upload an image or video file',
      imageUploadFailed: 'Media upload failed',
      chatFailed: 'Research assistant failed.',
      reportReady: 'Research report is ready',
    },
  },
  zh: {
    header: {
      title: 'CTV 广告预览器',
      generate: '生成图片',
    },
    tabs: {
      config: 'AI 助手',
      settings: '预览设置',
    },
    panel: {
      configTitle: 'AI 创意助手',
      configSubtitle: '输入主题、公司、产品或 URL，AI 会调研背景并生成可编辑报告。',
      settingsTitle: '预览设置',
      settingsSubtitle: '配置生图能力和 Samsung 预览渲染选项。',
      hint: '调研对话和生图是两个独立流程；报告按钮会把最终提示词发送给生图接口。',
    },
    assistant: {
      intro: '告诉我广告主或投放主题。我会搜索网络、抓取相关页面，并在生图前生成一份可编辑报告。',
      placeholder: '示例：调研 Capital One Shopping，生成 CTV 促销方向',
      send: '发送',
      working: '调研中...',
      idleTitle: '等待需求',
      idleText: '输入新的主题或修改要求。每次运行都会更新下面的报告。',
      processingTitle: '正在生成报告',
      processingText: 'AI 正在携带上下文、调研工具和当前报告，生成更新后的报告。',
      toolStatusTitle: '工具状态',
      noTools: 'AI 调用搜索、抓取或报告工具时会显示在这里。',
      reportReady: '可编辑报告已渲染。你可以修改字段，然后点击生成图片。',
      statusStarted: '调研已开始',
      errorPrefix: '助手错误：',
    },
    report: {
      title: '可编辑调研报告',
      emptyTitle: '还没有报告',
      emptyText: '完成调研后，最后一个工具会在这里渲染结构化报告。',
      advertiser: '广告主',
      theme: '主题',
      companyBackground: '公司背景',
      campaignGoal: '投放目标',
      audience: '目标受众',
      headline: '广告标题',
      description: '广告描述',
      cta: '行动按钮',
      primaryColor: '主色',
      accentColor: '强调色',
      backgroundColor: '背景色',
      researchSummary: '调研摘要',
      imagePrompt: '生图提示词',
      sources: '来源',
      generateImage: '生成图片',
    },
    form: {
      advertiser: '广告主',
      campaignGoal: '投放目标',
      headline: '广告标题',
      description: '广告描述',
      cta: '行动按钮',
      creativeStyle: '创意风格',
      primaryColor: '主色',
      accentColor: '强调色',
      backgroundColor: '背景色',
    },
    settings: {
      previewScale: '预览缩放',
      viewMode: '视图模式',
      homeScreen: '首页',
      expanded: '展开',
      stageTheme: '舞台背景',
      apiTitle: 'New API 配置',
      apiSubtitle: '在这里配置生图网关，不需要手动改环境变量。',
      newApiUrl: 'New API 地址',
      newApiKey: 'New API 密钥',
      newApiModel: '生图模型',
      newApiChatModel: '对话模型',
      tavilyTitle: '调研工具',
      tavilySubtitle: 'Tavily 用于 AI 助手的网络搜索和页面抓取。',
      tavilyApiKey: 'Tavily 密钥',
      tavilyConfigured: 'Tavily 已配置',
      tavilyNotConfigured: 'Tavily 未配置',
      keySaved: '密钥已保存',
      tavilyKeySaved: 'Tavily 密钥已保存',
      clearKey: '清空已保存密钥',
      clearTavilyKey: '清空已保存 Tavily 密钥',
      apiConfigured: 'New API 已配置',
      apiNotConfigured: 'New API 未配置',
      saveApiConfig: '保存 API 配置',
      savingApiConfig: '保存中...',
      imageTitle: '创意媒体',
      uploadImage: '上传图片或视频',
      uploadImageHelp: '上传视频会在电视预览里播放；生成图片仍作为静态创意应用。',
      imageReady: '媒体已应用',
      clearImage: '清空媒体',
      logoTitle: 'Logo 叠加',
      uploadLogo: '上传 Logo',
      uploadLogoHelp: 'Logo 独立于生图提示词，可在右侧预览中拖动调整位置。',
      logoReady: 'Logo 已应用',
      clearLogo: '清空 Logo',
      logoInvalid: '请上传图片文件',
    },
    stageThemes: {
      light: '浅色摄影棚',
      dark: '深色客厅',
      gradient: '蓝色渐变',
    },
    styles: {
      fintech: '干净可信的购物助手',
      premium: '高级电影感品牌广告',
      retail: '明亮零售促销',
      minimal: '极简效果广告',
    },
    preview: {
      title: 'CTV 广告预览',
      live: '实时预览',
      samsungTvPlus: 'Samsung TV Plus',
      forYou: '为你推荐',
      liveTab: '直播',
      appsTab: '应用',
      recent: '最近使用',
      recommended: '为你推荐',
    },
    feedback: {
      updated: '预览已更新',
      generating: '正在通过 New API 生成图片...',
      generated: 'AI 图片已生成，并已应用到电视预览',
      generateFailed: 'AI 图片生成失败，请检查后端环境变量配置',
      configSaved: 'API 配置已保存',
      configSaveFailed: 'API 配置保存失败',
      imageUploaded: '媒体已上传，并应用到电视预览',
      imageCleared: '预览媒体已清空',
      imageInvalid: '请上传图片或视频文件',
      imageUploadFailed: '媒体上传失败',
      chatFailed: '调研助手执行失败。',
      reportReady: '调研报告已生成',
    },
  },
};

const defaultCreative = {
  advertiser: 'Capital One Shopping',
  campaignGoal: 'Drive app installs and online shopping engagement',
  headline: 'Save More Every Time You Shop',
  description: 'Capital One Shopping helps users find deals, compare prices, and apply coupons automatically.',
  cta: 'Learn More',
  creativeStyle: 'fintech',
  primaryColor: '#09294f',
  accentColor: '#e12635',
  backgroundColor: '#f6f9fc',
};

const defaultReport = {
  advertiser: defaultCreative.advertiser,
  theme: 'CTV outreach demo',
  companyBackground: 'Capital One Shopping helps shoppers compare prices, find deals, and apply coupons while shopping online.',
  campaignGoal: defaultCreative.campaignGoal,
  audience: 'Online shoppers looking for savings and easier purchase decisions.',
  headline: defaultCreative.headline,
  description: defaultCreative.description,
  cta: defaultCreative.cta,
  colors: {
    primary: defaultCreative.primaryColor,
    accent: defaultCreative.accentColor,
    background: defaultCreative.backgroundColor,
  },
  researchSummary: 'Default editable demo copy. Use the AI assistant only when you want researched copy or a rewritten direction.',
  imagePrompt: 'Create a premium CTV advertising visual for Capital One Shopping inside a Samsung TV interface, with clean fintech styling and a clear savings message.',
  sources: [],
};

const defaultSettings = {
  previewScale: 100,
  viewMode: 'home',
  stageTheme: 'light',
};

const defaultApiConfig = {
  newApiUrl: '',
  newApiKey: '',
  newApiImageModel: 'dall-e-3',
  newApiChatModel: 'gpt-4o-mini',
  tavilyApiKey: '',
  hasNewApiKey: false,
  newApiKeyPreview: '',
  hasTavilyApiKey: false,
  tavilyApiKeyPreview: '',
  clearNewApiKey: false,
  clearTavilyApiKey: false,
};

async function readSseStream(response, onEvent) {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('Streaming response is not available.');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split('\n\n');
    buffer = blocks.pop() || '';

    blocks.forEach((block) => {
      const dataLine = block.split('\n').find((line) => line.startsWith('data:'));
      if (!dataLine) return;
      onEvent(JSON.parse(dataLine.replace(/^data:\s*/, '')));
    });
  }

  if (buffer.trim()) {
    const dataLine = buffer.split('\n').find((line) => line.startsWith('data:'));
    if (dataLine) onEvent(JSON.parse(dataLine.replace(/^data:\s*/, '')));
  }
}

function reportToCreative(report, currentCreative) {
  return {
    ...currentCreative,
    advertiser: report.advertiser ?? currentCreative.advertiser,
    campaignGoal: report.campaignGoal ?? currentCreative.campaignGoal,
    headline: report.headline ?? currentCreative.headline,
    description: report.description ?? currentCreative.description,
    cta: report.cta ?? currentCreative.cta,
    primaryColor: report.colors?.primary ?? currentCreative.primaryColor,
    accentColor: report.colors?.accent ?? currentCreative.accentColor,
    backgroundColor: report.colors?.background ?? currentCreative.backgroundColor,
  };
}

const SAMSUNG_NAV_TOP_ICONS = [
  { path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label: 'Search' },
  { path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'History' },
  { path: 'M14.121 14.121L7.05 21.192a2 2 0 01-2.828 0l-.414-.414a2 2 0 010-2.828l7.07-7.071m2.829 2.828l4.242-4.242a2 2 0 000-2.828l-.414-.414a2 2 0 00-2.828 0l-4.243 4.243m2.829 2.828L9.878 9.879', label: 'Edit' },
  { path: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Photos' },
];

const SAMSUNG_NAV_BOTTOM_ICONS = [
  { path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Home' },
  { path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', label: 'Settings' },
  { path: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', label: 'Mobile' },
];

const SAMSUNG_APP_ICONS = [
  { src: 'smartthings-icon.png', label: 'SmartThings' },
  { src: 'samsung-tv-plus-icon.jpg', label: 'Samsung TV Plus' },
  { src: 'live-tv-icon.jpg', label: 'Live TV' },
  { src: 'netflix-icon.png', label: 'Netflix' },
  { src: 'prime-video-icon.jpg', label: 'prime video' },
  { src: 'disney-plus-icon.webp', label: 'Disney+' },
  { src: 'hulu-icon.png', label: 'hulu' },
  { src: 'apple-tv-icon.png', label: 'Apple TV' },
  { src: 'peacock-icon.jpg', label: 'peacock' },
  { src: 'sling-icon.jpg', label: 'sling' },
  { src: 'youtube-icon.png', label: 'YouTube' },
  { src: 'bixby-icon.png', label: 'Bixby' },
  { src: 'samsung-internet-icon.jpg', label: 'Internet' },
];

const SAMSUNG_CONTENT_TILES = [
  { img: 'samsung-tv-bg.jpg', title: 'Rings of Power' },
  { img: 'abc-news-live.jpg', title: 'ABC News Live' },
  { img: 'prime-video-icon.jpg', title: 'Prime Video' },
  { img: 'invincible-tile.jpg', title: 'Invincible' },
];

const SAMSUNG_BASE_TV_WIDTH = 960;
const SAMSUNG_BASE_TV_HEIGHT = 540;
const SAMSUNG_BASE_PREVIEW_HEIGHT = 608;
const SAMSUNG_BASE_SCREEN_WIDTH = SAMSUNG_BASE_TV_WIDTH - 12;
const SAMSUNG_BASE_SCREEN_HEIGHT = SAMSUNG_BASE_TV_HEIGHT - 12;
const SAMSUNG_ORIGINAL_SCREEN_WIDTH = 866;
const SAMSUNG_ORIGINAL_SCREEN_HEIGHT = 481;
const SAMSUNG_ORIGINAL_X_SCALE = SAMSUNG_BASE_SCREEN_WIDTH / SAMSUNG_ORIGINAL_SCREEN_WIDTH;
const SAMSUNG_ORIGINAL_Y_SCALE = SAMSUNG_BASE_SCREEN_HEIGHT / SAMSUNG_ORIGINAL_SCREEN_HEIGHT;
const SAMSUNG_NAV_ICON_VISUAL_BOOST = 1.12;

const SAMSUNG_NAV_AVATAR_SIZE = 28.0938 * SAMSUNG_ORIGINAL_X_SCALE * SAMSUNG_NAV_ICON_VISUAL_BOOST;
const SAMSUNG_NAV_PROFILE_ICON_SIZE = 16.8576 * SAMSUNG_ORIGINAL_X_SCALE * SAMSUNG_NAV_ICON_VISUAL_BOOST;
const SAMSUNG_NAV_ICON_SIZE = 19.316 * SAMSUNG_ORIGINAL_X_SCALE * SAMSUNG_NAV_ICON_VISUAL_BOOST;
const SAMSUNG_NAV_GAP = 17.255 * SAMSUNG_ORIGINAL_X_SCALE;
const SAMSUNG_NAV_PADDING_TOP = 29.58 * SAMSUNG_ORIGINAL_Y_SCALE;
const SAMSUNG_NAV_PADDING_BOTTOM = 19.72 * SAMSUNG_ORIGINAL_Y_SCALE;

const SAMSUNG_TAB_GROUP_GAP = 26.34 * SAMSUNG_ORIGINAL_X_SCALE;
const SAMSUNG_TAB_GROUP_PADDING_Y = 3.512 * SAMSUNG_ORIGINAL_Y_SCALE;
const SAMSUNG_TAB_GROUP_PADDING_X = 4.39 * SAMSUNG_ORIGINAL_X_SCALE;
const SAMSUNG_TAB_FONT_SIZE = 11.414 * SAMSUNG_ORIGINAL_X_SCALE;
const SAMSUNG_TAB_ACTIVE_PADDING = 1.756 * SAMSUNG_ORIGINAL_X_SCALE;
const SAMSUNG_TAB_INNER_PADDING_Y = 3.512 * SAMSUNG_ORIGINAL_Y_SCALE;
const SAMSUNG_TAB_ACTIVE_PADDING_X = 17.56 * SAMSUNG_ORIGINAL_X_SCALE;
const SAMSUNG_TAB_IDLE_PADDING_X = 10.536 * SAMSUNG_ORIGINAL_X_SCALE;

const LangContext = createContext({ lang: 'en', setLang: () => {} });

function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('config');
  const [creative, setCreative] = useState(defaultCreative);
  const [settings, setSettings] = useState(defaultSettings);
  const [feedback, setFeedback] = useState(i18n.en.feedback.updated);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [creativeMedia, setCreativeMedia] = useState({
    url: '',
    type: '',
  });
  const [logoAsset, setLogoAsset] = useState({
    url: '',
    position: { x: 78, y: 22 },
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiConfig, setApiConfig] = useState(defaultApiConfig);
  const [isSavingApiConfig, setIsSavingApiConfig] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [toolEvents, setToolEvents] = useState([]);
  const [isChatting, setIsChatting] = useState(false);
  const [report, setReport] = useState(defaultReport);
  const t = i18n[lang];

  useEffect(() => {
    let isMounted = true;

    async function loadApiConfig() {
      try {
        const response = await fetch('/api/config');
        const data = await response.json();

        if (isMounted && data.success && data.config) {
          setApiConfig((current) => ({
            ...current,
            ...data.config,
            newApiKey: '',
            tavilyApiKey: '',
            clearNewApiKey: false,
            clearTavilyApiKey: false,
          }));
        }
      } catch (error) {
        console.error('Load API config failed:', error);
      }
    }

    loadApiConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!report) return;
    setCreative((current) => reportToCreative(report, current));
  }, [report]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const tagName = event.target?.tagName?.toLowerCase();
      const isEditing = tagName === 'input' || tagName === 'textarea' || tagName === 'select' || event.target?.isContentEditable;
      if (isEditing) return;

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSettings((current) => ({ ...current, viewMode: 'expanded' }));
        setFeedback(t.feedback.updated);
      }

      if (event.key === 'ArrowDown' || event.key === 'Escape') {
        event.preventDefault();
        setSettings((current) => ({ ...current, viewMode: 'home' }));
        setFeedback(t.feedback.updated);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [t.feedback.updated]);

  const updateSettings = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setFeedback(t.feedback.updated);
  };

  const updateApiConfig = (key, value) => {
    setApiConfig((current) => ({ ...current, [key]: value }));
  };

  const saveApiConfig = async () => {
    setIsSavingApiConfig(true);

    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newApiUrl: apiConfig.newApiUrl,
          newApiKey: apiConfig.newApiKey,
          newApiImageModel: apiConfig.newApiImageModel,
          newApiChatModel: apiConfig.newApiChatModel,
          clearNewApiKey: apiConfig.clearNewApiKey,
          tavilyApiKey: apiConfig.tavilyApiKey,
          clearTavilyApiKey: apiConfig.clearTavilyApiKey,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Save failed');
      }

      setApiConfig((current) => ({
        ...current,
        ...data.config,
        newApiKey: '',
        tavilyApiKey: '',
        clearNewApiKey: false,
        clearTavilyApiKey: false,
      }));
      setFeedback(t.feedback.configSaved);
    } catch (error) {
      console.error('Save API config failed:', error);
      setFeedback(`${t.feedback.configSaveFailed} ${error.message || ''}`.trim());
    } finally {
      setIsSavingApiConfig(false);
    }
  };

  const uploadCreativeImage = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setFeedback(t.feedback.imageInvalid);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || '');
      setGeneratedImageUrl(url);
      setCreativeMedia({
        url,
        type: file.type.startsWith('video/') ? 'video' : 'image',
      });
      setFeedback(t.feedback.imageUploaded);
    };
    reader.onerror = () => {
      setFeedback(t.feedback.imageUploadFailed);
    };
    reader.readAsDataURL(file);
  };

  const clearCreativeImage = () => {
    setGeneratedImageUrl('');
    setCreativeMedia({ url: '', type: '' });
    setFeedback(t.feedback.imageCleared);
  };

  const uploadLogo = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFeedback(t.settings.logoInvalid);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoAsset((current) => ({
        ...current,
        url: String(reader.result || ''),
      }));
      setFeedback(t.settings.logoReady);
    };
    reader.onerror = () => {
      setFeedback(t.feedback.imageUploadFailed);
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    setLogoAsset((current) => ({ ...current, url: '' }));
    setFeedback(t.feedback.updated);
  };

  const updateLogoPosition = (position) => {
    setLogoAsset((current) => ({
      ...current,
      position,
    }));
  };

  const updateReport = (key, value) => {
    setReport((current) => {
      if (!current) return current;
      return { ...current, [key]: value };
    });
    setFeedback(t.feedback.updated);
  };

  const updateReportColor = (key, value) => {
    setReport((current) => {
      if (!current) return current;
      const next = {
        ...current,
        colors: {
          ...(current.colors || {}),
          [key]: value,
        },
      };
      return next;
    });
    setFeedback(t.feedback.updated);
  };

  const submitChat = async () => {
    const content = chatInput.trim();
    if (!content || isChatting) return;

    const nextMessages = [...chatMessages, { role: 'user', content }];
    setChatMessages(nextMessages);
    setChatInput('');
    setToolEvents([]);
    setIsChatting(true);
    setFeedback(t.assistant.statusStarted);

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, report }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Chat request failed');
      }

      await readSseStream(response, (event) => {
        if (event.type === 'tool_start') {
          setToolEvents((current) => [
            ...current,
            {
              id: event.id,
              name: event.name,
              status: 'running',
              arguments: event.arguments,
              summary: '',
            },
          ]);
        } else if (event.type === 'tool_result') {
          setToolEvents((current) => current.map((item) => (
            item.id === event.id
              ? { ...item, status: event.result?.ok === false ? 'error' : 'done', summary: event.summary, result: event.result }
              : item
          )));
        } else if (event.type === 'report' && event.report) {
          setReport(event.report);
          setFeedback(t.feedback.reportReady);
        } else if (event.type === 'error') {
          throw new Error(event.error || 'Chat stream failed');
        }
      });
    } catch (error) {
      console.error('Chat failed:', error);
      const errorMessage = `${t.assistant.errorPrefix} ${error.message || t.feedback.chatFailed}`.trim();
      setChatMessages((current) => [...current, { role: 'assistant', content: errorMessage }]);
      setFeedback(`${t.feedback.chatFailed} ${error.message || ''}`.trim());
    } finally {
      setIsChatting(false);
    }
  };

  const generateImage = async (sourceReport = report) => {
    setFeedback(t.feedback.generating);
    setIsGenerating(true);

    try {
      const requestBody = sourceReport
        ? { report: sourceReport, prompt: sourceReport.imagePrompt }
        : { creative, settings };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();

      if (!response.ok || !data.success || !data.imageUrl) {
        throw new Error(data.error || 'Generation failed');
      }

      setGeneratedImageUrl(data.imageUrl);
      setCreativeMedia({ url: data.imageUrl, type: 'image' });
      setFeedback(t.feedback.generated);
    } catch (error) {
      console.error('Generate image failed:', error);
      setFeedback(`${t.feedback.generateFailed} ${error.message || ''}`.trim());
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <main className="app-shell">
        <section className="workspace">
          <header className="topbar">
            <div className="brand-mark">
              <span className="spark">✦</span>
              <strong>FeedMob</strong>
              <span>{t.header.title}</span>
            </div>
            <div className="actions">
              <LangToggle />
            </div>
          </header>

          <div className="content-grid">
            <section className="config-panel" aria-label="Ad controls">
              <div className="tabs">
                <button
                  className={activeTab === 'config' ? 'selected' : ''}
                  type="button"
                  onClick={() => setActiveTab('config')}
                >
                  {t.tabs.config}
                </button>
                <button
                  className={activeTab === 'settings' ? 'selected' : ''}
                  type="button"
                  onClick={() => setActiveTab('settings')}
                >
                  {t.tabs.settings}
                </button>
              </div>

              <div className="panel-card">
                {activeTab === 'config' ? (
                  <CreativeAssistant
                    chatInput={chatInput}
                    onChatInputChange={setChatInput}
                    onSubmitChat={submitChat}
                    isChatting={isChatting}
                    toolEvents={toolEvents}
                    report={report}
                    onReportChange={updateReport}
                    onReportColorChange={updateReportColor}
                    onGenerateImage={() => generateImage(report)}
                    isGenerating={isGenerating}
                    t={t}
                  />
                ) : (
                  <PreviewSettings
                    settings={settings}
                    onChange={updateSettings}
                    apiConfig={apiConfig}
                    onApiConfigChange={updateApiConfig}
                    onSaveApiConfig={saveApiConfig}
                    isSavingApiConfig={isSavingApiConfig}
                    creativeImageUrl={generatedImageUrl}
                    creativeMedia={creativeMedia}
                    onImageUpload={uploadCreativeImage}
                    onClearImage={clearCreativeImage}
                    logoAsset={logoAsset}
                    onLogoUpload={uploadLogo}
                    onClearLogo={clearLogo}
                    t={t}
                  />
                )}

                <div className="feedback-box">
                  <strong>{feedback}</strong>
                  <span>{t.panel.hint}</span>
                </div>
              </div>
            </section>

            <section className="preview-panel" aria-label="CTV ad preview">
              <div className="preview-header">
                <div>
                  <h2>{t.preview.title}</h2>
                  <span className="live-dot">{t.preview.live}</span>
                </div>
              </div>

              <PreviewCanvas
                creative={creative}
                settings={settings}
                t={t}
                generatedImageUrl={generatedImageUrl}
                creativeMedia={creativeMedia}
                logoAsset={logoAsset}
                onLogoPositionChange={updateLogoPosition}
                onViewModeChange={(viewMode) => updateSettings('viewMode', viewMode)}
              />
            </section>
          </div>
        </section>
      </main>
    </LangContext.Provider>
  );
}

function CreativeAssistant({
  chatInput,
  onChatInputChange,
  onSubmitChat,
  isChatting,
  toolEvents,
  report,
  onReportChange,
  onReportColorChange,
  onGenerateImage,
  isGenerating,
  t,
}) {
  return (
    <>
      <div className="panel-heading">
        <h1>{t.panel.configTitle}</h1>
        <p>{t.panel.configSubtitle}</p>
      </div>

      <div className="assistant-stack">
        <section className="chat-card">
          <div className={`processing-panel ${isChatting ? 'active' : ''}`} aria-live="polite">
            <div className="processing-icon">
              {isChatting ? (
                <>
                  <span />
                  <span />
                  <span />
                </>
              ) : (
                <b>AI</b>
              )}
            </div>
            <div>
              <strong>{isChatting ? t.assistant.processingTitle : t.assistant.idleTitle}</strong>
              <p>{isChatting ? t.assistant.processingText : t.assistant.idleText}</p>
            </div>
          </div>

          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmitChat();
            }}
          >
            <textarea
              value={chatInput}
              placeholder={t.assistant.placeholder}
              onChange={(event) => onChatInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  onSubmitChat();
                }
              }}
            />
            <button type="submit" disabled={isChatting || !chatInput.trim()}>
              {isChatting ? t.assistant.working : t.assistant.send}
            </button>
          </form>
        </section>

        <ToolActivity toolEvents={toolEvents} t={t} />

        <ReportEditor
          report={report}
          onChange={onReportChange}
          onColorChange={onReportColorChange}
          onGenerateImage={onGenerateImage}
          isGenerating={isGenerating}
          t={t}
        />
      </div>
    </>
  );
}

function ToolActivity({ toolEvents, t }) {
  return (
    <section className="tool-card">
      <div className="tool-card-header">
        <strong>{t.assistant.toolStatusTitle}</strong>
      </div>

      {toolEvents.length === 0 ? (
        <p className="tool-empty">{t.assistant.noTools}</p>
      ) : (
        <div className="tool-list">
          {toolEvents.map((event) => (
            <div key={event.id} className={`tool-event ${event.status}`}>
              <span className="tool-dot" />
              <div>
                <strong>{toolNameLabel(event.name)}</strong>
                <p>{event.summary || toolArgumentSummary(event.arguments)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function toolNameLabel(name) {
  const labels = {
    web_search: 'Web Search',
    web_fetch: 'Web Fetch',
    scrape_url: 'Web Fetch',
    render_ad_report: 'Render Report',
  };
  return labels[name] || name || 'Tool';
}

function toolArgumentSummary(args = {}) {
  if (args.query) return args.query;
  if (args.urls) return Array.isArray(args.urls) ? args.urls.join(', ') : args.urls;
  return 'Running...';
}

function ReportEditor({ report, onChange, onColorChange, onGenerateImage, isGenerating, t }) {
  if (!report) {
    return (
      <section className="report-card report-empty">
        <h2>{t.report.emptyTitle}</h2>
        <p>{t.report.emptyText}</p>
      </section>
    );
  }

  return (
    <section className="report-card">
      <div className="report-header">
        <div>
          <h2>{t.report.title}</h2>
          <span>{t.assistant.reportReady}</span>
        </div>
        <button type="button" onClick={onGenerateImage} disabled={isGenerating || !report.imagePrompt?.trim()}>
          {isGenerating ? t.feedback.generating : t.report.generateImage}
        </button>
      </div>

      <div className="report-grid">
        <TextControl label={t.report.advertiser} value={report.advertiser || ''} onChange={(value) => onChange('advertiser', value)} icon="A" />
        <TextControl label={t.report.theme} value={report.theme || ''} onChange={(value) => onChange('theme', value)} icon="T" />
        <TextControl label={t.report.companyBackground} value={report.companyBackground || ''} onChange={(value) => onChange('companyBackground', value)} icon="B" multiline />
        <TextControl label={t.report.campaignGoal} value={report.campaignGoal || ''} onChange={(value) => onChange('campaignGoal', value)} icon="G" multiline />
        <TextControl label={t.report.audience} value={report.audience || ''} onChange={(value) => onChange('audience', value)} icon="◎" />
        <TextControl label={t.report.headline} value={report.headline || ''} onChange={(value) => onChange('headline', value)} icon="H" maxLength={56} />
        <TextControl label={t.report.description} value={report.description || ''} onChange={(value) => onChange('description', value)} icon="D" maxLength={170} multiline />
        <TextControl label={t.report.cta} value={report.cta || ''} onChange={(value) => onChange('cta', value)} icon="↗" maxLength={24} />

        <div className="color-grid">
          <ColorControl label={t.report.primaryColor} value={report.colors?.primary || '#09294f'} onChange={(value) => onColorChange('primary', value)} />
          <ColorControl label={t.report.accentColor} value={report.colors?.accent || '#e12635'} onChange={(value) => onColorChange('accent', value)} />
          <ColorControl label={t.report.backgroundColor} value={report.colors?.background || '#f6f9fc'} onChange={(value) => onColorChange('background', value)} />
        </div>

        <TextControl label={t.report.researchSummary} value={report.researchSummary || ''} onChange={(value) => onChange('researchSummary', value)} icon="R" multiline />
        <TextControl label={t.report.imagePrompt} value={report.imagePrompt || ''} onChange={(value) => onChange('imagePrompt', value)} icon="P" multiline />
      </div>

      {report.sources?.length > 0 && (
        <div className="source-list">
          <strong>{t.report.sources}</strong>
          {report.sources.map((source, index) => (
            <a key={`${source.url}-${index}`} href={source.url} target="_blank" rel="noreferrer">
              {source.title || source.url}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

function PreviewSettings({
  settings,
  onChange,
  apiConfig,
  onApiConfigChange,
  onSaveApiConfig,
  isSavingApiConfig,
  creativeImageUrl,
  creativeMedia,
  onImageUpload,
  onClearImage,
  logoAsset,
  onLogoUpload,
  onClearLogo,
  t,
}) {
  const isApiReady = Boolean(apiConfig.newApiUrl && apiConfig.hasNewApiKey);
  const isTavilyReady = Boolean(apiConfig.hasTavilyApiKey);
  const [isApiConfigOpen, setIsApiConfigOpen] = useState(false);

  return (
    <>
      <div className="panel-heading">
        <h1>{t.panel.settingsTitle}</h1>
        <p>{t.panel.settingsSubtitle}</p>
      </div>

      <div className="settings-stack">
        <label className="field-row">
          <span className="field-label">{t.settings.stageTheme}</span>
          <select value={settings.stageTheme} onChange={(event) => onChange('stageTheme', event.target.value)}>
            {Object.entries(t.stageThemes).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <RangeControl label={t.settings.previewScale} value={settings.previewScale} min="80" max="115" suffix="%" onChange={(value) => onChange('previewScale', value)} />

        <div className="view-mode-card">
          <span className="field-label">{t.settings.viewMode}</span>
          <div className="segmented-control">
            <button
              className={settings.viewMode === 'home' ? 'selected' : ''}
              type="button"
              onClick={() => onChange('viewMode', 'home')}
            >
              {t.settings.homeScreen}
            </button>
            <button
              className={settings.viewMode === 'expanded' ? 'selected' : ''}
              type="button"
              onClick={() => onChange('viewMode', 'expanded')}
            >
              {t.settings.expanded}
            </button>
          </div>
        </div>

        <div className="image-config-card">
          <div className="api-card-header">
            <div>
              <strong>{t.settings.imageTitle}</strong>
              <span>{t.settings.uploadImageHelp}</span>
            </div>
            {creativeImageUrl && <b className="api-status ready">{t.settings.imageReady}</b>}
          </div>

          {creativeImageUrl && (
            <div className="uploaded-image-preview">
              {creativeMedia?.type === 'video' ? (
                <video src={creativeImageUrl} muted playsInline loop controls />
              ) : (
                <img src={creativeImageUrl} alt={t.settings.imageReady} />
              )}
            </div>
          )}

          <div className="image-action-row">
            <label className="image-upload-button">
              <input
                accept="image/*,video/*"
                type="file"
                onChange={(event) => {
                  onImageUpload(event.target.files?.[0]);
                  event.target.value = '';
                }}
              />
              <span>{t.settings.uploadImage}</span>
            </label>
            {creativeImageUrl && (
              <button className="image-clear-button" type="button" onClick={onClearImage}>
                {t.settings.clearImage}
              </button>
            )}
          </div>
        </div>

        <div className="image-config-card">
          <div className="api-card-header">
            <div>
              <strong>{t.settings.logoTitle}</strong>
              <span>{t.settings.uploadLogoHelp}</span>
            </div>
            {logoAsset.url && <b className="api-status ready">{t.settings.logoReady}</b>}
          </div>

          {logoAsset.url && (
            <div className="uploaded-logo-preview">
              <img src={logoAsset.url} alt={t.settings.logoReady} />
            </div>
          )}

          <div className="image-action-row">
            <label className="image-upload-button">
              <input
                accept="image/*"
                type="file"
                onChange={(event) => {
                  onLogoUpload(event.target.files?.[0]);
                  event.target.value = '';
                }}
              />
              <span>{t.settings.uploadLogo}</span>
            </label>
            {logoAsset.url && (
              <button className="image-clear-button" type="button" onClick={onClearLogo}>
                {t.settings.clearLogo}
              </button>
            )}
          </div>
        </div>

        <div className="api-config-card">
          <button
            className="api-card-header api-card-toggle"
            type="button"
            aria-expanded={isApiConfigOpen}
            onClick={() => setIsApiConfigOpen((current) => !current)}
          >
            <div>
              <strong>{t.settings.apiTitle}</strong>
              <span>{t.settings.apiSubtitle}</span>
            </div>
            <span className="api-toggle-meta">
              <b className={isApiReady ? 'api-status ready' : 'api-status'}>
                {isApiReady ? t.settings.apiConfigured : t.settings.apiNotConfigured}
              </b>
              <i>{isApiConfigOpen ? '⌃' : '⌄'}</i>
            </span>
          </button>

          {isApiConfigOpen && (
            <div className="api-config-body">
              <label className="field-row">
                <span className="field-label">{t.settings.newApiUrl}</span>
                <input
                  placeholder="https://api.example.com"
                  value={apiConfig.newApiUrl}
                  onChange={(event) => onApiConfigChange('newApiUrl', event.target.value)}
                />
              </label>

              <label className="field-row">
                <span className="field-label">{t.settings.newApiKey}</span>
                <input
                  autoComplete="off"
                  placeholder={apiConfig.hasNewApiKey ? apiConfig.newApiKeyPreview : 'sk-...'}
                  type="password"
                  value={apiConfig.newApiKey}
                  onChange={(event) => onApiConfigChange('newApiKey', event.target.value)}
                />
                {apiConfig.hasNewApiKey && (
                  <small className="secret-preview">{t.settings.keySaved}: {apiConfig.newApiKeyPreview}</small>
                )}
              </label>

              <label className="field-row">
                <span className="field-label">{t.settings.newApiModel}</span>
                <input
                  placeholder="dall-e-3"
                  value={apiConfig.newApiImageModel}
                  onChange={(event) => onApiConfigChange('newApiImageModel', event.target.value)}
                />
              </label>

              <label className="field-row">
                <span className="field-label">{t.settings.newApiChatModel}</span>
                <input
                  placeholder="gpt-4o-mini"
                  value={apiConfig.newApiChatModel}
                  onChange={(event) => onApiConfigChange('newApiChatModel', event.target.value)}
                />
              </label>

              {apiConfig.hasNewApiKey && (
                <ToggleControl
                  label={t.settings.clearKey}
                  checked={apiConfig.clearNewApiKey}
                  onChange={(value) => onApiConfigChange('clearNewApiKey', value)}
                />
              )}

              <div className="api-card-header separated">
                <div>
                  <strong>{t.settings.tavilyTitle}</strong>
                  <span>{t.settings.tavilySubtitle}</span>
                </div>
                <b className={isTavilyReady ? 'api-status ready' : 'api-status'}>
                  {isTavilyReady ? t.settings.tavilyConfigured : t.settings.tavilyNotConfigured}
                </b>
              </div>

              <label className="field-row">
                <span className="field-label">{t.settings.tavilyApiKey}</span>
                <input
                  autoComplete="off"
                  placeholder={apiConfig.hasTavilyApiKey ? apiConfig.tavilyApiKeyPreview : 'tvly-...'}
                  type="password"
                  value={apiConfig.tavilyApiKey}
                  onChange={(event) => onApiConfigChange('tavilyApiKey', event.target.value)}
                />
                {apiConfig.hasTavilyApiKey && (
                  <small className="secret-preview">{t.settings.tavilyKeySaved}: {apiConfig.tavilyApiKeyPreview}</small>
                )}
              </label>

              {apiConfig.hasTavilyApiKey && (
                <ToggleControl
                  label={t.settings.clearTavilyKey}
                  checked={apiConfig.clearTavilyApiKey}
                  onChange={(value) => onApiConfigChange('clearTavilyApiKey', value)}
                />
              )}

              <button className="api-save-button" type="button" onClick={onSaveApiConfig} disabled={isSavingApiConfig}>
                {isSavingApiConfig ? t.settings.savingApiConfig : t.settings.saveApiConfig}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function TextControl({ label, value, onChange, icon, maxLength, multiline = false }) {
  const controlId = label.replace(/\s+/g, '-').toLowerCase();
  return (
    <label className="field-row" htmlFor={controlId}>
      <span className="field-label"><i>{icon}</i>{label}</span>
      <span className="control-wrap">
        {multiline ? (
          <textarea id={controlId} maxLength={maxLength} value={value} onChange={(event) => onChange(event.target.value)} />
        ) : (
          <input id={controlId} maxLength={maxLength} value={value} onChange={(event) => onChange(event.target.value)} />
        )}
        {maxLength && <small>{value.length} / {maxLength}</small>}
      </span>
    </label>
  );
}

function ColorControl({ label, value, onChange }) {
  return (
    <label className="color-control">
      <span>{label}</span>
      <div>
        <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
        <input value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </label>
  );
}

function RangeControl({ label, value, min, max, suffix, onChange }) {
  return (
    <label className="range-row">
      <span>{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <strong>{value}{suffix}</strong>
    </label>
  );
}

function ToggleControl({ label, checked, onChange }) {
  return (
    <label className="toggle-row">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}

function PreviewCanvas({ creative, settings, t, generatedImageUrl, creativeMedia, logoAsset, onLogoPositionChange, onViewModeChange }) {
  const previewScale = (settings.previewScale / 100) * 0.7;

  return (
    <div
      className={`tv-stage stage-${settings.stageTheme} samsung-stage`}
      style={{ '--preview-shell-width': `${SAMSUNG_BASE_TV_WIDTH * previewScale}px` }}
    >
      <div className="preview-device-row">
        <SamsungHomeAd
          creative={creative}
          generatedImageUrl={generatedImageUrl}
          creativeMedia={creativeMedia}
          logoAsset={logoAsset}
          onLogoPositionChange={onLogoPositionChange}
          viewMode={settings.viewMode}
          scale={previewScale}
          t={t}
        />
        <RemoteControl
          viewMode={settings.viewMode}
          onViewModeChange={onViewModeChange}
        />
      </div>
    </div>
  );
}

function SamsungHomeAd({ creative, generatedImageUrl, creativeMedia, logoAsset, onLogoPositionChange, viewMode = 'home', scale = 1, t }) {
  const adContent = {
    brandName: creative.advertiser,
    headline: creative.headline,
    bodyCopy: creative.description,
    buttonText: creative.cta,
    brandColor: creative.primaryColor,
    accentColor: creative.accentColor,
    backgroundColor: creative.backgroundColor,
  };

  const screenBackground = generatedImageUrl
    && creativeMedia?.type !== 'video'
    ? `url(${generatedImageUrl}) center / cover no-repeat`
    : `linear-gradient(105deg, ${adContent.brandColor} 0%, ${adContent.brandColor} 52%, ${adContent.backgroundColor} 100%)`;
  const isExpanded = viewMode === 'expanded';
  const hasVideo = Boolean(creativeMedia?.type === 'video' && creativeMedia.url);
  const brandName = adContent.brandName?.trim();
  const headline = adContent.headline?.trim();
  const bodyCopy = adContent.bodyCopy?.trim();
  const buttonText = adContent.buttonText?.trim();

  return (
    <div
      className={`samsung-tv-copy mode-${viewMode}`}
      style={{
        '--samsung-primary': adContent.brandColor,
        '--samsung-accent': adContent.accentColor,
        '--samsung-surface': adContent.backgroundColor,
      }}
    >
      <div
        className="tv-scale-shell"
        style={{
          '--tv-scale': scale,
          '--tv-shell-width': `${SAMSUNG_BASE_TV_WIDTH * scale}px`,
          '--tv-shell-height': `${SAMSUNG_BASE_PREVIEW_HEIGHT * scale}px`,
        }}
      >
        <div className="tv-outer-wrapper">
          <div className="tv-frame">
            <div
              className={`tv-screen ${isExpanded ? 'expanded-screen' : 'home-screen'} ${hasVideo ? 'has-screen-video' : ''}`}
              style={{ '--screen-background': screenBackground }}
            >
              {hasVideo && (
                <video className="screen-video" src={creativeMedia.url} autoPlay muted playsInline loop />
              )}
              {isExpanded ? (
                <ExpandedAdView
                  brandName={brandName}
                  headline={headline}
                  bodyCopy={bodyCopy}
                  buttonText={buttonText}
                />
              ) : (
                <>
                  <div className="masthead-section">
                    <div className="masthead-content-wrapper home">
                      <div className="masthead-content">
                        <div className="masthead-text">
                          {brandName && <div className="home-brand-logo">{brandName}</div>}
                          {headline && <h2 className="headline">{headline}</h2>}
                          {bodyCopy && <p className="body-copy">{bodyCopy}</p>}
                          {buttonText && <button className="cta-button home-cta" type="button">{buttonText}</button>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="nav-bar-overlay"
                    style={{
                      paddingTop: `${SAMSUNG_NAV_PADDING_TOP}px`,
                      paddingBottom: `${SAMSUNG_NAV_PADDING_BOTTOM}px`,
                    }}
                  >
                    <div className="nav-top" style={{ gap: `${SAMSUNG_NAV_GAP}px` }}>
                      <div className="nav-avatar" style={{ width: SAMSUNG_NAV_AVATAR_SIZE, height: SAMSUNG_NAV_AVATAR_SIZE }}>
                        <svg viewBox="0 0 24 24" fill="none" width={SAMSUNG_NAV_PROFILE_ICON_SIZE} height={SAMSUNG_NAV_PROFILE_ICON_SIZE}>
                          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" fill="white" />
                        </svg>
                      </div>
                      {SAMSUNG_NAV_TOP_ICONS.map((icon) => (
                        <svg key={icon.label} viewBox="0 0 24 24" fill="none" width={SAMSUNG_NAV_ICON_SIZE} height={SAMSUNG_NAV_ICON_SIZE} className="nav-svg-icon">
                          <path d={icon.path} stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ))}
                      <svg viewBox="0 0 24 24" fill="none" width={SAMSUNG_NAV_ICON_SIZE} height={SAMSUNG_NAV_ICON_SIZE} className="nav-svg-icon active">
                        <defs>
                          <linearGradient id="navGradTop" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={adContent.accentColor} />
                            <stop offset="100%" stopColor={adContent.brandColor} />
                          </linearGradient>
                        </defs>
                        <path d={SAMSUNG_NAV_BOTTOM_ICONS[0].path} stroke="url(#navGradTop)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="nav-bottom" style={{ gap: `${SAMSUNG_NAV_GAP}px` }}>
                      {SAMSUNG_NAV_BOTTOM_ICONS.slice(1).map((icon) => (
                        <svg key={icon.label} viewBox="0 0 24 24" fill="none" width={SAMSUNG_NAV_ICON_SIZE} height={SAMSUNG_NAV_ICON_SIZE} className="nav-svg-icon">
                          <path d={icon.path} stroke="rgba(255,255,255,0.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <div className="screen-bottom-fade" />

                  <div className="top-tabs">
                    <div
                      className="tab-pill-group"
                      style={{
                        gap: `${SAMSUNG_TAB_GROUP_GAP}px`,
                        padding: `${SAMSUNG_TAB_GROUP_PADDING_Y}px ${SAMSUNG_TAB_GROUP_PADDING_X}px`,
                      }}
                    >
                      <span className="tab-pill active" style={{ fontSize: SAMSUNG_TAB_FONT_SIZE, padding: SAMSUNG_TAB_ACTIVE_PADDING }}>
                        <span style={{ padding: `${SAMSUNG_TAB_INNER_PADDING_Y}px ${SAMSUNG_TAB_ACTIVE_PADDING_X}px` }}>{t.preview.forYou}</span>
                      </span>
                      <span className="tab-pill" style={{ fontSize: SAMSUNG_TAB_FONT_SIZE, padding: `${SAMSUNG_TAB_INNER_PADDING_Y}px ${SAMSUNG_TAB_IDLE_PADDING_X}px` }}>{t.preview.liveTab}</span>
                      <span className="tab-pill" style={{ fontSize: SAMSUNG_TAB_FONT_SIZE, padding: `${SAMSUNG_TAB_INNER_PADDING_Y}px ${SAMSUNG_TAB_IDLE_PADDING_X}px` }}>{t.preview.appsTab}</span>
                    </div>
                  </div>

                  <div className="content-section">
                    <div className="row-labels">
                      <span className="row-label">{t.preview.recent}</span>
                      <span className="row-label">{t.preview.recommended}</span>
                      <span />
                      <span />
                    </div>
                    <div className="tiles-row">
                      {SAMSUNG_CONTENT_TILES.map((tile) => (
                        <div key={tile.title} className="content-tile">
                          <img src={`/${tile.img}`} alt={tile.title} draggable={false} />
                        </div>
                      ))}
                    </div>
                    <div className="app-icons-row">
                      {SAMSUNG_APP_ICONS.map((app) => (
                        <div key={app.label} className="app-icon-item">
                          <div className="app-icon-circle">
                            <img src={`/${app.src}`} alt={app.label} draggable={false} />
                          </div>
                          <span className="app-icon-label">{app.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {logoAsset?.url && (
                <DraggableLogo
                  logoAsset={logoAsset}
                  onPositionChange={onLogoPositionChange}
                />
              )}
            </div>
          </div>
          <div className="tv-stand" />
          <div className="tv-brand-label">{t.preview.samsungTvPlus}</div>
        </div>
      </div>
    </div>
  );
}

function ExpandedAdView({ brandName, headline, bodyCopy, buttonText }) {
  return (
    <div className="expanded-ad-view">
      <div className="expanded-ad-copy">
        {brandName && <span className="expanded-ad-kicker">{brandName}</span>}
        {headline && <h2>{headline}</h2>}
        {bodyCopy && <p>{bodyCopy}</p>}
      </div>
      <div className="expanded-ad-action">
        {brandName && <div className="expanded-ad-brand">{brandName}</div>}
        {buttonText && <button className="cta-button expanded-ad-cta" type="button">{buttonText}</button>}
      </div>
    </div>
  );
}

function DraggableLogo({ logoAsset, onPositionChange }) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateFromPointer = (event) => {
    const container = event.currentTarget.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 8, 92);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 10, 90);
    onPositionChange?.({ x, y });
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateFromPointer(event);
  };

  const handlePointerMove = (event) => {
    if (!event.currentTarget.hasPointerCapture?.(event.pointerId)) return;
    updateFromPointer(event);
  };

  return (
    <div
      className="draggable-logo"
      style={{
        left: `${logoAsset.position?.x ?? 78}%`,
        top: `${logoAsset.position?.y ?? 22}%`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <img src={logoAsset.url} alt="Logo overlay" draggable={false} />
    </div>
  );
}

function RemoteControl({ viewMode, onViewModeChange }) {
  return (
    <div className="remote-control" aria-label="TV remote">
      <div className="remote-top-slot" />
      <div className="remote-dpad">
        <button
          className={viewMode === 'expanded' ? 'remote-arrow remote-up active' : 'remote-arrow remote-up'}
          type="button"
          aria-label="Expanded view"
          onClick={() => onViewModeChange?.('expanded')}
        >
          ▲
        </button>
        <button className="remote-arrow remote-left" type="button" aria-label="Left">‹</button>
        <button className="remote-ok" type="button" aria-label="OK">OK</button>
        <button className="remote-arrow remote-right" type="button" aria-label="Right">›</button>
        <button
          className={viewMode === 'home' ? 'remote-arrow remote-down active' : 'remote-arrow remote-down'}
          type="button"
          aria-label="Home screen view"
          onClick={() => onViewModeChange?.('home')}
        >
          ▼
        </button>
      </div>
      <button
        className="remote-back"
        type="button"
        onClick={() => onViewModeChange?.('home')}
        aria-label="Back to home screen"
      >
        Back
      </button>
    </div>
  );
}

function LangToggle() {
  const { lang, setLang } = useContext(LangContext);
  return (
    <button
      className="lang-toggle"
      onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
      type="button"
      aria-label={lang === 'en' ? 'Switch to Chinese' : 'Switch to English'}
    >
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  );
}

export default App;
