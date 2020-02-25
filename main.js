var camera;

var planets = [];
var loader = new THREE.TextureLoader();
var clock = new THREE.Clock();

function crPlanet(texPath, size, x, v1)
{
    //создание геометрии сферы
    var geometry = new THREE.SphereGeometry( size, 32, 32 );
    //загрузка текстуры
    var tex = loader.load(texPath);
    tex.minFilter = THREE.NearestFilter;
    //создание материала
    var material = new THREE.MeshPhongMaterial({
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
    planet.x = x;
    planet.v1 = v1;
    planet.a1 = 0.0;

    planets.push(planet); 
}

function crStars(texPath, size)
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
    sphere.position.set(0, 0, 0);
    //размещение объекта в сцене
    scene.add( sphere );

}

function init() 
{
    container = document.getElementById( 'container' ); 
    scene = new THREE.Scene(); 
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 ); 
    camera.position.set(0, 100, 0); 
    camera.lookAt(new THREE.Vector3( 0,  0.0, 0)); 
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight ); 
    renderer.setClearColor( 0x000000ff, 1);
    container.appendChild( renderer.domElement ); 
    window.addEventListener( 'resize', onWindowResize, false );

    var light = new THREE.PointLight( 0xffffff );
    light.position.set( 0, 0, 0 );
    scene.add( light );

    var light = new THREE.AmbientLight( 0x202020 ); // soft white light
    scene.add( light );

    crStars("pics/sunmap.jpg", 10);
    crStars("pics/starmap.jpg", 500);

    crPlanet( "pics/mercurymap.jpg", 2, 20, 2);
    crPlanet( "pics/venusmap.jpg", 3, 30, 1);
}

function onWindowResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); 
    renderer.setSize( window.innerWidth, window.innerHeight ); 
}

function animate()
{
    var delta = clock.getDelta(); 

    for (var i = 0; i < planets.length; i++) 
    {
        //создание набора матриц
        var m = new THREE.Matrix4();
        var m1 = new THREE.Matrix4();
        var m2 = new THREE.Matrix4();

        planets[i].a1 += planets[i].v1 * delta;

        //создание матрицы поворота (вокруг оси Y) в m1 и матрицы перемещения в m2
        m1.makeRotationY( planets[i].a1 );
        m2.setPosition(new THREE.Vector3(planets[i].x, 0, 0));

        //запись результата перемножения m1 и m2 в m
        m.multiplyMatrices( m1, m2 );
       
       
        m.multiplyMatrices( m, m1 );
        //установка m в качестве матрицы преобразований объекта object
        planets[i].planet.matrix = m;
        planets[i].planet.matrixAutoUpdate = false;
    }

    requestAnimationFrame( animate ); 
    render();
}

function render() 
{
    renderer.render( scene, camera ); 
}

init(); 
animate(); 