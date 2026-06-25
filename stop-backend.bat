@echo off
chcp 65001 >nul
echo ========================================
echo  Paperclip Backend - Stopping...
echo ========================================
echo.

REM Kill the backend server process on port 3100
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":3100 "') do (
    echo Found backend process PID: %%a
    taskkill /F /PID %%a >nul 2>&1
    if not errorlevel 1 (
        echo [OK] Backend process %%a terminated
    ) else (
        echo [SKIP] Could not terminate PID %%a
    )
)

REM Kill any child processes (tsx, node) in the same process tree
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":13100 "') do (
    echo Found WebSocket process PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ========================================
echo  Paperclip Backend - Stopped
echo ========================================
pause
