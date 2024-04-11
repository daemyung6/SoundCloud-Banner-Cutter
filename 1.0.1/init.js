import * as app from './app.js';
import LayerPage from './page/LayerPage.js';
import ExportPage from './page/ExportPage.js';
import AboutPage from './page/AboutPage.js';


/**
 * 전체적인 dom을 초기화 합니다.
 * @returns {{elements: {mainCanvas: Canvas, headerItems: {text: String, onclick: Function}[], mainPage: HTMLElement}, dom: HTMLElement, pages: {layerPage: LayerPage, exportPage: ExportPage, AboutPage: AboutPage}}}
    
 }}
 */
function init() {
    let elements = {};

    let rootDom = document.createElement('div');
    rootDom.classList.add('root');

    rootDom.appendChild((() => {
        let div = document.createElement('div');
        div.classList.add('mainCanvasBox');
        div.appendChild((() => {
            let canvas = document.createElement('canvas');
            canvas.classList.add('mainCanvas')
            canvas.width = app.canvasWidth;
            canvas.height = app.canvasHeight;
            elements.mainCanvas = canvas;
            return canvas
        })())

        div.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('profile');
            div.classList.add('showBorder');
            
            elements.profile = div;

            return div
        })())

        div.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('info');
            
            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('name');
                let innerText;
                div.appendChild((() => {
                    let div = document.createElement('div');
                    div.innerText = 'user name'
                    div.classList.add('text');

                    innerText = div;
        
                    return div
                })())
                div.appendChild((() => {
                    let input = document.createElement('input');
                    input.value = 'user name'

                    input.addEventListener('change', () => {
                        innerText.innerText = input.value;
                    })
                    input.addEventListener('input', (e) => {
                        innerText.innerText = e.target.value
                    })
        
                    return input
                })())
    
                return div
            })())

            div.appendChild((() => {
                return document.createElement('br')
            })())


            div.appendChild((() => {
                let div = document.createElement('div');
                div.classList.add('country');
                let innerText;
                div.appendChild((() => {
                    let div = document.createElement('div');
                    div.innerText = 'User Country'
                    div.classList.add('text');

                    innerText = div;
        
                    return div
                })())
                div.appendChild((() => {
                    let input = document.createElement('input');
                    input.value = 'User Country'

                    input.addEventListener('change', () => {
                        innerText.innerText = input.value;
                    })
                    input.addEventListener('input', (e) => {
                        innerText.innerText = e.target.value
                    })
        
                    return input
                })())
    
                return div
            })())

            return div
        })())

        return div;
    })())

    

    elements.headerItems = [];


    let layerPage = new LayerPage(
        elements.mainCanvas.getContext('2d'),
        onProfileSet
    );

    /**
     * 
     * @param {boolean} bool 
     */
    function onProfileSet(bool) {
        if(bool) {
            elements.profile.classList.add('showBorder')
        }
        else {
            elements.profile.classList.remove('showBorder')
        }
    }

    let exportPage = new ExportPage(elements.mainCanvas);
    let aboutPage = new AboutPage();

    let headerItems = [
        {
            text: 'Layers',
            onclick: () => {
                changePage(layerPage, 0)
            }
        },
        {
            text: 'Export',
            onclick: () => {
                exportPage.update()
                changePage(exportPage, 1)
            }
        },
        {
            text: 'About',
            onclick: () => {
                changePage(aboutPage, 2)
            }
        },
    ]
    rootDom.appendChild((() => {
        let div = document.createElement('div');
        div.classList.add('header');
        elements.header = div;
        
        for (let i = 0; i < headerItems.length; i++) {
            div.appendChild((() => {
                let span = document.createElement('span');
                span.classList.add('header-item');
                const id = i;
                span.innerText = headerItems[id].text;
                span.onclick = headerItems[id].onclick;

                elements.headerItems.push(span);

                return span;
            })())
        }
        return div;
    })())

    let lastMainPage = layerPage;
    let lastSelectHeaderItem = elements.headerItems[0];
    /**
     * 
     * @param {LayerPage | ExportPage | AboutPage} page 
     * @param {number} idx 
     */
    function changePage(page, idx) {
        try {
            rootDom.removeChild(lastMainPage.dom);
        } catch (error) { }

        lastMainPage = page
        rootDom.appendChild(lastMainPage.dom);
        lastSelectHeaderItem.classList.remove('select');
        lastSelectHeaderItem = elements.headerItems[idx];
        lastSelectHeaderItem.classList.add('select');

        app.setSelectPage(page)
    }


    elements.headerItems[0].classList.add('select');

    changePage(layerPage, 0)

    return {
        elements : elements,
        dom: rootDom
    };
}

export default init;