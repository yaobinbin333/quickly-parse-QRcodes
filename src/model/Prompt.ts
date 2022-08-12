// 错误提示信息
export class Prompt{
    promptContainer: HTMLInputElement;
    constructor(ele: HTMLInputElement) {
        this.promptContainer = ele;
    }
    err(message = '非常抱歉，解析失败，请您确认一下图片二维码是否清晰，或者图片是二维码吗') {
        this.promptContainer.classList.remove('success');
        this.promptContainer.value = message;
        this.promptContainer.classList.add('error');
    }
    success(message: string) {
        this.promptContainer.classList.remove('error');
        this.promptContainer.value = message;
        this.promptContainer.classList.add('success');
    }
    setPromptContainer(ele: HTMLInputElement) {
        this.promptContainer = ele;
    }
}
