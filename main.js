const canvas = document.getElementById("gameCanvas");

const engine = new BABYLON.Engine(
    canvas,
    true
);

const scene = createGame(engine, canvas);


engine.runRenderLoop(() => {

    scene.render();

});


window.addEventListener("resize", () => {

    engine.resize();

});