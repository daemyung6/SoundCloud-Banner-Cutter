import Layer from "./Layer.js";
import ValueButton from "./ValueButton.js";
import * as app from '../app.js';
import ColorValue from "./ColorValue.js";
import * as ErrorMsg from "../errorMsg.js";

const initCubeWidth = 500;
const resetCurveDotDistance = 50;


class ControlDot {

    /**
     * 
     * @param {Dot} dot 
     */
    constructor(dot) {
        /**
         * @type {Dot}
         */
        this.dot = dot;
        
        /**
         * @type {HTMLElement}
         */
        this.dom = document.createElement('div')
        this.dom.classList.add('ControlDot')
        this.dom.appendChild((() => {
            let div = document.createElement('div')
            div.classList.add('dot')

            return div;
        })())

        this.update();
    }

    update() {
        this.dom.style.top = this.dot.x + 'px'
        this.dom.style.left = this.dot.y + 'px'
    }
}

class Dot {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
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
     * @param {ShapeLayer} parant 
     * @param {Dot} dot1 
     * @param {Dot} dot2 
     */
    constructor(parant, dot1, dot2) {
        /**
         * @type {ShapeLayer}
         */
        this.parant = parant;
        
        /**
         * @property {Dot}
         */
        this.dot1 = dot1

        /**
         * @property {Dot}
         */
        this.dot2 = dot2

        /**
         * @property {Dot}
         */
        this.curveDot1 = new Dot(0, 0)
    
        /**
         * @property {Dot}
         */
        this.curveDot2 = new Dot(0, 0)
        
        this.resetCurveDots()

        /**
         * @type {'linear' | 'bezier'}
         */
        this.type = 'linear'

        this.dom = document.createElement('div')
        this.dom.classList.add('line-item')

        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('input-item');
            div.classList.add('font-select');

            div.appendChild((() => {
                let div = document.createElement('div');
                div.innerText = `type : `
                div.classList.add('label');
                return div;
            })())
            div.appendChild((() => {

                let select = document.createElement('select');

                let list = ['linear', 'bezier']

                for (let i = 0; i < list.length; i++) {
                    select.appendChild((() => {
                        let option = document.createElement('option');
                        option.innerText = list[i];
                        option.value = list[i];

                        return option;
                    })())
                }

                select.addEventListener('change', () => {
                    this.setType(select.value)
                })
                
                return select;
            })())

            return div
        })())


        let x1 = new ValueButton('x1', 'px');
        let controx1 = new ControlDot(this.dot1)
        this.dom.appendChild(x1.dom);
        x1.addEvent('*', () => {
            this.dot1.x = x1.value;
            controx1.update();
        })
        x1.setValue(this.dot1.x)

        let y2 = new ValueButton('y1', 'px');
        this.dom.appendChild(y2.dom);
        y2.addEvent('*', () => {
            this.dot1.y = y2.value;
        })
        y2.setValue(this.dot1.y)

        let curveDot1 = new ValueButton('curve', 'px');
        curveDot1.dom.classList.add('curveDot')
        this.dom.appendChild(curveDot1.dom);
        curveDot1.addEvent('*', () => {
            this.curveDot1.x = curveDot1.value;
        })
        curveDot1.setValue(this.dot1.x)

        let curveDot2 = new ValueButton('curve', 'px');
        curveDot2.dom.classList.add('curveDot')
        this.dom.appendChild(curveDot2.dom);
        curveDot2.addEvent('*', () => {
            this.curveDot2.x = curveDot2.value;
        })
        curveDot2.setValue(this.curveDot2.x)

        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('input-item');
            div.classList.add('delete');

            this.dom.appendChild(div)
            

            div.appendChild((() => {
                let img = document.createElement('img');
                img.src = './asset/img/bin.png';
                return img;
            })())

            div.addEventListener('click', () => {
                if(confirm(ErrorMsg.set['line-delete-msg'][ErrorMsg.num])) {
                    this.parant.deleteLine(this);
                }
            })

            return div;
        })())


        this.controlDom = document.createElement('div')
        this.controlDom.classList.add('controlDom')



        this.setType(this.type)
    }
    
    resetCurveDots() {
        let radian1 = Math.atan2(
            (this.dot2.y - this.dot1.y), 
            (this.dot2.x - this.dot1.x)
        )

        this.curveDot1.x = Math.cos(radian1) * resetCurveDotDistance + this.dot1.x
        this.curveDot1.y = Math.sin(radian1) * resetCurveDotDistance + this.dot1.y


        let radian2 = Math.atan2(
            (this.dot1.y - this.dot2.y), 
            (this.dot1.x - this.dot2.x)
        )

        this.curveDot2.x = Math.cos(radian2) * resetCurveDotDistance + this.dot2.x
        this.curveDot2.y = Math.sin(radian2) * resetCurveDotDistance + this.dot2.y
    }

    /**
     * @param {'linear' | 'bezier'} type 
     */
    setType(type) {
        this.type = type;
        this.dom.classList.remove('linear')
        this.dom.classList.remove('bezier')

        this.dom.classList.add(type)
    }
}





