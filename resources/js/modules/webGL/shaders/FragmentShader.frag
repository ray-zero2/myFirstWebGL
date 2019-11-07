precision highp float;

varying vec2 vUv;

uniform sampler2D texture;

void main(){
    vec4 _texture = texture2D(texture, vUv);
    gl_FragColor = _texture;
}
