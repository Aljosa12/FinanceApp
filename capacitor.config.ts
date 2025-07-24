import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Finance Assistant',
  webDir: 'www/browser',
  //  server: {
  //   url: 'http://10.11.10.64:8100',
  //   cleartext: true 
  // },
  plugins: {
    "Keyboard": {
      "resizeOnFullScreen": false
    }
  }
};

export default config;
