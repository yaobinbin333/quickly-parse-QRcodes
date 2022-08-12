// @ts-ignore
import QRCode from '../qrcode'
// 构造二维码
export class Builder {
    container: HTMLElement;
    constructor(ele: HTMLElement) {
        this.container = ele;
    }
    buildQrcode(content: string) {
        this.container.innerHTML = '';
        try {
            // @ts-ignore
            new QRCode(this.container, {
                text: content,
                width: 260,
                height: 260,
            });
        }catch (err) {
            console.log('err: ', err);
            this.container.innerHTML = '生成二维码失败，请查看内容是否正确';
        }
    }
}
