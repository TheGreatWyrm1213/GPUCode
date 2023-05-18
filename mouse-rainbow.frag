// Author: Jason Bohn
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.149,0.741,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.17, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);

     pct.r = sin(st.x*PI) - 0.2;
     pct.g = sin(st.x*PI) - (u_mouse.x * 0.0005);
     pct.b = sin(st.x*PI) - 0.1;;

     pct = pct * (u_mouse.y * 0.0025);
    
    color = mix(colorA, colorB, pct);
    
    //float colorTime = abs(sin(u_time));

    // Plot transition lines for each channel
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));
    


    gl_FragColor = vec4(color,1.0);
}