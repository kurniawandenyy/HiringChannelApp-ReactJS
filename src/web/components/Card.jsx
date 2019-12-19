import React, { Component } from 'react'
import axios from 'axios'
import Header from '../Header'
import CardList from './CardList'
import { Button,Row, ButtonToolbar, DropdownButton, Dropdown, Container } from 'react-bootstrap'

export default class Card extends Component {
    constructor(){
        super()
        this.state={
            card: [],
            base_url: '',
            isLoading: false,
            isError: false,
            next: '',
            page: '',
            token: '',
            previous: '',
            user: 'Budi Setiawan'
        }
    }

    componentDidMount(){
        // do something after component mounted
        this.getAll('http://34.229.234.20:8000/api/v1/engineers?page=1')
        fetch('http://34.229.234.20:8000/api/v1/engineers?page=1').then(response=>{
          console.log(response.headers)
        })
      }

      getToken = (headers) =>{
        if (headers && headers.authorization) {
          var parted = headers.authorization.split(" ");
            if (parted.length === 2) {
             this.setState({
               token: parted[1]
             }) 
            } else {
             return null;
            }
          } else {
           return null;
          }
      }
      // callbackFunction = (data) =>{
      //   axios.get(`http://34.229.234.20:8000/api/v1/engineers?page=1&name=${data}`)
      //   .then(res => {
      //         this.setState({ 
      //         card: res.data.result.data,
      //         next: res.data.nextPage,
      //         previous: res.data.prevPage,
      //         isLoading: false, isError: false})
      //   })
      //   .catch(err => {
      //     // console.log(err)
      //     this.setState({ isLoading: false, isError: true })
      //   })
      // }

      // isAuthenticate(token)=>{

      // }
      getAll = (url) => {
        // alert('button clicked!')
        console.log(url)
        this.setState({ isLoading: true })
        axios.get(url)
          .then(res => {
            this.setState({ 
                card: res.data.result.data,
                next: res.data.nextPage,
                previous: res.data.prevPage,
                base_url: url,
                page: res.data.page,
                isLoading: false, isError: false})
          })
          .catch(err => {
            // console.log(err)
            this.setState({ isLoading: false, isError: true })
          })
      }

      getData = (data) => {
        // this.getAll(this.state.base_url+`&name=${data}`)
        axios.get(`http://34.229.234.20:8000/api/v1/engineers?page=1&name=${data}`)
        .then(res => {
          this.setState({ 
              card: res.data.result.data,
              next: res.data.nextPage,
              previous: res.data.prevPage,
              page: res.data.page,
              isLoading: false, isError: false})
        })
        .catch(err => {
          // console.log(err)
          this.setState({ isLoading: false, isError: true })
        })
      }
    render(){
        console.log(this.state.base_url)
        const { card, isLoading, isError, previous, next, page } = this.state;
        // <Header parentCallback={callbackFunction} />
        return (
          <>
          <Header getDataFromSearch={this.getData} searchBar='true' user={this.state.user}/>
          <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
          <Row>
            <ButtonToolbar>
            {['Primary'].map(
                variant => (
                <DropdownButton
                    title='Per Page'
                    variant={variant.toLowerCase()}
                    id={`dropdown-variants-${variant}`}
                    key={variant}>
                    <Dropdown.Item eventKey="1" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=5')}> 5</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=10')}> 10</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=15')}> 15</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={() => this.getAll((this.state.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=20')}> 20</Dropdown.Item>
                </DropdownButton>
                ),
            )}
            </ButtonToolbar>&nbsp;
            <ButtonToolbar>
            {['Primary'].map(
                variant => (
                <DropdownButton
                    title='Sort By'
                    variant={variant.toLowerCase()}
                    id={`dropdown-variants-${variant}`}
                    key={variant}>
                    <Dropdown.Item eventKey="1" onClick={() => this.getAll((this.state.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=date_updated&order=asc|&sort=date_updated&order=desc/gi,''))+'&sort=name&order=asc')}>Name (A-Z)</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => this.getAll((this.state.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=date_updated&order=asc|&sort=date_updated&order=desc/gi,''))+'&sort=name&order=desc')}>Name (Z-A)</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => this.getAll((this.state.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=date_updated&order=asc|&sort=date_updated&order=desc/gi,''))+'&sort=date_updated&order=asc')}>Date (Asc)</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={() => this.getAll((this.state.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc|&sort=date_updated&order=asc|&sort=date_updated&order=desc/gi,''))+'&sort=date_updated&order=desc')}>Date (Desc)</Dropdown.Item>
                </DropdownButton>
                ),
            )}
            </ButtonToolbar></Row>
        { // conditional rendering show loading and error
          isLoading ?
          <Row className="justify-content-center">
          <p>Loading..</p></Row> : 
          isError ? (
            <Row className="justify-content-center">
              <Button variant="outline-primary" onClick={() => this.getAll('http://34.229.234.20:8000/api/v1/engineers?page=1')}> Try Again</Button>
            </Row>
          ) : 
          
          <CardList list={card} />
            }

            <Row className="justify-content-center" >
            { // conditional rendering when there is no previous
              (!previous) ? <Button variant="outline-primary" disabled> Previous </Button> : <Button variant="outline-primary" onClick={() => this.getAll(previous)}> Previous </Button>
            }
            &nbsp;<Button variant="outline-primary" disabled> {page} </Button>&nbsp;
            {(!next) ? <Button variant="outline-primary" disabled> Next </Button> : <Button variant="outline-primary" onClick={() => this.getAll(next)}> Next </Button>}</Row>
            </Container>
            </>
        );
    }
}
