import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


// validators
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


const InputSession = (props) => {

  function handleSubmit(form) {
    props.postNewSession(form);
    props.resetNewSessionForm();
  };
  if (props.projects.isLoading) {
    return(
      <Loading />
    );
  }

  if (props.projects.errMess) {
    return(
      <h4>{props.projects.errMess}</h4>
    );
  }
    const projectsList = props.projects.projects.map((project) => {
      return (<option key={project.id.toString()}>{project.name}</option>);
    });

    return (
      <Form model="new_study_session" onSubmit={(form) => handleSubmit(form)}>
        <Row className="mt-2 form-group">
          <Col md={7}>
            <label>
              What have you learned today?
              <Control.text model=".description" id="description" name="description"
                  placeholder="Describe what you've learned"
                  className="form-control"
                  validators={{
                      required, minLength: minLength(3), maxLength: maxLength(255)
                  }}
                   />
              <Errors
                  className="text-danger"
                  model=".description"
                  show="touched"
                  messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 255 characters or less'
                  }}
               />
            </label>
          </Col>

          <Col md={5}>
            <label>
              For which project?
              <Control.select model=".project" name="project"
        className="form-control">
                  {projectsList}
              </Control.select>
            </label>
          </Col>
        </Row>

        <Row>
          <Col md={{size:4, offset: 8}}>
              <Button type="submit" color="primary">
                Add
              </Button>
          </Col>
        </Row>

      </Form>
    );
}


export default InputSession;
