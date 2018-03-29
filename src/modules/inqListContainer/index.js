import React from 'react'
import { connect } from 'react-redux'
import inqList from '../../mock/inquirieList.json'
import { InqListItemRR } from '../../components/inqListItem/inqListItem'

const mapStateToProps = (state, ownProps) => { // connect方法在执行时自动将此方法返回的状态注入到组件的props中
    return {
        inqList: state.inqList
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        setInqList: (list) => {
            dispatch({
                type: 'SET_INQ_LIST',
                payLoad: {
                    type: 'add',
                    data: list
                }
            })
        }
    }
}

class InqListContainer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

        }
        this.cacheListComp = []
        this.getInqList()
    }


    componentDidMount = () => {
        window.onresize = this.setLayout
        this.setLayout()
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        console.log('shouldComponentUpdate', nextProps, nextState)
        return true
    }

    componentWillUpdate = (nextProps, nextState) => {
        console.log('componentWillUpdate', nextProps, nextState)
    }

    componentDidUpdate = () => {
        this.setLayout()
    }

    getInqList = () => {
        setTimeout(() => {
            this.props.setInqList(inqList)
        },3000)
    }

    setLayout = () => {
        console.log(this.cacheListComp)
        const minGapW = 20
        const cardWidth = 184
        // const container = this.refs
        // const cards = this.cacheListComp
        // const cardLen = cards && cards.length
        // let availWidth
        // availWidth = container.clientWidth
        // if (availWidth < 2 * cardWidth + minGapW) {
        //     for (let i = 0; i < cards.length; i++) {
        //         cards[i].props.styleObj.marginLeft = Math.floor((availWidth - cardWidth) / 2)
        //     }
        //     return
        // }
        // let cardsPerRow = 2 // 每行显示卡片个数
        // let gapWidth
        // if (container && cardLen) {
        //     gapWidth = Math.floor((availWidth - cardsPerRow * cardWidth) / (cardsPerRow * 2))
        //     for (cardsPerRow; cardsPerRow < 26; cardsPerRow++) {
        //         let gapW = Math.floor((availWidth - cardsPerRow * cardWidth) / (cardsPerRow * 2))
        //         if (gapW < minGapW) {
        //             cardsPerRow--
        //             break
        //         } else {
        //             gapWidth = gapW
        //         }
        //     }
        //     for (let i = 0; i < cardLen; i++) {
        //         cards[i].props.styleObj.marginLeft = cards[i].props.styleObj.marginRight = gapWidth
        //     }
        // }
    }

    formatTime(timestamp){
        let date = new Date(timestamp)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        d = d < 10 ? '0' + d : d
        m = m < 10 ? '0' + m : m
        return y + '-' + m + 'd'
    }
    render = () => {
        let lists = []
        let data = this.props.inqList
        let styleObj= {
            marginLeft:8,
            marginRight:8
        }
        data.map((v, i) => {
            lists.push( <InqListItemRR data={v} key={v.id} styleObj={styleObj} refs="{'listItem-' + v.id}"/> )
        })
        this.cacheListComp = lists
        return  (
            <ul className="inqList" id="inqList-0"  ref="listContainer" >
                {lists}
            </ul>
        )
    }
}
export const InqListContainerRR = connect(mapStateToProps,mapDispatchToProps)(InqListContainer)