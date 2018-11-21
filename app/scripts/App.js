// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats

export default class App {

    constructor() {
        this.box = [];

        this.container = document.querySelector('#main');
        document.body.appendChild(this.container);

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2);
        this.camera.position.z = 1;

        this.scene = new THREE.Scene();

        for (let i = 0; i < 10; i++) {
            let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            let material = new THREE.MeshNormalMaterial();
            let mesh = new THREE.Mesh(geometry, material);

            this.box.push(mesh);
            this.scene.add(mesh);
        }

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();

        this.renderer.animate(this.render.bind(this));
    }

    render() {
        let time = Date.now() / 1000;
        this.box.forEach((mesh, index) => {
            mesh.rotation.x += 0.01 * (index * .4);
            mesh.rotation.y += 0.01 * (index * .4);

            mesh.scale.x += Math.cos(time * 4) * .3;
            mesh.scale.y += Math.sin(time * 4) * .3;

            mesh.position.x = Math.cos((time * 0.03) + (index * 30)) * .1;
            mesh.position.y = Math.sin((time * 0.03) + (index * 30)) * .1;

        })
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}