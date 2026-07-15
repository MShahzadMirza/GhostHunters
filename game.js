function createGame(engine, canvas) {
    const scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;

    scene.clearColor = new BABYLON.Color4(0.6, 0.8, 1, 1);

    createWorld(scene);

    createPlayer(scene, canvas);

    return scene;
}
