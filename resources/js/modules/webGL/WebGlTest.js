import VertexShader from './shaders/distortion/VertexShader.vert';
import FragmentShader from './shaders/distortion/FragmentShader.frag';
import vertices from './vertices';

import anime from 'animejs';

export default class {
  constructor(selector) {
    const canvas = document.querySelector(selector);
    canvas.width = 500;
    canvas.height = 500;

    this.isOldBrowser = /msie|trident/.test(navigator.userAgent.toLowerCase);
    this.images = ['./images/image1.jpg'];
    this.program = null;
    this.vertices = new Float32Array(vertices);

    if (this.isOldBrowser === false) {
      this.gl = canvas.getContext('webgl');
      this.imageLoader(this.start());
    }
  }

  initializeGL() {
    this.gl.clearColor(0.0, 0.0, 0.0, 0.2);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.setShaders();
  }

  setShaders() {
    const vSource = VertexShader;
    const fSource = FragmentShader;
    const vShader = this.createVertexShader(vSource);
    const fShader = this.createFragmentShader(fSource);
    this.program = this.createProgram(vShader, fShader);
  }

  imageLoader(callback) {
    let num = 0;
    const srcArray = this.images;
    const arrayNum = srcArray.length;

    srcArray.forEach(src => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        num++;
        if (num === arrayNum) {
          callback;
        }
      };
    });
  }

  start() {
    this.initializeGL();
  }

  createVertexShader(source) {
    const shader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    return shader;
  }
  createFragmentShader(source) {
    const shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    return shader;
  }

  createProgram(vs, fs) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);
    this.gl.linkProgram(program);
    if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      this.gl.useProgram(program);
      return program;
    } else {
      alert(this.gl.getProgramInfoLog(program));
    }
  }

  //   function create_vbo(data) {
  //   const vbo = gl.createBuffer();

  //   gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  //   gl.bindBuffer(gl.ARRAY_BUFFER, null);

  //   return vbo;
  // }

  // function create_ibo(data) {
  //   const ibo = gl.createBuffer();

  //   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  //   gl.bufferData(
  //     gl.ELEMENT_ARRAY_BUFFER,
  //     new Int16Array(data),
  //     gl.STATIC_DRAW
  //   );
  //   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  //   return ibo;
  // }

  // function set_attribute(vboArray, attLocArray, attStride) {
  //   for (let i in vboArray) {
  //     gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[i]);
  //     gl.enableVertexAttribArray(attLocArray[i]);
  //     gl.vertexAttribPointer(
  //       attLocArray[i],
  //       attStride[i],
  //       gl.FLOAT,
  //       false,
  //       0,
  //       0
  //     );
  //   }
  // }

  // function create_texture(source, number) {
  //   const img = new Image();

  //   img.onload = function () {
  //     const _texture = gl.createTexture();
  //     gl.bindTexture(gl.TEXTURE_2D, _texture);
  //     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  //     gl.generateMipmap(gl.TEXTURE_2D);
  //     gl.bindTexture(gl.TEXTURE_2D, null);
  //     switch (number) {
  //       case 0:
  //         texture0 = _texture;
  //         break;
  //       case 1:
  //         texture1 = _texture;
  //         break;
  //       case 2:
  //         dispTexture = _texture;
  //         break;
  //       default:
  //         break;
  //     }
  //   };

  //   img.src = source;
  // }
}
