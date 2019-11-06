attribute vec3 position;
attribute vec4 color;
attribute vec2 textureCoord;
varying   vec4 vColor;
varying   vec2 vTextureCoord;

void main(void){
    vColor        = color;
    vTextureCoord = textureCoord ;
    gl_Position   = vec4(position, 1.0);
}


// precision mediump float;

// attribute vec4 position;
// attribute vec2 uv;

// varying vec2 vUv;

// void main() {
// 	gl_Position = position;
// 	vUv = vec2( (position.x + 1.)/2., (-position.y + 1.)/2.);
// }
