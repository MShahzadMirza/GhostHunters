function createPlayer(scene, canvas) {

    // Create FPS camera
    const camera = new BABYLON.UniversalCamera(
        "player",
        new BABYLON.Vector3(0, 2, -5),
        scene
    );

    scene.activeCamera = camera;

    // Mouse sensitivity
    camera.angularSensibility = 3000;

    // Movement speed
    camera.speed = 0.35;

    // Enable WASD
    camera.keysUp = [87];       // W
    camera.keysDown = [83];     // S
    camera.keysLeft = [65];     // A
    camera.keysRight = [68];    // D

    // Click to lock mouse
    canvas.addEventListener("click", () => {
        canvas.requestPointerLock();
    });

    camera.attachControl(canvas, false);

    return camera;
}