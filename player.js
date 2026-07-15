function createPlayer(scene, canvas) {
    const camera = new BABYLON.UniversalCamera(
        'player',
        new BABYLON.Vector3(0, 2, -5),
        scene,
    );

    scene.activeCamera = camera;

    // Camera settings
    camera.angularSensibility = 3000;
    camera.speed = 0; // Disable Babylon movement

    // Disable Babylon keyboard controls
    camera.keysUp = [];
    camera.keysDown = [];
    camera.keysLeft = [];
    camera.keysRight = [];

    // Mouse look
    camera.attachControl(canvas, false);

    // -------------------------
    // Keyboard Input
    // -------------------------

    const keys = {};

    window.addEventListener('keydown', (e) => {
        keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (e) => {
        keys[e.key.toLowerCase()] = false;
    });

    // -------------------------
    // Player Movement
    // -------------------------

    // -------------------------
    // Player Movement
    // -------------------------

    let velocityY = 0;

    const gravity = -0.015;
    const groundHeight = 2;

    scene.onBeforeRenderObservable.add(() => {
        const walkSpeed = 0.15;
        const sprintSpeed = 0.3;

        const speed = keys['shift'] ? sprintSpeed : walkSpeed;

        const forward = camera.getDirection(BABYLON.Axis.Z);
        const right = camera.getDirection(BABYLON.Axis.X);

        // Keep movement horizontal
        forward.y = 0;
        right.y = 0;

        forward.normalize();
        right.normalize();

        if (keys['w']) {
            camera.position.addInPlace(forward.scale(speed));
        }

        if (keys['s']) {
            camera.position.addInPlace(forward.scale(-speed));
        }

        if (keys['a']) {
            camera.position.addInPlace(right.scale(-speed));
        }

        if (keys['d']) {
            camera.position.addInPlace(right.scale(speed));
        }

        // Gravity
        velocityY += gravity;
        camera.position.y += velocityY;

        // Ground collision
        if (camera.position.y <= groundHeight) {
            camera.position.y = groundHeight;
            velocityY = 0;
        }
    });

    // -------------------------
    // Overlay / Pointer Lock
    // -------------------------

    const overlay = document.getElementById('overlay');

    function startGame() {
        overlay.style.display = 'none';

        canvas.requestPointerLock();
    }

    overlay.addEventListener('click', startGame);

    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === canvas) {
            camera.attachControl(canvas, false);
        } else {
            camera.detachControl();

            overlay.style.display = 'flex';
        }
    });

    return camera;
}
