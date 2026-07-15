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

    let velocityY = 0;
    let moveVelocity = new BABYLON.Vector3(0, 0, 0);

    const acceleration = 0.04;
    const friction = 0.85;

    let isGrounded = true;

    const jumpForce = 0.35;
    const walkSpeed = 0.15;
    const sprintSpeed = 0.3;

    const speed = keys['shift'] ? sprintSpeed : walkSpeed;

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

        if (direction.length() > 0) {
            direction.normalize();

            moveVelocity.x += direction.x * acceleration;
            moveVelocity.z += direction.z * acceleration;
        }

        // Apply friction
        moveVelocity.x *= friction;
        moveVelocity.z *= friction;

        // Limit speed
        // Limit speed
        const horizontalSpeed = Math.sqrt(
            moveVelocity.x * moveVelocity.x + moveVelocity.z * moveVelocity.z,
        );

        const maxSpeed = keys['shift'] ? sprintSpeed : walkSpeed;

        if (horizontalSpeed > maxSpeed) {
            moveVelocity.x = (moveVelocity.x / horizontalSpeed) * maxSpeed;
            moveVelocity.z = (moveVelocity.z / horizontalSpeed) * maxSpeed;
        }

        // Move player
        camera.position.x += moveVelocity.x;
        camera.position.z += moveVelocity.z;

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
