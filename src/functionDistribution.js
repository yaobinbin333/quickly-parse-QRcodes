import { BuildPage, ParsePage } from './constants';
import {getCurPageQrcode} from './controller/buildQrcode';
const functionGroup = document.getElementById('funcGroup');
const functionIdMap = ['parseQrcodeWrap', 'buildQrcodeWrap'];

functionGroup.addEventListener('click', (event) => {
    console.log('event: ', event);
    // get index of clicked button
    const clickFunc = event.target.getAttribute('index');
    render(clickFunc);
})
export const render = (clickFunc) => {
    const AllFunc = Array.from(document.getElementsByClassName('func'));
    AllFunc.forEach((item, index) => {
        if (index == clickFunc) {
            item.classList.add('active');
            functionIdMap.forEach((item, index) => {
                const funcInterface = document.getElementById(functionIdMap[index]);
                if (index == clickFunc) {
                    funcInterface.style.display = 'block';
                    if(index === BuildPage) {
                        getCurPageQrcode();
                    }
                    if(index === ParsePage) {
                        document.getElementById('content').focus();
                    }
                }else {
                    funcInterface.style.display = 'none';
                }
            })
        } else {
            item.classList.remove('active');
        }
    })
}
