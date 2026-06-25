@echo off
chcp 65001 >nul
echo ========================================
echo  Paperclip - Stopping All Services...
echo ========================================
echo.

echo [1/2] Stopping Backend (port 3100)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":3100 "') do (
    echo  -> Killing PID %%a
    taskkill /F /PID %%a >nul 2>&1
    if not errorlevel 1 echo  [OK] Backend stopped
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":13100 "') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo [2/2] Stopping Frontend (port 5173)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":5173 "') do (
    echo  -> Killing PID %%a
    taskkill /F /PID %%a >nul 2>&1
    if not errorlevel 1 echo  [OK] Frontend stopped
)

echo.
echo ========================================
echo  All services stopped!
echo ========================================
pause
