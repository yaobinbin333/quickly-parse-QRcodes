import { autoCopy, autoJump, autoPaste } from '../constants';
import {Parser} from "../model/Parser";
import {Configurer} from "../model/Configurer";
import {Prompt} from "../model/Prompt";
import {SettingController} from "./setting";
import {openOptionsPage} from "../utils";
class Parse extends Prompt{
  container: HTMLInputElement;
  parser: Parser;
  config: Configurer;
  constructor(container: HTMLInputElement) {
    super(container);
    this.container = container;
    this.container.focus();
    new SettingController();
    this.addPasteEvent();
    this.config = Configurer.getInstance();

    this.config.emit(autoPaste, this.container);

  }
  openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
    window.close();
  }
  async loadImage(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }
  addPasteEvent = () => {
    this.container.addEventListener('paste', (event) => {
      const items = event.clipboardData && event.clipboardData.items;
      let file = null;
      if (items && items.length) {
        // 检索剪切板items
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile();
            console.log('file: ', file);
            this.container.value = '正在解析中, 请稍等...';
            this.parseQrcode(file);
          }
        }
      }
      // input.value = '请粘贴图片或者文字';
    });
  }
  parseQrcode(fileData: File) {
    const imgFile = new FileReader();
    imgFile.onload = async (e) => {
      const image = await this.loadImage(e.target.result as string);
      this.parser = new Parser(image);
      const res = await this.parser.parse();
      try {
        if(res) {
          this.config.emit(autoCopy, this.container, res);
          this.config.emit(autoJump, res);
          this.container.value = `二维码内容为：${res}${this.config.getValue(autoPaste) ? ',已自动复制到剪贴板' : ''}`;
        }else {
          this.err();
        }
      }catch (err) {
        console.log('err', err);
        this.err();
      }

    }
    imgFile.readAsDataURL(fileData);
  }
}

new Parse(document.getElementById('content') as HTMLInputElement);
const setting = document.getElementById('settings');
setting.addEventListener('click', openOptionsPage);
