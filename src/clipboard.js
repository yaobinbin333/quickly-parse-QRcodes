import { openOptionsPage, toBoolean } from "./utils";
import { autoCopy, autoJump, autoPaste, urlJudgeWord } from './constants';
import { pasteToEl, copyParseAns, jumpToUrl } from './settingInfo';
const input = document.getElementById('content');
input.focus();
const isAutoPaste = toBoolean(localStorage.getItem(autoPaste));

if (isAutoPaste) {
    pasteToEl(input);
}
//获取图片信息
const getQrData = (file) => {
    return new Promise((resolve, reject) => {
        const imgFile = new FileReader();
        try {
            imgFile.onload = function (e) {
                const image = new Image();
                image.src = e.target.result; //base64数据 
                image.onload = () => {
                    console.log('image: ', image);
                    resolve(image);
                }
            }
            imgFile.readAsDataURL(file);
        } catch (e) {
            console.log("该数据不是图片" + e);
            reject(null);
        }
    })

}
const writeToClipboard = (val) => {
    const isAutoCopy = toBoolean(localStorage.getItem(autoCopy));
    const isAutoJump = toBoolean(localStorage.getItem(autoJump));
    if (isAutoCopy) {
        copyParseAns(input, val);
    }
    if(isAutoJump) {
        jumpToUrl(val);
    }
    input.value = `二维码内容为：${val}${isAutoCopy ? ',已自动复制到剪贴板' : ''}`;
}
const showErr = (err) => {
    console.log('err: ', err);
    input.value = '解析失败，请确认图片是否是二维码';
}
async function loadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}
function localParse(imgData, fitHandle, errHandle) {
    loadImage(imgData).then(img => {
        const codeReader = new ZXing.BrowserQRCodeReader();
        codeReader.decodeFromImage(img).then(result => {
            fitHandle(result.text);
        }).catch(err => {
            errHandle(err);
        })
    })
}
const parseQrcode = (data, fitHandle, errHandle) => {
    const imgFile = new FileReader();
    imgFile.onload = (e) => {
        localParse(e.target.result, fitHandle, errHandle);
    }
    imgFile.readAsDataURL(data);
}

input.addEventListener('paste', (event) => {
    const items = event.clipboardData && event.clipboardData.items;
    let file = null;
    if (items && items.length) {
        // 检索剪切板items
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                file = items[i].getAsFile();
                console.log('file: ', file);
                input.value = '正在解析中, 请稍等...';
                parseQrcode(file, writeToClipboard, showErr);
            }
        }
    }
    // input.value = '请粘贴图片或者文字';
});
const setting = document.getElementById('settings');
setting.addEventListener('click', openOptionsPage);