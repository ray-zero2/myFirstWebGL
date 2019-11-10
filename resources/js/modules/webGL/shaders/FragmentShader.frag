varying vec2 vUv;

uniform sampler2D texture;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {

    vec2 uv = vUv;
    // vec4 disp = texture2D(disp, uv);
    // vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
    // vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
    // vec4 _texture = texture2D(texture, distortedPosition);
    // vec4 _texture2 = texture2D(texture2, distortedPosition2);

    // vec4 finalTexture = mix(_texture, _texture2, dispFactor);
    float x = u_mouse.x;
    float y = u_mouse.y;

    // gl_FragColor = finalTexture;
     vec4 _texture = texture2D(texture, uv);
     vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //  vec2 st = vec2(gl_FragCoord.x/x, gl_FragCoord.y/y);
     vec4 color = vec4(st, 0.0, 1.0);
    //  vec4 finalTexture = mix(_texture, color, 0.5);
    //  vec4 finalTexture = _texture * color;
    gl_FragColor = color;
    // gl_FragColor = finalTexture;
}
