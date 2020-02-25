var planets = [];
var loader = new THREE.TextureLoader();

function crPlanet(texPath, size, x)
{
    //создание геометрии сферы
    var geometry = new THREE.SphereGeometry( size, 32, 32 );
    //загрузка текстуры
    var tex = loader.load(texPath);
    tex.minFilter = THREE.NearestFilter;
    //создание материала
    var material = new THREE.MeshBasicMaterial({
    map: tex,
    side: THREE.DoubleSide
    });
    //создание объекта
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(x, 0, 0);
    //размещение объекта в сцене
    scene.add( sphere );

    var planet = {}; //создание
    planet.planet = sphere; //добавление поля planet
    planets.push(planet); 
}

function init() 
{
    container = document.getElementById( 'container' ); 
    scene = new THREE.Scene(); 
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 ); 
    camera.position.set(5, 100, 5); 
    camera.lookAt(new THREE.Vector3( 0,  0.0, 0)); 
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight ); 
    renderer.setClearColor( 0x000000ff, 1);
    container.appendChild( renderer.domElement ); 
    window.addEventListener( 'resize', onWindowResize, false );

    crPlanet( "pics/sunmap.jpg", 10, 0);
    crPlanet( "pics/sunmap.jpg", 10, 30);
}

function onWindowResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); 
    renderer.setSize( window.innerWidth, window.innerHeight ); 
}

function animate()
{
    requestAnimationFrame( animate ); 
    render();
}

function render() 
{
    renderer.render( scene, camera ); 
}

init(); 
animate(); 