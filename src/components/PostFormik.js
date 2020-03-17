import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

/**
 * Form function component:
 * Form input fields:
  * nomeatividade
  * situacaoatividade
 */

const yupSchema = Yup.object({
  nomeatividade: Yup.string()
    .required('Campo obrigatório.'),
  situacaoatividade: Yup.string()
    .max(1, 'Digite apenas uma letra')
    .required('Campo obrigatório.')
})

function PostFormik(props) {
  return(
    <Formik
      initialValues={{nomeatividade:'', situacaoatividade:''}}
      validationSchema={yupSchema}
      onSubmit={(values, {setSubmitting}) => {
        console.log(values);
        props.onSubmitCallback(values);
      }}
    >
      <Form>
        <label htmlFor='nomeatividade'>Nome</label>
        <Field name='nomeatividade' type='text' />
        <ErrorMessage name='nomeatividade' />
        <br></br>

        <label htmlFor='situacaoatividade'>Situação</label>
        <Field name='situacaoatividade' type='text'/>
        <ErrorMessage name='situacaoatividade' />
        <br></br>

        <button type='submit'>Enviar</button>
      </Form>

    </Formik>
  )
}

export default PostFormik;