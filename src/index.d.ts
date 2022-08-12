declare var BarcodeDetector: any;
declare var ZXing: {
    BrowserQRCodeReader: new () => any
};
declare var QRCode: any;
declare var bootstrap: any;
declare var chrome: any;
type Config = {
    type: string,
    defaultValue: boolean,
    postHandle: Function
}
