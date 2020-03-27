import React, {Component} from 'react'
//自定义文件
import './index.scss'
class NotFound  extends Component{//继承Component
    constructor(props){
        super(props)//继承props
        this.state = {};
    }
    render(){
        return (
            <div className='NotFound'>
                <span>404 NotFound</span>
            </div>
        )
    }
}
const mapStateToProps = (state) => {//值映射到props中
    return {}
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {}
}
export default NotFound;
