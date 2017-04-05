#ifndef _OPENGL_H_HEADER
#define _OPENGL_H_HEADER

#include <windows.h>

#include <GL/gl.h>
#include <GL/glext.h>
#include <GL/glu.h>

/**
    Handle rendering content in window.
*/
void Render(float theta);

/**
    Handle key pressing.
*/
void HandleKeyPressed(WPARAM wParam);

#endif // _OPENGL_H_HEADER
