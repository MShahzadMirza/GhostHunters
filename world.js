function createWorld(scene) {
    // ==========================
    // Light
    // ==========================

    const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene,
    );

    light.intensity = 1.1;

    // ==========================
    // Ground
    // ==========================

    const ground = BABYLON.MeshBuilder.CreateGround(
        'ground',
        {
            width: 500,
            height: 500,
        },
        scene,
    );

    const groundMaterial = new BABYLON.StandardMaterial('groundMat', scene);

    groundMaterial.diffuseColor = new BABYLON.Color3(0.32, 0.55, 0.28);

    ground.material = groundMaterial;

    ground.checkCollisions = true;

    // ==========================
    // Test Boxes
    // ==========================

    const boxMaterial = new BABYLON.StandardMaterial('boxMat', scene);

    boxMaterial.diffuseColor = new BABYLON.Color3(0.55, 0.4, 0.25);

    for (let x = -100; x <= 100; x += 20) {
        for (let z = -100; z <= 100; z += 20) {
            if (Math.random() > 0.65) {
                const box = BABYLON.MeshBuilder.CreateBox(
                    'box',
                    {
                        size: 4,
                    },
                    scene,
                );

                box.position.set(x, 2, z);

                box.material = boxMaterial;

                box.checkCollisions = true;
            }
        }
    }

    // ==========================
    // Trees
    // ==========================

    for (let i = 0; i < 40; i++) {
        const x = Math.random() * 400 - 200;
        const z = Math.random() * 400 - 200;

        const trunk = BABYLON.MeshBuilder.CreateCylinder(
            'trunk',
            {
                height: 5,
                diameter: 0.8,
            },
            scene,
        );

        trunk.position.set(x, 2.5, z);

        const leaves = BABYLON.MeshBuilder.CreateSphere(
            'leaves',
            {
                diameter: 4,
            },
            scene,
        );

        leaves.position.set(x, 6, z);

        const trunkMat = new BABYLON.StandardMaterial('trunkMat', scene);
        trunkMat.diffuseColor = new BABYLON.Color3(0.45, 0.28, 0.1);

        const leafMat = new BABYLON.StandardMaterial('leafMat', scene);
        leafMat.diffuseColor = new BABYLON.Color3(0.15, 0.6, 0.15);

        trunk.material = trunkMat;
        leaves.material = leafMat;

        trunk.checkCollisions = true;
        leaves.checkCollisions = true;
    }

    // ==========================
    // Road
    // ==========================

    const road = BABYLON.MeshBuilder.CreateGround(
        'road',
        {
            width: 12,
            height: 500,
        },
        scene,
    );

    road.position.y = 0.02;

    const roadMat = new BABYLON.StandardMaterial('roadMat', scene);

    roadMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    road.material = roadMat;

    // ==========================
    // Buildings
    // ==========================

    const buildingMat = new BABYLON.StandardMaterial('buildingMat', scene);

    buildingMat.diffuseColor = new BABYLON.Color3(0.65, 0.65, 0.7);

    for (let i = 0; i < 8; i++) {
        const building = BABYLON.MeshBuilder.CreateBox(
            'building',
            {
                width: 12,
                depth: 12,
                height: 20 + Math.random() * 20,
            },
            scene,
        );

        building.position.x = 30 + i * 18;
        building.position.z = -60;
        building.position.y = building.scaling.y * 5;

        building.material = buildingMat;

        building.checkCollisions = true;
    }

    // ==========================
    // Target Dummies
    // ==========================

    const targetMaterial = new BABYLON.StandardMaterial('targetMat', scene);
    targetMaterial.diffuseColor = new BABYLON.Color3(1, 0.2, 0.2);

    for (let i = 0; i < 8; i++) {
        const target = BABYLON.MeshBuilder.CreateBox(
            'target',
            {
                width: 2,
                height: 3,
                depth: 1,
            },
            scene,
        );

        target.position = new BABYLON.Vector3(-15 + i * 5, 1.5, 25);

        target.material = targetMaterial;
    }
}
