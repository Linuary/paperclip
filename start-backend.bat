@echo off
chcp 65001 >nul
title Paperclip Backend Server
echo ========================================
echo  Paperclip Backend - Starting...
echo ========================================
echo.
cd /d "%~dp0"
pnpm dev:server
echo.
echo ========================================
echo  Paperclip Backend - Stopped
echo ========================================
pause
