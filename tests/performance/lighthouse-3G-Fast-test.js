'use strict';

const {launchChromeAndRunLighthouse} = require('../utilities/helpers');

// the url to be audited
const url = process.env.URL || 'https://killerrabbit.netlify.com';
console.log("testing", url);

// lighthouse options and flags
const opts = {
  lighthouseConfig: {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance'],
    },
  },
  disableNetworkThrottling: true,
  disableStorageReset: true,
  emulatedFormFactor: 'mobile',
  throttlingMethod: 'provided',
  connection: 'threegfast',
};

let lh;

describe('3G Fast performance audit via Lighthouse', () => {
  // the timeout is increased to match lighthouse so we don't fail on spinup
  beforeAll(async () => {
    // run and wait for the trace
    const result = await launchChromeAndRunLighthouse(url, opts,
      opts.lighthouseConfig);
    lh = result.lhr;
  }, 45000);

  test('first contentful paint should score 90+', () => {
    expect(lh.audits['first-contentful-paint'].score)
      .toBeGreaterThanOrEqual(0.9);
  });

  test('time to interactive should score 90+', () => {
    expect(lh.audits['interactive'].score)
      .toBeGreaterThanOrEqual(0.9);
  });

  test('first cpu idle should score 90+', () => {
    expect(lh.audits['first-cpu-idle'].score)
      .toBeGreaterThanOrEqual(0.9);
  });

  test('js boot-up should score 90+', () => {
    expect(lh.audits['bootup-time'].score)
      .toBeGreaterThanOrEqual(0.9);
  });

  test('mainthread work should score 90+', () => {
    expect(lh.audits['mainthread-work-breakdown'].score)
      .toBeGreaterThanOrEqual(0.9);
  });
});