# Paperclip Docker 部署及操作指南

## 目录

- [1. 环境要求](#1-环境要求)
- [2. 快速启动](#2-快速启动)
- [3. 首次配置](#3-首次配置)
- [4. 常用操作](#4-常用操作)
- [5. 配置说明](#5-配置说明)
- [6. 故障排查](#6-故障排查)
- [7. 数据备份与恢复](#7-数据备份与恢复)

---

## 1. 环境要求

- Docker 20.10+
- Docker Compose v2+
- 磁盘空间：至少 5GB（镜像约 2GB，运行时数据另计）

检查版本：

```bash
docker --version
docker compose version
```

---

## 2. 快速启动

### 2.1 首次启动

```bash
cd F:\workspace_ai\paperclip

# 生成随机密钥并启动
set BETTER_AUTH_SECRET=<随机32位字符串>
docker compose -f docker\docker-compose.quickstart.yml up -d --build
```

或在 PowerShell 中一行完成：

```powershell
$env:BETTER_AUTH_SECRET = ([System.Convert]::ToHexString([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32)))
docker compose -f docker\docker-compose.quickstart.yml up -d --build
```

### 2.2 等待服务就绪

```bash
# 查看启动日志，等待出现 "Server listening on 0.0.0.0:3100"
docker logs -f docker-paperclip-1
```

看到以下输出表示就绪：

```
Server listening on 0.0.0.0:3100
```

按 `Ctrl+C` 退出日志跟踪。

### 2.3 首次引导配置

服务启动后需要创建配置文件和管理员账户：

```bash
# 1. 进入容器
docker exec -it docker-paperclip-1 bash

# 2. 创建配置目录和配置文件
mkdir -p /paperclip/instances/default

cat > /paperclip/instances/default/config.json << 'EOF'
{
  "$meta": {
    "version": 1,
    "updatedAt": "2026-05-27T00:00:00.000Z",
    "source": "onboard"
  },
  "server": {
    "host": "0.0.0.0",
    "port": 3100,
    "deploymentMode": "authenticated",
    "exposure": "private"
  },
  "database": {
    "mode": "embedded-postgres"
  },
  "auth": {
    "baseUrlMode": "explicit",
    "publicBaseUrl": "http://localhost:3100"
  },
  "logging": {
    "mode": "file",
    "logDir": "/paperclip/instances/default/logs"
  },
  "storage": {
    "provider": "local_disk"
  },
  "secrets": {
    "provider": "local_encrypted"
  }
}
EOF

# 3. 生成管理员邀请链接
pnpm paperclipai auth bootstrap-ceo

# 4. 退出容器
exit
```

### 2.4 创建管理员账户

在浏览器中打开上一步输出的邀请链接（格式如：`http://localhost:3100/invite/pcp_bootstrap_xxx`），按页面提示完成管理员注册。

---

## 3. 常用操作

### 3.1 启动 / 停止 / 重启

```bash
# 启动
docker compose -f docker\docker-compose.quickstart.yml up -d

# 停止
docker compose -f docker\docker-compose.quickstart.yml down

# 重启
docker compose -f docker\docker-compose.quickstart.yml restart
```

### 3.2 查看日志

```bash
# 实时跟踪日志
docker logs -f docker-paperclip-1

# 查看最近 100 行
docker logs --tail 100 docker-paperclip-1

# 查看最近 5 分钟的日志
docker logs --since 5m docker-paperclip-1
```

### 3.3 进入容器

```bash
docker exec -it docker-paperclip-1 bash
```

### 3.4 查看容器状态

```bash
docker compose -f docker\docker-compose.quickstart.yml ps
```

### 3.5 检查服务健康

```bash
curl http://localhost:3100/api/health
```

正常返回：

```json
{"status":"ok","deploymentMode":"authenticated","bootstrapStatus":"complete"}
```

### 3.6 重新生成管理员邀请

如果需要创建新的管理员邀请链接：

```bash
docker exec docker-paperclip-1 pnpm paperclipai auth bootstrap-ceo --force
```

### 3.7 查看配置

```bash
docker exec docker-paperclip-1 cat /paperclip/instances/default/config.json
```

### 3.8 修改配置

```bash
# 进入容器编辑配置
docker exec -it docker-paperclip-1 bash
vi /paperclip/instances/default/config.json
exit

# 重启容器使配置生效
docker compose -f docker\docker-compose.quickstart.yml restart
```

---

## 4. 配置说明

### 4.1 配置文件位置

容器内路径：`/paperclip/instances/default/config.json`

宿主机映射路径：`./data/docker-paperclip/instances/default/config.json`

### 4.2 关键配置项

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `server.deploymentMode` | 部署模式：`local_trusted`（无需登录）或 `authenticated`（需要登录） | `local_trusted` |
| `server.host` | 监听地址 | `127.0.0.1` |
| `server.port` | 监听端口 | `3100` |
| `database.mode` | 数据库模式：`embedded-postgres`（内嵌）或 `postgres`（外部） | `embedded-postgres` |
| `auth.publicBaseUrl` | 公开访问地址 | 无 |

### 4.3 环境变量

在 `docker-compose.quickstart.yml` 中可配置以下环境变量：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `BETTER_AUTH_SECRET` | 认证密钥（必填） | 无 |
| `PAPERCLIP_PORT` | 宿主机映射端口 | `3100` |
| `PAPERCLIP_DATA_DIR` | 数据持久化目录 | `../data/docker-paperclip` |
| `OPENAI_API_KEY` | OpenAI API 密钥 | 空 |
| `ANTHROPIC_API_KEY` | Anthropic API 密钥 | 空 |

### 4.4 部署模式切换

**切换到免登录模式（local_trusted）：**

编辑 `config.json`，将 `server.deploymentMode` 改为 `"local_trusted"`，删除 `auth` 相关配置，重启容器。

**切换到认证模式（authenticated）：**

编辑 `config.json`，设置 `server.deploymentMode` 为 `"authenticated"`，配置 `auth.publicBaseUrl`，重启容器后运行 `bootstrap-ceo` 创建管理员。

---

## 5. 故障排查

### 5.1 服务无法启动

```bash
# 检查端口占用
netstat -ano | findstr :3100

# 查看容器日志
docker logs docker-paperclip-1 2>&1

# 检查容器状态
docker ps -a --filter "name=docker-paperclip"
```

### 5.2 数据库问题

```bash
# 进入容器检查数据库状态
docker exec -it docker-paperclip-1 bash
ls -la /paperclip/instances/default/db/
```

如果数据库损坏，删除数据目录重建：

```bash
docker compose -f docker\docker-compose.quickstart.yml down
rm -rf data\docker-paperclip\instances\default\db
docker compose -f docker\docker-compose.quickstart.yml up -d
```

### 5.3 配置文件错误

```bash
# 验证 JSON 格式
docker exec docker-paperclip-1 cat /paperclip/instances/default/config.json | jq .
```

### 5.4 完全重置

```bash
# 停止容器并删除所有数据
docker compose -f docker\docker-compose.quickstart.yml down -v
rm -rf data\docker-paperclip

# 重新启动
docker compose -f docker\docker-compose.quickstart.yml up -d --build
```

---

## 6. 数据备份与恢复

### 6.1 手动备份

```bash
# 备份整个数据目录
docker cp docker-paperclip-1:/paperclip ./backup-$(date +%Y%m%d)
```

### 6.2 仅备份数据库

```bash
# 进入容器导出数据库
docker exec docker-paperclip-1 pg_dump -U paperclip -h 127.0.0.1 -p 54329 paperclip > backup.sql
```

### 6.3 恢复

```bash
# 停止服务
docker compose -f docker\docker-compose.quickstart.yml down

# 恢复数据目录
xcopy /E /I backup-20260527 data\docker-paperclip

# 启动服务
docker compose -f docker\docker-compose.quickstart.yml up -d
```

### 6.4 自动备份

服务内置自动备份功能，默认每 60 分钟备份一次，保留 7 天。

备份位置（容器内）：`/paperclip/instances/default/data/backups`

修改备份策略：编辑 `config.json` 中的 `database.backup` 配置项。

---

## 7. 访问地址

- **Web UI：** http://localhost:3100
- **API：** http://localhost:3100/api
- **健康检查：** http://localhost:3100/api/health
