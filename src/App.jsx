import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const i18n = {
  en: {
    header: {
      title: 'CTV Ad Previewer',
      generate: 'Generate Variations',
      export: 'Export Screenshot',
      copy: 'Copy Preview Link',
    },
    tabs: {
      config: 'Ad Configuration',
      settings: 'Preview Settings',
    },
    panel: {
      configTitle: 'Ad Configuration',
      configSubtitle: 'Edit the creative. The TV preview updates instantly.',
      settingsTitle: 'Preview Settings',
      settingsSubtitle: 'Configure the Samsung placement and rendering options.',
      hint: 'Edits render locally. Image generation uses the saved New API gateway when configured.',
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
      dealOne: 'Offer badge 1',
      dealTwo: 'Offer badge 2',
      dealThree: 'Offer badge 3',
    },
    settings: {
      placement: 'Placement',
      device: 'Device frame',
      resolution: 'Resolution',
      safeArea: 'Safe area',
      previewScale: 'Preview scale',
      stageTheme: 'Stage background',
      showPhone: 'Show product phone mockup',
      showQr: 'Show QR code prompt',
      localOnly: 'Local preview state',
      noBackend: 'No backend connected',
      apiTitle: 'New API Configuration',
      apiSubtitle: 'Configure the image generation gateway from this panel.',
      newApiUrl: 'New API URL',
      newApiKey: 'New API Key',
      newApiModel: 'Image model',
      keySaved: 'API key saved',
      clearKey: 'Clear saved API key',
      apiConfigured: 'New API is configured',
      apiNotConfigured: 'New API is not configured',
      saveApiConfig: 'Save API Config',
      savingApiConfig: 'Saving...',
      imageTitle: 'Creative Image',
      uploadImage: 'Upload image',
      uploadImageHelp: 'Uploaded or generated images are applied to every placement preview.',
      imageReady: 'Image applied',
      clearImage: 'Clear image',
    },
    placement: {
      samsungHome: 'Samsung TV Plus Masthead',
    },
    devices: {
      samsung: 'Samsung-style TV',
      generic: 'Generic CTV frame',
      frameless: 'Frameless 16:9 canvas',
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
      sponsored: 'Sponsored',
      learnMore: 'Press OK to learn more',
      paused: 'Paused',
      adCountdown: 'Ad 1 of 1 - 0:15',
      qr: 'Scan for details',
      shelfTitle: 'Continue watching',
      apps: 'Featured apps',
      samsungTvPlus: 'Samsung TV Plus',
      smartHub: 'Smart Hub',
      forYou: 'For You',
      liveTab: 'Live',
      appsTab: 'Apps',
      recent: 'Recent',
      recommended: 'Recommended for You',
    },
    phone: {
      priceComparison: 'Price Comparison',
      bestPrice: 'Best Price',
      coupons: 'Found 10 Coupons!',
      off: '20% OFF at checkout',
    },
    specs: {
      placement: 'Placement',
      resolution: 'Resolution',
      safeArea: 'Safe Area',
    },
    feedback: {
      updated: 'Preview updated',
      variation: 'Generated a local creative variation',
      generating: 'Generating image with New API...',
      generated: 'AI image generated and applied to the TV preview',
      generateFailed: 'AI image generation failed. Check backend env settings.',
      configSaved: 'API configuration saved',
      configSaveFailed: 'Unable to save API configuration',
      imageUploaded: 'Image uploaded and applied to every placement',
      imageCleared: 'Preview image cleared',
      imageInvalid: 'Please upload an image file',
      imageUploadFailed: 'Image upload failed',
      copied: 'Preview link copied to clipboard',
      copyFailed: 'Unable to copy link. The URL was updated instead.',
      export: 'Screenshot export is a frontend placeholder for now',
    },
  },
  zh: {
    header: {
      title: 'CTV 广告预览器',
      generate: '生成变体',
      export: '导出截图',
      copy: '复制预览链接',
    },
    tabs: {
      config: '广告配置',
      settings: '预览设置',
    },
    panel: {
      configTitle: '广告配置',
      configSubtitle: '编辑创意内容，右侧电视预览会实时更新。',
      settingsTitle: '预览设置',
      settingsSubtitle: '配置 Samsung 广告位和渲染选项。',
      hint: '编辑内容会实时本地渲染；配置 New API 后即可通过后端生成图片。',
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
      dealOne: '优惠标签 1',
      dealTwo: '优惠标签 2',
      dealThree: '优惠标签 3',
    },
    settings: {
      placement: '广告位',
      device: '设备外框',
      resolution: '分辨率',
      safeArea: '安全区域',
      previewScale: '预览缩放',
      stageTheme: '舞台背景',
      showPhone: '显示手机产品示意',
      showQr: '显示二维码提示',
      localOnly: '本地预览状态',
      noBackend: '未接入后端',
      apiTitle: 'New API 配置',
      apiSubtitle: '在这里配置生图网关，不需要手动改环境变量。',
      newApiUrl: 'New API 地址',
      newApiKey: 'New API 密钥',
      newApiModel: '生图模型',
      keySaved: '密钥已保存',
      clearKey: '清空已保存密钥',
      apiConfigured: 'New API 已配置',
      apiNotConfigured: 'New API 未配置',
      saveApiConfig: '保存 API 配置',
      savingApiConfig: '保存中...',
      imageTitle: '创意图片',
      uploadImage: '上传图片',
      uploadImageHelp: '上传图或生成图会应用到所有广告位预览。',
      imageReady: '图片已应用',
      clearImage: '清空图片',
    },
    placement: {
      samsungHome: 'Samsung TV Plus 首页 Masthead',
    },
    devices: {
      samsung: 'Samsung 风格电视',
      generic: '通用 CTV 外框',
      frameless: '无边框 16:9 画布',
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
      sponsored: '赞助',
      learnMore: '按 OK 了解更多',
      paused: '已暂停',
      adCountdown: '广告 1/1 - 0:15',
      qr: '扫码查看详情',
      shelfTitle: '继续观看',
      apps: '精选应用',
      samsungTvPlus: 'Samsung TV Plus',
      smartHub: 'Smart Hub',
      forYou: '为你推荐',
      liveTab: '直播',
      appsTab: '应用',
      recent: '最近使用',
      recommended: '为你推荐',
    },
    phone: {
      priceComparison: '价格比较',
      bestPrice: '最低价',
      coupons: '找到 10 张优惠券！',
      off: '结账时立减 20%',
    },
    specs: {
      placement: '广告位',
      resolution: '分辨率',
      safeArea: '安全区域',
    },
    feedback: {
      updated: '预览已更新',
      variation: '已生成一个本地创意变体',
      generating: '正在通过 New API 生成图片...',
      generated: 'AI 图片已生成，并已应用到电视预览',
      generateFailed: 'AI 图片生成失败，请检查后端环境变量配置',
      configSaved: 'API 配置已保存',
      configSaveFailed: 'API 配置保存失败',
      imageUploaded: '图片已上传，并应用到所有广告位',
      imageCleared: '预览图片已清空',
      imageInvalid: '请上传图片文件',
      imageUploadFailed: '图片上传失败',
      copied: '预览链接已复制',
      copyFailed: '无法复制链接，已更新当前 URL',
      export: '截图导出暂时是前端占位，后续接入渲染器',
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
  dealOne: '20% OFF',
  dealTwo: '$15 CASH BACK',
  dealThree: 'Price Drop Alert',
};

const defaultSettings = {
  placement: 'samsungHome',
  device: 'samsung',
  resolution: '1920 x 1080',
  safeArea: 95,
  previewScale: 100,
  stageTheme: 'light',
  showPhone: true,
  showQr: true,
};

const defaultApiConfig = {
  newApiUrl: '',
  newApiKey: '',
  newApiImageModel: 'dall-e-3',
  hasNewApiKey: false,
  newApiKeyPreview: '',
  clearNewApiKey: false,
};

const localVariations = [
  {
    headline: 'Shop Smarter and Save More',
    description: 'Show shoppers a polished promotional offer with a premium marketing visual.',
    cta: 'See the Demo',
    dealOne: 'New Offer',
    dealTwo: 'Promo Ready',
    dealThree: 'High Intent',
  },
  {
    headline: 'Turn Attention Into Action',
    description: 'Bring your promotion into a clean branded hero image with a clear next step.',
    cta: 'Start Now',
    dealOne: 'Limited Time',
    dealTwo: 'QR Enabled',
    dealThree: 'Premium Promo',
  },
  {
    headline: 'Make Your Offer Stand Out',
    description: 'Preview polished ad creative before sending it to advertisers or prospects.',
    cta: 'Preview It',
    dealOne: 'Featured',
    dealTwo: 'Brand Safe',
    dealThree: 'Ad Preview',
  },
];

const SAMSUNG_NAV_TOP_ICONS = [
  { path: 'M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z', label: 'Profile' },
  { path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label: 'Search' },
  { path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'History' },
  { path: 'M14.121 14.121L7.05 21.192a2 2 0 01-2.828 0l-.414-.414a2 2 0 010-2.828l7.07-7.071m2.829 2.828l4.242-4.242a2 2 0 000-2.828l-.414-.414a2 2 0 00-2.828 0l-4.243 4.243m2.829 2.828L9.878 9.879', label: 'Edit' },
  { path: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Photos' },
];

const SAMSUNG_NAV_BOTTOM_ICONS = [
  { path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Home', active: true },
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
  const [variationIndex, setVariationIndex] = useState(0);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiConfig, setApiConfig] = useState(defaultApiConfig);
  const [isSavingApiConfig, setIsSavingApiConfig] = useState(false);
  const t = i18n[lang];

  const deals = useMemo(
    () => [creative.dealOne, creative.dealTwo, creative.dealThree].filter(Boolean),
    [creative.dealOne, creative.dealTwo, creative.dealThree],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadApiConfig() {
      try {
        const response = await fetch('/api/config');
        const data = await response.json();

        if (isMounted && data.success && data.config) {
          setApiConfig((current) => ({ ...current, ...data.config, newApiKey: '', clearNewApiKey: false }));
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

  const updateCreative = (key, value) => {
    setCreative((current) => ({ ...current, [key]: value }));
    setFeedback(t.feedback.updated);
  };

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
          clearNewApiKey: apiConfig.clearNewApiKey,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Save failed');
      }

      setApiConfig((current) => ({ ...current, ...data.config, newApiKey: '', clearNewApiKey: false }));
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

    if (!file.type.startsWith('image/')) {
      setFeedback(t.feedback.imageInvalid);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setGeneratedImageUrl(String(reader.result || ''));
      setFeedback(t.feedback.imageUploaded);
    };
    reader.onerror = () => {
      setFeedback(t.feedback.imageUploadFailed);
    };
    reader.readAsDataURL(file);
  };

  const clearCreativeImage = () => {
    setGeneratedImageUrl('');
    setFeedback(t.feedback.imageCleared);
  };

  const generateVariation = async () => {
    const nextIndex = (variationIndex + 1) % localVariations.length;
    const nextCreative = { ...creative, ...localVariations[nextIndex] };
    setVariationIndex(nextIndex);
    setCreative(nextCreative);
    setFeedback(t.feedback.generating);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creative: nextCreative, settings }),
      });
      const data = await response.json();

      if (!response.ok || !data.success || !data.imageUrl) {
        throw new Error(data.error || 'Generation failed');
      }

      setGeneratedImageUrl(data.imageUrl);
      setFeedback(t.feedback.generated);
    } catch (error) {
      console.error('Generate image failed:', error);
      setFeedback(`${t.feedback.generateFailed} ${error.message || ''}`.trim());
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPreviewLink = async () => {
    const payload = btoa(JSON.stringify({ creative, settings }));
    const nextUrl = `${window.location.origin}${window.location.pathname}#preview=${payload}`;
    window.history.replaceState(null, '', nextUrl);

    try {
      await navigator.clipboard.writeText(nextUrl);
      setFeedback(t.feedback.copied);
    } catch {
      setFeedback(t.feedback.copyFailed);
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
              <button type="button" onClick={generateVariation} disabled={isGenerating}>{isGenerating ? t.feedback.generating : t.header.generate}</button>
              <button type="button" onClick={() => setFeedback(t.feedback.export)}>{t.header.export}</button>
              <button type="button" onClick={copyPreviewLink}>{t.header.copy}</button>
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
                  <AdConfiguration
                    creative={creative}
                    onChange={updateCreative}
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
                    onImageUpload={uploadCreativeImage}
                    onClearImage={clearCreativeImage}
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
                <select
                  className="device-picker"
                  value={settings.device}
                  onChange={(event) => updateSettings('device', event.target.value)}
                >
                  {Object.entries(t.devices).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <PreviewCanvas creative={creative} deals={deals} settings={settings} t={t} generatedImageUrl={generatedImageUrl} />

              <div className="spec-row">
                <div>
                  <b>▭</b>
                  <span>{t.specs.placement}</span>
                  <strong>{t.placement[settings.placement]}</strong>
                </div>
                <div>
                  <b>⇱</b>
                  <span>{t.specs.resolution}</span>
                  <strong>{settings.resolution} (16:9)</strong>
                </div>
                <div>
                  <b>◎</b>
                  <span>{t.specs.safeArea}</span>
                  <strong>{settings.safeArea}% Center</strong>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </LangContext.Provider>
  );
}

function AdConfiguration({ creative, onChange, t }) {
  return (
    <>
      <div className="panel-heading">
        <h1>{t.panel.configTitle}</h1>
        <p>{t.panel.configSubtitle}</p>
      </div>

      <div className="form-stack">
        <TextControl label={t.form.advertiser} value={creative.advertiser} onChange={(value) => onChange('advertiser', value)} icon="◆" />
        <TextControl label={t.form.campaignGoal} value={creative.campaignGoal} onChange={(value) => onChange('campaignGoal', value)} icon="◎" />
        <TextControl label={t.form.headline} value={creative.headline} onChange={(value) => onChange('headline', value)} icon="T" maxLength={56} />
        <TextControl label={t.form.description} value={creative.description} onChange={(value) => onChange('description', value)} icon="≡" maxLength={170} multiline />
        <TextControl label={t.form.cta} value={creative.cta} onChange={(value) => onChange('cta', value)} icon="↗" maxLength={24} />

        <label className="field-row">
          <span className="field-label"><i>✦</i>{t.form.creativeStyle}</span>
          <select value={creative.creativeStyle} onChange={(event) => onChange('creativeStyle', event.target.value)}>
            {Object.entries(t.styles).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <div className="color-grid">
          <ColorControl label={t.form.primaryColor} value={creative.primaryColor} onChange={(value) => onChange('primaryColor', value)} />
          <ColorControl label={t.form.accentColor} value={creative.accentColor} onChange={(value) => onChange('accentColor', value)} />
          <ColorControl label={t.form.backgroundColor} value={creative.backgroundColor} onChange={(value) => onChange('backgroundColor', value)} />
        </div>

        <TextControl label={t.form.dealOne} value={creative.dealOne} onChange={(value) => onChange('dealOne', value)} icon="1" maxLength={22} />
        <TextControl label={t.form.dealTwo} value={creative.dealTwo} onChange={(value) => onChange('dealTwo', value)} icon="2" maxLength={22} />
        <TextControl label={t.form.dealThree} value={creative.dealThree} onChange={(value) => onChange('dealThree', value)} icon="3" maxLength={22} />
      </div>
    </>
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
  onImageUpload,
  onClearImage,
  t,
}) {
  const isApiReady = Boolean(apiConfig.newApiUrl && apiConfig.hasNewApiKey);

  return (
    <>
      <div className="panel-heading">
        <h1>{t.panel.settingsTitle}</h1>
        <p>{t.panel.settingsSubtitle}</p>
      </div>

      <div className="settings-stack">
        <div className="setting-block">
          <span className="setting-label">{t.settings.placement}</span>
          <div className="placement-grid">
            {Object.entries(t.placement).map(([value, label]) => (
              <button
                className={settings.placement === value ? 'placement-card active' : 'placement-card'}
                key={value}
                type="button"
                onClick={() => onChange('placement', value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="field-row">
          <span className="field-label">{t.settings.device}</span>
          <select value={settings.device} onChange={(event) => onChange('device', event.target.value)}>
            {Object.entries(t.devices).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <label className="field-row">
          <span className="field-label">{t.settings.resolution}</span>
          <select value={settings.resolution} onChange={(event) => onChange('resolution', event.target.value)}>
            <option>1920 x 1080</option>
            <option>2560 x 1440</option>
            <option>3840 x 2160</option>
          </select>
        </label>

        <label className="field-row">
          <span className="field-label">{t.settings.stageTheme}</span>
          <select value={settings.stageTheme} onChange={(event) => onChange('stageTheme', event.target.value)}>
            {Object.entries(t.stageThemes).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <RangeControl label={t.settings.safeArea} value={settings.safeArea} min="80" max="100" suffix="%" onChange={(value) => onChange('safeArea', value)} />
        <RangeControl label={t.settings.previewScale} value={settings.previewScale} min="80" max="115" suffix="%" onChange={(value) => onChange('previewScale', value)} />

        <ToggleControl label={t.settings.showPhone} checked={settings.showPhone} onChange={(value) => onChange('showPhone', value)} />
        <ToggleControl label={t.settings.showQr} checked={settings.showQr} onChange={(value) => onChange('showQr', value)} />

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
              <img src={creativeImageUrl} alt={t.settings.imageReady} />
            </div>
          )}

          <div className="image-action-row">
            <label className="image-upload-button">
              <input
                accept="image/*"
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

        <div className="api-config-card">
          <div className="api-card-header">
            <div>
              <strong>{t.settings.apiTitle}</strong>
              <span>{t.settings.apiSubtitle}</span>
            </div>
            <b className={isApiReady ? 'api-status ready' : 'api-status'}>
              {isApiReady ? t.settings.apiConfigured : t.settings.apiNotConfigured}
            </b>
          </div>

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

          {apiConfig.hasNewApiKey && (
            <ToggleControl
              label={t.settings.clearKey}
              checked={apiConfig.clearNewApiKey}
              onChange={(value) => onApiConfigChange('clearNewApiKey', value)}
            />
          )}

          <button className="api-save-button" type="button" onClick={onSaveApiConfig} disabled={isSavingApiConfig}>
            {isSavingApiConfig ? t.settings.savingApiConfig : t.settings.saveApiConfig}
          </button>
        </div>

        <div className="local-state-card">
          <strong>{t.settings.localOnly}</strong>
          <span>{isApiReady ? t.settings.apiConfigured : t.settings.apiNotConfigured}</span>
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

function PreviewCanvas({ creative, deals, settings, t, generatedImageUrl }) {
  const screenStyle = {
    '--primary': creative.primaryColor,
    '--accent': creative.accentColor,
    '--surface': creative.backgroundColor,
    '--safe-inset': `${(100 - settings.safeArea) / 2}%`,
    '--preview-scale': settings.previewScale / 100,
  };

  if (settings.placement === 'samsungHome') {
    return (
      <div className={`tv-stage stage-${settings.stageTheme} samsung-stage`} style={screenStyle}>
        <SamsungHomeAd creative={creative} generatedImageUrl={generatedImageUrl} scale={(settings.previewScale / 100) * 0.7} />
      </div>
    );
  }

  return (
    <div className={`tv-stage stage-${settings.stageTheme}`}>
      <div className={`tv-frame device-${settings.device}`} style={screenStyle}>
        <div className="tv-screen">
          <SafeArea />
          {settings.placement === 'fullscreen' && <FullScreenAd creative={creative} deals={deals} settings={settings} t={t} imageUrl={generatedImageUrl} />}
          {settings.placement === 'home' && <HomeScreenAd creative={creative} deals={deals} settings={settings} t={t} imageUrl={generatedImageUrl} />}
          {settings.placement === 'tile' && <SponsoredTileAd creative={creative} deals={deals} settings={settings} t={t} imageUrl={generatedImageUrl} />}
          {settings.placement === 'pause' && <PauseAd creative={creative} deals={deals} settings={settings} t={t} imageUrl={generatedImageUrl} />}
        </div>
        {settings.device !== 'frameless' && <div className="tv-bezel-label">{settings.device === 'samsung' ? 'SAMSUNG' : 'CTV'}</div>}
      </div>
      {settings.device !== 'frameless' && (
        <>
          <div className="tv-stand" />
          <div className="tv-base" />
        </>
      )}
    </div>
  );
}

function SafeArea() {
  return <div className="safe-area-outline" />;
}

function FullScreenAd({ creative, deals, settings, t, imageUrl }) {
  return (
    <div
      className={`ad-creative style-${creative.creativeStyle} ${imageUrl ? 'has-preview-image' : ''}`}
      style={imageUrl ? { backgroundImage: `linear-gradient(105deg, rgba(9, 41, 79, 0.86) 0%, rgba(9, 41, 79, 0.46) 46%, rgba(246, 249, 252, 0.12) 100%), url(${imageUrl})` } : undefined}
    >
      <AdCopy creative={creative} />
      {settings.showPhone && <PhoneMock t={t} />}
      <DealStack deals={deals} settings={settings} t={t} />
    </div>
  );
}

function SamsungHomeAd({ creative, generatedImageUrl, scale = 1 }) {
  const adContent = {
    brandName: creative.advertiser,
    headline: creative.headline,
    bodyCopy: creative.description,
    buttonText: creative.cta,
    brandColor: creative.primaryColor,
    accentColor: creative.accentColor,
    backgroundColor: creative.backgroundColor,
  };

  const mastheadBackground = generatedImageUrl
    ? `linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.16)), url(${generatedImageUrl}) center / cover no-repeat`
    : `linear-gradient(105deg, ${adContent.brandColor} 0%, ${adContent.brandColor} 52%, ${adContent.backgroundColor} 100%)`;

  return (
    <div
      className="samsung-tv-copy"
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
            <div className="tv-screen">
              <div className="masthead-section">
                <div className="masthead-content-wrapper home">
                  <div
                    className="masthead-content"
                    style={{
                      background: mastheadBackground,
                    }}
                  >
                    <div className="safe-zone-overlay" />
                    <div className="masthead-text">
                      <div className="brand-logo">{adContent.brandName}</div>
                      <h2 className="headline">{adContent.headline}</h2>
                      <p className="body-copy">{adContent.bodyCopy}</p>
                      <button className="cta-button" type="button">{adContent.buttonText}</button>
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
                  {SAMSUNG_NAV_TOP_ICONS.slice(1).map((icon) => (
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

              <div className="top-tabs">
                <div
                  className="tab-pill-group"
                  style={{
                    gap: `${SAMSUNG_TAB_GROUP_GAP}px`,
                    padding: `${SAMSUNG_TAB_GROUP_PADDING_Y}px ${SAMSUNG_TAB_GROUP_PADDING_X}px`,
                  }}
                >
                  <span className="tab-pill active" style={{ fontSize: SAMSUNG_TAB_FONT_SIZE, padding: SAMSUNG_TAB_ACTIVE_PADDING }}>
                    <span style={{ padding: `${SAMSUNG_TAB_INNER_PADDING_Y}px ${SAMSUNG_TAB_ACTIVE_PADDING_X}px` }}>For You</span>
                  </span>
                  <span className="tab-pill" style={{ fontSize: SAMSUNG_TAB_FONT_SIZE, padding: `${SAMSUNG_TAB_INNER_PADDING_Y}px ${SAMSUNG_TAB_IDLE_PADDING_X}px` }}>Live</span>
                  <span className="tab-pill" style={{ fontSize: SAMSUNG_TAB_FONT_SIZE, padding: `${SAMSUNG_TAB_INNER_PADDING_Y}px ${SAMSUNG_TAB_IDLE_PADDING_X}px` }}>Apps</span>
                </div>
              </div>

              <div className="content-section">
                <div className="row-labels">
                  <span className="row-label">Recent</span>
                  <span className="row-label">Recommended for You</span>
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
            </div>
          </div>
          <div className="tv-stand" />
          <div className="tv-brand-label">Samsung TV Plus</div>
        </div>
      </div>
    </div>
  );
}

function HomeScreenAd({ creative, deals, settings, t, imageUrl }) {
  return (
    <div className="home-preview">
      <header>
        <strong>CTV Home</strong>
        <span>Search</span>
        <span>Movies</span>
        <span>Sports</span>
        <span>{t.preview.apps}</span>
      </header>
      <section
        className={`home-hero ${imageUrl ? 'has-preview-image' : ''}`}
        style={imageUrl ? { backgroundImage: `linear-gradient(90deg, rgba(5, 14, 30, 0.86), rgba(5, 14, 30, 0.22)), url(${imageUrl})` } : undefined}
      >
        <div className="home-copy">
          <span>{t.preview.sponsored}</span>
          <h3>{creative.headline}</h3>
          <p>{creative.description}</p>
          <button>{creative.cta}</button>
        </div>
        <div className="home-ad-card">
          <strong>{creative.advertiser}</strong>
          <DealStack deals={deals.slice(0, 2)} settings={settings} t={t} compact />
        </div>
      </section>
      <ContentShelf title={t.preview.shelfTitle} />
      <ContentShelf title={t.preview.apps} small />
    </div>
  );
}

function SponsoredTileAd({ creative, deals, settings, t, imageUrl }) {
  return (
    <div className="tile-preview">
      <header>
        <strong>Watch Now</strong>
        <span>{t.preview.sponsored}</span>
      </header>
      <div className="tile-grid">
        {Array.from({ length: 7 }).map((_, index) => (
          <div className="content-tile" key={index}>Title {index + 1}</div>
        ))}
        <div
          className={`sponsored-tile ${imageUrl ? 'has-preview-image' : ''}`}
          style={imageUrl ? { backgroundImage: `linear-gradient(180deg, rgba(5, 14, 30, 0.18), rgba(5, 14, 30, 0.86)), url(${imageUrl})` } : undefined}
        >
          <span>{t.preview.sponsored}</span>
          <h3>{creative.headline}</h3>
          <p>{creative.advertiser}</p>
          <button>{creative.cta}</button>
          {settings.showQr && <QrBlock label={t.preview.qr} />}
        </div>
      </div>
    </div>
  );
}

function PauseAd({ creative, deals, settings, t, imageUrl }) {
  return (
    <div className="pause-preview">
      <div
        className={`pause-video ${imageUrl ? 'has-preview-image' : ''}`}
        style={imageUrl ? { backgroundImage: `linear-gradient(180deg, rgba(3, 6, 12, 0.2), rgba(3, 6, 12, 0.5)), url(${imageUrl})` } : undefined}
      >
        <span>{t.preview.paused}</span>
        <div className="playback-bar" />
      </div>
      <aside className="pause-panel">
        <span>{t.preview.sponsored}</span>
        <h3>{creative.headline}</h3>
        <p>{creative.description}</p>
        <button>{creative.cta}</button>
        <DealStack deals={deals.slice(0, 2)} settings={settings} t={t} compact />
        {settings.showQr && <QrBlock label={t.preview.qr} />}
      </aside>
    </div>
  );
}

function AdCopy({ creative }) {
  return (
    <section className="ad-copy">
      <div className="logo-lockup">
        <span className="brand-swoosh" />
        <strong>{creative.advertiser.split(' ').slice(0, 2).join(' ')}</strong>
        <small>{creative.advertiser.split(' ').slice(2).join(' ') || 'CTV'}</small>
      </div>
      <h3>{creative.headline}</h3>
      <p>{creative.description}</p>
      <button>{creative.cta}</button>
      <small className="legal">{creative.campaignGoal}</small>
    </section>
  );
}

function PhoneMock({ t }) {
  return (
    <section className="phone-mock" aria-label="Shopping app visual">
      <div className="phone-speaker" />
      <div className="phone-card">
        <strong>{t.phone.priceComparison}</strong>
        <span>Best Buy <b>$119.99</b></span>
        <span>Walmart <b>$119.99</b></span>
        <span>Target <b>$119.99</b></span>
        <mark>{t.phone.bestPrice} $119.99</mark>
      </div>
      <div className="phone-card coupon">
        <strong>{t.phone.coupons}</strong>
        <span>{t.phone.off}</span>
      </div>
    </section>
  );
}

function DealStack({ deals, settings, t, compact = false }) {
  return (
    <section className={compact ? 'deal-stack compact' : 'deal-stack'}>
      {deals.map((deal) => (
        <div className="deal-card" key={deal}>{deal}</div>
      ))}
      {!compact && settings.showQr && <QrBlock label={t.preview.qr} />}
    </section>
  );
}

function QrBlock({ label }) {
  return (
    <div className="qr-block">
      <div className="qr-grid" />
      <span>{label}</span>
    </div>
  );
}

function ContentShelf({ title, small = false }) {
  return (
    <section className={small ? 'content-shelf small' : 'content-shelf'}>
      <h4>{title}</h4>
      <div>
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </section>
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
