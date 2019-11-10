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
    this.width = 468;
    this.height = 92;
    // this.position = {x: 0, y: 0};
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

  bind(){
    const $canvas = document.querySelector('.js-threeCanvas');
    console.log($canvas);
    $canvas.addEventListener('mousemove', event => {
      // const element = event.currentTarget;
  // canvas要素上のXY座標
      const x = event.offsetX;
      const y = event.offsetY;

      // const x = event.clientX - element.offsetLeft;
      // const y = event.clientY - element.offsetTop;
  // canvas要素の幅・高さ
      const w = $canvas.offsetWidth;
      const h = $canvas.offsetHeight;
      console.log(w);

      // const positionX =  ( x / w );
      // const positionY = 1.0 -( y / h )*2;
      const positionX =  ( x / w ) * 2 - 1;
      const positionY = -( y / h ) * 2 + 1;


      console.log(`x = ${positionX}`);
      console.log(`y = ${positionY}`);

  // -1〜+1の範囲で現在のマウス座標を登録する
      this.material.uniforms.u_mouse.value.x = positionX;
      this.material.uniforms.u_mouse.value.y = positionY;
    });
  }

  init() {
    this.scene = new Scene();

    this.renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0.0);
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.classList.add('js-threeCanvas');
    // this.renderer.domElement.setAttribute('style', '');
    // this.renderer.domElement.style.width = '100%';
    // this.renderer.domElement.style.height = '100%';
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

    const loader = new TextureLoader();
    this.texture = loader.load('./images/kyutech.png', () => {
      this.next();
    });
    this.texture.magFilter = LinearFilter;
    this.texture.minFilter = LinearFilter;
  }

  next() {
    this.material = new ShaderMaterial({
      uniforms: {
        // effectFactor: { type: 'f', value: intensity },
        // dispFactor: { type: 'f', value: 0.0 },
        texture: { type: 't', value: this.texture },
        u_resolution: {type: 'v2', value: {x: this.width, y: this.height}},
         u_mouse: {type: 'v2', value: {x: 0.0, y: 0.0}}
        // texture2: { type: 't', value: this.textures[1] },
        // disp: { type: 't', value: displacementTexture },
      },
      vertexShader: VertexShader,
      fragmentShader: FragmentShader,
      // transparent: true,
      // opacity: 1.0,
    });

    const geometry = new PlaneBufferGeometry(this.width, this.height, 1);
    const object = new Mesh(geometry, this.material);
    this.scene.add(object);
    // this.renderer.render(this.scene, this.camera);
    this.bind();
    // this.animate();
    let count = 0;
    const animate = () => {
      this.renderer.render(this.scene, this.camera);
      // console.log(count);
      // count++;
      requestAnimationFrame(animate)
    }

    animate();
  }

  // animate(){
  //   // this.renderer.render(this.scene, this.camera);
  //   // this.renderer.complete(function(){ console.log('finish'); });
  //   requestAnimationFrame(this.animate);
  // }
}
