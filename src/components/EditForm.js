import React, {Component} from 'react';

/**Formulário para alteração de uma entrada.
 * props:
  * itemID: int
  * nomeAtual: string
  * situacaoAtual: string
  * submitCallBack: função(event)
 */
class EditForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      idatividade: props.idatividade,
      nomeatividade: props.nomeatividade,
      situacaoatividade: props.situacaoatividade,
    };
    this.submitCallBack = props.submitCallBack;
    this.cancelCallBack = props.cancelCallBack;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.idatividade !== prevProps.idatividade) {
      this.setState({
        idatividade: this.props.idatividade,
        nomeatividade: this.props.nomeatividade,
        situacaoatividade: this.props.situacaoatividade,
      })
    }
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const putBody = {
      idatividade: this.state.idatividade,
      nomeatividade: this.state.nomeatividade,
      situacaoatividade: this.state.situacaoatividade,
    }
    this.submitCallBack(putBody)
  }

  render() {
    console.log('rerendering editform with state id=' + this.state.idatividade + 'and props id=' + this.props.idatividade);
    return(
      <div className='edit-form'>
        <form onSubmit={this.handleSubmit}>
          Nome<input type='text' name='nomeatividade' value={this.state.nomeatividade} onChange={this.handleChange}></input>
          Situação<input type='text' name='situacaoatividade' value={this.state.situacaoatividade} onChange={this.handleChange}></input>
          <input type='submit' value='alterar' ></input>
          <input type='button' value='cancelar' onClick={this.cancelCallBack}></input>
        </form>
      </div>
    );
  }
}

export default EditForm;