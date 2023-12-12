import * as app from "../app.js"

export default class ExportPage {
    /**
     * 
     * @param {HTMLCanvasElement} mainCanvas 
     */
    constructor(mainCanvas) {
        console.log(mainCanvas)
        this.mainCanvas = mainCanvas;
        this.dom = document.createElement('div');
        this.dom.classList.add('mainPage');
        this.dom.classList.add('exportPage');

        this.dom.appendChild((() => {
            let div = document.createElement('h2');
            div.innerText = 'background';
            return div;
        })())

        this.background = document.createElement('canvas')
        this.background.width = app.canvasWidth
        this.background.height = app.canvasHeight
        this.dom.appendChild(this.background)
        this.backgroundCtx = this.background.getContext('2d')

        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('fileDownload')
            div.innerText = 'Download File';
            div.addEventListener('click', () => {
                this.download(this.background, 'background.png')
            })
            return div;
        })())

        this.dom.appendChild((() => {
            let div = document.createElement('h2');
            div.innerText = 'profile';
            return div;
        })())
        
        this.profile = document.createElement('canvas')
        this.profile.width = app.profileSize
        this.profile.height = app.profileSize
        this.profile.classList.add('profile')
        this.dom.appendChild(this.profile)
        this.profileCtx = this.profile.getContext('2d')

        this.dom.appendChild((() => {
            let div = document.createElement('div');
            div.classList.add('fileDownload')
            div.innerText = 'Download File';
            div.addEventListener('click', () => {
                this.download(this.profile, 'profile.png')
            })
            return div;
        })())
    }

    update() {
        this.backgroundCtx.drawImage(
            this.mainCanvas,
            0,
            0
        )

        this.profileCtx.drawImage(
            this.mainCanvas,
            app.profilePadding,
            app.profilePadding,
            app.profileSize,
            app.profileSize,
            0,
            0,
            app.profileSize,
            app.profileSize,
        )
    }

    download(canvas, name) {
        const saveATag = document.createElement('a');
        saveATag.download = name;
        saveATag.href = canvas.toDataURL('image/png')
        saveATag.click();
    }
}
