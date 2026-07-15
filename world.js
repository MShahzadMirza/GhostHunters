function createWorld(scene) {
    const light = new BABYLON.HemisphericLight(
        'sun',
        new BABYLON.Vector3(0, 1, 0),
        scene,
    );

    light.intensity = 1;

    BABYLON.MeshBuilder.CreateGround(
        'ground',
        {
            width: 100,
            height: 100,
        },
        scene,
    );
}
