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
