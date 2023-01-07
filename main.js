import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js'
import { InteractionManager } from 'https://cdn.skypack.dev/three.interactive';

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, false)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(`#bg`)
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//object in the middle of the screen
const geometry = new THREE.SphereGeometry( 2, 30, 16 );
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


const group = new THREE.Group()
const distanceFromCentre = 2.3

// const imageGeometry = new THREE.BoxGeometry(2,1.3,0.01)
const imageGeometry = new THREE.BoxGeometry(1.4,1,0.01)

/////////////images/////////////
//1
const texture0 = new THREE.TextureLoader().load(`./img/autumn.jpg`)
const img0 = new THREE.Mesh(
    imageGeometry,
    new THREE.MeshBasicMaterial({map: texture0})
)
img0.position.z += distanceFromCentre
img0.lookAt(group.position)

//2
const texture1 = new THREE.TextureLoader().load(`./img/autumn.jpg`)
const img1 = new THREE.Mesh(
    imageGeometry,
    new THREE.MeshBasicMaterial({map: texture1})
)
img1.position.z -= distanceFromCentre
img1.lookAt(group.position)

//3
const texture2 = new THREE.TextureLoader().load(`./img/autumn.jpg`)
const img2 = new THREE.Mesh(
    imageGeometry,
    new THREE.MeshBasicMaterial({map: texture2})
)
img2.position.x += distanceFromCentre
img2.lookAt(group.position)

//4
const texture3 = new THREE.TextureLoader().load(`./img/autumn.jpg`)
const img3 = new THREE.Mesh(
    imageGeometry,
    new THREE.MeshBasicMaterial({map: texture3})
)
img3.position.x -= distanceFromCentre
img3.lookAt(group.position)




scene.add(group)
group.rotation.z += 0.1
// group.rotation.x += 1.1



const imagesArray = [img0, img1, img2, img3]

imagesArray.forEach(image => {
    scene.add(image)
    group.add(image)
})

//orbit controls
const controls = new OrbitControls(camera, renderer.domElement)

//settings of controls
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = false
controls.enableDamping = true
controls.autoRotateSpeed = -0.5
controls.rotateSpeed = 0.3
controls.minDistance = 5.6
// controls.maxDistance = 12




let top = 0
let screenHeight = screen.height


//moving vamera on scroll
function moveCamera(){

    top = document.body.getBoundingClientRect().top

    // let scrollTop = document.documentElement.scrollTop + window.innerHeight
    // execute camera movement until the 100vh point
    // if (scrollTop <= screenHeight * 2){ }


    //camera goes away on scroll
    camera.position.y = top * -0.02
    camera.position.x = top * -0.01
    

    if (top > -200){
        controls.enabled = true
        controls.autoRotateSpeed = -0.7
        scene.remove(gridHelper)
        controls.autoRotate = false
    }
    if (top <= -200) {
        controls.enabled = false
        controls.autoRotateSpeed = 0.2
        controls.autoRotate = true
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





//allows to easily interact with the objects
const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
);

imagesArray.forEach(image => interactionManager.add(image))

imagesArray.forEach(image => image.addEventListener("mouseover", ()=>{
    document.body.style.cursor = 'pointer';
}))
imagesArray.forEach(image => image.addEventListener("mouseout", ()=>{
    document.body.style.cursor = 'default';
}))

img0.addEventListener('click', (e)=>{
    // scrollToPoint(1.07)
    //do something
})







if(window.innerWidth <= 500){
    camera.position.z = 7;
} else if(window.innerWidth > 500){
    camera.position.z = 5.6;
}


let floatingValue = 0
let increasingDecreasing = true

function animate() {
    requestAnimationFrame( animate );

    sphere.rotation.x += 0.0009;
    sphere.rotation.y += -0.0009;

    // setInterval(floatingImages, 30);


    controls.update()
    interactionManager.update();
    renderer.render( scene, camera );
};

animate();














const pageHeight = window.innerHeight

function scrollToPoint(multiplier){

    window.scrollTo({
        top: pageHeight * multiplier,
        behavior: "smooth"
    })
}


function floatingImages(){
    if(increasingDecreasing){
        floatingValue += 0.00001
    } else {
        floatingValue -= 0.00001
    }

    if(floatingValue >= 0.1){
        increasingDecreasing = false
    } 
    if(floatingValue <= -0.1){
        increasingDecreasing = true
    } 

    img0.position.z = floatingValue + distanceFromCentre
}