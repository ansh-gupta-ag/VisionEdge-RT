# GL - OpenGL ES Renderer

This folder contains OpenGL ES 2.0 rendering code.

## Files

- `GLRenderer.kt` - OpenGL texture renderer

## What It Does

1. **Texture Creation** - Creates GL_TEXTURE_2D for frame display
2. **Texture Update** - Updates texture with processed frame data
3. **Shader Management** - Vertex and fragment shaders
4. **Fullscreen Quad** - Renders texture to screen

## Shaders

### Vertex Shader
```glsl
attribute vec4 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
    gl_Position = aPosition;
    vTexCoord = aTexCoord;
}
```

### Fragment Shader
```glsl
precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D uTexture;
void main() {
    gl_FragColor = texture2D(uTexture, vTexCoord);
}
```

## Performance

- Uses GPU for rendering
- Efficient texture updates
- 15-30 FPS target
