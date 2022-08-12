import { autoCopy, autoPaste, autoJump } from "../constants";
import {toBoolean} from "../utils";
import {Configurer} from "../model/Configurer";
const configer = Configurer.getInstance();
var modal = new bootstrap.Modal(document.getElementById('modal'), {
  keyboard: true
})
modal.show();
modal.hide = () => {
  window.close();
}
document.getElementById('confirm').addEventListener('click', () => {
  modal.hide();
})
const setValAndAddEvent = (el: HTMLInputElement, key: string) => {
  el.checked = toBoolean(configer.getValue(key));
  el.addEventListener('change', (e) => {
    const ischecked = (<HTMLInputElement>e.target).checked
    console.log('autoPasteEl', ischecked);
    configer.save(key, ischecked);
  })
}
const addTips = (el: HTMLElement, tips: string) => {
  new bootstrap.Tooltip(el, {
    title: tips
  })
}
const autoPasteEl = document.getElementById('autoPasteEl') as HTMLInputElement;
const autoCopyEl = document.getElementById('autoCopyEl') as HTMLInputElement;
const autoJumpEl = document.getElementById('autoJump') as HTMLInputElement;
setValAndAddEvent(autoPasteEl, autoPaste);
setValAndAddEvent(autoCopyEl, autoCopy);
setValAndAddEvent(autoJumpEl, autoJump);
addTips(document.getElementById('tip1'), '可实现复制二维码后，打开插件就能自动解析二维码内容，省去手动粘贴二维码过程');
addTips(document.getElementById('tip2'), '解析二维码后自动复制二维码内容到剪切板，不会复制多余内容，文本框多余内容是为了提示用户');
addTips(document.getElementById('tip3'), '解析二维码如果为链接，可以自动打开链接');
