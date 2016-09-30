"use strict";
var doings = [
    'wash the dishes',

     'read the book',

     'write the dissertation',

     'go to the shop',

     'sleep...'
];

var ToDoInput = React.createClass({

  onBtnClickHandler: function(){
    document.getElementById('toDoInput').value = "dd";
  },


  render: function() {
    return(
      <div id="toDoInput">
        <div>
          <input type="text" className="toDoText" ref='toDoInput' />
        </div>

        <div>
          <button className="toDoBtn" onClick={addToDo()}>ToDo</button>
        </div>
      </div>
    );
  }
});

var Example = React.createClass({
  getInitialState: function(){
    return {
      style: ''
    };
  },
  changeCheck: function() {
    var check = ReactDOM.findDOMNode(this.refs.check).checked;
    this.setState({
      style: (check ? 'focused' : '')
    });

  },
  render: function(){
    var value = this.props.value;
    return(

      <div>

        <li className={this.state.style}>{value}</li>
        <input ref='check' type="checkbox" onChange={ this.changeCheck } className="toDoCheck"/>
      </div>

    );
  }
});

var ToDoExample = React.createClass({

      render: function() {

        var self = this;
        // Здесь мы читаем свойство items, которое было передано
        // атрибутом, при создании компонента

        var lists = self.props.items.map(function(m, index){
          return (
            <div key={index}>
              <Example value={m} />
            </div>
          );
        });
        // Метод map пройдется по массиву элементов меню,
        // и возвратит массив с <li> элементами.
        return (
          <div>
            <ul>{lists}</ul>
          </div>
        );
    }
});

var App = React.createClass({
  render: function(){
    return (
      <div>
        <ToDoInput />

      </div>
  );
  }
});

// Отображаем компонент меню на странице, передав ему массив с элементами


ReactDOM.render(

  <App items={ doings } />,
  document.getElementById('root')
);
