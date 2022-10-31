import { Prompt } from './Prompt';
import { Decoder } from '@nuintun/qrcode';

// 解析二维码
export class Parser{
    img: HTMLImageElement;
    // 函数执行超时时间
    overTime = 2000;
    constructor(img: HTMLImageElement) {
        this.img = img;
    }

    async parse() {
        const browserAns = await this.parseWithBrowser();
        if (browserAns) {
           return browserAns;
        }
        return this.parseWithNiuTuan();
    }

    async parseWithBrowser() {
        if (typeof BarcodeDetector === 'object') {
            try {
                const supportedFormats = await BarcodeDetector.getSupportedFormats();
                if (supportedFormats.includes("qr_code")) {
                    console.log('supportedFormats: ', supportedFormats);
                    let barcodeDetector = new BarcodeDetector();
                    const result = await barcodeDetector.detect(this.img);
                    for (let res of result) {
                        if (res.rawValue) {
                            console.log('cur', res.rawValue)
                            return res.rawValue;
                        }
                    }
                }
            } catch (error) {
                return null;
            }
        }
        return null;
    }
    async parseWithNiuTuan() {
        try {
            const qrcode = new Decoder();
            const res = await qrcode.scan(this.img.src);
            console.log('32',res.data);
            return res.data;
        } catch (error) {
            console.error('niutuan',error);
            return null;
        }
    }
    overTimeHandle(func): Promise<any> {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject('timeout');
            }, this.overTime);
            func().then(res => {
                clearTimeout(timer);
                resolve(res);
            }).catch(err => {
                clearTimeout(timer);
                reject(err);
            })
        })
    }
}
