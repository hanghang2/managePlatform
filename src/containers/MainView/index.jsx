import React, {Component, Fragment} from 'react'
import {Redirect, Route, Switch, Link} from 'react-router-dom' //路由组建
import {connect} from 'react-redux'//状态管理
//自定义文件
import './index.scss'//样式
import close from '../../img/close.png'//图片
import LeftMenu from '../../componens/MainView/LeftMenu'//左侧菜单组件
import Top from '../../componens/MainView/Top'//右侧顶部组件
import Version from '../../componens/MainView/Version'//系统版本组件
import Style from '../../componens/MainView/Style'//系统风格组件
import Msg from '../../componens/MainView/Msg'//消息遮罩组件
import mainPage from '../../router/mainPage'//路由组件
import routePath from '../../router/routePath'//路由数据

class MainView extends Component {//继承Component
    constructor(props) {
        super(props)//继承props
        let name = routePath[0].name, path = routePath[0].path;//初始化默认 index
        for (let i = 0; i < routePath.length; i++) {
            if (this.props.location.pathname === routePath[i].path) { //当前路由匹配到页面
                path = routePath[i].path;
                name = routePath[i].name;
            }
        }
        this.state = {
            pathArr: [path],//打开的导航栏数据path
            nameArr: [name],//打开的导航栏数据name
            showMenu: true, //显示左侧菜单
            showMessage: false, //显示右侧消息
            showStyle:false,//显示主题
            showVersion:false//显示版本信息
        }
    }

    componentDidMount() {//组建挂载完成
    }

    componentWillReceiveProps(nextProps) {  // 属性props改变时候触发
    }

