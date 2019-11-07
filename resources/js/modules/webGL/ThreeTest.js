import VertexShader from './shaders/VertexShader.vert';
import FragmentShader from './shaders/FragmentShader.frag';

let Scene,
OrthographicCamera,
WebGLRenderer,
TextureLoader,
ShaderMaterial,
PlaneBufferGeometry,
Mesh,
RepeatWrapping,
LinearFilter;

export default class ThreeTest {
  constructor(selector) {
    const canvas = document.querySelector(selector);

    canvas.width = 1838;
    canvas.height = 1742;
    this.images = ['/Users/rei.matsuda/Pictures/img/image_kv.png'];
    this.isOldBrowser = /msie|trident/.test(navigator.userAgent.toLowerCase);
    if (!this.isOldBrowser) this.loadThree();
  }

  /**
   * three.js Tree Shaking
   */
  loadThree() {
    Promise.all([
      import(/* webpackChunkName: "three" */'three/src/scenes/Scene'),
      import(/* webpackChunkName: "three" */'three/src/cameras/OrthographicCamera'),
      import(/* webpackChunkName: "three" */'three/src/renderers/WebGLRenderer'),
      import(/* webpackChunkName: "three" */'three/src/loaders/TextureLoader'),
      import(/* webpackChunkName: "three" */'three/src/materials/ShaderMaterial'),
      import(/* webpackChunkName: "three" */'three/src/geometries/PlaneGeometry'),
      import(/* webpackChunkName: "three" */'three/src/objects/Mesh'),
      import(/* webpackChunkName: "three" */'three/src/constants'),
    ]).then(modules => {
      Scene = modules[0].Scene;
      OrthographicCamera = modules[1].OrthographicCamera;
      WebGLRenderer = modules[2].WebGLRenderer;
      TextureLoader = modules[3].TextureLoader;
      ShaderMaterial = modules[4].ShaderMaterial;
      PlaneBufferGeometry = modules[5].PlaneBufferGeometry;
      Mesh = modules[6].Mesh;
      RepeatWrapping = modules[7].RepeatWrapping;
      LinearFilter = modules[7].LinearFilter;
      this.init();
    });
  }


}
