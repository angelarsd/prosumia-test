import React from 'react';
import ReactDOM from 'react-dom';
require('es6-promise').polyfill();
require('isomorphic-fetch');

var ProductoApp = React.createClass({
  getInitialState: function(){
    return {
      productos: [],
      producto: '',
      productoid: 0,
      productofilter:[],
      serchtext: '',
      view: 'list'
    }
  },
  componentDidMount: function() {
      window.addEventListener('scroll', this.handleScroll);
  },
  componentWillMount: function() {
    window.removeEventListener('scroll', this.handleScroll);
    fetch('http://54.232.229.116:5000/products/').then((response) => {
		  return response.json()
		}).then((json) => {
        this.setState({ productos: json.products })
    })
  },
  handleScroll: function(event) {
    let scrollTop = 0;
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) scrollTop = event.pageY;
    else scrollTop = event.srcElement.body.scrollTop;
     var header =  document.getElementsByTagName("header");
    if (scrollTop>100) header[0].classList.add("fixed");
    else header[0].classList.remove("fixed");
  },
  detail: function(id){
    fetch('http://54.232.229.116:5000/products/'+id).then((response) => {
      return response.json()
    }).then((json) => {
        this.setState({producto:json,productoid:id})
    })
    this.setState({view:'detail'})

  },
  list: function(){
    this.setState({view:'list',serchtext:''})
  },
  filter: function(){
    var search = document.getElementById('filtrarProductos').value;
    if (search!=''){
      this.setState({serchtext:search})
      fetch('http://54.232.229.116:5000/products/search/'+search).then((response) => {
        return response.json()
      }).then((json) => {
          this.setState({productofilter:json.products})
      })
      this.setState({view:'filter'})
    }
  }, 
  showHeader: function(){
    if(this.state.serchtext!=''){
      return(
        <header>
          <div className="container">
            <img className="logo" src="img/prosumia-logo.png" />
            <div className="input-group has-feedback has-clear">
              <input type="text" className="form-control input-lg" placeholder="Filtrar Producto..."  id="filtrarProductos" defaultValue={this.state.serchtext}/>
              <a className="glyphicon glyphicon-remove-sign form-control-feedback form-control-clear" onClick={this.list}></a>
              <div className="input-group-btn">
                  <button className="btn btn-lg" type="button" id="buscar" onClick={this.filter}>
                    <span className="glyphicon glyphicon-search" ></span>
                  </button>
                </div>
            </div>
            </div>
        </header>
      )
    }else{
      return(
        <header>
          <div className="container">
            <img className="logo" src="img/prosumia-logo.png" />
            <div className="input-group">
              <input type="text" className="form-control input-lg" placeholder="Filtrar Producto..."  id="filtrarProductos"/>
                <div className="input-group-btn">
                  <button className="btn btn-lg btn-default" type="button" id="buscar" onClick={this.filter}>
                    <span className="glyphicon glyphicon-search" ></span>
                  </button>
                </div>
            </div>
            </div>
        </header>
      )
    }
  },
  showLoading: function(text){
    return(<p className="loading text-center"><i className="fa fa-circle-o-notch fa-spin fa-3x"></i><br />{text}</p>)
  },
  showListView: function(listado){
    return(
      <div>
        {this.showHeader()}
        <div className="container">
          <hr />
          <ul className="media-list">
            {listado.map((producto) => {
              var colors = ['00A19C','E63C2E','F6B332','090909','666666','00A19C','E63C2E','F6B332','090909','666666']; 
              var letter = producto.desc.substr(0,1);
              var urlimage = "https://placeholdit.imgix.net/~text?txtsize=33&txt="+letter+"&w=64&h=64&bg="+colors[parseInt(producto.id.slice(-1))]+"&txtclr=fff";
              return (
                <li key={producto.id} className="media" >
                  <div className="onClick" onClick={() => this.detail(producto.id)}>
                    <figure className="media-left">
                      <img className="media-object" width="64px" src={urlimage} />
                    </figure>
                    <div className="media-body">
                      <h4>{producto.id}</h4>
                      <p>{producto.desc}</p>
                    </div>
                  </div>
                  <hr/>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  },
  showDetailView: function(producto, id){
    var colors = ['00A19C','E63C2E','F6B332','090909','666666','00A19C','E63C2E','F6B332','090909','666666']; 
    var urlimage = "https://placeholdit.imgix.net/~text?txtsize=60&txt="+producto.brand+"&w=360&h=360&bg="+colors[parseInt(id.slice(-1))]+"&txtclr=fff";
    var urlimage2 = "https://placeholdit.imgix.net/~text?txtsize=60&txt="+producto.brand+"&w=720&h=180&bg="+colors[parseInt(id.slice(-1))]+"&txtclr=fff";
    return (
      <div>
        {this.showHeader()}
        <div className="container">
          <br />
          <div className="row">
            <div className="col-md-4">
              <img className="hidden-sm hidden-xs img-responsive" src={urlimage} />
              <img className="hidden-lg hidden-md img-responsive" src={urlimage2} />
            </div>
            <div className="col-md-8">
              <button className="btn btn-default pull-right" onClick={this.list}><span className="fa fa-arrow-left"></span> Volver</button>
              <h2>Detalle del Producto</h2>
              <h3>{producto.brand}</h3>
              <p>{producto.desc}</p>
              <div id="tabPrice">
                <ul className="nav nav-tabs nav-justified">
                  <li className="active"><a  data-toggle="tab" href="#1er"><b>1er</b> Trimestre</a></li>
                  <li><a data-toggle="tab" href="#2do"><b>2do</b> Trimestre</a></li>
                  <li><a data-toggle="tab" href="#3er"><b>3er</b> Trimestre</a></li>
                  <li><a data-toggle="tab" href="#4to"><b>4to</b> Trimestre</a></li>
                </ul>
                <div className="tab-content clearfix">
                  <div className="tab-pane active" id="1er">
                    <h3 className="text-center"><small>Precio</small> {producto.price[0]}</h3>
                  </div>
                  <div className="tab-pane fade" id="2do">
                    <h3 className="text-center"><small>Precio</small> {producto.price[1]}</h3>
                  </div>
                  <div className="tab-pane fade" id="3er">
                    <h3 className="text-center"><small>Precio</small> {producto.price[2]}</h3>
                  </div>
                  <div className="tab-pane fade" id="4to">
                    <h3 className="text-center"><small>Precio</small> {producto.price[3]}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  render: function() {
    switch(this.state.view) {
      case 'list':
        if (this.state.productos.length > 0) return (this.showListView(this.state.productos));
        else return (this.showLoading('Cargando Lista de productos...'));
      break;
      case 'detail':
        if (this.state.producto!='') return (this.showDetailView(this.state.producto, this.state.productoid));
        else return (this.showLoading('Cargando Detalle del Producto...'));
      break;
      case 'filter':
        if (this.state.productofilter.length > 0) return (this.showListView(this.state.productofilter));
        else return (this.showLoading('Filtrando Lista de productos...'));
      break;
    }
  }

})
ReactDOM.render(<ProductoApp />, document.getElementById('application'))