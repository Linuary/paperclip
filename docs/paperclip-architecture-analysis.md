# Paperclip 项目架构深度解析

> **版本**: v0.3.1 | **协议**: MIT | **仓库**: [paperclipai/paperclip](https://github.com/paperclipai/paperclip)

## 一、项目定位

Paperclip 是一个面向 **AI Agent 公司** 的控制平面（Control Plane）。它不是 Agent 框架，也不是聊天机器人，而是一个管理 AI 员工团队的组织编排系统——类似于传统企业的 ERP，只不过管理的对象是 AI Agent 而非人类员工。

核心愿景：让一个人就能运营一家由 AI 员工组成的完整公司，涵盖从目标制定、组织架构、任务分派、成本控制到审批治理的全链路。

## 二、整体架构

### 2.1 双层架构模型

```
┌──────────────────────────────────────────────────────────────┐
│                   PAPERCLIP CONTROL PLANE                     │
│                  （控制平面 — 本项目核心）                        │
│                                                              │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│  │ 身份认证   │ │ 任务管理   │ │ 心跳执行   │ │ 审批治理   │    │
│  │Identity   │ │  Tasks    │ │Heartbeat  │ │Governance │    │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘    │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│  │ 组织架构   │ │ 工作空间   │ │ 插件系统   │ │ 预算成本   │    │
│  │Org Chart  │ │Workspace  │ │ Plugins   │ │  Budget   │    │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘    │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│  │ 定时例程   │ │ 密钥存储   │ │ 活动审计   │ │ 公司迁移   │    │
│  │ Routines  │ │ Secrets   │ │ Activity  │ │Portability│    │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘    │
└──────────────────────────────────────────────────────────────┘
         ▲             ▲             ▲             ▲
   ┌─────┴─────┐ ┌─────┴─────┐ ┌─────┴─────┐ ┌─────┴─────┐
   │  Claude   │ │   Codex   │ │  Cursor/  │ │ OpenClaw  │
   │   Code    │ │           │ │  Gemini   │ │  Gateway  │
   └───────────┘ └───────────┘ └───────────┘ └───────────┘
          Agent 执行层（由 Adapter 连接，运行在控制平面外部）
```

**设计原则**：控制平面不运行 Agent，只编排它们。Agent 在各自的环境中运行，通过心跳（Heartbeat）机制向控制平面报告。

### 2.2 技术栈

| 层级 | 技术选型 |
|------|---------|
| **前端** | React + Vite + TypeScript + i18n（40+ 语言） |
| **后端** | Node.js + Express 5 + TypeScript |
| **数据库** | PostgreSQL（通过 Drizzle ORM） |
| **认证** | Better Auth（Board 用户） + JWT（Agent API Key） |
| **实时通信** | WebSocket（Live Events） |
| **包管理** | pnpm 9.15+ workspace monorepo |
| **测试** | Vitest（单元） + Playwright（E2E） |
| **CI/CD** | GitHub Actions |
| **容器化** | Docker + Docker Compose |

## 三、Monorepo 目录结构

```
paperclip/
├── server/                    # 后端服务（Express REST API + 编排服务）
│   └── src/
│       ├── index.ts           # 主入口（36 KB）
│       ├── app.ts             # 应用配置
│       ├── config.ts          # 运行时配置
│       ├── adapters/          # 适配器系统（注册表 + 插件加载器）
│       ├── auth/              # 认证（Better Auth + Agent JWT）
│       ├── middleware/         # 中间件（8 个：auth、logger、error-handler 等）
│       ├── routes/            # 路由层（39 个路由文件）
│       ├── services/          # 业务服务层（114 个服务文件）
│       ├── storage/           # 存储抽象（local-disk / S3）
│       ├── secrets/           # 密钥管理（local-encrypted / AWS Secrets Manager）
│       ├── realtime/          # WebSocket 实时事件
│       ├── recovery/          # 执行恢复子系统
│       └── onboarding-assets/ # 引导资源（CEO SOUL.md、HEARTBEAT.md 等）
│
├── ui/                        # React 前端（Board 管理界面）
│   └── src/
│       ├── pages/             # 页面组件（84 个）
│       ├── components/        # 通用组件（192 个）
│       ├── api/               # API 客户端（39 个模块）
│       ├── hooks/             # 自定义 Hooks（14 个）
│       ├── context/           # React Context（15 个）
│       ├── adapters/          # 适配器 UI 注册（32 个适配器 UI 模块）
│       ├── lib/               # 工具函数库（153 个）
│       ├── i18n/              # 国际化（40+ 语言）
│       └── plugins/           # 插件桥接（slots、launchers）
│
├── packages/                  # 共享包
│   ├── db/                    # @paperclipai/db — Drizzle Schema、迁移、DB 客户端
│   ├── shared/                # @paperclipai/shared — 共享类型、常量、验证器（Zod）
│   ├── adapter-utils/         # @paperclipai/adapter-utils — 适配器工具
│   ├── mcp-server/            # @paperclipai/mcp-server — MCP 协议服务器
│   ├── adapters/              # 10 个 Agent 适配器实现
│   │   ├── claude-local/      # Claude Code
│   │   ├── codex-local/       # OpenAI Codex
│   │   ├── cursor-local/      # Cursor IDE
│   │   ├── cursor-cloud/      # Cursor Cloud
│   │   ├── gemini-local/      # Google Gemini
│   │   ├── grok-local/        # xAI Grok
│   │   ├── openclaw-gateway/  # OpenClaw 远程 Agent
│   │   ├── opencode-local/    # OpenCode
│   │   ├── pi-local/          # Pi
│   │   └── acpx-local/        # ACPX
│   └── plugins/               # 插件生态
│       ├── sdk/               # 插件开发 SDK
│       ├── plugin-llm-wiki/   # LLM Wiki 插件
│       ├── plugin-workspace-diff/ # 工作空间 Diff 插件
│       └── create-paperclip-plugin/ # 插件脚手架工具
│
├── cli/                       # Paperclip CLI 工具
├── scripts/                   # 开发脚本（61 个）
├── tests/                     # E2E 测试（Playwright）
├── doc/                       # 项目文档（72+ 个 .md 文件）
├── docs/                      # Mintlify 公共文档站
├── evals/                     # Promptfoo 评估
├── docker/                    # Docker 配置
└── skills/                    # Agent 技能文件（22 个）
```

## 四、核心模块解析

### 4.1 后端服务层（server/）

后端采用经典的 **Routes → Services → DB** 三层架构：

| 模块 | 说明 | 规模 |
|------|------|------|
| `routes/` | REST API 路由定义，39 个路由文件 | 最大文件 `issues.ts`（205 KB） |
| `services/` | 业务逻辑层，114 个服务文件 | 最大文件 `heartbeat.ts`（349 KB） |
| `middleware/` | 8 个中间件：认证、日志、错误处理、验证等 | — |
| `adapters/` | 适配器注册表 + 外部插件加载器 | — |
| `storage/` | 存储抽象：local-disk + S3 | — |
| `secrets/` | 密钥管理：local-encrypted + AWS Secrets Manager | — |
| `realtime/` | WebSocket 实时事件推送 | — |
| `recovery/` | Agent 执行恢复子系统 | — |

**关键路由模块**：

- `issues.ts`（205 KB）：Issue CRUD、评论、文档、附件、工作产品、执行策略
- `agents.ts`（119 KB）：Agent 生命周期、配置、技能同步
- `access.ts`（141 KB）：访问控制、权限管理
- `plugins.ts`（94 KB）：插件安装、配置、生命周期管理
- `org-chart-svg.ts`（42 KB）：组织架构图 SVG 生成

**关键服务模块**：

- `heartbeat.ts`（349 KB）：**系统核心**——心跳调度、任务检入/检出、预算检查、工作空间解析、秘密注入、技能加载、适配器调用、执行恢复
- `company-portability.ts`（178 KB）：公司导入/导出
- `issues.ts`（201 KB）：任务业务逻辑
- `plugin-host-services.ts`（106 KB）：插件宿主服务
- `workspace-runtime.ts`（97 KB）：工作空间运行时管理

### 4.2 前端（ui/）

前端是一个功能丰富的 React SPA，主要页面包括：

| 页面 | 功能 |
|------|------|
| `Dashboard.tsx` | 仪表盘——公司概览、活跃 Agent、任务统计 |
| `Agents.tsx` / `AgentDetail.tsx` | Agent 列表 + 详情（172 KB 的单文件组件） |
| `Inbox.tsx` | 任务收件箱——类似邮件的待办事项视图（108 KB） |
| `IssueDetail.tsx` | Issue 详情——评论线程、文档、执行记录、工作产品 |
| `OrgChart.tsx` | 组织架构图可视化 |
| `Routines.tsx` / `RoutineDetail.tsx` | 定时例程管理 |
| `Costs.tsx` | 成本与预算监控 |
| `PluginManager.tsx` | 插件管理 |
| `CompanySettings.tsx` | 公司设置（品牌、密钥、成员） |
| `Secrets.tsx` | 密钥管理（95 KB） |
| `CompanyImport.tsx` / `CompanyExport.tsx` | 公司导入导出 |
| `Search.tsx` | 全局搜索 |

**前端架构特点**：
- 使用 React Context 进行状态管理（15 个 Context）
- API 客户端层（39 个模块）封装所有后端请求
- 适配器 UI 注册系统，支持动态加载适配器配置表单
- 插件桥接机制（slots 系统），允许插件注入 UI 组件
- 内置 i18n 支持 40+ 语言

### 4.3 数据层（packages/db）

使用 **Drizzle ORM** 管理 PostgreSQL Schema，核心实体包括：

- `companies`：公司（一级租户对象）
- `agents`：AI 员工
- `projects`：项目
- `goals`：目标层级
- `issues`：任务/Issue（核心工作单元）
- `issue_comments`：评论
- `heartbeat_runs`：心跳执行记录
- `cost_events`：成本事件
- `budgets`：预算策略
- `approvals`：审批记录
- `routines`：定时例程
- `routine_runs`：例程执行记录
- `secrets` / `secret_versions`：密钥管理
- `plugins`：插件注册
- `activity_log`：活动审计日志

### 4.4 适配器系统（packages/adapters）

适配器是 Paperclip 连接各种 AI Agent 的桥梁。每个适配器提供四个导出：

```
@paperclipai/adapter-xxx/
├── src/
│   ├── index.ts       # 适配器元信息（名称、描述、图标）
│   ├── server/        # 后端：执行逻辑、环境构建、技能同步
│   ├── ui/            # 前端：配置表单、UI 元素
│   └── cli/           # CLI：配额探测等工具
└── skills/            # 适配器绑定的 Agent 技能文件
```

**内置适配器一览**：

| 适配器 | 类型 | 连接方式 | 说明 |
|--------|------|---------|------|
| `claude-local` | CLI/Session | 启动 Claude Code 进程 | Anthropic 的 Claude Code CLI |
| `codex-local` | CLI/Session | 启动 Codex 进程 | OpenAI 的 Codex CLI |
| `cursor-local` | CLI/Session | 启动 Cursor 进程 | Cursor IDE 的 AI Agent |
| `cursor-cloud` | Cloud | 通过 Cursor Cloud API | Cursor 云端执行 |
| `gemini-local` | CLI/Session | 启动 Gemini CLI | Google 的 Gemini CLI |
| `grok-local` | CLI/Session | 启动 Grok CLI | xAI 的 Grok |
| `openclaw-gateway` | HTTP/Webhook | WebSocket + HTTP 回调 | OpenClaw 风格的远程 Agent |
| `opencode-local` | CLI/Session | 启动 OpenCode 进程 | 开源 OpenCode CLI |
| `pi-local` | CLI/Session | 启动 Pi 进程 | Pi AI Agent |
| `acpx-local` | CLI/Session | ACPX 适配器 | 高级 CLI Agent |

### 4.5 插件系统（packages/plugins）

插件系统是一个完整的运行时扩展框架，包含：

| 子包 | 说明 |
|------|------|
| `sdk/` | 插件开发 SDK，提供类型定义和工具函数 |
| `plugin-llm-wiki/` | LLM 知识库插件示例 |
| `plugin-workspace-diff/` | 工作空间差异对比插件 |
| `create-paperclip-plugin/` | 插件脚手架 CLI 工具 |
| `sandbox-providers/` | 沙箱运行时提供商 |

插件能力包括：
- **宿主服务**（Host Services）：DB 访问、文件系统、密钥、HTTP 客户端等
- **工具注册**（Tool Registry）：向 Agent 暴露新工具
- **作业调度**（Job Scheduler）：后台任务调度
- **事件总线**（Event Bus）：跨组件通信
- **UI 插槽**（UI Slots）：在 Board UI 中注入自定义界面

### 4.6 CLI 工具（cli/）

`paperclipai` CLI 提供命令行管理能力：

```bash
paperclipai onboard          # 初始化配置
paperclipai configure        # 编辑设置
paperclipai doctor           # 健康检查
paperclipai db:backup        # 数据库备份
paperclipai issue list       # Issue 管理
paperclipai dashboard get    # 仪表盘数据
paperclipai worktree init    # 工作树初始化
```

## 五、核心工作流

### 5.1 Agent 执行（心跳循环）

```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  定时/触发    │───▶│  心跳唤醒队列  │───▶│  预算检查     │───▶│  任务检出     │
│  (cron/API)  │    │  (DB-backed) │    │  (Budget)    │    │  (Checkout)  │
└─────────────┘    └──────────────┘    └──────────────┘    └──────┬───────┘
                                                                │
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌─────▼───────┐
│  结果处理     │◀───│  状态更新     │◀───│  执行日志     │◀───│  适配器调用   │
│  (Recovery)  │    │  (Status)    │    │  (Logs)      │    │  (Adapter)  │
└─────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

1. **唤醒**：通过定时 cron 或事件触发（任务分配、@提及），Agent 被加入唤醒队列
2. **预算检查**：验证 Agent 月度预算是否充足，不足则暂停
3. **任务检出**：原子性检出——锁定 Issue，防止重复工作
4. **适配器执行**：调用对应适配器（Claude Code、Codex 等）启动 Agent 进程
5. **状态更新**：执行结果写入心跳运行记录（heartbeat_runs）
6. **恢复处理**：检测超时/异常，触发自动恢复流程

### 5.2 任务层级模型

```
Company Goal: "构建 #1 AI 笔记应用，3个月达到 $1M MRR"
├── Goal: "本月营收达到 $2,000"
│   ├── Issue: "获取 100 个新注册用户"
│   │   ├── Issue: "调研 Facebook 广告策略"（当前任务）
│   │   └── Issue: "创建落地页"
│   └── Issue: "优化转化漏斗"
└── Goal: "完善产品核心功能"
    ├── Issue: "实现 Markdown 编辑器"
    └── Issue: "添加 AI 摘要功能"
```

每个任务都通过父任务链追溯回公司目标，确保 Agent 始终知道"为什么做这件事"。

### 5.3 部署模式

| 模式 | 认证 | 网络暴露 | 场景 |
|------|------|---------|------|
| `local_trusted` | 无需登录（隐式 Board） | 仅本地回环 | 个人本地开发 |
| `authenticated + private` | Better Auth 登录 | Tailscale/局域网 | 团队内部使用 |
| `authenticated + public` | Better Auth 登录 | 公网可达 | 生产部署 |

## 六、数据存储

### 6.1 数据库选项

| 方式 | 配置 | 适用场景 |
|------|------|---------|
| **嵌入式 PostgreSQL** | 不设置 `DATABASE_URL` | 本地开发，零配置 |
| **Docker PostgreSQL** | `docker compose up -d` + `DATABASE_URL` | 需要完整 PG 实例 |
| **Supabase** | 设置连接字符串 | 生产部署 |

### 6.2 本地实例布局

```
~/.paperclip/instances/default/
├── config.json              # 运行时配置
├── .env                     # 环境变量
├── db/                      # 嵌入式 PostgreSQL 数据
├── data/
│   ├── storage/             # 本地磁盘上传文件
│   └── backups/             # 自动数据库备份
├── logs/                    # 日志文件
├── secrets/master.key       # 本地加密主密钥
├── workspaces/<agent-id>/   # Agent 默认工作空间
└── projects/                # 项目执行工作空间
```

## 七、安装与运行

### 7.1 环境要求

- **Node.js**: >= 20
- **pnpm**: >= 9.15
- **操作系统**: macOS / Linux（原生支持）；Windows 可通过 WSL 运行

### 7.2 方式一：一键安装（推荐新手）

```bash
npx paperclipai onboard --yes
```

这会自动完成初始化配置，默认以 `local_trusted` 模式启动在 `localhost:3100`。

如果需要认证模式（局域网/Tailscale 访问）：

```bash
npx paperclipai onboard --yes --bind lan
# 或 Tailscale 专用：
npx paperclipai onboard --yes --bind tailnet
```

### 7.3 方式二：从源码运行（开发者）

#### 步骤 1：克隆仓库

```bash
git clone https://github.com/paperclipai/paperclip.git
cd paperclip
```

#### 步骤 2：安装依赖

```bash
pnpm install
```

#### 步骤 3：启动开发服务器

```bash
pnpm dev
```

这会同时启动：
- **API 服务**: `http://localhost:3100`
- **UI 界面**: 同源（由 API 服务的 dev middleware 提供）

首次启动会自动创建嵌入式 PostgreSQL 数据库，无需额外配置。

#### 步骤 4：验证运行

在另一个终端执行：

```bash
curl http://localhost:3100/api/health
# 预期输出: {"status":"ok"}

curl http://localhost:3100/api/companies
# 预期输出: JSON 数组
```

#### 步骤 5：打开浏览器

访问 `http://localhost:3100`，进入 Board 管理界面。

### 7.4 方式三：Docker 运行

#### 使用 Docker 命令

```bash
docker build -t paperclip-local .
docker run --name paperclip \
  -p 3100:3100 \
  -e HOST=0.0.0.0 \
  -e PAPERCLIP_HOME=/paperclip \
  -v "$(pwd)/data/docker-paperclip:/paperclip" \
  paperclip-local
```

#### 使用 Docker Compose

```bash
docker compose -f docker/docker-compose.quickstart.yml up --build
```

Docker 模式默认使用 `authenticated + private` 模式，需要设置 `BETTER_AUTH_SECRET` 环境变量。

### 7.5 常用开发命令

```bash
# 开发
pnpm dev                  # 完整开发模式（API + UI，watch 模式）
pnpm dev:once             # 完整开发模式（不启用文件监听）
pnpm dev:server           # 仅启动后端服务
pnpm dev:ui               # 仅启动前端开发服务

# 代码质量
pnpm typecheck            # 类型检查
pnpm build                # 构建所有包
pnpm test                 # 运行 Vitest 测试（默认）
pnpm test:watch           # Vitest watch 模式
pnpm test:e2e             # Playwright E2E 测试

# 数据库
pnpm db:generate          # 生成 Drizzle 迁移
pnpm db:migrate           # 应用数据库迁移
pnpm db:backup            # 手动数据库备份

# 管理开发服务器
pnpm dev:list             # 查看运行中的开发服务器
pnpm dev:stop             # 停止开发服务器
```

### 7.6 重置本地开发数据库

```bash
rm -rf ~/.paperclip/instances/default/db
pnpm dev
```

### 7.7 Windows 特殊注意事项

当前仓库是 HenkDz/paperclip fork（`feat/externalize-hermes-adapter` 分支），有以下已知 Windows 问题：

1. **Vite 构建挂起**：使用 `node node_modules/vite/bin/vite.js build` 替代 `npx vite build`
2. **NTFS 启动慢**：服务启动可能需要 30-60 秒，不要立即判定为失败
3. **端口冲突**：Fork 版本自动检测 3100 端口，若被占用则使用 3101+
4. **清理 Vite 缓存**：`rm -rf ui/dist ui/node_modules/.vite`（NTFS 上 `rm -rf dist` 不够）

## 八、关键设计决策

### 8.1 单租户多公司模型

- 一个 Paperclip 实例可以运行多个公司
- 所有业务实体都 `company-scoped`（公司隔离）
- 数据库层面通过 `company_id` 外键保证隔离

### 8.2 原子任务检出

- Issue 从 `todo` → `in_progress` 必须通过原子检出
- 同一 Issue 同一时间只能由一个 Agent 执行
- 防止重复工作和资源冲突

### 8.3 适配器即边界

- Paperclip 不规定 Agent 如何运行，只规定如何被调用
- 最小契约是"可被调用"
- 适配器负责将控制平面的指令转化为具体运行环境的操作

### 8.4 控制平面不执行

- Agent 在外部运行，控制平面只负责编排
- 通过心跳机制协调，而非直接控制进程
- 支持远程 Agent（OpenClaw）、本地 CLI Agent（Claude Code）等多种运行方式

### 8.5 预算硬停止

- 月度预算按 UTC 日历月计算
- 软告警阈值 + 硬限制自动暂停
- 超支时自动暂停 Agent 并取消排队中的工作

## 九、扩展性设计

### 9.1 插件架构

插件系统支持：
- **宿主服务**（Host Services）：通过能力门控暴露 DB、文件系统、HTTP 等服务
- **工具注册**：向 Agent 暴露自定义工具
- **UI 插槽**：在 Board UI 中注入自定义页面和组件
- **作业调度**：注册后台定时任务
- **独立 Worker**：沙箱隔离的 Worker 进程

### 9.2 适配器插件化

PR #2218 引入外部适配器支持，适配器可以通过 `~/.paperclip/adapter-plugins.json` 动态加载，无需修改核心代码。

### 9.3 公司模板（ClipMart）

规划中的功能：支持一键导入完整公司模板（组织架构、Agent 配置、技能），降低使用门槛。

## 十、Roadmap 速览

| 状态 | 功能 |
|------|------|
| ✅ 已完成 | 插件系统、OpenClaw/Claude/Codex 集成、公司导入导出、定时例程、预算控制、审批系统、多用户 |
| ⚪ 规划中 | 云端 Agent（Cursor/e2b）、工作产出物、记忆/知识库、执行结果强制检查、CEO 聊天、云部署、桌面应用 |

---

*本文档基于 Paperclip v0.3.1 源码分析生成，最后更新：2026-05-26*
