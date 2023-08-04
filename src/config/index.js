const baseURL={
    app:{
        dev:'https://appserver-dev.yiyahui.com',
        // dev:'http://appserver.yiyahui.com',
        // production:'http://appserver.yiyahui.com'
        production:'https://appserver.yiyahui.com'
    },
    h5:{
        dev:'http://appweb-dev.yiyahui.com',
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
        android: 'X19KUgd64wbx4E1IMr1Im2nTEO6j4ksvOXqog'
    },
    fileTypes:['mp3','m4a','amr','aac','wav']

};

