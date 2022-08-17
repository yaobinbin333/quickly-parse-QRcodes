import {Builder} from "../model/Builder";
import {convertBase64ToBlob, debounce} from "../utils";
const copyQrcodeButton = document.getElementById('copyQrcode');
const urlConiner = document.getElementById('urlConiner') as HTMLInputElement;

const builder = new Builder(document.getElementById('qrcodeWrap'));
function handleCopyImg(img: HTMLImageElement) {
    const selection = window.getSelection();
    // 清除选中
    if (selection.rangeCount > 0) selection.removeAllRanges();
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/queryCommandSupported
    if(!document.queryCommandSupported('copy')) return alert('浏览器暂不支持复制命令');
    // 创建range区域
    const range = document.createRange();
    range.selectNode(img);
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
}
copyQrcodeButton.addEventListener('click', () => {
    let qrcode = document.querySelector('#qrcodeWrap img') as HTMLImageElement;
    const blobImage = convertBase64ToBlob(qrcode.src)
    const clipboard = new ClipboardItem({
        "image/png": blobImage
    })
    if(navigator.clipboard) {
        navigator.clipboard.write([clipboard]);
    }else {
        urlConiner.value = '您的浏览器版本不支持复制图片功能，请升级浏览器版本～';
    }
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
