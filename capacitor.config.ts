import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zynqora.ai',
  appName: 'Zynqora AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
