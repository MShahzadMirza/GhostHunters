function createPlayer(scene, canvas) {

    const camera = new BABYLON.UniversalCamera(
        "player",
        new BABYLON.Vector3(0, 2, -5),
        scene
    );

    scene.activeCamera = camera;

    camera.angularSensibility = 3000;
    camera.speed = 0.35;

    // WASD
    camera.keysUp = [87];
    camera.keysDown = [83];
    camera.keysLeft = [65];
    camera.keysRight = [68];

    camera.attachControl(canvas, false);

    const overlay = document.getElementById("overlay");

    function startGame() {

        overlay.style.display = "none";

        canvas.requestPointerLock();

    }

    overlay.addEventListener("click", startGame);

    document.addEventListener("pointerlockchange", () => {

        if (document.pointerLockElement === canvas) {

            camera.attachControl(canvas);

        } else {

            camera.detachControl();

            overlay.style.display = "flex";

        }

    });

    return camera;
}