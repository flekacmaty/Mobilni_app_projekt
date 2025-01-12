import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Flekac_projekt',
  webDir: 'www',

plugins: {
  SplashScreen: {
    launchShowDuration: 3000,
    launchAutoHide: true,
    backgroundColor: '#ffffffff',
    androidSplashResourceName: 'splash',
    iosSplashResourceName: 'Default',
    showSpinner: true, 
    spinnerColor: '#000000', 
  },
},
}

export default config;
