import { Table, Container, Card, Row, Col, Button, ButtonToolbar } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import Axios from 'axios'

import React, { Component } from 'react'

export default class Profile extends Component {
    constructor(){
        super()
        this.state={
            name:'',
            photo:'',
            description:'',
            skill:'',
            location:'',
            dateOfBirth:'',
            expectedSalary:'',
            email:'',
            phone:'',
            showcase:''
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
                dateOfBirth:res.data.result[0].date_of_birth,
                expectedSalary:res.data.result[0].expected_salary,
                email:res.data.result[0].email,
                phone:res.data.result[0].phone,
                showcase:res.data.result[0].showcase
            })
        })
    }    
    render() {
        console.log(this.state.name)
        return (
            <>
            <Header user={this.state.name}/>
            <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
                <Row className='justify-content-center'>
                    <Col md='3'>
                <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: 'url(/img/neneng.png)', backgroundSize: 'cover' }}>
                <Card.Body style={{ height: '200px'}}>
                </Card.Body>
                </Card></Col>
                <Col>
                <Table striped bordered hover>
                <tbody>
                    <tr>
                    <td width='30%'>Name</td>
                    <td> {this.state.name}</td>
                    </tr>
                    <tr>
                    <td>Date Of Birth</td>
                    <td>{this.state.dateOfBirth}</td>
                    </tr>
                    <tr>
                    <td>Location</td>
                    <td>{this.state.location}</td>
                    </tr>
                    <tr>
                    <td>Phone</td>
                    <td>{this.state.phone}</td>
                    </tr>
                    <tr>
                    <td>Description</td>
                    <td>{this.state.description}</td>
                    </tr>
                    <tr>
                    <td>Email</td>
                    <td>{this.state.email}</td>
                    </tr>
                    <tr>
                    <td>Expected Salary</td>
                    <td>{this.state.expectedSalary}</td>
                    </tr>
                    <tr>
                    <td>Skill</td>
                    <td>{this.state.skill}</td>
                    </tr>
                    <tr>
                    <td>Showcase</td>
                    <td>{this.state.showcase}</td>
                    </tr>
                </tbody>
                </Table>
                <ButtonToolbar>
                <Button variant="outline-warning"><FontAwesomeIcon icon={faPencilAlt} /> Edit</Button>&nbsp;
                <Button variant="outline-danger"><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                </ButtonToolbar></Col>
                </Row>
            </Container>
        </>
        )
    }
}
