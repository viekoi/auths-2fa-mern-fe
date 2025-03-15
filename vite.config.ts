import { defineConfig,loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig(({mode}) => {
  const env = {...process.env, ...loadEnv(mode, process.cwd(),"VITE_")}

  return {
    plugins:[react()],
    build:{
      sourcemap: env.VITE_GENERATE_SOURCEMAP === "true",
      rollupOptions:{
        output:{
          format:"es",
          globals:{
            react:"React",
            "react-dom":"ReactDOM"
          },
          manualChunks(id:any){
            if(/projectEnvVariables.ts/.test(id)){
              return "projectEnvVariables"
            }
          }
        }
      }
    },
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  }
});

