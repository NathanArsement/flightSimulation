// AFRAME.registerComponent('terrain-rotation', {
//     schema: {
//         speed: { type: "number", default: 0 },
//         speedOfRotation: { type: "number", default: 0 }
//     },

//     init: function () {
//         window.addEventListener("keydown", (e) => {
//             if (e.key === "ArrowRight") {
//                 if (this.data.speedOfRotation < 0.3) {
//                     this.data.speedOfRotation += 0.01
//                 }
//             }
//             if (e.key === "ArrowLeft") {
//                 if (this.data.speedOfRotation > -0.3) {
//                     this.data.speedOfRotation -= 0.01
//                 }
//             }
//         })
//     },

//     tick: function () {
//         var rotation = this.el.getAttribute("rotation");
//         rotation.y += this.data.speedOfRotation;
//         this.el.setAttribute("rotation", { x: rotation.x, y: rotation.y, z: rotation.z });

//         window.addEventListener("keydown", (e) => {
//             //control the attributes with the Arrow Keys
//             if (e.key === "1") {
//                 this.data.speed = 1
//             }
//             if (e.key === "2") {
//                 this.data.speed = 2
//             }
//             if (e.key === "3") {
//                 this.data.speed = 3
//             }
//             if (e.key === "4") {
//                 this.data.speed = 4
//             }
//             if (e.key === "5") {
//                 this.data.speed = 5
//             }
//             if (e.key === "0") {
//                 this.data.speed = 0
//             }

//         });
//         var pos = this.el.getAttribute("position")

//         pos.x -= this.data.speed

//         this.el.setAttribute("position", pos);
//     }
// });

AFRAME.registerComponent('bird', {
    schema: {
    },

    init: function () {
        for (i = 1; i <= 20; i++) {
            var id = `hurdle${i}`
            var posX = Math.floor(Math.random() * 3000 + -1000)
            var posY = Math.floor(Math.random() * 2 + -1)
            var posZ = Math.floor(Math.random() * 3000 + -1000)
            var pos = {
                x: posX,
                y: posY,
                z: posZ
            }
            this.flyingBirds(id, pos)
        }
    },
    flyingBirds: (id, pos) => {
        var terrainEL = document.querySelector("#base")
        var birdEL = document.createElement("a-entity")
        birdEL.setAttribute("id", id)
        birdEL.setAttribute("position", pos)
        birdEL.setAttribute("scale", { x: 500, y: 500, z: 500 })
        birdEL.setAttribute("gltf-model", "./assets/flying_bird/scene.gltf")
        birdEL.setAttribute("animation-mixer", {})
        birdEL.setAttribute("static-body", { shape: "sphere", sphereRadius: 15 })
        birdEL.setAttribute("gameplay", { elementID: `#${id}` })
        terrainEL.appendChild(birdEL)
    }
});
AFRAME.registerComponent('target', {
    schema: {
    },

    init: function () {
        for (i = 1; i <= 20; i++) {
            var id = `target${i}`
            var posX = Math.floor(Math.random() * 3000 + -1000)
            var posY = Math.floor(Math.random() * 2 - 1)
            var posZ = Math.floor(Math.random() * 3000 + -1000)
            var pos = {
                x: posX,
                y: posY,
                z: posZ
            }
            this.createRings(id, pos)
        }
    },
    createRings: (id, pos) => {
        var terrainEL = document.querySelector("#base")
        var ringEL = document.createElement("a-entity")
        ringEL.setAttribute("id", id)
        ringEL.setAttribute("position", pos)
        ringEL.setAttribute("rotation", { x: 0, y: 90, z: 0 })
        ringEL.setAttribute("material", { color: "yellow" })
        ringEL.setAttribute("geometry", { primitive: "torus", radius: 30 })
        ringEL.setAttribute("static-body", { shape: "sphere", sphereRadius: 29 })
        ringEL.setAttribute("gameplay", { elementID: `#${id}` })
        terrainEL.appendChild(ringEL)
    }
});

AFRAME.registerComponent('gameplay', {
    schema: {
        elementID: { type: "string", default: "#target" }
    },
    isColided: function (elementID) {
        const element = document.querySelector(elementID)
        element.addEventListener("collide", e => {
            if (elementID.includes("#target")) {
                this.updateScore()
                this.updateTarget()
                element.setAttribute("visible", false)
            }
            else {
                this.gameOver()

            }
        })
    },
    init: function () {
        var duration = 120
        var timerEL = document.querySelector("#timer")
        this.startTimer(duration, timerEL)
    },

    update: function () {
        this.isColided(this.data.elementID)
    },
    startTimer: function (duration, timerEL) {
        var minutes;
        var seconds
        setInterval(() => {
            if (duration > 0) {
                minutes = parseInt(duration / 60)
                seconds = parseInt(duration % 60)
                if (minutes < 10) {
                    minutes = "0" + minutes
                } if (seconds < 10) {
                    seconds = "0" + seconds
                }
                timerEL.setAttribute("text", {
                    value: minutes + ":" + seconds
                })
                duration -= 1
            } else {
                this.gameOver()
            }
        }, 1000)
    },
    gameOver: function () {
        var planeEL = document.querySelector("#plane_model");
        var element = document.querySelector("#game_over_text");
        element.setAttribute("visible", true);
        planeEL.setAttribute("dynamic-body", { mass: 1 });
    },
    updateTarget: function () {
        var element = document.querySelector("#targets")
        var count = element.getAttribute("text").value
        console.log(count)
        var currentTargets = parseInt(count)
        currentTargets -= 1
        element.setAttribute("text", { value: currentTargets })
    },
    updateScore: function () {
        var element = document.querySelector("#scoreDisplay")
        var count = element.getAttribute("text").value
        console.log(count)
        var currentScore = parseInt(count)
        currentScore += 50
        element.setAttribute("text", { value: currentScore })
    },
    remove: function () {
        // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
        // Do something on every scene tick or frame.
    }
});


AFRAME.registerComponent("foo", {
    init: function () {
        // grab the camera
        

        window.addEventListener("keydown", (e) => {
            // if (e.code === "ArrowUp") {
            //     var posS = this.el.getAttribute("position")

            //     posS.y += 5

            //     this.el.setAttribute("position", posS);
            // }
            // if (e.code === "ArrowDown") {
            //     var posZ = this.el.getAttribute("position")

            //     posZ.y -= 5

            //     this.el.setAttribute("position", posZ);
            // }
            if (e.key === "ArrowRight") {

                var rotX = this.el.getAttribute("rotation")

                rotX.y -= 1

                this.el.setAttribute("rotation", rotX);
            }
            if (e.key === "ArrowLeft") {

                var rotZ = this.el.getAttribute("rotation")

                rotZ.y += 1

                this.el.setAttribute("rotation", rotZ);
            }
        })
    },
    tick: function () {

        var direction = new THREE.Vector3();
        this.el.sceneEl.camera.getWorldDirection(direction);
        // multiply the direction by a "speed" factor
        direction.multiplyScalar(3)
        // get the current position
        var pos = this.el.getAttribute("position")

        pos.add(direction)

        this.el.setAttribute("position", pos);
    }
})


