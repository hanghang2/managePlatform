import React, {Component} from 'react'
import {} from 'react-router-dom' //路由组建
//自定义文件
import './index.scss'

class Color extends Component {//继承Component
    constructor(props){
        super(props)//继承props
        this.state = {
            color:"",
            colorArr:[255,255,255],
            colorsArr:[255,255,255],
            colorsLeft:"0",
            colorsTop:"0",
            colorTop:"",
            colors:""
        }
    }
    componentDidMount() {//页面加载完成
        document.addEventListener('click',()=>{
            this.colorClose();//点击非color组件区域隐藏当前组件
        })
    }
    componentWillReceiveProps(nextProps) {  // 属性props改变时候触发
    }
    //dom更新过滤
    shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
        return true;
    }
    render() {
        if(this.props.isShow){
            return (
                <div className="Color" onClick={(e)=>{e.nativeEvent.stopImmediatePropagation();}}>
                    <div className="color-parent" style={{background:this.state.color}} onClick={this.colorShow}>
                        <div className="zyh-color-circle" style={{left:this.state.colorsLeft+'px',top:this.state.colorsTop+'px'}}></div>
                        <div className="zyh-color-white"></div>
                        <div className="zyh-color-black"></div>
                    </div>
                    <div className="zyh-color-right" onClick={this.colorAlter}>
                        <div className="zyh-color-right-child" style={{marginTop:this.state.colorTop+'px'}}></div>
                    </div>
                    <div className="zyh-color-bottom">
                        <li className="zyh-li-color">{this.state.colors}</li>
                        <li className="zyh-li-ok" onClick={this.colorOk}>确定</li>
                        <li className="zyh-li-on" onClick={this.colorClose}>关闭</li>
                    </div>
                </div>
            )
        }else{
            return('');
        }
    }
    colorClose = ()=>{//关闭颜色(通知父组件)
        if(this.props.isShow){
            this.props.onSetBg(false,'')
        }
    }
    colorOk = ()=>{//确定颜色(通知父组件)
        this.props.onSetBg(false,this.state.colors)
    }
    colorShow = (e)=>{//颜色选中
        this.setState({
            colorsLeft:e.nativeEvent.offsetX,
            colorsTop:e.nativeEvent.offsetY
        },()=>{
            let realX = this.state.colorsLeft/280;
            let realY = this.state.colorsTop/180;
            this.getColorValue(realX,realY);
        })
    }
    colorAlter = (e)=>{//改变颜色区域
        const colorArr = [[255,0,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],[255,0,255],[255,0,0]];
        const colorRatio = [0,0.17,0.33,0.5,0.67,0.83,1];
        let ratio = e.nativeEvent.offsetY / 180;
        let index = 0;
        let real,color1,color2,color3;
        for (var i = 0; i < colorRatio.length; i++) {
            if(ratio < colorRatio[i]){
                index = i;
                break;
            }
        }
        ratio = ratio - colorRatio[index - 1];
        real = ratio/(colorRatio[index] -  colorRatio[index - 1]);
        color1 = colorArr[index][0] - colorArr[index-1][0] == 0 ? colorArr[index-1][0] : Math.abs(colorArr[index][0] - colorArr[index-1][0])*real;
        color2 = colorArr[index][1] - colorArr[index-1][1] == 0 ? colorArr[index-1][1] : Math.abs(colorArr[index][1] - colorArr[index-1][1])*real;
        color3 = colorArr[index][2] - colorArr[index-1][2] == 0 ? colorArr[index-1][2] : Math.abs(colorArr[index][2] - colorArr[index-1][2])*real;
        this.setState({
            colorTop:e.nativeEvent.offsetY,
            colorArr:[Math.round(color1),Math.round(color2),Math.round(color3)],
            color:"rgb(" + parseInt(color1) + "," + parseInt(color2) + "," + parseInt(color3) + ")"
        },()=>{
            let realX = this.state.colorsLeft/280;
            let realY = this.state.colorsTop/180;
            this.getColorValue(realX,realY);
        })
    }
    getColorValue = (realX,realY)=>{//获取颜色值
        //左右计算
        let colorsArr = JSON.parse(JSON.stringify(this.state.colorArr)),
            colorArr = JSON.parse(JSON.stringify(this.state.colorArr));
        for (var i = 0; i < colorArr.length; i++) {
            if(colorArr[i] != 255){
                colorsArr[i] = Math.round(colorArr[i] + (255 - colorArr[i])*(1 - realX));
            }else{
                colorsArr[i] = colorArr[i];
            }
        }
        //上下计算
        for (var i = 0; i < colorArr.length; i++) {
            colorsArr[i] = Math.round(colorsArr[i] - colorsArr[i]*(realY));
        }
        this.setState({
            colorsArr:colorsArr,
            colors:"rgb(" + colorsArr[0] + "," + colorsArr[1] + "," + colorsArr[2] + ")"
        })
        // this.$emit('getColor',this.colors);
    }
}
export default Color;
