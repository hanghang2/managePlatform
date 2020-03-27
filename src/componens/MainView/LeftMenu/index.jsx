import React, {Component} from 'react'
import {} from 'react-router-dom' //路由组建
import {} from 'react-redux'
//自定义文
import './index.scss'
import routePath from "../../../router/routePath";
class LeftMenu extends Component {//继承Component
    constructor(props){
        super(props)//继承props
        this.state = {
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
            <div className={"MainView-left " + (this.props.showMenu ? '' : 'hideMenu')} style={this.props.leftMain}>
                <div className='menu' style={this.props.leftHead} title="查看版本信息"
                     onClick={()=>{this.props.setVal({showVersion:true})}}>MENU</div>
                {
                    routePath.map((item, index) => {
                        return <li key={item.path} onClick={()=>{this.props.goPage( item.path, item.name)}}
                                   className={this.props.pathname == item.path ? 'active' : ''}>{item.name}</li>;
                    })
                }
            </div>
        )
    }
}
export default LeftMenu;
