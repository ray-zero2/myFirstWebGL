import VertexShader from './shaders/distortion/VertexShader.vert';
import FragmentShader from './shaders/distortion/FragmentShader.frag';
import anime from 'animejs';

export default function (selector) {
  const canvas = document.querySelector(selector);
  canvas.width = 300;
  canvas.height = 300;

  const gl = canvas.getContext('webgl');
  // canvasを初期化する色を設定する
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // canvasを初期化する際の深度を設定する
  gl.clearDepth(1.0);

  // canvasを初期化
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //shaderの作成
  const vSource = VertexShader;
  const fSource = FragmentShader;
  const vShader = create_vertexShader(vSource);
  const fShader = create_fragmentShader(fSource);
  const program = create_program(vShader, fShader);

  const attLocation = new Array(3);
  attLocation[0] = gl.getAttribLocation(program, 'position');
  attLocation[1] = gl.getAttribLocation(program, 'color');
  attLocation[2] = gl.getAttribLocation(program, 'textureCoord');

  const attStride = new Array(3);
  attStride[0] = 3;
  attStride[1] = 4;
  attStride[2] = 2;

  const position = [
    -1.0,
    1.0,
    0.0, //0
    1.0,
    1.0,
    0.0, //1
    -1.0,
    -1.0,
    0.0, //2
    1.0,
    -1.0,
    0.0 //3
  ];

  const color = [
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0,
    1.0
  ];

  const textureCoord = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0];

  const index = [0, 1, 2, 3, 2, 1];

  const position_vbo = create_vbo(position);
  const color_vbo = create_vbo(color);
  const texture_vbo = create_vbo(textureCoord);

  const vboList = [position_vbo, color_vbo, texture_vbo];
  set_attribute(vboList, attLocation, attStride);

  const ibo = create_ibo(index);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

  const uniLocation = new Array(4);
  uniLocation[0] = gl.getUniformLocation(program, 'texture0');
  uniLocation[1] = gl.getUniformLocation(program, 'texture1');
  uniLocation[2] = gl.getUniformLocation(program, 'dispTexture');
  uniLocation[3] = gl.getUniformLocation(program, 'ratio');

  // 深度テストを有効にする
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  let texture0 = null,
    texture1 = null,
    dispTexture = null;

  create_texture('/images/image1.jpg', 0);
  create_texture('/images/image2.jpg', 1);
  create_texture('/images/disp2.jpg', 2);

  let count = 0;
  const object = {
    translate: 0
  };

  loop();

  function loop() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // const mixRatio = Math.sin(count) / 2 + 0.5;
    gl.uniform1f(uniLocation[3], object.translate);
    // テクスチャユニットを指定してバインドし登録する
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture0);
    gl.uniform1i(uniLocation[0], 0);

    // テクスチャユニットを指定してバインドし登録する
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.uniform1i(uniLocation[1], 1);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, dispTexture);
    gl.uniform1i(uniLocation[2], 2);

    gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);

    gl.flush();
    count += 0.05;
    console.log(object.translate);
    requestAnimationFrame(loop);
  }

  /**************************************** */
  /*************  functions  ************* */
  /**************************************** */

  function create_vertexShader(source) {
    const shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  function create_fragmentShader(source) {
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  function create_program(vs, fs) {
    const program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.useProgram(program);
      return program;
    } else {
      alert(gl.getProgramInfoLog(program));
    }
  }

  function create_vbo(data) {
    const vbo = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;
  }

  function create_ibo(data) {
    const ibo = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Int16Array(data),
      gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return ibo;
  }

  function set_attribute(vboArray, attLocArray, attStride) {
    for (let i in vboArray) {
      gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[i]);
      gl.enableVertexAttribArray(attLocArray[i]);
      gl.vertexAttribPointer(
        attLocArray[i],
        attStride[i],
        gl.FLOAT,
        false,
        0,
        0
      );
    }
  }

  function create_texture(source, number) {
    const img = new Image();

    img.onload = function () {
      const _texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, _texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);
      switch (number) {
        case 0:
          texture0 = _texture;
          break;
        case 1:
          texture1 = _texture;
          break;
        case 2:
          dispTexture = _texture;
          break;
        default:
          break;
      }
    };

    img.src = source;
  }

  canvas.addEventListener('mouseenter', () => {
    // anime.remove(object);
    anime({
      targets: object,
      translate: 1.0,
      easing: 'easeInOutCubic',
      duration: 500
    });
  });

  canvas.addEventListener('mouseleave', () => {
    // anime.remove(object);
    anime({
      targets: object,
      translate: 0,
      easing: 'easeInOutCubic',
      duration: 500
    });
  });
}
