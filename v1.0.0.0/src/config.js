
let href = location.href;//截取URL地址区分是否带项目路径
console.log(href)
let cutTag ='/api';

export function setBaseUrl(state) {
    let apiUrl = href;
    if (process.env.NODE_ENV == 'production') {
        let localHref = href.substring(0, href.indexOf(cutTag));
        apiUrl = process.env.baseUrl == '' ? localHref : process.env.baseUrl;//判断是否分离部署
        console.log(apiUrl)
    }else{
        let localHref = href.substring(0, href.indexOf(cutTag));
        apiUrl = process.env.baseUrl == '' ? localHref : process.env.baseUrl;//判断是否分离部署
        console.log(apiUrl)
    }

    return apiUrl;
};