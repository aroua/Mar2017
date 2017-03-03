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

function start()
{
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

//	global translation
//	due to the sky box, the world must be cente
	var XX = -340 ;
	var ZZ =  340 ;

//	rendering env
	var RC =  new ThreeRenderingEnv();

//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',RC,5000);

//	Loading env
	var Loader = new ThreeLoadingEnv();

//	Meshes
	Loader.loadMesh('assets','border02','obj',	RC.scene,'border',	XX-120,0,ZZ,'front');
	Loader.loadMesh('assets','ground02','obj',	RC.scene,'ground',	XX-120,0,ZZ,'front');
	Loader.loadMesh('assets','circuit02','obj',	RC.scene,'circuit',	XX-120,0,ZZ,'front');
//	Loader.loadMesh('assets','tree02','obj',	RC.scene,'trees',	XX-120,0,ZZ,'double');
	Loader.loadMesh('assets','arrivee','obj',	RC.scene,'decors',	XX-120,0,ZZ,'front');
		
//	Car
	//Loader.loadMesh('assets','car01','obj',	RC.scene,'car',	-340,0,0,'front');
	// Simple method to load an object
	var car = Loader.load({filename: 'assets/car01.obj', node: RC.scene, name: 'car', transX:-340}) ;
	
//	Skybox
	Loader.loadSkyBox('assets/maps',['px','nx','py','ny','pz','nz'],'jpg', RC.scene, 'sky',4000);

//	Planes Set for Navigation 
	var NAV = new navPlaneSet(
			new navPlane('p01',XX-40,XX+40,-120,+80,+0,+0,'px')); 		// 01	
	NAV.addPlane(	new navPlane('p02',XX-40,XX+40,-200,-120,+0,+20,'ny')); 	// 02				
	NAV.addPlane(	new navPlane('p03',XX-40,XX-20,-240,-200,+20,+20,'px')); 	// 03				
	NAV.addPlane(	new navPlane('p04',XX-20,XX+60,-260,-200,+20,+20,'px')); 	// 04				
	NAV.addPlane(	new navPlane('p05',XX+60,XX+140,-260,-200,+20,+40,'px')); 	// 05				
	NAV.addPlane(	new navPlane('p06',XX+140,XX+200,-260,-200,+40,+60,'px')); 	// 06				
	NAV.addPlane(	new navPlane('p07',XX+200,XX+260,-260,-140,+60,+60,'px')); 	// 07				
	NAV.addPlane(	new navPlane('p08',XX+220,XX+300,-140,-100,+60,+60,'px')); 	// 08				
	NAV.addPlane(	new navPlane('p09',XX+240,XX+320,-100,-60,+60,+60,'px')); 	// 09				
	NAV.addPlane(	new navPlane('p10',XX+260,XX+320,-60,-40,+60,+60,'px')); 	// 10				
	NAV.addPlane(	new navPlane('p11',XX+320,XX+400,-80,-40,+40,+60,'nx')); 	// 11				
	NAV.addPlane(	new navPlane('p12',XX+400,XX+460,-80,-40,+40,+40,'px')); 	// 12				
	NAV.addPlane(	new navPlane('p13',XX+400,XX+460,-40,+0,+20,+40,'ny')); 	// 13 				
	NAV.addPlane(	new navPlane('p14',XX+420,XX+480,+0,+80,+0,+20,'ny')); 		// 14				
	NAV.addPlane(	new navPlane('p15',XX+400,XX+460,+80,+160,+0,+40,'py')); 	// 15				
	NAV.addPlane(	new navPlane('p16',XX+380,XX+440,+160,+220,+40,+40,'px')); 	// 16				
	NAV.addPlane(	new navPlane('p17',XX+300,XX+380,+180,+240,+40,+40,'px')); 	// 17				
	NAV.addPlane(	new navPlane('p18',XX+240,XX+300,+180,+220,+40,+40,'px')); 	// 18				
	NAV.addPlane(	new navPlane('p19',XX+240,XX+300,+140,+180,+40,+60,'ny')); 	// 19		
	NAV.addPlane(	new navPlane('p20',XX+240,XX+300,+100,+140,+60,+80,'ny')); 	// 20			
	NAV.addPlane(	new navPlane('p21',XX+240,XX+280,+40,+100,+80,+80,'px')); 	// 21			
	NAV.addPlane(	new navPlane('p22',XX+140,XX+240,+40,+100,+80,+80,'px')); 	// 22			
	NAV.addPlane(	new navPlane('p23',XX+80,XX+140,+40,+100,+80,+80,'px')); 	// 23			
	NAV.addPlane(	new navPlane('p24',XX+80,XX+140,+100,+140,+60,+80,'ny')); 	// 24			
	NAV.addPlane(	new navPlane('p25',XX+80,XX+140,+140,+200,+40,+60,'ny')); 	// 25		
	NAV.addPlane(	new navPlane('p26',XX+120,XX+140,+200,+240,+40,+40,'px')); 	// 26			
	NAV.addPlane(	new navPlane('p27',XX+0,XX+120,+200,+260,+40,+40,'px')); 	// 27			
	NAV.addPlane(	new navPlane('p28',XX-20,XX+0,+200,+240,+40,+40,'px')); 	// 28			
	NAV.addPlane(	new navPlane('p29',XX-20,XX+40,+140,+200,+20,+40,'py')); 	// 29			
	NAV.addPlane(	new navPlane('p30',XX-20,XX+40,+80,+140,+0,+20,'py')); 		// 30			

//	SP
	var SPx = XX+0; var SPy = 0; var SPz = 0 ;var SPt = 0 ; var dt = 0.05; var SPdx = 1.0;
	var SP = new THREE.Mesh(
			new THREE.SphereGeometry( 2, 8, 8 ),
			new THREE.MeshPhongMaterial( { color: 0x808080, specular: 0xFFFFFF, shininess: 5 } )
	); 
	RC.addToScene( SP ); 


//	event listener
//	---------------------------------------------------------------------------
//	resize window
	window.addEventListener( 'resize', onWindowResize, false );
//	keyboard callbacks 
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;					

	console.log('-----------------');

//	callback functions
//	---------------------------------------------------------------------------
	function handleKeyDown(event) { currentlyPressedKeys[event.keyCode] = true;}
	function handleKeyUp(event) {currentlyPressedKeys[event.keyCode] = false;}

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
			SPt -= dt ;
		}
		if (currentlyPressedKeys[81]) {
			// (Q) Left 
			SPt += dt;
		}
		if (currentlyPressedKeys[90]) {
			// (Z) Up
			var tz = -SPdx*Math.cos(SPt);
			var tx = -SPdx*Math.sin(SPt);
			NAV.move(tx,tz,150,10);
			//NAV.move(tx,tz,10,10);
			SPx = NAV.x; SPy = NAV.y; SPz = NAV.z ;
		}
		if (currentlyPressedKeys[83]) {
			// (S) Down 
			var tz = +SPdx*Math.cos(SPt);
			var tx = +SPdx*Math.sin(SPt);
			NAV.move(tx,tz,150,10);
			//NAV.move(tx,tz,10,10);
			SPx = NAV.x; SPy = NAV.y; SPz = NAV.z ;
		}
	}

//	window resize
	function  onWindowResize() {
		console.log('-- callback:resize: window size ->'+window.innerWidth+'x'+window.innerHeight+'p');
		RC.onWindowResize(window.innerWidth,window.innerHeight);
	}

	function render() { 
		requestAnimationFrame( render );
		handleKeys();
		SP.position.x = SPx ;
		SP.position.y = SPz ;
		SP.position.z = SPy ;
		RC.camera.position.x = SPx ;
		RC.camera.position.y = SPz + 5.0 ;
		RC.camera.position.z = SPy + 10 ;
		RC.camera.rotation.y = SPt ;
		RC.renderer.render(RC.scene, RC.camera); 
	};

	render(); 
}
