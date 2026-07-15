function createPlayer(scene, canvas) {
    const camera = new BABYLON.UniversalCamera(
        'player',
        new BABYLON.Vector3(0, 2, -5),
        scene,
    );

    scene.activeCamera = camera;

    // Enable collisions
    camera.checkCollisions = true;
    camera.applyGravity = false;
    camera.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);

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

    let velocityY = 0;
    let moveVelocity = BABYLON.Vector3.Zero();

    const walkSpeed = 5; // meters per second
    const sprintSpeed = 9; // meters per second

    const acceleration = 18;
    const deceleration = 14;

    let isGrounded = true;

    const jumpForce = 0.35;
    const gravity = -0.015;
    const groundHeight = 2;

    scene.onBeforeRenderObservable.add(() => {
        const deltaTime = scene.getEngine().getDeltaTime() / 1000;

        const speed = keys['shift'] ? sprintSpeed : walkSpeed;

        const forward = camera.getDirection(BABYLON.Axis.Z);
        const right = camera.getDirection(BABYLON.Axis.X);

        // Keep movement horizontal
        forward.y = 0;
        right.y = 0;

        forward.normalize();
        right.normalize();

        let direction = BABYLON.Vector3.Zero();

        if (keys['w']) {
            direction.addInPlace(forward);
        }

        if (keys['s']) {
            direction.subtractInPlace(forward);
        }

        if (keys['a']) {
            direction.subtractInPlace(right);
        }

        if (keys['d']) {
            direction.addInPlace(right);
        }

        const targetSpeed = keys['shift'] ? sprintSpeed : walkSpeed;

        let targetVelocity = BABYLON.Vector3.Zero();

        if (direction.length() > 0) {
            direction.normalize();
            targetVelocity = direction.scale(targetSpeed);
        }

        // Smooth acceleration
        moveVelocity.x +=
            (targetVelocity.x - moveVelocity.x) * acceleration * deltaTime;
        moveVelocity.z +=
            (targetVelocity.z - moveVelocity.z) * acceleration * deltaTime;

        // Smooth deceleration
        if (direction.length() === 0) {
            moveVelocity.x *= Math.max(0, 1 - deceleration * deltaTime);
            moveVelocity.z *= Math.max(0, 1 - deceleration * deltaTime);
        }

        // Move player
        camera.cameraDirection.addInPlace(moveVelocity.scale(deltaTime));

        // Jump
        if (keys[' '] && isGrounded) {
            velocityY = jumpForce;
            isGrounded = false;
        }

        // Gravity
        velocityY += gravity;
        camera.position.y += velocityY;

        // Ground collision
        if (camera.position.y <= groundHeight) {
            camera.position.y = groundHeight;

            velocityY = 0;

            isGrounded = true;
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
