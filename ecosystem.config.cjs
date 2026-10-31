module.exports = {
  apps: [
    {
      name: "ludicamente-storefront",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "./apps/storefront",
      instances: 1, // 1 sola instancia para respetar el límite NPROC de Hostinger
      exec_mode: "fork", // Modo fork (sin clusters automáticos de CPU)
      max_memory_restart: "350M", // Reinicio automático preventivo ante fugas de memoria
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "ludicamente-backend",
      script: "npm",
      args: "run start",
      cwd: "./apps/backend",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "450M",
      env: {
        NODE_ENV: "production",
        PORT: 9000,
      },
    },
  ],
}

