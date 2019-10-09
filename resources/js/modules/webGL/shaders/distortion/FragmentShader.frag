precision mediump float;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D dispTexture;
uniform float ratio;
varying vec4      vColor;
varying vec2      vTextureCoord;

void main(void){
    vec4 smpColor0 = texture2D(texture0, vTextureCoord);
    vec4 smpColor1 = texture2D(texture1, vTextureCoord);
    vec4 dispTexture = texture2D(texture1, vTextureCoord);

    float otherRatio = 1.0 - ratio;
    gl_FragColor  =(smpColor0*ratio + smpColor1*otherRatio);
}
