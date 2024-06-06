
const sketch2 = function (containerDivId) 
{
    return function (p) 
    {
        const canvasContainer = document.getElementById(containerDivId);
        let shoeModel;
        let shoeTexture;

        p.preload = function () 
        {
            shoeModel = p.loadModel('./3DModels/Shoe-3DModel/Shoe.obj', true);
            shoeTexture = p.loadImage('./Textures/Shoe-Textures/Shoe-Albedo.jpg');
        }

        p.setup = function () 
        {
            // const canvasContainer = document.getElementById("CanvasContainer2");
            p.describe("A rotating white cube in the center of a black canvas");

            // Create the P5js Canvas. Storing it in a variable isn't nessescary but could be useful later on.
            let canvas = p.createCanvas(256, 256, p.WEBGL);

            canvas.parent(containerDivId);

            // Resize the canvas to its parent's size.
            p.resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetWidth);
        }

        p.draw = function () 
        {

            // let locX = p.mouseX - p.height / 2;
            // let locY = p.mouseY - p.width / 2;

            // Set the canvas background color to the same color as the cards body background color to seriously blend in.
            p.background(255, 150, 111);

            // Scale the coordinate system so that the size of the cube stays the same relative to the canvas size.
            p.scale(canvasContainer.offsetWidth);

            // Push() begins a drawing group so that the translations within this group don't affect the objects after the group.
            // See: https://p5js.org/reference/#/p5/push
            p.push();

                p.translate(0, 0, 0); // Position objects at the origin
                p.scale(0.0045);      // Scale model down in size
                // p.rotateZ((p.frameCount * 0.01) + 123); // Rotate the objects on the Z axis taking framerate into acount
                // p.rotateX((p.frameCount * 0.01) + 123);
                p.angleMode(p.DEGREES);
                p.rotateX(180);
                p.ambientLight(200);
                p.rotateY((-p.frameCount * 1));
                p.directionalLight(255,255,255, 0, 1, 0);
                // p.pointLight(255, 255, 255, locX, locY, 100);
                // p.ambientMaterial(50);
                p.specularMaterial(100);
                p.shininess(10);
                p.noStroke();
                p.texture(shoeTexture);
                p.model(shoeModel);
                p.directionalLight(255, 255, 255, 0.5, 0.75, 0);
            
            p.pop(); // End this drawing group. 
        }

        p.windowResized = function () 
        {
            p.resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetWidth);
        }
    }
}