    //dom更新过滤
    shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
        return true;
    }

    render() {
        const {...param} = this.props;
        return (
            <div className="MainView">
                {/*左侧菜单 参数：showMenu:显示隐藏；leftMain：左侧样式，leftHead：左侧标题样式，goPage：跳转页面，pathname路由名字*/}
                <LeftMenu showMenu={this.state.showMenu} leftMain={this.getStyle().leftMain}
                          leftHead={this.getStyle().leftHead} goPage={this.goPage}
                          pathname={this.props.location.pathname}
                          setVal={(valObj)=>{this.setState(valObj)}}></LeftMenu>
                {/*右侧内容*/}
                <div className="MainView-right">
                    {/*右侧顶部内容 rightHead rightHead样式，showMenu菜单是否显示，showMenuFun控制菜单那是否显示,setVal设置state值(控制显示隐藏)*/}
                    <Top rightHead={this.getStyle().rightHead} rightHead={this.getStyle().rightHead}
                         showMenu={this.state.showMenu} showMenuFun={this.showMenu}
                         setVal={(valObj)=>{this.setState(valObj)}} ></Top>
                    {/*右侧导航栏内容*/}
                    <div className={"MainView-nav " + (this.state.showMenu ? '' : 'hideMenu')} ref='mainViewNav'>
                        <div className="MainView-nav-list">
                            {
                                this.state.pathArr.map((item, index) => {
                                    return <li key={item} onClick={this.goPage.bind(this, item)}
                                               className={this.props.location.pathname == item ? 'active' : ''}>
                                        <span>{this.state.nameArr[index]}</span>
                                        {
                                            this.state.pathArr.length > 1 ?
                                                <img src={close} alt="" onClick={this.close.bind(this, item)}/> : ''
                                        }
                                    </li>;
                                })
                            }
                        </div>
                        {/*页面tabs导航操作栏*/}
                        <div className='menu-tool'>
                            <span>↓</span>
                            <ul>
                                <li onMouseDown={this.closeMore.bind(this, 'this')}>关闭当前标签页</li>
                                <li onMouseDown={this.closeMore.bind(this, 'other')}>关闭其它标签页</li>
                                <li onMouseDown={this.closeMore.bind(this, 'all')}>关闭全部标签页</li>
                            </ul>
                        </div>
                    </div>
                    {/*右侧页面*/}
                    <div className="MainView-main"  style={this.getStyle().rightMain}>
                        <Route {...param} render={this.routeRender}></Route>
                    </div>
                </div>
                {/*左侧版本信息*/}
                <Version showVersion={this.state.showVersion} setVal={(valObj)=>{this.setState(valObj)}}></Version>
                {/*右侧消息内容*/}
                <Msg showMessage={this.state.showMessage} setVal={(valObj)=>{this.setState(valObj)}}></Msg>
                {/*右侧主题内容*/}
                <Style show={this.state.showStyle} setShow={(val)=>{this.setState({showStyle:val})}}></Style>
            </div>
        )
    }
    routeRender = (props) => {//返回render 组建
        props.pathArr = this.state.pathArr;//当前的选中打开的页面传给子组件
        props.routeObj = this.routeObj;//路由实例构造完成事件
        props.sysEvent = {//操作系统方法传给页面组件
            goPage:this.goPage, //跳转页面
            close:this.close //关闭页面
        }
        return React.createElement(mainPage, props);
    }
    routeObj = (history) => {
        this.history = history;
    }

    goPage = (path, name, clear)=> {//页面跳转
        if (this.history) {
            this.history.push(path);
        } else {
            return;
        }
        let index = -1;//选中得li标签索引
        this.setState(() => {
            let pathArr = JSON.parse(JSON.stringify(this.state.pathArr));
            let nameArr = JSON.parse(JSON.stringify(this.state.nameArr));
            index = pathArr.indexOf(path)
            if (clear === true) {//清楚其它所有
                index = 0;
                return {pathArr: [path], nameArr: [name]};
            }
            if (index == -1) {
                pathArr.push(path)
                nameArr.push(name)
                return {pathArr, nameArr};//改变页面的打开菜单集合
            }
            return {};//不改变页面的打开菜单集合
        }, () => {//页面dom渲染之后 滚动位置
            if (index == -1) {
                index = this.state.pathArr.length - 1;
            }
            let mainViewNav = this.refs.mainViewNav;//滚动标签
            let activeLi = mainViewNav.getElementsByTagName('li')[index],//选中的标签
                scrollRigth = mainViewNav.scrollWidth - mainViewNav.offsetWidth;//滚动条的距离(最大滚动距离)
            //距离父标签得距离(应该滚动的距离)
            let distance = activeLi.offsetLeft;
            //应该滚动的距离小于最大滚动距离时候 滚动为应该滚动 否则为最大滚动距离
            this.refs.mainViewNav.scrollLeft = distance < scrollRigth ? distance : scrollRigth;
        })
    }

    close = (item, e) => {//关闭页面
        if (e) e.stopPropagation();
        if (this.state.pathArr.length < 2) {//小于两个不可以关闭
            return;
        }

        let pathArr = JSON.parse(JSON.stringify(this.state.pathArr));
        let nameArr = JSON.parse(JSON.stringify(this.state.nameArr));
        let index = pathArr.indexOf(item);
        if (index !== -1) {
            pathArr.splice(index, 1)
            nameArr.splice(index, 1)
        }
        if (this.props.location.pathname == item) {//如果关闭是当前打开的那就在打开 打开页面中第一个页面
            this.goPage(pathArr[0], nameArr[0]);
        }
        this.setState(() => {
            return {pathArr, nameArr};//改变页面的打开菜单集合
        }, () => {
        })
    }
    showMenu = () => {//显示左侧菜单
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    closeMore(type) {//右侧导航操作
        if (this.state.pathArr.length < 2) {
            return;
        } //少于两个不可以关闭
        let thisPath = '',
            thisName = '';//当前选中的 name、path
        this.state.pathArr.map((item, index) => {
            if (this.props.location.pathname == item) {
                thisPath = item;
                thisName = this.state.nameArr[index];
            }
            return item;
        })//关闭其它
        if (type == 'other') {
            this.setState({pathArr: [thisPath], nameArr: [thisName]});
        } else if (type == 'this') {//关闭当前
            this.close(thisPath);
        } else if (type == 'all') {//关闭所有
            this.goPage(routePath[0].path, routePath[0].name, true);//打开第一个 index ，清楚所有
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
            }
        }
    }
}

const mapStateToProps = (state) => {//值映射到props中
    return {
        systemStyle: state.systemStyle //系统风格
    }
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(MainView);


