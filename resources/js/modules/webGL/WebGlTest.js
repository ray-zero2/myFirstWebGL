import VertexShader from './shaders/VertexShader.vert';
import FragmentShader from './shaders/FragmentShader.frag';

import anime from 'animejs';

export default class {
  constructor(selector) {
    const canvas = document.querySelector(selector);

    canvas.width = 1838;
    canvas.height = 1742;
    this.isOldBrowser = /msie|trident/.test(navigator.userAgent.toLowerCase);
    this.images = ['/Users/rei.matsuda/Pictures/img/image_kv.png'];
    this.program = null;
    this.vbo = null;
    this.attributeLocation = null;
    this.uniformLocation = null;
    this.texture = null;
    this.vertices = new Float32Array([
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      1,
      1
    ]);

    if (this.isOldBrowser === false) {
      this.gl = canvas.getContext('webgl');
      this.imageLoader(this.start());
    }

    this.bind(canvas);
  }

  bind(canvas) {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      if (width > 960) {
        console.log('pc');
        canvas.width = 1838;
        canvas.height = 1742;
      } else {
        console.log('sp');
      }
    });
  }

  render() {
    this.gl.clearColor(0.0, 0.0, 0.0, 0.2);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.uniform1i(this.uniformLocation, 0);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    this.gl.flush();
  }

  initializeGL() {
    this.gl.clearColor(0.0, 0.0, 0.0, 0.2);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.setShaders();
    this.vbo = this.createVbo(this.vertices);
    this.setAttribute(this.vbo);
    this.uniformLocation = this.gl.getUniformLocation(this.program, 'texture');
    this.setTexture(this.images[0]);
    this.render();
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

  setAttribute(vbo) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.enableVertexAttribArray(this.attributeLocation);
    this.gl.vertexAttribPointer(
      this.attributeLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
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

  createVbo(data) {
    const vbo = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    this.attributeLocation = this.gl.getAttribLocation(
      this.program,
      'position'
    );
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

    return vbo;
  }

  setTexture(source) {
    const img = new Image();
    img.src = source;
    this.texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      img
    );
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }
}
