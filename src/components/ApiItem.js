import React from 'react';

/**Function component que renderiza o cartão de cada item individualmente.
 * props:
 *    idatividade
 *    nomeatividade
 *    situacaoatividade
 *    handleDelete: function(int string)
 *    handleEdit: function(int string)
 */
function ApiItem(props) {
  return (
    <div className='card'>
      <div className='card-body'>
        <p>{props.idatividade}</p>
        <p>{props.nomeatividade}</p>
        <p>{props.situacaoatividade}</p>
        <input type='button' value='delete' onClick={() => props.handleDelete(props.idatividade)}/>
        <input type='button' value ='edit' onClick={() => props.handleEdit(props.idatividade)} />
      </div>
    </div>
  )
}

export default ApiItem;