const sketch1 = function (containerDivId) 
{
    return function (p) 
    {
        const canvasContainer = document.getElementById(containerDivId);

        p.setup = function () 
        {
            p.describe("A rotating white cube in the center of a black canvas");

            // Create the P5js Canvas. Storing it in a variable isn't nessescary but could be useful later on.
            let canvas = p.createCanvas(256, 256, p.WEBGL);

            // Parent the canvas to the CanvasContainer div.
            canvas.parent(containerDivId);

            // Resize the canvas to its parent's size.
            p.resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetWidth);
        }

        p.draw = function () 
        {
            // Set the canvas background color to the same color as the cards body background color to seriously blend in.
            p.background(255, 150, 111);

            // Scale the coordinate system so that the size of the cube stays the same relative to the canvas size.
            p.scale(canvasContainer.offsetWidth);

            // Display the canvas' width.
            //text(width, 42, 54);

            // Push() begins a drawing group so that the translations within this group don't affect the objects after the group.
            // See: https://p5js.org/reference/#/p5/push
            p.push();
            p.translate(0, 0, 0); // Position objects at the origin
            p.rotateZ(p.frameCount * 0.01); // Rotate the objects on the Z axis taking framerate into acount
            p.rotateX(p.frameCount * 0.01);
            p.rotateY(p.frameCount * 0.01);
            p.box(0.5, 0.5, 0.5); // Draw a cube
            p.pop(); // End this drawing group. 
        }

        p.windowResized = function () 
        {
            p.resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetWidth);
        }
    }
}

// let myp5 = new p5(sketch1('CanvasContainer1'));
