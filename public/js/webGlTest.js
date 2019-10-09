{
  const canvas = document.querySelector('.canvas');
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
  const vShader = getShader('.vShader');
  const fShader = getShader('.fShader');
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
    -1.0, 1.0, 0.0,   //0
    1.0, 1.0, 0.0,    //1
    -1.0, -1.0, 0.0,  //2
    1.0, -1.0, 0.0    //3
  ];

  const color = [
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0
  ];

  const textureCoord = [
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    1.0, 1.0
  ];

  const index = [
    0, 1, 2,
    3, 2, 1
  ];


  const position_vbo = create_vbo(position);
  const color_vbo = create_vbo(color);
  const texture_vbo = create_vbo(textureCoord);

  const vboList = [position_vbo, color_vbo, texture_vbo];
  set_attribute(vboList, attLocation, attStride);

  const ibo = create_ibo(index);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

  const uniLocation = new Array(2);
  uniLocation[0] = gl.getUniformLocation(program, 'mvpMatrix');
  uniLocation[1] = gl.getUniformLocation(program, 'texture');

  /***********matrix********** */
  const m = new matIV();
  const mMatrix = m.identity(m.create());
  const vMatrix = m.identity(m.create());
  const pMatrix = m.identity(m.create());
  const tmpMatrix = m.identity(m.create());
  const mvpMatrix = m.identity(m.create());

  // ビュー×プロジェクション座標変換行列
  m.lookAt([0.0, 0.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);
  m.perspective(45, canvas.width / canvas.height, 0.1, 100, pMatrix);
  m.multiply(pMatrix, vMatrix, tmpMatrix);

  // 深度テストを有効にする
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  // 有効にするテクスチャユニットを指定
  gl.activeTexture(gl.TEXTURE0);

  let texture = null;
  create_texture('/public/images/water.jpg');


  let count = 0;
  loop();

  function loop() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    count += 2;

    const radius = (count % 360) * Math.PI / 180;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(uniLocation[1], 0);

    m.identity(mMatrix);
    m.rotate(mMatrix, radius, [0, 1, 0], mMatrix); //y軸回転
    m.multiply(tmpMatrix, mMatrix, mvpMatrix);

    gl.uniformMatrix4fv(uniLocation[0], false, mvpMatrix);
    gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);

    gl.flush();
    requestAnimationFrame(loop);

  }

  /**************************************** */
  /*************  functions  ************* */
  /**************************************** */

  function getShader(id) {
    const source = document.querySelector(id);

    const shader = source.type == 'f-shader'
      ? gl.createShader(gl.FRAGMENT_SHADER)
      : gl.createShader(gl.VERTEX_SHADER)

    gl.shaderSource(shader, source.text);
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
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return ibo;
  }

  function set_attribute(vboArray, attLocArray, attStride) {
    for (let i in vboArray) {
      gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[i]);
      gl.enableVertexAttribArray(attLocArray[i]);
      gl.vertexAttribPointer(attLocArray[i], attStride[i], gl.FLOAT, false, 0, 0);
    }
  }

  function create_texture(source) {
    const img = new Image();

    img.onload = function () {
      const _texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, _texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);
      texture = _texture;
    };

    img.src = source;
  }
}
