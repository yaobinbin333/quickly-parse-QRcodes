import {Builder} from "../model/Builder";
import {convertBase64ToBlob, debounce} from "../utils";
const copyQrcodeButton = document.getElementById('copyQrcode');
const urlConiner = document.getElementById('urlConiner') as HTMLInputElement;

const builder = new Builder(document.getElementById('qrcode') as HTMLCanvasElement);

const changeCanvasToimg = (canvas: HTMLCanvasElement) => {
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    return img;
}
copyQrcodeButton.addEventListener('click', () => {
    let qrcode = changeCanvasToimg(document.querySelector('#qrcodeWrap #qrcode'));
    const blobImage = convertBase64ToBlob(qrcode.src)
    const clipboard = new ClipboardItem({
        "image/png": blobImage
    })
    if(navigator.clipboard) {
        navigator.clipboard.write([clipboard]);
        copyQrcodeButton.innerHTML = '已复制';
    }else {
        copyQrcodeButton.innerHTML = '复制失败，请手动复制';
    }
})
copyQrcodeButton.addEventListener('blur', () => {
    copyQrcodeButton.innerHTML = '复制二维码';
})
const inputBuild = debounce(() => {
    builder.buildQrcode(urlConiner.value)
}, 300)
urlConiner.addEventListener('input', inputBuild)
export const getCurPageQrcode = () => {
    const container = document.getElementById('qrcodeWrap');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: any) {
        console.log('tabs: ', tabs);
        if (Array.isArray(tabs) && tabs.length > 0) {
            urlConiner.value = tabs[0].url;
            container && builder.buildQrcode(tabs[0].url)
        } else {
            container.innerHTML = '请打开一个页面';
        }
    })
}
