/**
 *  ThreeJS test file using the ThreeRender class
 */

//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function()
		{ 
			// Level 0 includes
			ModulesLoader.requireModules(["threejs/three.min.js"]) ;
			ModulesLoader.requireModules([ "myJS/ThreeRenderingEnv.js", 
			                              "myJS/ThreeLightingEnv.js", 
			                              "myJS/ThreeLoadingEnv.js", 
			                              "myJS/navZ.js"]) ;
			// Loads modules contained in includes and starts main function
			ModulesLoader.loadModules(start) ;
		}
) ;

function start(){
	//	----------------------------------------------------------------------------
	//	MAR 2014 - nav test
	//	author(s) : Cozot, R. and Lamarche, F.
	//	date : 11/16/2014
	//	last : 11/25/2014
	//	---------------------------------------------------------------------------- 			
	//	global vars
	//	----------------------------------------------------------------------------
	//	keyPressed
	var currentlyPressedKeys = {};
	
	var startDate = -1;
	
	// car Position
	var CARx = -220; 
	var CARy = 0 ; 
	var CARz = 0 ;
	var CARtheta = 0 ; 
	// car speed
	var dt = 0.05; 
	var dx = 1.0;

	//	rendering env
	var RC =  new ThreeRenderingEnv();

	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',RC,5000);

	//	Loading env
	var Loader = new ThreeLoadingEnv();
	
	var cameraType = 0; // we can have three mode : 0, 1, 2
	var fixedCameras = new Array(6);
	fixedCameras[0] = defineCamera(-280, 100, 70);
	fixedCameras[1] = defineCamera(50, 250, 140);
	fixedCameras[2] = defineCamera(240, 100, 100);
	fixedCameras[3] = defineCamera(100, -250, 80);
	fixedCameras[4] = defineCamera(60, -50, 130);
	fixedCameras[5] = defineCamera(-150, -260, 90);
		
	//	Meshes
	Loader.loadMesh('assets','border_Zup_02','obj',	RC.scene,'border',	-340,-340,0,'front');
	Loader.loadMesh('assets','ground_Zup_03','obj',	RC.scene,'ground',	-340,-340,0,'front');
	Loader.loadMesh('assets','circuit_Zup_02','obj',RC.scene,'circuit',	-340,-340,0,'front');
	//Loader.loadMesh('assets','tree_Zup_02','obj',	RC.scene,'trees',	-340,-340,0,'double');
	Loader.loadMesh('assets','arrivee_Zup_01','obj',	RC.scene,'decors',	-340,-340,0,'front');
		
	//	Car
	// car Translation
	var car0 = new THREE.Object3D(); 
	car0.name = 'car0'; 
	RC.addToScene(car0); 
	// initial POS
	car0.position.x = CARx;
	car0.position.y = CARy;
	car0.position.z = CARz;
	// car Rotation floor slope follow
	var car1 = new THREE.Object3D(); 
	car1.name = 'car1';
	car0.add(car1);
	// car vertical rotation
	var car2 = new THREE.Object3D(); 
	car2.name = 'car2';
	car1.add(car2);
	car2.rotation.z = CARtheta ;
	// the car itself 
	// simple method to load an object
	var car3 = Loader.load({filename: 'assets/car_Zup_01.obj', node: car2, name: 'car3'}) ;
	car3.position.z= +0.25 ;
	// attach the scene camera to car
	car3.add(RC.camera) ;
	RC.camera.position.x = 0.0 ;
	RC.camera.position.z = 10.0 ;
	RC.camera.position.y = -25.0 ;
	RC.camera.rotation.x = 85.0*3.14159/180.0 ;
		
//	Skybox
	Loader.loadSkyBox('assets/maps',['px','nx','py','ny','pz','nz'],'jpg', RC.scene, 'sky',4000);

//	Planes Set for Navigation 
// 	z up 
	var NAV = new navPlaneSet(
					new navPlane('p01',	-260, -180,	 -80, 120,	+0,+0,'px')); 		// 01	
	NAV.addPlane(	new navPlane('p02', -260, -180,	 120, 200,	+0,+20,'py')); 		// 02		
	NAV.addPlane(	new navPlane('p03', -260, -240,	 200, 240,	+20,+20,'px')); 	// 03		
	NAV.addPlane(	new navPlane('p04', -240, -160,  200, 260,	+20,+20,'px')); 	// 04		
	NAV.addPlane(	new navPlane('p05', -160,  -80,  200, 260,	+20,+40,'px')); 	// 05		
	NAV.addPlane(	new navPlane('p06',  -80, -20,   200, 260,	+40,+60,'px')); 	// 06		
	NAV.addPlane(	new navPlane('p07',  -20,  +40,  140, 260,	+60,+60,'px')); 	// 07		
	NAV.addPlane(	new navPlane('p08',    0,  +80,  100, 140,	+60,+60,'px')); 	// 08		
	NAV.addPlane(	new navPlane('p09',   20, +100,   60, 100,	+60,+60,'px')); 	// 09		
	NAV.addPlane(	new navPlane('p10',   40, +100,   40,  60,	+60,+60,'px')); 	// 10		
	NAV.addPlane(	new navPlane('p11',  100,  180,   40, 100,	+40,+60,'nx')); 	// 11		
	NAV.addPlane(	new navPlane('p12',  180,  240,   40,  80,	+40,+40,'px')); 	// 12		
	NAV.addPlane(	new navPlane('p13',  180,  240,    0,  40,	+20,+40,'py')); 	// 13 		
	NAV.addPlane(	new navPlane('p14',  200,  260,  -80,   0,	+0,+20,'py')); 		// 14		
	NAV.addPlane(	new navPlane('p15',  180,  240, -160, -80,	+0,+40,'ny')); 		// 15		
	NAV.addPlane(	new navPlane('p16',  160,  220, -220,-160,	+40,+40,'px')); 	// 16	
	NAV.addPlane(	new navPlane('p17',   80,  160, -240,-180,	+40,+40,'px')); 	// 17	
	NAV.addPlane(	new navPlane('p18',   20,   80, -220,-180,	+40,+40,'px')); 	// 18	
	NAV.addPlane(	new navPlane('p19',   20,   80, -180,-140,	+40,+60,'py')); 	// 19	
	NAV.addPlane(	new navPlane('p20',   20,   80, -140,-100,	+60,+80,'py')); 	// 20	
	NAV.addPlane(	new navPlane('p21',   20,   60, -100, -40,	+80,+80,'px')); 	// 21		
	NAV.addPlane(	new navPlane('p22',  -80,   20, -100, -40,	+80,+80,'px')); 	// 22		
	NAV.addPlane(	new navPlane('p23', -140,  -80, -100, -40,	+80,+80,'px')); 	// 23		
	NAV.addPlane(	new navPlane('p24', -140,  -80, -140,-100,	+60,+80,'py')); 	// 24		
	NAV.addPlane(	new navPlane('p25', -140,  -80, -200,-140,	+40,+60,'py')); 	// 25		
	NAV.addPlane(	new navPlane('p26', -100,  -80, -240,-200,	+40,+40,'px')); 	// 26		
	NAV.addPlane(	new navPlane('p27', -220, -100, -260,-200,	+40,+40,'px')); 	// 27	
	NAV.addPlane(	new navPlane('p28', -240, -220, -240,-200,	+40,+40,'px')); 	// 28	
	NAV.addPlane(	new navPlane('p29', -240, -180, -200,-140,	+20,+40,'ny')); 	// 29	
	NAV.addPlane(	new navPlane('p30', -240, -180, -140, -80,	+0,+20,'ny')); 		// 30			
	NAV.setPos(CARx,CARy,CARz); NAV.initActive();
	// DEBUG
	//NAV.debug();
	//var navMesh = NAV.toMesh();
	//RC.addToScene(navMesh);
	//	event listener
	//	---------------------------------------------------------------------------
	//	resize window
	window.addEventListener( 'resize', onWindowResize, false );
	//	keyboard callbacks 
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;					

	//	callback functions
	//	---------------------------------------------------------------------------
	function handleKeyDown(event) { currentlyPressedKeys[event.keyCode] = true;}
	function handleKeyUp(event) {
		if (currentlyPressedKeys[80]) { // (P) key
			cameraType = (cameraType+1)%3;
		}
		currentlyPressedKeys[event.keyCode] = false;
	}

	function handleKeys() {
		if (currentlyPressedKeys[67]) {
			// (C) debug
			// debug scene
			RC.scene.traverse(function(o){
				console.log('object:'+o.name+'>'+o.id+'::'+o.type);
			});
		}				
		if (currentlyPressedKeys[68]) {
			// (D) Right
			CARtheta -= dt ;
		}
		if (currentlyPressedKeys[81]) {
			// (Q) Left 
			CARtheta += dt;
		}
		if (currentlyPressedKeys[90]) {
			// (Z) Up
			var tx = -dx*Math.sin(CARtheta);
			var ty = +dx*Math.cos(CARtheta);
			//NAV.move(tx,ty,150,10);
			NAV.move(tx,ty,2,2);
			CARx = NAV.x; CARy = NAV.y; CARz = NAV.z ;
		}
		if (currentlyPressedKeys[83]) {
			// (S) Down 
			var tx =+dx*Math.sin(CARtheta);
			var ty = -dx*Math.cos(CARtheta);
			//NAV.move(tx,ty,150,10);
			NAV.move(tx,ty,2,2);
			CARx = NAV.x; CARy = NAV.y; CARz = NAV.z ;
		}
	}

	//	window resize
	function  onWindowResize() {RC.onWindowResize(window.innerWidth,window.innerHeight);}

	function render() { 
		requestAnimationFrame( render );
		handleKeys();
		// DEBUG
		//console.log('x:'+NAV.x+' - y:'+NAV.y + ' - (plane:'+NAV.active+')');
		car0.position.x = CARx ;
		car0.position.y = CARy;
		car0.position.z = CARz;
		//	floor slope follow
		car1.matrixAutoUpdate = false;		
		car1.matrix.copy(NAV.localMatrix(CARx,CARy));
		// car rotation
		car2.rotation.z = CARtheta ;
		// camera rotation
		//RC.camera.rotation.z = CARtheta ;
		RC.renderer.render(RC.scene, RC.camera); 
		var navPlane = NAV.findActive(NAV.x,NAV.y);
		if(cameraType == 0 ){
			RC.camera.position.x = 0.0 ;
			RC.camera.position.z = 10.0 ;
			RC.camera.position.y = -25.0 ;
			RC.camera.rotation.x = 85.0*3.14159/180.0 ;
			RC.renderer.render(RC.scene,RC.camera);	
		}
		else if (cameraType == 1){
			if(navPlane==0 || navPlane==1 || navPlane==2 || navPlane==3 ||navPlane==29 || navPlane==28){
				renderCamera(fixedCameras[0], car0.position);
			}
			else if(navPlane==4 || navPlane==5 || navPlane==6 || navPlane ==7){
				renderCamera(fixedCameras[1], car0.position);
			}
			else if (navPlane == 8 || navPlane==9 || navPlane == 10 || navPlane==11 || navPlane == 12|| navPlane == 13 || navPlane==14){
				renderCamera(fixedCameras[2], car0.position);
			}
			else if(navPlane==15 ||navPlane == 16|| navPlane==17 || navPlane == 18 || navPlane==19){
				renderCamera(fixedCameras[3], car0.position);
			}
			else if(navPlane == 20|| navPlane == 21|| navPlane==22 || navPlane==23){
				renderCamera(fixedCameras[4], car0.position);
			}
			else {
				renderCamera(fixedCameras[5], car0.position);
			}
		}
		else if (cameraType == 2) {
			var cammobile = defineCamera(NAV.x, NAV.y, NAV.z + 70);
			cammobile.rotation.x = 0;
			RC.renderer.render(RC.scene,cammobile);
		}
		refreshValueTime();
		refreshStart();
	};
	
	function renderCamera(camera, position) {
		camera.up = new THREE.Vector3(0,0,1);
		camera.lookAt (position); 
		RC.renderer.render(RC.scene,camera);
	};
	
	function defineCamera(x, y, z) {
		var cam =new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.01, 5000 ); 
		cam.position.x = x;
		cam.position.y = y;
		cam.position.z = z;
		return cam;
	};
	
	var refreshValueTime = function() {
		var time = 0;
		var now = new Date();
		var diff = 0;
		if (startDate != -1) {
			diff = now -startDate;
		}
		var millisecond = diff % 1000;
		var second = (Math.floor(diff / 1000) % 60);
		var min =  Math.floor(diff / 60000);
		var output = ((min < 10) ? "0" : "") + min;
		output += ":" + ((second < 10) ? "0" : "") + second;
		output += "." + ((millisecond < 100) ? "0" + ((millisecond < 10) ? "0" : "") : "") + millisecond;
		timePanel.innerHTML = output;
	};
	
	function refreshStart() {
		if (car0.position.y > 50) {
			if (startDate == -1) {
				startDate = new Date();
			}
		}
	}
	
	var timePanel = document.createElement('span');
	timePanel.style.position = 'absolute';
	timePanel.style.width = 100;
	timePanel.style.height = 20;
	timePanel.style.top = '2px';
	timePanel.style.left = '2px';
	timePanel.style.padding = "8px";
	timePanel.style.backgroundColor = "#555588";
	timePanel.style.color = "#ffaaaa";
	timePanel.style.fontSize = "20px";
	document.body.appendChild(timePanel);
	refreshValueTime();
	
	render(); 
	refreshStart();
}
