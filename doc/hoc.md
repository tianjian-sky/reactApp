# 高阶组件 (HOC) 
[参考](https://reactjs.org/docs/higher-order-components.html) 

主要思想: 解决不通组件的代码复用问题。某些组件大致的组成部分是类似的，只是细节有区别。 

* hoc并不修改输入组件，也不继承它或拷贝它的行为，只是在输入组件基础上包裹一个容器组件。
* hoc是纯函数，没有副作用

e.g.  

* 需要将hoc的所有props传递给被包裹组件 

* return class extends React.Component 写法  也可返回具名类！

* {...this.props} 写法 

``` javascript
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

### 不要直接操纵输入组件，而是在容器组件做文章 
错误： 

``` javascript
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  };
  // The fact that we're returning the original input is a hint that it has
  // been mutated.
  return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);
```
##### 问题： 

* 输入组件无法独立于hoc进行复用，因为本身已经被改变
* 其他的hoc传入此hoc时，会导致传入的willReceiveProps hooks被覆盖 
 
正确： 

```javascript
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}

```

### 容器组件 vs. hoc 

* 容器组件：管理订阅、状态，传props给子组件更新ui
* hoc：只是利用容器作为实现

### 惯例：
* 传所有props给被包裹组件 

``` javascript
render() {
  // Filter out extra props that are specific to this HOC and shouldn't be
  // passed through
  const { extraProp, ...passThroughProps } = this.props;

  // Inject props into the wrapped component. These are usually state values or
  // instance methods.
  const injectedProp = someStateOrInstanceMethod;

  // Pass props to wrapped component
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```
### 高阶方法：返回hoc的方法 （如connect）
``` javascript
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

### 注意：

1. 不要在render方法中使用hoc,那样每次渲染都将导致hoc被替换，所有状态丢失而不是被diff后update 

    ``` javascript
    render() {
        // A new version of EnhancedComponent is created on every render
        // EnhancedComponent1 !== EnhancedComponent2
        const EnhancedComponent = enhance(MyComponent);
        // That causes the entire subtree to unmount/remount each time!
        return <EnhancedComponent />;
    }
    ```
2. 输入组件的静态方法必须被copy给hoc

    ``` javascript 
    function enhance(WrappedComponent) {
        class Enhance extends React.Component {/*...*/}
        // Must know exactly which method(s) to copy :(
        Enhance.staticMethod = WrappedComponent.staticMethod;
        return Enhance;
    }
    ```
    * 也可使用 hoist-non-react-statics 库自动完成此工作 

    ``` javascript
    import hoistNonReactStatic from 'hoist-non-react-statics';
    function enhance(WrappedComponent) {
        class Enhance extends React.Component {/*...*/}
        hoistNonReactStatic(Enhance, WrappedComponent);
        return Enhance;
    }
    ```
3. ref不会被正确传递，指向的是hoc组件，解决方法，使用React.forwardRef API 