import React, {Component} from 'react';
import useForm from 'react-hook-form';
import * as Yup from 'yup';

/**Classe que gera e renderiza um formulário html responsável pela
 * requisição http POST.
 */
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.apiEndPoint = props.apiEndPoint;
    this.postCallBack = props.postCallBack; //callback function
    this.state = {
      nomeatividade: '',
      situacaoatividade: '',
    };
    this.name = 'PostForm';
    /**É necessário usar bind para especificar que, dentro da função,
     * 'this' faz referência ao objeto da classe PostForm, senão, ao passar
     * as funções para as propriedades no JSX abaixo (exemplo: propriedade
     * onChange do input) a função vai perder a referẽncia do objeto porque
     * isso aqui é javascript.
     */
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  /**Quando um campo é alterado, um evento é gerado. A propriedade 'name'
   * do evento identifica o campo. A propriedade 'value' identifica o
   * valor da alteração (novos caracteres ou dígitos inseridos). Usando
   * estas propriedades é possível atualizar o estado somente no campo
   * necessário. Eventos são gerado na medida em que o usuário digita.
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    /**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * Esta função é necessária para prevenir que o clique no botão de
     * submit execute a sua função default em html, atualizando o
     * browser e interrompendo o envio da requisição http.*/
    event.preventDefault();
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
    const postBody = {
      nomeatividade: this.state.nomeatividade,
      situacaoatividade: this.state.situacaoatividade,
    };
    /**Outra alternativa: usar FormData para pegar os inputs pelo evento em
     * vez de usar this.state */
    
    this.postCallBack(postBody);
  }
  
  render() {
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Atividade</label>
          <input type='text' name='nomeatividade' onChange={this.handleChange}></input>
          <br/>
          
          <label>Situação</label>
          <input type='text' name='situacaoatividade' onChange={this.handleChange}></input>
          <br/>
          
          <input type='submit' value='submit'></input>
        </form>
      </div>
    )
  }
}

export default PostForm;