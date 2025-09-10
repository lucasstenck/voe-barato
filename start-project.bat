@echo off
echo ====================================
echo  PLATAFORMA DE MONITORAMENTO DE PASSAGENS
echo ====================================
echo.
echo PASSO 1: Iniciando BACKEND...
echo.
cd backend
docker-compose up --build
echo.
echo Backend iniciado em http://localhost:8000
echo.
echo ====================================
echo.
echo PASSO 2: Abra um NOVO terminal e execute:
echo cd frontend
echo npx expo start
echo.
echo Depois escaneie o QR Code no Expo Go!
echo.
pause
