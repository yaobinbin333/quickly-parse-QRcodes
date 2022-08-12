import { Prompt } from './Prompt';
// 解析二维码
export class Parser{
    img: HTMLImageElement;
    constructor(img: HTMLImageElement) {
        this.img = img;
    }

    async parse() {
        const browserAns = await this.parseWithBrowser();
        if (browserAns) {
           return browserAns;
        }
        return this.parseWithZxing();
    }

    async parseWithBrowser() {
        if (BarcodeDetector) {
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
    async parseWithZxing() {
        const codeReader = new ZXing.BrowserQRCodeReader();
        try {
            const res =  await codeReader.decodeFromImage(this.img);
            return res.text;
        } catch (error) {
            return null;
        }
    }
}
