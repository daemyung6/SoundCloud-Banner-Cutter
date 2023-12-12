export default class AboutPage {
    constructor() {
        const page = document.getElementById('aboutPage');
        this.dom = page

        try {
            document.body.removeChild(page)
        } catch (error) {
            
        }
        
    }
}
