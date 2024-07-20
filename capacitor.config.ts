import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'myApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
    hostname: '192.168.1.111',
    iosScheme: 'http',
    androidScheme: 'http'
  }
};

export default config;