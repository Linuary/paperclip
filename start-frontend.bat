@echo off
chcp 65001 >nul
title Paperclip Frontend UI
echo ========================================
echo  Paperclip Frontend - Starting...
echo ========================================
echo.
cd /d "%~dp0"
pnpm dev:ui
echo.
echo ========================================
echo  Paperclip Frontend - Stopped
echo ========================================
pause
