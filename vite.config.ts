import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/morphology_analysis_assignment/',
  // 깃허브 페이지로 배포하려면 빌드된 파일의 폴더명을 'dist'가 아닌 'docs'로 해야함
  // 그걸 위한 설정
  // build: {
  //   outDir: 'docs',
  // },
});
