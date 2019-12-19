import React, { Component } from 'react'
import { Container, Card, Row, Col, Button, Form, Alert } from 'react-bootstrap'
import Header from '../Header'
import Axios from 'axios'

export default class EditProfile extends Component {
    constructor(){
        super()
        this.state={
            name:'',
            photo:'',
            description:'',
            skill:'',
            location:'',
            date_of_birth:'',
            expected_salary:'',
            email:'',
            phone:'',
            showcase:'',
            message: ''
        }
    }
    componentDidMount(){
        this.getData(`http://34.229.234.20:8000/api/v1/engineers/`+this.props.match.params.id)
    }
    getData = (url) =>{
        Axios.get(url)
        .then(res=>{
            this.setState({
                name:res.data.result[0].name,
                photo:res.data.result[0].photo,
                description:res.data.result[0].description,
                skill:res.data.result[0].skill,
                location:res.data.result[0].location,
                date_of_birth:res.data.result[0].date_of_birth,
                expected_salary:res.data.result[0].expected_salary,
                email:res.data.result[0].email,
                phone:res.data.result[0].phone,
                showcase:res.data.result[0].showcase
            })
        })
    }

    Update = e =>{
        e.preventDefault();
        const data = {
            name: this.state.name,
            date_of_birth: this.state.date_of_birth,
            location: this.state.location,
            phone: this.state.phone,
            description: this.state.description,
            email: this.state.email,
            expected_salary: this.state.expected_salary,
            skill: this.state.skill,
            showcase: this.state.showcase
        }
        Axios.put('http://34.229.234.20:8000/api/v1/engineers/'+localStorage.getItem('id'), data, { headers: { Authorization:'Bearer '+localStorage.getItem('token'), email: localStorage.getItem('email') }})
        .then( res=>{
            this.setState({
                message: 'Update Success!'
            })
            // this.props.history.push(`/profile/${localStorage.getItem('id')}`)
        })
        .catch(err=>{
            this.setState({
                message: 'Update Failed!'
            })
        })
    }

    render() {
        return (
            <>
            <Header user={this.state.name}/>
            <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
            <Row className='justify-content-center'>
            
            <Col md='3'>
            <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: 'url(/img/elon.jpg)', backgroundSize: 'cover' }}>
            <Card.Body style={{ height: '200px'}}>
            </Card.Body>
            </Card></Col>
            <Col>
            { (this.state.message==='Update Failed!') ? ( ['danger'].map((variant, idx) => (
                        <Alert key={idx} variant={variant}>
                          {this.state.message}
                        </Alert>)
                      )) : (this.state.message==='Update Success!') ? ( ['success'].map((variant, idx) => (
                        <Alert key={idx} variant={variant}>
                          {this.state.message}
                        </Alert>)
                      )) : null
                }
            <Form onSubmit={ (e) => this.Update(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ name: e.target.value })} name="name" type="text" value={this.state.name} placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ date_of_birth: e.target.value })} name="date_of_birth" type="text" value={this.state.date_of_birth} placeholder="Enter Date Of Birth" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Location</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ location: e.target.value })} name="location" type="text" value={this.state.location} placeholder="Enter Location" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ phone: e.target.value })} name="phone" type="text" value={this.state.phone} placeholder="Enter phone number" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ description: e.target.value })} name="description" type="text" value={this.state.description} placeholder="Enter description" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ email: e.target.value })} name="email" type="email" value={this.state.email} placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Expected Salary</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ expected_salary: e.target.value })} name="expected_salary" type="text" value={this.state.expected_salary} placeholder="Enter Expected Salary (IDR)" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Skill</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={ (e) => this.setState({ skill: e.target.value })} name="skill" type="text" value={this.state.skill} placeholder="Enter skill" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Showcase</Form.Label>
                    <Form.Control onChange={ (e) => this.setState({ showcase: e.target.value })} name="showcase" type="text" value={this.state.showcase} placeholder="Enter showcase link" />
                </Form.Group>
                <Button variant="outline-warning" type="button" href={`/profile/${localStorage.getItem('id')}`} >Cancel</Button>&nbsp;
                <Button variant="outline-primary" type="submit">Save</Button>
            </Form>
            </Col>
            </Row>
            </Container>
            </>
        )
    }
}
