Lore.Shaders['default'] = new Lore.Shader('Default', { size: new Lore.Uniform('size', 5.0, 'float'),
                                                       type: new Lore.Uniform('type', 0.0, 'float'),
                                                       fogStart: new Lore.Uniform('fogStart', 0.0, 'float'),
                                                       fogStart: new Lore.Uniform('fogEnd', 0.0, 'float'),
                                                       cutoff: new Lore.Uniform('cutoff', 0.0, 'float') }, [
    'uniform float size;',
    'uniform float fogStart;',
    'uniform float fogEnd;',
    'uniform float cutoff;',
    'attribute vec3 position;',
    'attribute vec3 color;',
    'varying vec3 vColor;',
    'varying float vDiscard;',
    'vec3 rgb2hsv(vec3 c) {',
        'vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);',
        'vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));',
        'vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));',

        'float d = q.x - min(q.w, q.y);',
        'float e = 1.0e-10;',
        'return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);',
    '}',
    'vec3 hsv2rgb(vec3 c) {',
        'vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);',
        'vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);',
        'return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);',
    '}',
    'float rand(vec2 co) {',
        'return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);',
    '}',
    'void main() {',
        'vec3 hsv = vec3(color.r, color.g, 1.0);',
        'float saturation = color.g;',
        'float point_size = color.b;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        'vec4 mv_pos = modelViewMatrix * vec4(position, 1.0);',
        'vDiscard = 0.0;',
        'if(-mv_pos.z < cutoff || point_size <= 0.0) {',
            'vDiscard = 1.0;',
            'return;',
        '}',
        'float dist = abs(mv_pos.z - fogStart);',
        'gl_PointSize = size;',
        'if(fogEnd > 0.0) {',
            'hsv.b = clamp((fogEnd - dist) / (fogEnd - fogStart), 0.0, 1.0);',
        '}',
        'hsv.g = 0.5 + 0.4 * rand(position.xy);',
        'vColor = hsv2rgb(hsv);',
    '}'
], [
    'varying vec3 vColor;',
    'varying float vDiscard;',
    'void main() {',
        'if(vDiscard > 0.5) discard;',
        'gl_FragColor = vec4(vColor, 1.0);',
    '}'
]);
