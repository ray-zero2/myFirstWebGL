// import WebGlTest from './modules/webGL/WebGlTest';
// import DistortionEffect from './modules/webGL/DistortionEffect';
import ThreeTest from './modules/webGL/ThreeTest';
import webGLtest from './modules/webGL/webGLtest';

// WebGlTest('.canvas');
// DistortionEffect('.canvas');
// ThreeTest('.canvas');
class App {
  constructor() {
    new ThreeTest('.canvas');
    // new webGLtest('.canvas');
  }
}

new App();
