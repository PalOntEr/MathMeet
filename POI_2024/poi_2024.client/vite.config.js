import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "poi_2024.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7293';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: true,
        proxy: {
            '^/weatherforecast': {
                target,
                secure: false
            },
            '^/usuarios': {
                target,
                secure: false
            },
            '^/CreateUser': {
                target,
                secure: false
            },
            '^/LogIn': {
                target,
                secure: false
            },
            '^/chatHub': {
                target,
                changeOrigin: true,
                ws: true,
                secure: false
            },
            '^/Chat': {
                target,
                secure: false
            },
            '^/Mensajes': {
                target,
                secure: false
            },
            '^/UserEmotes': {
                target,
                secure: false
            },
            '^/Archivos': {
                target,
                secure: false
            },
            '^/Tareas': {
                target,
                secure: false
            },
            '^/UsersTareas': {
                target,
                secure: false
            },
            '^/ArchivosTareas': {
                target,
                secure: false
            },
            '^/Premios': {
                target,
                secure: false
            },
            '^/VideochatHub': {
                target,
                changeOrigin: true,
                ws: true,
                secure: false
            },
            '^/GlobalHub': {
                target,
                changeOrigin: true,
                ws: true,
                secure: false
            }
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
