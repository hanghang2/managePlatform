//图片压缩
export let imgCompress = {
    photoCompress(re, w, objDiv, fileName) {
        this.canvasDataURL(re, w, objDiv, fileName);
    },
    canvasDataURL(path, obj, callback, fileName) {
        var img = new Image();
        var _this = this;
        img.src = path;
        img.onload = function() {
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            var quality = 1;  // 默认图片质量为1
            //生成canvas
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL("image/jpeg", quality);
            _this.convertBase64UrlToBlob(base64, fileName, callback);
        };
    },
    convertBase64UrlToBlob(dataurl, filename, callback) {//将base64转换为文件

        callback(dataurl);
    }
};
