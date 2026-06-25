@echo off
chcp 65001 >nul
echo ========================================
echo  Paperclip - Starting All Services...
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Backend (port 3100)...
start "Paperclip Backend" cmd /c "cd /d %~dp0 && pnpm dev:server"
timeout /t 3 /nobreak >nul
echo [OK] Backend window launched

echo [2/2] Starting Frontend (port 5173)...
start "Paperclip Frontend" cmd /c "cd /d %~dp0 && pnpm dev:ui"
timeout /t 2 /nobreak >nul
echo [OK] Frontend window launched

echo.
echo ========================================
echo  All services started!
echo  Backend:  http://localhost:3100
echo  Frontend: http://localhost:5173
echo  Close the service windows to stop.
echo ========================================
pause
