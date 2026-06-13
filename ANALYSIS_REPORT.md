# CTV Ad Previewer 项目分析报告

- 仓库：`RachelXiaolan/ad-previewer-2`
- 远端：`https://github.com/RachelXiaolan/ad-previewer-2`
- 当前分支：`main`（与 `origin/main` 同步，commit `f324f47`）
- 报告生成日期：2026-06-13

## 1. 项目定位

CTV（Connected TV）广告创意预览与生成工具，面向 FeedMob 投放团队。前端模拟 Samsung TV Plus 首页 + 展开广告位两种视图；后端聚合 New API（OpenAI 兼容网关，可用于对话和生图）与 Tavily 网络搜索/抓取，形成"AI 调研 → 可编辑报告 → 一键生图 → 实时电视预览"的闭环。

## 2. 技术栈

- 前端：React 18 + Vite 5，使用原生 CSS（无 UI 库），中英双语（`LangContext` + i18n 表）。
- 后端：Node.js 22（`node:http` 原生 fetch，未引入第三方 HTTP 客户端），Express 5，CORS，`dotenv`。
- 第三方服务：
  - **New API**：OpenAI 兼容网关，承担对话（`/v1/chat/completions`）与生图（`/v1/images/generations`），通过 `POST /api/config` 写入 `config.local.json`（被 `.gitignore` 排除）。
  - **Tavily**：作为大模型 `web_search` / `web_fetch` 工具的真实数据源。
  - 回退：`openai`（官方）或 `replicate`（flux-dev）。
- 容器化：多阶段 `Dockerfile`（前端 build → backend serve），`docker-compose.yml` 暴露 `127.0.0.1:18081` → `3001`，挂载 `./data` 用于持久化配置。

## 3. 目录结构

```
ad-previewer-2/
├── Dockerfile               # 多阶段构建
├── docker-compose.yml       # 容器编排，挂载 ./data
├── index.html               # Vite 入口
├── vite.config.js           # /api 代理到 3001
├── package.json             # 前端脚本
├── public/                  # 静态素材（Samsung 设备截图、应用图标、背景）
├── src/
│   ├── main.jsx             # React 挂载
│   ├── App.jsx              # 1616 行主组件，包含 i18n、所有 UI 子组件
│   └── styles.css           # 1675 行样式（CSS 变量 + 大量 BEM 风类名）
└── backend/
    ├── index.js             # 775 行 Express 服务 + SSE 流式 Chat
    ├── package.json         # express 5、cors、dotenv
    ├── .env.example         # 环境变量模板
    └── README.md            # 后端用法
```

## 4. 关键流程

### 4.1 AI 创意助手（流式 SSE）
- 前端 `submitChat` 调用 `POST /api/chat/stream`，通过 `text/event-stream` 接收事件：`status` / `assistant_message` / `tool_start` / `tool_result` / `report` / `done` / `error`。
- 后端最多 6 轮工具循环：注册三个工具 `web_search`、`web_fetch`、`render_ad_report`；`render_ad_report` 是终止点；模型若未调用它则 `forceRenderReport` 强制补刀。
- 当前可编辑报告通过 `system` 消息注入上下文，使后续追问可以"在上一份报告上修订"。

### 4.2 生图
- `POST /api/generate`：优先 New API（`dall-e-3`，`1792x1024`），未配置则走回退（OpenAI 官方 / Replicate flux-dev）。
- 提示词拼装（`buildPrompt`）支持两种入口：① 直接传 `prompt` / `report.imagePrompt`；② 由 `creative` 字段按风格（fintech / premium / retail / minimal）拼接模板。
- 前端拿到 URL 后用 `background: url(...) center/cover` 注入到 TV 屏幕，并支持上传本地图片/视频覆盖。

### 4.3 配置面板
- UI 集中在 `PreviewSettings`：`POST /api/config` 保存到 `backend/config.local.json`，启动时与 `.env` 合并（运行时优先于 env）。
- 暴露字段：`newApiUrl`、`newApiKey`（仅预览掩码显示）、`newApiImageModel`、`newApiChatModel`、`tavilyApiKey`、回退提供方。

