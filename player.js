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
    // Weapon (Prototype)
    // -------------------------

    const weapon = BABYLON.MeshBuilder.CreateBox(
        'weapon',
        {
            width: 0.25,
            height: 0.18,
            depth: 0.6,
        },
        scene,
    );

    const weaponMaterial = new BABYLON.StandardMaterial('weaponMat', scene);

    weaponMaterial.diffuseColor = new BABYLON.Color3(0.15, 0.15, 0.15);

    weapon.material = weaponMaterial;

    // Parent weapon to camera
    weapon.parent = camera;

    // Position relative to camera
    weapon.position = new BABYLON.Vector3(0.35, -0.3, 0.75);
    const weaponDefaultPosition = weapon.position.clone();

    // Slight rotation
    weapon.rotation = new BABYLON.Vector3(0.15, Math.PI, 0);

    const muzzleFlash = BABYLON.MeshBuilder.CreateSphere(
        'flash',
        {
            diameter: 0.15,
            segments: 16,
        },
        scene,
    );

    const flashMaterial = new BABYLON.StandardMaterial('flashMat', scene);

    flashMaterial.emissiveColor = new BABYLON.Color3(1, 0.8, 0);

    muzzleFlash.material = flashMaterial;

    muzzleFlash.parent = weapon;

    muzzleFlash.position = new BABYLON.Vector3(0, 0, -0.6);

    muzzleFlash.isVisible = false;

    let recoil = 0;
    let weaponBobTime = 0;

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

    const walkSpeed = 1.2; // meters per second
    const sprintSpeed = 3; // meters per second

    const acceleration = 18;
    const deceleration = 14;

    let isGrounded = true;

    const jumpForce = 0.35;
    const gravity = -0.015;
    const groundHeight = 2;

    scene.onBeforeRenderObservable.add(() => {
        const deltaTime = scene.getEngine().getDeltaTime() / 1000;

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

        const moveSpeed = keys['shift'] ? sprintSpeed : walkSpeed;

        let targetVelocity = BABYLON.Vector3.Zero();

        if (direction.length() > 0) {
            direction.normalize();
            targetVelocity = direction.scale(moveSpeed);
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

        // -------------------------
        // Weapon Bob
        // -------------------------

        if (moveVelocity.length() > 0.01) {
            weaponBobTime += deltaTime * 10;

            weapon.position.y = -0.3 + Math.sin(weaponBobTime) * 0.02;

            weapon.position.x = 0.35 + Math.cos(weaponBobTime * 0.5) * 0.02;
        } else {
            weapon.position.y = -0.3;
            weapon.position.x = 0.35;
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

        // -------------------------
        // Weapon Recoil
        // -------------------------

        recoil *= 0.85;

        weapon.position.y = weaponDefaultPosition.y + recoil;
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

    // -------------------------
    // Shooting
    // -------------------------

    window.addEventListener('mousedown', (event) => {
        if (event.button !== 0) return;

        shoot();
    });

    function shoot() {
        const ray = camera.getForwardRay(1000);

        const hit = scene.pickWithRay(ray);
        muzzleFlash.isVisible = true;
        recoil = -0.08;

        setTimeout(() => {
            muzzleFlash.isVisible = false;
        }, 40);

        if (!hit.hit) return;

        const mesh = hit.pickedMesh;

        console.log('Hit:', mesh.name);

        if (mesh.name === 'target') {
            mesh.metadata.health -= 25;

            console.log('Health:', mesh.metadata.health);

            if (mesh.metadata.health <= 0) {
                mesh.dispose();
            }
        }
    }

    return camera;
}
