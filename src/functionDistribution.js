import {getCurPageQrcode, bindClickEvent} from './buildQrcode';
const functionGroup = document.getElementById('funcGroup');
const functionIdMap = ['parseQrcodeWrap', 'buildQrcodeWrap'];
functionGroup.addEventListener('click', (event) => {
    console.log('event: ', event);
    const AllFunc = Array.from(document.getElementsByClassName('func'));
    // get index of clicked button
    const clickFunc = event.target.getAttribute('index');
    AllFunc.forEach((item, index) => {
        if (index == clickFunc) {
            item.classList.add('active');
            functionIdMap.forEach((item, index) => {
            const funcInterface = document.getElementById(functionIdMap[index]);
                if (index == clickFunc) {
                    funcInterface.style.display = 'block';
                    if(index === 1) {
                        getCurPageQrcode();
                    }
                }else {
                    funcInterface.style.display = 'none';
                }
            })
        } else {
            item.classList.remove('active');
        }
    })
})