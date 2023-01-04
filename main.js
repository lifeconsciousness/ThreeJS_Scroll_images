import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//object in the middle of the screen
const geometry = new THREE.SphereGeometry( 2, 32, 16 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00, wireframe: true} );
// const material = new THREE.MeshStandardMaterial( { map: firstImg});
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

//point light and ambient light
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)


const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper,gridHelper)

//randomly adds cubes all around the scene
function addCubes(){
    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff, wireframe: true} );
    const cube = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))

    cube.position.set(x,y,z)
    scene.add(cube)
}
// Array(200).fill().forEach(addCubes)


const firstTexture = new THREE.TextureLoader().load(`./img/autumn.jpg`)
const firstImg = new THREE.Mesh(
    new THREE.BoxGeometry(3,2,0.01),
    new THREE.MeshBasicMaterial({map: firstTexture})
)
firstImg.position.z = 2.6
scene.add(firstImg)


const secondTexture = new THREE.TextureLoader().load(`./img/autumn.jpg`)
const secondImg = new THREE.Mesh(
    new THREE.BoxGeometry(3,2,0.01),
    new THREE.MeshBasicMaterial({map: firstTexture})
)
secondImg.position.z = 1
secondImg.position.x = 2.3
secondImg.position.y = -0.4
secondImg.rotation.y += 20
scene.add(secondImg)







camera.position.z = 5.6;

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
    requestAnimationFrame( animate );

    sphere.rotation.x += 0.0005;
    sphere.rotation.y += 0.0005;


    controls.update()
    renderer.render( scene, camera );
};

animate();
