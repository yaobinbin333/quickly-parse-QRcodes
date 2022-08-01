// const openPopupHtml = () => {
//     chrome.action.openPopupHtml();
// }
// 右键菜单管理
// todo: 右键菜单增加菜单项：解析选中二维码
// chrome.contextMenus.create({
// 	title : "测试右键",
//     contexts: ["all"],
//     id: 'qrcode_test',
//     visible: true
// }, () => {
//     console.log('create contextMenus success'); // 创建成功
// });
chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log('info: ', info);
    console.log('tab: ', tab);
    if(info.menuItemId === 'qrcode_test') {
        chrome.tabs.create({
            url: chrome.runtime.getURL('popup.html'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true
            });
        });
    }
})