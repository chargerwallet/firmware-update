import memoizee from 'memoizee';
import {
  HardwareWebSdk as HardwareSDK,
  // @ts-expect-error
} from 'chargerwallet-hd-web-sdk/build/chargerwallet-js-sdk.min.js';
import { getSDKVersion } from 'chargerwallet-hd-core';
import type { ConnectSettings, CoreApi } from 'chargerwallet-hd-core';

let initialized = false;

export const getHardwareSDKInstance = memoizee(
  async () =>
    new Promise<CoreApi>(async (resolve, reject) => {
      if (initialized) {
        resolve(HardwareSDK);
        return;
      }
      const settings: Partial<ConnectSettings> = {
        debug: true,
        connectSrc: 'https://jssdk.chargerwallet.com/1.0.7/',
        preRelease: false,
        fetchConfig: true,
      };

      try {
        await HardwareSDK.init(settings);
        console.log(
          'HardwareSDK initialized success, version: ',
          getSDKVersion()
        );
        initialized = true;
        resolve(HardwareSDK);
      } catch (e) {
        reject(e);
      }
    }),
  {
    promise: true,
    max: 1,
  }
);
