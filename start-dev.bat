@echo off
REM Script para ejecutar Zaro Instrucciones en desarrollo

echo.
echo ========================================
echo  Zaro Instrucciones - Dev Server
echo ========================================
echo.

REM Navegar a la carpeta del proyecto
cd /d "%~dp0"

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
    echo.
)

echo Iniciando servidor de desarrollo...
echo.
call npm run dev

pause
