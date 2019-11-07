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
  constructor() {
    this.$ = document.querySelector('.canvasWrapper');
    this.width = 1838;
    this.height = 1742;
    // this.images = ['/Users/rei.matsuda/Pictures/img/image_kv.png'];
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

  init() {
    this.scene = new Scene();

    this.renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
    })

    this.renderer.setClearColor(0x000000, 0.0);
    this.renderer.setSize(1838, 1742);
    this.$.appendChild(this.renderer.domElement);
    this.camera = new OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      1,
      1000,
    );
    this.camera.position.z = 1;
  }

}
