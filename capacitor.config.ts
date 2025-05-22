import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Finance Assistant',
  webDir: 'www/browser',
  server: {
    "cleartext": true,
    "allowNavigation": ["*"],
    "hostname": "localhost"
  },
  plugins: {
    "Keyboard": {
      "resizeOnFullScreen": false
    }
  }
};

export default config;
