  var sizes = {
    mercurio: 0.488,
    venus: 1.2,
    tierra: 1.28,
    martes: 0.68,
    jupiter: 14.2,
    Saturno: 12,
    urano: 5.18,
    neptuno: 4.95,
    pluton: 0.23,
  }
  var canvas = document.querySelector("#renderCanvas"); // Get the canvas element
  var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

  /******* Add the create scene function ******/
  var createScene = function () {

      // Create the scene space
      const scene = new BABYLON.Scene(engine);

      // Add a camera to the scene and attach it to the canvas
      var camera = new BABYLON.ArcRotateCamera("Camera", -1.5, 1.5, -.4, new BABYLON.Vector3(0,0,5), scene);
      // var camera = new BABYLON.FollowCamera('Camera', -1.5, 1.5, -2, scene)
      camera.attachControl(canvas, true);

      // Add lights to the scene
      new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
      new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);


      // Mercury
      var mercury = BABYLON.MeshBuilder.CreateSphere("mercury", {diameter: .48}, scene);
      mercury.position.x = 2;  
      var mercuryMaterial = new BABYLON.StandardMaterial("ground", scene);
      mercuryMaterial.diffuseTexture = new BABYLON.Texture("https://solarsystem.nasa.gov/system/downloadable_items/671_PIA17386.jpg", scene);
      mercuryMaterial.diffuseTexture.vScale = -1;
      mercury.material = mercuryMaterial;

      // Earth
      var earth = BABYLON.MeshBuilder.CreateSphere("earth", {diameter: 1.2}, scene);
      var earthMaterial = new BABYLON.StandardMaterial("ground", scene);
      earthMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/earth.jpg", scene);
      earthMaterial.diffuseTexture.vScale = -1;
      earth.material = earthMaterial;

        // Moon
        var moon = BABYLON.MeshBuilder.CreateSphere("moon", {diameter: .1}, scene);
        moon.position.x = -1;
        moon.position.y = .2
        var moonMaterial = new BABYLON.StandardMaterial("ground", scene);
        moonMaterial.diffuseTexture = new BABYLON.Texture("https://st2.depositphotos.com/2800301/6522/i/950/depositphotos_65228533-stock-photo-moon-surface-texture.jpg", scene);
        moonMaterial.diffuseTexture.vScale = -1;
        moon.material = moonMaterial;



      // Rotation
      var earthAxis = new BABYLON.Vector3(Math.sin(23 * Math.PI/180), Math.cos(23 * Math.PI/180), 0);
    
      var angle = 0.01;
      scene.registerBeforeRender(function() {
        earth.rotate(earthAxis, angle, BABYLON.Space.WORLD);
        mercury.rotate(earthAxis, angle, BABYLON.Space.WORLD);
        moon.rotate(earthAxis, angle, BABYLON.Space.WORLD);
      })

      return scene;
  };
  /******* End of the create scene function ******/

  var scene = createScene(); //Call the createScene function

  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    scene.render();
  });

  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
    engine.resize();
  });