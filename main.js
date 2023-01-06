import './css/style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { InteractionManager } from 'three.interactive';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(`#bg`)
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//object in the middle of the screen
const geometry = new THREE.SphereGeometry( 2, 32, 16 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00, wireframe: true} );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

//point light and ambient light
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)


const gridHelper = new THREE.GridHelper(200, 50)


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


// const skybox = new THREE.TextureLoader().load(`/img/bg1radial.png`)
// scene.background = skybox





//images
const firstTexture = new THREE.TextureLoader().load(`./img/autumn.jpg`)
const firstImg = new THREE.Mesh(
    // new THREE.BoxGeometry(3,2,0.01),
    new THREE.BoxGeometry(2,1.3,0.01),
    new THREE.MeshBasicMaterial({map: firstTexture})
)
firstImg.position.z = 2.6
scene.add(firstImg)


const secondTexture = new THREE.TextureLoader().load(`./img/autumn.jpg`)
const secondImg = new THREE.Mesh(
    new THREE.BoxGeometry(2,1.3,0.01),
    new THREE.MeshBasicMaterial({map: secondTexture})
)
secondImg.position.z = 1
secondImg.position.x = 2.3
secondImg.position.y = -0.4
secondImg.rotation.y += 20
scene.add(secondImg)


secondImg.cursor = 'pointer'



//orbit controls
const controls = new OrbitControls(camera, renderer.domElement)

//settings of controls
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = false
controls.autoRotateSpeed = -0.5
controls.rotateSpeed = 0.3
controls.minDistance = 5.6
// controls.maxDistance = 12




let top = 0
let screenHeight = screen.height


//moving vamera on scroll
function moveCamera(){

    let scrollTop = document.documentElement.scrollTop + window.innerHeight
    top = document.body.getBoundingClientRect().top


    //execute camera movement until the certain poitn on the page
    if (scrollTop <= screenHeight * 2){
        //camera goes far away on scroll
        camera.position.y = top * -0.02
        camera.position.x = top * -0.01
    }
    

    if (top > -200){
        controls.enabled = true
        controls.autoRotateSpeed = -0.7
        scene.remove(gridHelper)
    }
    if (top <= -200) {
        // controls.enabled = false
        controls.autoRotateSpeed = 0.2
        scene.add(gridHelper)
    }
    if (top > -20){
        scene.remove(gridHelper)
    }
    if (top <= -20) {
        scene.add(gridHelper)
    }

}

document.body.onscroll = moveCamera

camera.position.z = 5.6;



const imagesArray = [firstImg, secondImg]

//allows to easily interact with the objects
const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
);

interactionManager.add(firstImg)
interactionManager.add(secondImg)

imagesArray.forEach(image => image.addEventListener("mouseover", ()=>{
    document.body.style.cursor = 'pointer';
}))
imagesArray.forEach(image => image.addEventListener("mouseout", ()=>{
    document.body.style.cursor = 'default';
}))

firstImg.addEventListener('click', (e)=>{
    console.log("click")
})










function animate() {
    requestAnimationFrame( animate );

    sphere.rotation.x += 0.0009;
    sphere.rotation.y += -0.0009;


    controls.update()
    interactionManager.update();
    renderer.render( scene, camera );
};

animate();