### 4.4 电视预览画布
- 基础尺寸 960×540，CSS 变量 `--preview-shell-width`、`--preview-scale` 控制缩放。
- 两种视图：`home`（For You / Live / Apps 三个 tab + 媒体磁贴 + 应用图标行）和 `expanded`（居中品牌 + 标题 + 描述 + CTA）。
- 可拖拽 Logo（`DraggableLogo`，PointerEvent + `setPointerCapture`），通过 `clamp` 限制在 [8, 92] × [10, 90] 范围。
- "遥控器"组件 `RemoteControl` 提供方向键视图切换；`ArrowUp`/`ArrowDown`/`Escape` 触发同等效果。
- 三种舞台背景：浅色摄影棚 / 深色客厅 / 蓝色渐变。

## 5. i18n / 默认值

- `i18n.en` 与 `i18n.zh` 同步维护 `header / tabs / panel / assistant / report / form / settings / stageThemes / styles / preview / feedback` 共 11 个命名空间。
- `defaultCreative` 用 Capital One Shopping 作为示范数据，`defaultReport` 同步对应字段；保证未配置 New API 时仍可演示 UI。
- `LangToggle` 通过 `LangContext` 切换；初始语言 `en`，可在 `App` 中改为 `zh`。

## 6. 安全与运行细节

- `cors()` 全开（开发友好，生产可收敛 origin）。
- `express.json({ limit: '1mb' })` 限制请求体。
- 上传媒体走 `FileReader` 转为 data-URL，不落盘——避免磁盘膨胀但大文件会占用前端内存。
- `config.local.json` 与 `.env` 都在 `.gitignore` 内；`maskSecret` 仅展示 `xxxx••••xxxx`，避免密钥泄露到前端日志。
- New API 错误以 502 返回并附 `hint` 字段，引导用户检查 `NEW_API_URL` / `NEW_API_KEY`。
- 静态资源服务 `app.use(express.static(FRONTEND_DIST))`，并对非 `/api` 的 GET 回退到 `index.html`（SPA history 兜底）。

## 7. 已知不足 / 改进建议

1. **锁文件未更新**：`package-lock.json` 当前提交中 `name` 字段拼写为 `ad-previrwer-2`，本地 diff 显示已重命名为 `ad-previewer-2` 并刷新了 lightningcss 等子依赖的 `optional` 元数据（去掉了 `libc` 段）。建议在合并前确认 lock 与远端一致后再推。
2. **CORS 放行过宽**：生产环境建议按部署域名收敛。
3. **New API 鉴权直接走 Authorization 头**：若 New API 不在受信网络内，建议加 `VITE_API_TARGET` 同源部署 + 反向代理，避免跨域暴露密钥。
4. **回退链路分支处理**：`generateWithFallback` 中若 `FALLBACK_PROVIDER` 已是 `openai` 但没 `FALLBACK_API_KEY`，会直接抛错；可与 `FALLBACK_PROVIDER` 选择解耦，给出更明确的提示。
5. **报告渲染在 `forceRenderReport` 失败时整流终止**：建议前端在收到 `error` 事件后保留已渲染的旧报告，避免用户已编辑内容被覆盖。
6. **拖拽 Logo 缺少触屏反馈**：当前实现依赖 `setPointerCapture`，在触屏长按开始时即时计算一次坐标，移动中需要持续按下；可加一个轻微的 transform/scale 视觉反馈。
7. **i18n 表对象字面量巨大**（约 250 行）：后续可拆到 `src/i18n/{en,zh}.json`，搭配 `useTranslation` 自定义 hook。
8. **缺少测试**：仓库无单测/E2E；后端 SSE 流与工具循环是关键回归点，建议补 `vitest` + `supertest` 用例。

## 8. 启动方式速查

```bash
# 1) 启动后端
cd backend
cp .env.example .env  # 填入 NEW_API_URL / NEW_API_KEY / TAVILY_API_KEY
npm install
npm run dev            # 监听 :3001

# 2) 启动前端
cd ..
npm install
npm run dev            # 监听 :5173，已代理 /api -> :3001

# 或一键 Docker
docker compose up -d   # 宿主机 18081 -> 容器 3001
```

## 9. 总结

`ad-previewer-2` 是一个体量紧凑但功能闭环的 CTV 创意工作台：前端用 React + Vite 复刻 Samsung TV 界面并支持交互式 Logo 拖拽；后端通过 Express + SSE 把"对话工具调用 + 可编辑报告 + 生图网关"串成一条龙。架构清晰、配置可视化、部署路径齐全（裸跑 / Docker）；后续重点在收紧 CORS、补充测试、拆分 i18n 表与修整 lockfile 拼写。
