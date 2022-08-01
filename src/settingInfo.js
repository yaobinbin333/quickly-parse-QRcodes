import {autoCopy, autoJump, autoPaste} from './constants';

const setDefault = (key, value) => {
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, value);
    }
}
setDefault(autoCopy, 'true');
setDefault(autoJump, 'false'); // todo：链接自动跳转
setDefault(autoPaste, 'false');
export const pasteToEl = (el) => {
    setTimeout(() => {
        el.select();
        document.execCommand('paste');
    })
}
export const copyParseAns = (el, ans) => {
    el.value = ans;
    el.select();
    document.execCommand('copy');
}