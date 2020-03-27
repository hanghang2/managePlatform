export default {
    init(callback,data,phone) {
        let ZGHL = window.ZGHL;
        this.phone = phone;
        this.zghl = new ZGHL({//zghl初始化
            authInfo: {
                refresh_url: "https://openapi.zhiguohulian.com/openapi/v1/oauth/token",
                refresh_token: data[0],
                access_token: data[1],
                token_type: data[2],
                expires: data[3],
                host: data[4]
            },
            onReady(zghl) {
                console.log('zghl初始化成功');
            },
            // 初始化错误回调
            onError(errMsg) {
                console.log(arguments)
            }
        })
        this.zghl.on('error', (errMsg)=>{// 常规错误监听
            console.log(errMsg)
        })
        this.zghl.on('missParamError', (err)=> {// 缺少参数监听
            console.log(err)
        })
        this.zghl.getUserManager().login({//zghl小智登录
            phone: this.phone
        }).then((response) => {
            console.log('zghl小智登录成功')
            sessionStorage.setItem('uid', response.data.user.uid)
            callback();
        }).catch((err)=>{console.log('zghl小智登录失败')})
    },
    uploadUserFace(option) {//上传用户人脸图片**************jssdk有bug，不可用
        return this.zghl.getUserManager().uploadUserFace(option)
    },
    registerUserFace(option) {//注册用户人脸信息
        return this.zghl.getUserManager().registerUserFace(option)
    },
    login(callback){//小智登陆
        this.zghl.getUserManager().login({
            phone: this.phone
        }).then((response) => {
            this.judgeResCode(response, callback);

        })
    },
    getUserFace(){//获取用户人脸信息
        return this.zghl.getUserManager().getUserFace();
    },
    deleteUserFace(param){//删除用户人脸信息
        return this.zghl.getUserManager().deleteUserFace(param);
    },
    // 获取钥匙列表
    getUserKeys () {
        return this.zghl.getKeysManager().getKeys()
    },
    // 开门
    openDoor (guid) {
        return this.zghl.getKeysManager().openDoor({
            guid: guid
        })
    },
    // 获取用户房间
    getUserRooms () {
        return this.zghl.getServicesManager().getUserRooms({
            page: 1,
            size: 100
        })
    },
    // 获取住户月度密码
    getOpenCode (option) {
        return this.zghl.getServicesManager().getOpenCode(option)
    },
    applyRoom (info) {
        console.log(info)
        return this.zghl.getKeysManager().applyRoom({
            record_type: 1,
            record_identity: 1,
            record_remark: '',
            user_realname: info.userRealname,
            user_id_card: info.idCard,
            project_id: info.projectUid,
            building_id: info.buildingUid,
            room_id: info.roomUid,
        })
    },
    judgeResCode (res,callback) {
        switch (res.code) {
            case 200:
                callback(res.data);
                break
            case 1006:
                console.log("1006")
                break
            default:
                console.log(res)
                break;
        }
    }


}
