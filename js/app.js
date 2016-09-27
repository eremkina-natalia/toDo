'use strict';

var doings = [
  {
    text: 'wash the dishes',
    bigText: 'write please, why do you want do it'
  },
  {
    text: 'read the book',
    bigText: 'write please, why do you want do it'
  },
  {
    text: 'write the dissertation',
    bigText: 'write please, why do you want do it'
  },
  {
    text: 'go to the shop',
    bigText: 'write please, why do you want do it'
  },
  {
    text: 'sleep...',
    bigText: 'write please, why do you want do it'
  }
];

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },
  getInitialState: function() {
    return{
      visible: false,
      defaultChecked: false
    };
  },
  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({visible: true})
  },

  onCheckRuleClick: function(j){


      if(!j.target.defaultChecked(':true')){
        ReactDOM.findDOMNode(this.refs.siblings(".toDo_text").css('text-decoration','line-through'));
      } else {
        ReactDOM.findDOMNode(this.refs.siblings(".toDo_text").css('text-decoration','none'));
      }
  },

  render: function(){
    var text = this.props.data.text,
     bigText = this.props.data.bigText,
     visible = this.state.visible;

  return(
    <div className="article">
      <p textDecoration="none" checked={this.state.checked} className="toDo_text">{text}</p>
      <label className="toDo_check">
        <input
          type="checkbox"
          defaultChecked={false}
          ref="check"
          onChange={this.onCheckRuleClick} />
      </label>

      <a href="#"
        onClick={this.readmoreClick}
        className={'toDo_readmore ' + (visible ? 'none': '')}>
        Read more

      </a>

      <p className={"toDo_bigText " + (visible ? '': 'none')}>{bigText}</p>
    </div>
  )
  }
})

var ToDo = React.createClass({
  propTypes:{
    data: React.PropTypes.array.isRequired
  },
  render: function(){
    var data = this.props.data;
    var toDoTemplate;

    if (data.length > 0){
      toDoTemplate = data.map(function(item,index) {
        return(
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    } else {
      toDoTemplate = <p>Hoora, nothing To Do!</p>
    }
    return(
      <div className="toDo">
        {toDoTemplate}
        <strong className={data.length > 0 ? '':'none'}>All doings: {data.length}</strong>
      </div>
    );
  }
});



var ToDoInput = React.createClass({
  getInitialState: function(){ // устанавливаем начальное состояние state
    return {
      textIsEmpty: true
    };
  },
  componentDidMount: function(){
    ReactDOM.findDOMNode(this.refs.myToDoInput).focus();
  },
  onBtnClickHandler: function(e) {
    e.preventDefault();
    var text = ReactDOM.findDOMNode(this.refs.text).value;
    alert(ReactDOM.findDOMNode(this.refs.myToDoInput).value);

    var item = [{
        text: text,
        bigtext: '..'
    }];

    window.ee.emit('ToDo.add', item);
  },

  onFieldChange: function(fieldName, e){
    if (e.target.value.trim().length > 0){
      this.setState({[''+fieldName]: false})
    } else {
      this.setState({[''+fieldName]: true})
    }
  },
  render: function() {
    var textIsEmpty = this.state.textIsEmpty;
    return (
      <div>
        <input
          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
          className="todo_input"
          defaultValue=''
          placeholder="input doing"
          ref="myToDoInput"
        />
        <button
          className="todo_btn"
          onClick={this.onBtnClickHandler}
          ref="alert_button"
          disabled={textIsEmpty}>
          show
        </button>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      toDo: doings
    };
  },
  componentDidMount: function() {
    var self = this;
    window.ee.addToDo('ToDo.add', function(item){
      var nextToDo = item.concat(self.state.news);
      self.setState({toDo: nextToDo});
    });
  },
  componentWillUnmount: function() {
    window.ee.removeToDo('ToDo.add');
  },

  render: function() {
    return(

      <div className="app">
        <ToDoInput />
        <h3>TO DO!</h3>
        <ToDo data={this.state.toDo} /> {/*added property data*/}
      </div>
    );
  }
});


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
