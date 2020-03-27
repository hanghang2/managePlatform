import React, {Component} from 'react'
import {} from 'react-router-dom' //路由组建
import {} from 'react-redux'
//自定义文
import './index.scss'
import nav_add from '../../../img/nav_add.png';
import nav_date from '../../../img/nav_date.png';
import nav_date_actite from '../../../img/nav_date_actite.png';
import nav_user from '../../../img/nav_user.png';
import nav_user_active from '../../../img/nav_user_active.png';
class Footer extends Component {//继承Component
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
        let imgArr = [nav_date,nav_user];
        if(this.props.type === 'schedule'){
            imgArr[0] = nav_date_actite;
        }else if(this.props.type === 'my'){
            imgArr[1] = nav_user_active;
        }
        return (
            <div className='Footer-componens'>
                <li className="schedule" onClick={this.goPage.bind(this,'/App')}>
                    <img src={imgArr[0]} alt=""/>
                    <p className={this.props.type === 'schedule' ? 'active':''}>日程</p>
                </li>
                <li onClick={this.goPage.bind(this,'/Add')}>
                    <img src={nav_add} alt="" className="nav_add"/>
                </li>
                <li className="my" onClick={this.goPage.bind(this,'/my')}>
                    <img src={imgArr[1]} alt=""/>
                    <p className={this.props.type === 'my' ? 'active':''}>我的</p>
                </li>
            </div>
        )
    }
    goPage(path){
        this.props.history.push(path);
    }
}
export default Footer;
