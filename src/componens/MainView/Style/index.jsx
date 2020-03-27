import React, {Component} from 'react'
import {} from 'react-router-dom' //路由组建
import {connect} from "react-redux";
//自定义文件
import './index.scss'
import Color from '../Color'

class Style extends Component {//继承Component
    constructor(props){
        super(props)//继承props
        this.state = {
            styleModel:[//设置style模块
                {type:'leftHead',bg:false,txtColor:false},//类型，颜色显示
                {type:'leftMain',bg:false,txtColor:false},
                {type:'rightHead',bg:false,txtColor:false},
                {type:'rightMain',bg:false,txtColor:false}
            ]
        }
    }
    componentDidMount() {//页面加载完成
    }
    componentWillReceiveProps(nextProps) {  // 属性props改变时候触发
    }
    //dom更新过滤
    shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
        return true;
    }
    render() {
        return (
            <div className="Style">
                {/*遮罩*/}
                <div className={"Style-view " + (this.props.show ? 'show' : '')}
                     onClick={() => {
                         this.props.setShow(false)
                     }}>
                </div>
                {/*内容*/}
                <div className={"Style-content " + (this.props.show ? 'show' : '')}>
                    {
                        this.state.styleModel.map((item,index)=>{
                            return (
                                <div className='sysModelList' key={item.type}>
                                    <div className={"sysModel " + item.type}>
                                        <div className="sysModel-left">
                                            <div className="sysModel-left-head" style={this.getStyle().leftHead}>font</div>
                                            <div className="sysModel-left-main" style={this.getStyle().leftMain}>font</div>
                                        </div>
                                        <div className="sysModel-right">
                                            <div className="sysModel-right-head" style={this.getStyle().rightHead}>font</div>
                                            <div className="sysModel-right-main" style={this.getStyle().rightMain}>font</div>
                                        </div>
                                    </div>
                                    <div className="setValue">
                                        <div>
                                            <span>背景：</span>
                                            <span onClick={(e)=>{e.nativeEvent.stopImmediatePropagation();}}>
                                                <div className="bg" onClick={this.setBg.bind(this,index,'bgColor',true,null)}
                                                     style={{background:this.props.systemStyle[item.type].bgColor}}></div>
                                            </span>
                                            <div className="bg-color">
                                                <Color isShow={item.bg} onSetBg={this.setBg.bind(this,index,'bgColor')}></Color>
                                            </div>
                                        </div>
                                        <div>
                                            <span>字体：</span>
                                            <span onClick={(e)=>{e.nativeEvent.stopImmediatePropagation();}}>
                                                <div className="bg" onClick={this.setBg.bind(this,index,'textColor',true,null)}
                                                    style={{background:this.props.systemStyle[item.type].textColor}}></div>
                                            </span>
                                            <div className="bg-color">
                                                <Color isShow={item.txtColor} onSetBg={this.setBg.bind(this,index,'textColor')}></Color>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearBoth"></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    setBg(index,type,bgVal,color){//设置颜色选择器显示隐藏 和颜色
        let styleModel = JSON.parse(JSON.stringify(this.state.styleModel));
        this.setState(()=>{
            if(type == 'textColor'){
                styleModel[index].txtColor = bgVal;
            }else{
                styleModel[index].bg = bgVal;
            }
            return {styleModel};
        })
        if(color){//如果设置颜色
            let systemStyle = JSON.parse(JSON.stringify(this.props.systemStyle));
            systemStyle[styleModel[index].type][type] = color;
            this.props.setSystemStyle(systemStyle);
        }
    }
    getStyle = () => {//样式
        return{
            leftHead:{
                background:this.props.systemStyle.leftHead.bgColor,
                color:this.props.systemStyle.leftHead.textColor
            },
            leftMain:{
                background:this.props.systemStyle.leftMain.bgColor,
                color:this.props.systemStyle.leftMain.textColor
            },
            rightHead:{
                background:this.props.systemStyle.rightHead.bgColor,
                color:this.props.systemStyle.rightHead.textColor
            },
            rightMain:{
                background:this.props.systemStyle.rightMain.bgColor,
                color:this.props.systemStyle.rightMain.textColor
            },
        }
    }
}

const mapStateToProps = (state) => {//值映射到props中
    return {
        systemStyle: state.systemStyle //系统风格
    }
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {
        setSystemStyle(data){ //系统风格设置
            return dispatch({
                type:'SET_systemStyle',
                data:data
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Style)