export default class ShapeLayer extends Layer {
    constructor() {
        super();

        this.color = '#ffffff'

        this.dom.classList.add('shape-layer');
        

        let color = new ColorValue('color');
        this.elements.line.appendChild(color.dom);
        color.addEvent('*', () => {
            this.color = color.value;
            this.onClick('update');
        })

        let linesBox = document.createElement('div');
        this.linesBox = linesBox;
        linesBox.classList.add('linesBox');
        this.elements.line.appendChild(linesBox);


        /**
         * @type {Array< Line >}
         */
        this.lines = [];

        let mainCanvasCenter = {
            x: app.canvasWidth / 2,
            y: app.canvasHeight / 2,
        }


        this.lines.push(new Line(
            this,
            new Dot(mainCanvasCenter.x - initCubeWidth / 2, mainCanvasCenter.y + initCubeWidth / 2), 
            new Dot(mainCanvasCenter.x + initCubeWidth / 2, mainCanvasCenter.y + initCubeWidth / 2)
        ))
        this.lines.push(new Line(
            this,
            this.lines[this.lines.length - 1].dot2,
            new Dot(mainCanvasCenter.x + initCubeWidth / 2, mainCanvasCenter.y - initCubeWidth / 2)
        ))
        this.lines.push(new Line(
            this,
            this.lines[this.lines.length - 1].dot2,
            new Dot(mainCanvasCenter.x - initCubeWidth / 2, mainCanvasCenter.y - initCubeWidth / 2)
        ))
        this.lines.push(new Line(
            this,
            this.lines[this.lines.length - 1].dot2,
            this.lines[0].dot1,
        ))

        this.updateDotListDom()

        this.valueTypeSetter = {

        }
    }

    /**
     * 
     * @param {Line} line 
     */
    deleteLine(line) {
        this.lines.splice(
            this.lines.indexOf(line),
            1
        )
        this.updateDotListDom()
    }
    

    updateDotListDom() {
        this.linesBox.innerHTML = null

        for (let i = 0; i < this.lines.length; i++) {
            this.linesBox.appendChild(this.lines[i].dom)
        }
    }
    
    addLine() {

    }

    /**
     * 
     * @param {Line} line 
     * @param {'LinearLine' | 'BezierLine'} type 
     */
    changeType(line, type) {
        if(
            (line.name === 'LinearLine') &&
            (type === 'BezierLine')
        ) {
            
        }
    }

    /**
     * 
     * @param {'x' | 'y' | 'text'} type 
     * @param {Number | String} value 
     */
    setValue(type, value) {
        if(typeof this.valueTypeSetter[type] !== 'function') { return }
        this.valueTypeSetter[type](value);
        this.onClick('update');
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} g 
     */
    draw(g) {

    }
}

