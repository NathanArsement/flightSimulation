AFRAME.registerComponent("plane-model", {
  schema: {
   modelRef: { type: "string", default: "./assets/airplane/scene.gltf" },
  
   
  },
  init: function () {
    this.el.setAttribute("gltf-model", this.data.modelRef);
    const position = { x: 0, y: 50, z: 0 };
    const rotation = { x: 0, y: 0, z: 0 };
    const scale = { x: 10, y: 10, z: 10 };
    this.el.setAttribute("position", position);
    this.el.setAttribute("rotation", rotation);
    this.el.setAttribute("scale", scale);
    this.el.setAttribute("dynamic-body", { shape: "sphere", sphereRadius: 20,mass:0})
    
  },

});


AFRAME.registerComponent("plain-rotation", {
  schema: {
    speedOfRotation: { type: "number", default: 0 },
    speedOfAscent: { type: "number", default: 0 },
    rotationOfAscent: { type: "number", default: 0 },
    rotationActual: { type: "number", default: 0 },
    speed: { type: "number", default: 0.005 },
    moveX: { type: "number", default: 0 },
    moveY: { type: "number", default: 0 },
    moveZ: { type: "number", default: 0 },
  },
  init: function () {
    window.addEventListener("keydown", (e) => {
      //control the attributes with the Arrow Keys
      if (e.key === "ArrowRight") {
        if (this.data.speedOfRotation < 30) {
          this.data.speedOfRotation += 1;
          //this.el.setAttribute("rotation", planeRotation);
        }
        // if (this.data.rotationActual < 5) {
        //   this.data.rotationActual += 1;
          //this.el.setAttribute("rotation", planeRotation);
        // }
      }
      if (e.key === "ArrowLeft") {
        if (this.data.speedOfRotation > -30) {
          this.data.speedOfRotation -=1;
          //this.el.setAttribute("rotation", planeRotation);
        }
        // if (this.data.rotationActual > -5) {
        //   this.data.rotationActual -= 1;
          //this.el.setAttribute("rotation", planeRotation);
        // }
      }
      if (e.key === "ArrowDown") {
        if (this.data.rotationOfAscent > -90) {
          this.data.rotationOfAscent -= 1;
          //this.el.setAttribute("rotation", planeRotation);
        }
        if (this.data.speedOfAscent < +10) {
          this.data.speedOfAscent += 0.05;
          //this.el.setAttribute("position", planePosition);
        }
      }
      if (e.key === "ArrowUp") {
        if (this.data.rotationOfAscent < 90) {
          this.data.rotationOfAscent += 1;
          //this.el.setAttribute("rotation", planeRotation);
        }
        if (this.data.speedOfAscent > -10) {
          this.data.speedOfAscent -= 0.05;
          
          //this.el.setAttribute("position", planePosition);
        }
        
      }
    });
  },
  tick:function(){
    
    var planeRotation=this.el.getAttribute("rotation")
    planeRotation.x=this.data.speedOfRotation
    planeRotation.z = this.data.rotationOfAscent
    this.el.setAttribute("rotation", planeRotation);
    var planePosition = this.el.getAttribute("position")
    planePosition.y -= this.data.speedOfAscent;
    this.el.setAttribute("position", planePosition);
  }
});