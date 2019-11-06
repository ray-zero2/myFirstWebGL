export default class ThreeTest {
  constructor(selector) {
    this.isOldBrowser = /msie|trident/.test(navigator.userAgent.toLowerCase);

    if (!this.isOldBrowser) this.loadThree();
  }

  loadThree() {}
}
