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
    // Weapon
    // -------------------------

    let weapon = null;

    const weaponDefaultPosition = new BABYLON.Vector3(
        0.65,
        -0.45,
        2
    );

    const weaponDefaultRotation = new BABYLON.Vector3(
        BABYLON.Tools.ToRadians(0),
        BABYLON.Tools.ToRadians(170),
        BABYLON.Tools.ToRadians(0)
    );

    const muzzleFlash = BABYLON.MeshBuilder.CreateSphere(
        'flash',
        {
            diameter: 0.5,
            segments: 16,
        },
        scene,
    );

    const flashMaterial = new BABYLON.StandardMaterial('flashMat', scene);

    flashMaterial.emissiveColor = new BABYLON.Color3(1, 0.8, 0);

    muzzleFlash.material = flashMaterial;

    muzzleFlash.isVisible = false;

    BABYLON.SceneLoader.ImportMesh(
        "",
        "assets/models/",
        "Pistol.glb",
        scene,
        function (meshes) {

            weapon = meshes[0];

            weapon.parent = camera;

            weapon.parent = camera;

            weapon.position.copyFrom(weaponDefaultPosition);
            weapon.rotation.copyFrom(weaponDefaultRotation);

            weapon.scaling.set(0.4, 0.4, 0.4);

            // Parent muzzle AFTER weapon exists
            muzzleFlash.parent = weapon;

            // Position relative to pistol
            muzzleFlash.position.set(
                0.8,   // left/right
                0.7,   // up/down
                1   // forward/back
            );

            console.log("Pistol Loaded");

        }
    );



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

        if (weapon) {

            if (moveVelocity.length() > 0.05) {

                weaponBobTime += deltaTime * 9;

                weapon.position.x =
                    weaponDefaultPosition.x +
                    Math.cos(weaponBobTime * 0.5) * 0.03;

                weapon.position.y =
                    weaponDefaultPosition.y +
                    Math.abs(Math.sin(weaponBobTime)) * 0.025;

                weapon.rotation.z =
                    weaponDefaultRotation.z +
                    Math.sin(weaponBobTime) * 0.02;

            } else {

                weapon.position.copyFrom(weaponDefaultPosition);
                weapon.rotation.copyFrom(weaponDefaultRotation);

            }
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

        recoil *= 0.82;

        if (weapon) {
            weapon.position.z =
                weaponDefaultPosition.z + recoil;
            weapon.rotation.x =
                weaponDefaultRotation.x +
                recoil * 0.3;
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
