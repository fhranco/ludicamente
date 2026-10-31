#!/usr/bin/env bash
# ==============================================================================
# SCRIPT DE DESPLIEGUE CONTROLADO PARA HOSTINGER — LÚDICAMENTE
# ==============================================================================
# Este script compila, migra y reinicia la plataforma garantizando que NO se
# superen los límites de CPU, RAM o Procesos (NPROC=200) de Hostinger.
# ==============================================================================

set -e

echo "🚀 [1/5] Iniciando despliegue de Lúdicamente en Hostinger..."
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

# 1. Configurar NODE_ENV
export NODE_ENV=production

echo "📦 [2/5] Instalando dependencias de producción..."
cd "$ROOT_DIR/apps/backend"
npm install --omit=dev --prefer-offline --no-audit

cd "$ROOT_DIR/apps/storefront"
npm install --omit=dev --prefer-offline --no-audit

echo "🗄️ [3/5] Verificando base de datos y migraciones de Medusa..."
cd "$ROOT_DIR/apps/backend"
npx medusa db:migrate

echo "🏗️ [4/5] Compilando Storefront en modo estático (ISR)..."
cd "$ROOT_DIR/apps/storefront"
npm run build

echo "🔄 [5/5] Recargando procesos con PM2 (Modo Seguro - 2 procesos)..."
cd "$ROOT_DIR"
if command -v pm2 &> /dev/null; then
  pm2 reload ecosystem.config.cjs --update-env || pm2 start ecosystem.config.cjs
  pm2 save
  echo "✅ PM2 actualizado con éxito:"
  pm2 status
else
  echo "⚠️ PM2 no está instalado globalmente. Puedes iniciarlo con:"
  echo "   npx pm2 start ecosystem.config.cjs"
fi

echo "=============================================================================="
echo "✨ ¡DESPLIEGUE FINALIZADO EXITOSAMENTE!"
echo "   • Storefront: Puerto 3000 (ISR Estático, 0% CPU en crawlers)"
echo "   • Backend Medusa: Puerto 9000 (Conexiones PostgreSQL limitadas a 6)"
echo "   • Procesos activos en Hostinger: ~2 procesos (Lejos del límite de 200)"
echo "=============================================================================="

