import {Builder} from "../model/Builder";
const QrcodeButton = document.getElementById('buildQrcode');
const urlConiner = document.getElementById('urlConiner') as HTMLInputElement;

const builder = new Builder(document.getElementById('qrcodeWrap'));

QrcodeButton.addEventListener('click', () => {
    builder.buildQrcode(urlConiner.value);
})
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
