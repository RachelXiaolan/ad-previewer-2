# CTV Ad Previewer API

轻量级 Node.js 后端，负责：
1. 接收前端创意参数
2. 拼接 Prompt 模板
3. 调用 New API（或 Fallback）生图
4. 返回图片 URL

## 快速开始

```bash
cd backend
npm install
cp .env.example .env
# 编辑 .env 填入你的 key
npm run dev
```

## 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `NEW_API_URL` | New API 实例地址 | `https://api.example.com` |
| `NEW_API_KEY` | New API 的 key | `sk-xxx` |
| `NEW_API_IMAGE_MODEL` | 指定图片模型 | `dall-e-3` |
| `FALLBACK_PROVIDER` | 未配 New API 时的回退 | `openai` 或 `replicate` |
| `FALLBACK_API_KEY` | 回退服务的 key | `sk-xxx` 或 `r8_xxx` |
| `PORT` | 服务端口 | `3001` |

## API 接口

### POST `/api/generate`

请求体：
```json
{
  "brand": "Capital One Shopping",
  "headline": "Save More Every Time You Shop",
  "description": "...",
  "primaryColor": "#09294f",
  "accentColor": "#e12635",
  "style": "fintech",
  "placement": "samsungHome"
}
```

响应：
```json
{
  "success": true,
  "imageUrl": "https://...",
  "prompt": "A premium connected TV...",
  "model": "dall-e-3",
  "provider": "new-api"
}
```

### GET `/api/health`

返回当前配置状态。
