const baseURL={
    app:{
        dev:'https://gw-dev.yiyahui.com',
        // dev:'http://appserver.yiyahui.com',
        // production:'http://appserver.yiyahui.com'
        production:'https://appserver.yiyahui.com'
    },
    h5:{
        dev:'https://appweb-dev.yiyahui.com',
        // dev:'http://192.168.1.10:3000',
        production:'http://appweb.yiyahui.com'
    }
}
export const ENV='dev'
export default module = {
    baseURL:baseURL.app[ENV],
    webBaseUrl:baseURL.h5[ENV],
    // webBaseUrl:'http://192.168.1.114:3000',
    CodePushDeploymentKey:{
        // ios-bank: {
        //     debug: '',
        //     release: 'Nyir2fHSPsMWj1ajTlg1mjBJtOZUG_jEEHcfl',
        // },
        // debug: '9Iqe_D3GJbSWQWjV48N98_tRFP_HEX0RmUGyG',
        // release: '4KVdgF03R7KvqMlMEZkIk9iiwLg2CUBy47qA8',
        ios: 'roP9ZTZ58RaagQACSLDKLMvCCw6B4ksvOXqog '
    },
    fileTypes:['mp3','m4a','amr','aac','wav']

};

