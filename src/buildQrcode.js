import QRCode from './qrcode.js';
const QrcodeButton = document.getElementById('buildQrcode');
const urlConiner = document.getElementById('urlConiner');
const buildQrcode = (container, data) => {
    container.innerHTML = '';
    new QRCode(container, {
        text: data,
        width: 260,
        height: 260,
    });
}
QrcodeButton.addEventListener('click', () => {
    const container = document.getElementById('qrcodeWrap');
    buildQrcode(container, urlConiner.value);
})
export const getCurPageQrcode = () => {
    const container = document.getElementById('qrcodeWrap');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log('tabs: ', tabs);
        if (Array.isArray(tabs) && tabs.length > 0) {
            urlConiner.value = tabs[0].url;
            container && buildQrcode(container, tabs[0].url);
        } else {
            container.innerHTML = '请打开一个页面';
        }
    })
}
