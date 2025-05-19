import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MyFinance-App',
  webDir: 'www/browser',
  server: {
    "cleartext": true,
    "allowNavigation": ["*"],
    "hostname": "localhost"
  }
};

export default config;
