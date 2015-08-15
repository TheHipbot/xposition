(function ($) {
  var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,

    mouseX = 0, mouseY = 0,

    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,

    SEPARATION = 200,
    AMOUNTX = 10,
    AMOUNTY = 10,

    camera, scene, renderer, controls, cylinder ;

  init();
  animate();

  function init() {

    var container, separation = 100, amountX = 50, amountY = 50,
      particles, particle;


    camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    controls = new THREE.TrackballControls( camera );
    controls.target.set( 0, 0, 0 );

    // particles

    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial({

      color: 0xffffff,
      program: function (context) {

        context.beginPath();
        context.arc(0, 0, 0.5, 0, PI2, true);
        context.fill();

      }

    });

    $.ajax('/init/default/starmap.json')
      .success(function (data) {
        var map = data.map,
            len = map.length,
            i;

        for (i = 0; i <  len; i++) {
          particle = new THREE.Sprite(material);
          particle.position.x = map[i].x;
          particle.position.y = map[i].y;
          particle.position.z = map[i].z;
          particle.position.normalize();
          particle.position.multiplyScalar(450);
          particle.scale.multiplyScalar(2);
          scene.add(particle);
        }
      });

    cylinder = new THREE.Mesh(new THREE.CylinderGeometry(100, 0, 460, 50, 50, false),  new THREE.MeshBasicMaterial( { color: 0xccaa00, transparent: true, blending: THREE.AdditiveBlending, wireframe: false } ));
    scene.add(cylinder);

    cylinder.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 460/2, 0 ) );

    window.addEventListener('resize', onWindowResize, false);

  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  function animate() {

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

  }
})(jQuery);