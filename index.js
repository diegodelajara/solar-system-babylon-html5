  var sizes = {
    sun: 100,
    mercurio: 0.488,
    venus: 1.2,
    tierra: 1.28,
    marte: 0.68,
    jupiter: 14.2,
    Saturno: 12,
    urano: 5.18,
    neptuno: 4.95,
    pluton: 0.23,
  }
  var canvas = document.querySelector("#renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);

  /******* Add the create scene function ******/
  var createScene = function () {

      const scene = new BABYLON.Scene(engine);

      // var camera = new BABYLON.ArcRotateCamera("Camera", -1.5, 1.5, -.4, new BABYLON.Vector3(0,0,80), scene);

      //---------------------------------- Universal Camera
      var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, 20), scene);
      camera.setTarget(BABYLON.Vector3.Zero());
      //---------------------------------- Universal Camera

      camera.attachControl(canvas, true);

      // Add lights to the scene
      new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
      new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);


      // Sun
      var sun = BABYLON.MeshBuilder.CreateSphere("sun", {diameter: sizes.sun}, scene);
      sun.position.x = 70;  
      var sunMaterial = new BABYLON.StandardMaterial("ground", scene);
      sunMaterial.diffuseTexture = new BABYLON.Texture("./images/sun.jpg", scene);
      sunMaterial.diffuseTexture.vScale = -1;
      sun.material = sunMaterial;

      // Mercury
      var mercury = BABYLON.MeshBuilder.CreateSphere("mercury", {diameter: sizes.mercurio}, scene);
      mercury.position.x = 3;  
      var mercuryMaterial = new BABYLON.StandardMaterial("ground", scene);
      mercuryMaterial.diffuseTexture = new BABYLON.Texture("./images/mercury.jpg", scene);
      mercuryMaterial.diffuseTexture.vScale = -1;
      mercury.material = mercuryMaterial;

      // Venus
      var venus = BABYLON.MeshBuilder.CreateSphere("venus", {diameter: sizes.venus}, scene);
      venus.position.x = 1.8;  
      var venusMaterial = new BABYLON.StandardMaterial("ground", scene);
      venusMaterial.diffuseTexture = new BABYLON.Texture("./images/venus.jpg", scene);
      venusMaterial.diffuseTexture.vScale = -1;
      venus.material = venusMaterial;

      // Earth
      var earth = BABYLON.MeshBuilder.CreateSphere("earth", {diameter: 1.2}, scene);
      var earthMaterial = new BABYLON.StandardMaterial("ground", scene);
      earthMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/earth.jpg", scene);
      earthMaterial.diffuseTexture.vScale = -1;
      earth.material = earthMaterial;

        // Moon
        var moon = BABYLON.MeshBuilder.CreateSphere("moon", {diameter: .4}, scene);
        moon.position.x = -1;
        moon.position.y = .2
        var moonMaterial = new BABYLON.StandardMaterial("ground", scene);
        moonMaterial.diffuseTexture = new BABYLON.Texture("https://st2.depositphotos.com/2800301/6522/i/950/depositphotos_65228533-stock-photo-moon-surface-texture.jpg", scene);
        moonMaterial.diffuseTexture.vScale = -1;
        moon.material = moonMaterial;
        moon.parent = earth

      // Mars
      var mars = BABYLON.MeshBuilder.CreateSphere("mars", {diameter: sizes.marte}, scene);
      mars.position.x = -1.8;
      var marsMaterial = new BABYLON.StandardMaterial("ground", scene);
      marsMaterial.diffuseTexture = new BABYLON.Texture("./images/mars.jpg", scene);
      marsMaterial.diffuseTexture.vScale = -1;
      mars.material = marsMaterial;

      // Jupiter
      var jupiter = BABYLON.MeshBuilder.CreateSphere("jupiter", {diameter: sizes.jupiter}, scene);
      jupiter.position.x = -13.4;
      var jupiterMaterial = new BABYLON.StandardMaterial("ground", scene);
      jupiterMaterial.diffuseTexture = new BABYLON.Texture("./images/jupiter.jpg", scene);
      jupiterMaterial.diffuseTexture.vScale = -1;
      jupiter.material = jupiterMaterial;




      // Rotation
      var earthAxis = new BABYLON.Vector3(Math.sin(23 * Math.PI/180), Math.cos(23 * Math.PI/180), 0);
    
      var angle = 0.01;
      scene.registerBeforeRender(function() {
        mercury.rotate(earthAxis, angle, BABYLON.Space.WORLD);
        venus.rotate(earthAxis, angle, BABYLON.Space.WORLD);
        earth.rotate(earthAxis, angle, BABYLON.Space.WORLD);
        moon.rotate(earthAxis, angle, BABYLON.Space.WORLD);
        mars.rotate(earthAxis, angle, BABYLON.Space.WORLD);
        jupiter.rotate(earthAxis, angle, BABYLON.Space.WORLD);
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