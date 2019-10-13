precision mediump float;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D dispTexture;
uniform float ratio;
varying vec4      vColor;
varying vec2      vTextureCoord;

void main(void){
    vec4 disp = texture2D(dispTexture, vTextureCoord*3.0);
    vec2 calcPosition2 = vTextureCoord + vec2(disp.r,disp.g) *(1.0 - ratio);
    vec2 calcPosition1 = vTextureCoord + vec2(disp.g,disp.b) *ratio;
    vec4 image1 = texture2D(texture0, calcPosition1);
    vec4 image2 = texture2D(texture1, calcPosition2);
    vec4 dist = mix(image1, image2, ratio);
    gl_FragColor = dist;
}
