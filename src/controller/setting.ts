import { Configurer } from "../model/Configurer";
import { autoCopy, autoJump, autoPaste } from '../constants';
// @ts-ignore
import validUrl from 'valid-url';

export class SettingController {
  configurer: Configurer;
  defaultConfigs: Config[] = [
    {
      type: autoPaste,
      defaultValue: true,
      postHandle: (el: HTMLInputElement) => {
        setTimeout(() => {
          el.select();
          document.execCommand('paste');
        })
      }
    },
    {
      type: autoCopy,
      defaultValue: true,
      postHandle: (el: HTMLInputElement, ans: string) => {
        el.value = ans;
        el.select();
        document.execCommand('copy');
      }
    },
    {
      type: autoJump,
      defaultValue: false,
      postHandle: (url: string) => {
        console.log('url: ', url);
        if (validUrl.isUri(url)) {
          window.open(url);
        }
      }
    }
  ]

  constructor() {
    this.configurer = Configurer.getInstance(this.defaultConfigs);
  }
  main() {

  }
  pasteToEl(el: HTMLInputElement) {
    setTimeout(() => {
      el.select();
      document.execCommand('paste');
    })
  }
  copyParseAns = (el: HTMLInputElement, ans: string) => {
    el.value = ans;
    el.select();
    document.execCommand('copy');
  }
  jumpToUrl = (url: string) => {
    console.log('url: ', url);
    if (validUrl.isUri(url)) {
      window.open(url);
    }
  }
}
