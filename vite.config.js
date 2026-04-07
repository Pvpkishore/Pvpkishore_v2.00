import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 800
const MAX_TOTAL_CONTENT_LENGTH = 12000

function json(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function createDevChatPlugin(apiKey) {
  return {
    name: 'dev-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.setHeader('Allow', 'POST')
          return json(res, 405, { error: 'Method not allowed' })
        }

        if (!apiKey) {
          return json(res, 500, { error: 'OPENAI_API_KEY is missing in local .env' })
        }

        let rawBody = ''
        for await (const chunk of req) {
          rawBody += chunk
        }

        try {
          const body = rawBody ? JSON.parse(rawBody) : {}
          const { messages } = body

          if (!Array.isArray(messages) || messages.length === 0) {
            return json(res, 400, { error: 'messages must be a non-empty array' })
          }

          if (messages.length > MAX_MESSAGES) {
            return json(res, 400, { error: 'Too many messages' })
          }

          const totalContentLength = messages.reduce(
            (sum, message) => sum + (typeof message?.content === 'string' ? message.content.length : 0),
            0,
          )

          if (totalContentLength > MAX_TOTAL_CONTENT_LENGTH) {
            return json(res, 400, { error: 'Conversation too large' })
          }

          for (const message of messages) {
            if (typeof message?.role !== 'string' || typeof message?.content !== 'string') {
              return json(res, 400, { error: 'Invalid message format' })
            }

            if (message.role !== 'system' && message.content.length > MAX_MESSAGE_LENGTH) {
              return json(res, 400, { error: 'Message too long' })
            }
          }

          const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              temperature: 0.25,
              max_tokens: 260,
              messages,
            }),
          })

          const text = await upstream.text()

          if (!upstream.ok) {
            return json(res, upstream.status, { error: text })
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(text)
        } catch (error) {
          return json(res, 500, { error: error instanceof Error ? error.message : 'Internal server error' })
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), createDevChatPlugin(env.OPENAI_API_KEY)],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['framer-motion'],
            'vendor-gsap': ['gsap'],
          },
        },
      },
    },
  }
})
