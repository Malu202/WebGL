window.addEventListener('DOMContentLoaded', function(){
    // get the canvas DOM element
    var canvas = document.getElementById('renderCanvas');
    
    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // createScene function that creates and return the scene
    var createScene = function(){
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        var camera = new BABYLON.ArcRotateCamera("Camera", -1.5, 1.5, 5, new BABYLON.Vector3(0, 0, 0), scene);
        
        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        
        // attach the camera to the canvas
        camera.attachControl(canvas, false);
        
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(.5,1,0), scene);
        
        // create a built-in "ground" shape;
        //var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

        // return the created scene
        return scene;
    }
    
    // call the createScene function
    var scene = createScene();


    BABYLON.SceneLoader.ImportMesh('',"","./models/Monkey/monkey.babylon", scene,function (newMeshes) {
		scene.executeWhenReady(function () {
            var animation = scene.beginAnimation(newMeshes[0], 0, 31, true, 1);
        });
	});
    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});