# refs 和 dom

* 给组件某个元素增加ref,能获取此dom元素
```javascript
 return  (
    <ul className="inqList" id="inqList-0" ref={(d)=>{this.selfDom = d}} refs="listContainer">
        {lists}
        { React.Children.map(this.props.children, function (a, b, c) {
            console.log('React.children arguments:', a, b, c)
            return <li>{a}</li>;
        })}
    </ul>
)
```

* 给某个组件上增加ref，只能获取此组件实例 

解决办法：
    1. ReactDOM.findNode
    2. 子组件内具体的dom元素上设置ref，ref指向组件的某个prop(此props是函数，函数内部处理逻辑是将入参赋给组件实例某个属性。比较特殊的用法，因为一般props是只读)
```javascript
render = () => {
    let lists = []
    let data = this.props.inqList
    let styleObj= {
        marginLeft:8,
        marginRight:8
    }
    data.map((v, i) => {
        lists.push( <InqListItemRR ref={(d)=>{ this.child['listItem-' + i]= d}} data={v} key={v.id} styleObj={styleObj}/> )
    })
    setTimeout(() => {
        console.log('&*&*&*', this.child)
    },2000)
    this.cacheListComp = lists
    return  (
        <ul className="inqList" id="inqList-0" ref={(d)=>{this.selfDom = d}} refs="listContainer">
            {lists}
            { React.Children.map(this.props.children, function (a, b, c) {
                console.log('React.children arguments:', a, b, c)
                return <li>{a}</li>;
            })}
        </ul>
    )
}
```
组件实例转dom例子： ReactDom.findDomNode
```javascript
 setLayout = () => {
        const minGapW = 20
        const cardWidth = 184
        const container = this.selfDom
        const cards = this.child
        const cardsArr = this.cacheListComp
        const cardLen = cardsArr && cardsArr.length
        let availWidth
        availWidth = container.clientWidth
        if (availWidth < 2 * cardWidth + minGapW) {
            for (var k in this.child) {
                if (this.child.hasOwnProperty(k)) {
                    ReactDOM.findDOMNode(this.child[k]).style.marginLeft = Math.floor((availWidth - cardWidth) / 2) + 'px'
                }
            }
            return
        }
        let cardsPerRow = 2 // 每行显示卡片个数
        let gapWidth
        if (container && cardLen) {
            gapWidth = Math.floor((availWidth - cardsPerRow * cardWidth) / (cardsPerRow * 2))
            for (cardsPerRow; cardsPerRow < 26; cardsPerRow++) {
                let gapW = Math.floor((availWidth - cardsPerRow * cardWidth) / (cardsPerRow * 2))
                if (gapW < minGapW) {
                    cardsPerRow--
                    break
                } else {
                    gapWidth = gapW
                }
            }
            for (var k in this.child) {
                if (this.child.hasOwnProperty(k)) {
                    ReactDOM.findDOMNode(this.child[k]).style.marginLeft = ReactDOM.findDOMNode(this.child[k]).style.marginRight = gapWidth + 'px'
                }
            }
        }
    }
```

ref抛出到props例子：
``` javascript
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}

```
[ReactDOM api ](http://www.css88.com/react/docs/react-dom.html)

