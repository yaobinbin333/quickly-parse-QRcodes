import QRCode from 'qrcode';
// 构造二维码
var canvas = document.getElementById('canvas');

export class Builder {
    container: HTMLCanvasElement;
    constructor(ele: HTMLCanvasElement) {
        this.container = ele;
        
    }
    buildQrcode(content: string) {
        this.container.innerHTML = '';
        QRCode.toCanvas(this.container, content, {
            width: 260,
            margin: 0.5,
        }).catch(error => {
            console.log('err: ', error);
            this.container.innerHTML = '生成二维码失败，请查看内容是否正确';
        })
    }
}
