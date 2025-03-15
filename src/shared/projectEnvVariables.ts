type ProjectEnvVariablesType = Pick<ImportMetaEnv,
| "VITE_API_BASE_URL"
|  "VITE_GENERATE_SOURCEMAP"
>

const projectEnvVariables : ProjectEnvVariablesType = {
    VITE_API_BASE_URL:"${VITE_API_BASE_URL}",
    VITE_GENERATE_SOURCEMAP:"${VITE_GENERATE_SOURCEMAP}"
}

export const getProjectEnvVariables = ():{
    envVariables: ProjectEnvVariablesType
}=>{
    return {
        envVariables:{
            VITE_API_BASE_URL: !projectEnvVariables.VITE_API_BASE_URL.includes("VITE_") ? projectEnvVariables.VITE_API_BASE_URL : import.meta.env.VITE_API_BASE_URL,
            VITE_GENERATE_SOURCEMAP: !projectEnvVariables.VITE_GENERATE_SOURCEMAP.includes("VITE_") ? projectEnvVariables.VITE_GENERATE_SOURCEMAP : import.meta.env.VITE_GENERATE_SOURCEMAP
        }
    }
}