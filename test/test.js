
class Dot {
    constructor(x, y) {
        /**
         * @type {number}
         */
        this.x = x
        /**
         * @type {number}
         */
        this.y = y
    }
}

class Line {
    /**
     * 
     * @param {Dot} dot1 
     * @param {Dot} dot2 
     */
    constructor(dot1, dot2) {
        /**
         * @property {Dot}
         */
        this.dot1 = dot1

        /**
         * @property {Dot}
         */
        this.dot2 = dot2
    }
}

class LinearLine extends Line {
    /**
     * 
     * @param {Dot} dot1 
     * @param {Dot} dot2 
     */
    constructor(dot1, dot2) {
        super(dot1, dot2)
        
    }
}

const resetCurveDotDistance = 10;
class BezierLine extends Line {
    /**
     * 
     * @param {Dot} dot1 
     * @param {Dot} dot2 
     * @param {Dot} curveDot1 
     * @param {Dot} curveDot2 
     */
    constructor(dot1, dot2, curveDot1, curveDot2) {
        super(dot1, dot2)
        /**
         * @property {Dot}
         */
        this.curveDot1 = curveDot1

        /**
         * @property {Dot}
         */
        this.curveDot2 = curveDot2
    }

    resetCurveDot() {
        let radian1 = Math.atan2(
            (this.dot2.y - this.dot1.y), 
            (this.dot2.x - this.dot1.x)
        )

        console.log('radian', radian1)

        this.curveDot1.x = Math.cos(radian1) * resetCurveDotDistance + this.dot1.x
        this.curveDot1.y = Math.sin(radian1) * resetCurveDotDistance + this.dot1.y


        let radian2 = Math.atan2(
            (this.dot1.y - this.dot2.y), 
            (this.dot1.x - this.dot2.x)
        )

        console.log('radian', radian2)
        
        this.curveDot2.x = Math.cos(radian2) * resetCurveDotDistance + this.dot2.x
        this.curveDot2.y = Math.sin(radian2) * resetCurveDotDistance + this.dot2.y
    }
}



const test = new BezierLine(
    new Dot(0, 0),
    new Dot(100, 100),
    new Dot(0, 0),
    new Dot(0, 0),
)

test.resetCurveDot()

console.log(test)