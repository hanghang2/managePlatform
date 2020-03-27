import React, {Component} from 'react'
import {Link} from 'react-router-dom' //路由组建
import {connect} from 'react-redux'

//自定义文件
import './index.scss'

class Index  extends Component{//继承Component
    constructor(props){
        super(props)//继承props
        let initData = this.props.pageData ? JSON.parse(JSON.stringify(this.props.pageData)) : false;
        this.state = initData || {
            inputValue:'',
            selectValue:'',
            isUp:false,//是否在svg上鼠标按下
            x:0, //赛贝尔x点
            y:0 //赛贝尔y点
        };
    }
    componentDidMount(){//组建挂载完成
        // console.log(this.props.sysEvent)//操作系统对象
    }
    componentWillReceiveProps(nextProps) {  // 属性props改变时候触发
    }
    //dom更新过滤
    shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
        return true;
    }
    render(){
        return (
            <div className='Index'>
                Index
                <input type="text" value={this.state.inputValue} onChange={this.setInput} placeholder='请输入搜素内容哦'/>
                <select name="" id="" value={this.state.selectValue} onChange={this.setSelect}>
                    <option value="1">12</option>
                    <option value="2">223</option>
                </select>
                <div className='btn-list'>
                    <button onClick={()=>{this.props.sysEvent.goPage('/applyKeys','钥匙列表')}}>打开钥匙列表页面</button>
                    <button onClick={()=>{this.props.sysEvent.goPage('/Password','密码',true)}}>关闭所有页面跳转到密码</button>
                    <button onClick={this.goAddHomeMember}>关闭当前页面跳转到家人列表</button>
                </div>
                <div>
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
            </div>
        )
    }
    goAddHomeMember = ()=>{
        this.props.sysEvent.goPage('/AddHomeMember','家人列表');
        setTimeout(()=>{
            this.props.sysEvent.close('/Index')
        })
    }
    setInput = (e)=>{
        this.setState({inputValue:e.target.value})
    }
    setSelect = (e)=>{
        this.setState({selectValue:e.target.value})
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
    componentWillUnmount() {//组建卸载
        this.props.setPageData(this.state);
    }
}

const mapStateToProps = (state) => {//值映射到props中
    return {
        pageData: state.pageData.Index || false
    }
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {
        setPageData(data){
            return dispatch({
                type:'SET_pageData',
                attr:'Index',
                data:data
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Index)
