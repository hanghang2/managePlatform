import React, {Component,Fragment} from 'react'
import {} from 'react-router-dom' //路由组建
import {} from 'react-redux'
//自定义文
import './index.scss'

class Msg extends Component {//继承Component
    constructor(props) {
        super(props)//继承props
        this.state = {}
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
            <Fragment>
                {/*遮罩*/}
                <div className={"MainView-message-view " + (this.props.showMessage ? 'showMessage' : '')}
                     onClick={() => {
                         this.props.setVal({showMessage: false})
                     }}>
                </div>
                {/*消息内容*/}
                <div className={"MainView-message-content " + (this.props.showMessage ? 'showMessage' : '')}>
                    <p className="noMsg">无消息通知</p>
                </div>
            </Fragment>
        )
    }
}

export default Msg;
