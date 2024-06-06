
const canvasContainer = document.getElementById("CanvasContainer");

function setup()
{
    // An 'alt' discription of what is visible on the canvas element for visually impared people using a screen reader. 
    describe("A rotating white cube in the center of a black canvas");
    
    // Create the P5js Canvas. Storing it in a variable isn't nessescary but could be useful later on.
    let canvas = createCanvas(256,256, WEBGL);

    // Resize the canvas to its parent's size.
    resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetWidth);

    // Parent the canvas to the CanvasContainer div, meaning that the canvas will become a child of the CanvasContainer.
    // About 'parenting' objects, think of it like this: 
    // Children may move about freely within their parents space but when their parents move the children move with them.)
    canvas.parent('CanvasContainer');
}

function draw()
{   
    // Set the canvas background color to black.  
    background(0);
    
    // Scale the x,y,z coordinate system by the size of its container so that the size of the cube stays the same relative to the canvas size.
    scale(canvasContainer.offsetWidth);
    
    // Display the canvas' width.
    //text(width, 42, 54);

    // Push() begins a drawing group so that the translations within this group don't affect the objects translated after the group.
    // See: https://p5js.org/reference/#/p5/push
    push();
    translate(0, 0, 0);             // Translate/Position objects at the origin/center of the 3D world.
    rotateZ(frameCount * 0.01);     // Rotate the objects on the Z-axis taking framerate into acount
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    box(0.5, 0.5, 0.5);             // Draw a cube
    pop();                          // End this drawing group. 
}

function windowResized() 
{
    // Resize the canvas to its parent's size when the window is resized.
    resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetWidth);
}

