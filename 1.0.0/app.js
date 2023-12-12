export const canvasWidth = 1240 * 2;
export const canvasHeight = 260 * 2;
export const profileSize = 400;
export const profilePadding = 60;
import init from './init.js'; 
import ImageInput from './ImageInput.js';
export let elements = {};
import * as Alert from './comp/Alert.js';
import * as ErrorMsg from './errorMsg.js';
import onfontList from './fontList.js';
export let selectPage;
export function setSelectPage(page) {
    selectPage = page
}


const imageInput = new ImageInput();
/**
 * 
 * @callback imageInputCallback
 * @param {string} data
 * @param {string} fileName
 */

/**
 * 
 * @param {imageInputCallback} callback
 */
export function selectImage(callback) {
    imageInput.selectImage(callback)
}




export let fontList = []

if (navigator.userAgent.match(/Windows/i)) {
    fontList = onfontList.winfont;
}
if (navigator.userAgent.match(/Mac|iPhone|iPad|iPod/i)) {
    fontList = onfontList.macosfont
}


let isLocalFontsApiEnabled = (
    window.queryLocalFonts !== undefined ||
    navigator.fonts?.query !== undefined
);

if (isLocalFontsApiEnabled === true) {
    try {
        if (window.queryLocalFonts) {
            localFonts = await window.queryLocalFonts();
            let fonts = [];
            for (let i = 0; i < localFonts.length; i++) {
                fonts.push(localFonts[i].fullName);
            }
            fontList = fonts;
        }
        else if (navigator.fonts?.query) {
            localFonts = await navigator.fonts.query({
                persistentAccess: true,
            });
        }
    } catch (error) {
        Alert.print(
            ErrorMsg.set['fail-get-os-font-list'][ErrorMsg.num]
            + '\n'
            + error.message
        );
    }
}
else {
    Alert.print(
        ErrorMsg.set['fail-get-os-font-list'][ErrorMsg.num]
        + '\n'
        + ErrorMsg.set['dont-support'][ErrorMsg.num]
    );
}




const initResult = init();
elements = initResult.elements;

document.body.appendChild(initResult.dom);
ErrorMsg.setNum(ErrorMsg.emun.en);


window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = '';
    }

    // For Safari
    return '';
};

