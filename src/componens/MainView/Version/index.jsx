import React, {Component,Fragment} from 'react'
import {} from 'react-router-dom' //路由组建
import {} from 'react-redux'
//自定义文
import './index.scss'

class Msg extends Component {//继承Component
    constructor(props) {
        super(props)//继承props
        this.state = {
            isUp:false,//是否在svg上鼠标按下
            x:0, //赛贝尔x点
            y:0//赛贝尔y点
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
            <div className="MainView-Version">
                {/*遮罩*/}
                <div className={"MainView-Version-view " + (this.props.showVersion ? 'showVersion' : '')}
                     onClick={() => {
                         this.props.setVal({showVersion: false})
                     }}>
                </div>
                {/*消息内容*/}
                <div className={"MainView-Version-content " + (this.props.showVersion ? 'showVersion' : '')}>
                    <div>当前版本：</div>
                    <div className="thisVersion">
                        <svg height="400" width="400" style={{cursor:"pointer"}}
                             onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onMouseLeave={this.mouseLeave}>
                            <polygon points="0,0 0,400 400,400 400,0" stroke="#2196F3" fill="#2196F3" strokeWidth="1"/>
                            <g fontSize="40" font="sans-serif" fill="#ffffff" stroke="#000"
                               textAnchor="middle">
                                <text x="200" y="200">v1.0.0</text>
                            </g>
                            <path d={"M 0 0 q " + this.state.x + ' ' + this.state.y + " 400 0"}
                                  stroke="#0afb80" strokeWidth="5" fill="#0afb80">
                            </path>
                            <g fontSize={this.state.y/20} font="sans-serif" fill="#ffffff" stroke="#2196F3"
                               textAnchor="middle">
                                <text x="200" y="200">test1.0.0</text>
                            </g>
                        </svg>
                    </div>
                    <div>
                        历史版本：无
                    </div>
                </div>
            </div>
        )
    }
    mouseDown = (e)=>{//按下
        this.setState({isUp:true})
    }
    mouseMove = (e)=>{//移动
        if(this.state.isUp){
            let x = e.nativeEvent.offsetX,
                y = e.nativeEvent.offsetY;
            if(x&y){
                this.setState({x,y:y*2})
            }
        }
    }
    mouseUp = (e)=>{//松开
        this.setState({isUp:false,x:0,y:0})
    }
    mouseLeave = (e)=>{//鼠标移出
        this.setState({isUp:false,x:0,y:0})
    }
}

export default Msg;
