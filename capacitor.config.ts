import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Finance Assistant',
  webDir: 'www/browser',
   server: {
    url: 'http://172.31.208.1:8100',
    cleartext: true 
  },
  plugins: {
    "Keyboard": {
      "resizeOnFullScreen": false
    }
  }
};

export default config;
