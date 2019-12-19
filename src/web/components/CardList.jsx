import React from 'react'
import { Card, Row } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEnvelope, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function CardList(props) {
    return (
        <>
            <Row className='justify-content-center mt-4'>
            {props.list.map(item => (
            <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: 'url(/img/neneng.png)', backgroundSize: 'cover' }}>
                <Card.Body style={{ height: '200px'}}>
                </Card.Body>
                <Card.Footer className="text-white bg-dark" style={{ borderBottomLeftRadius: '15%', borderBottomRightRadius: '15%', lineHeight: '75%', opacity: '0.8'}}>
                    <b style={{ fontSize : '20px'}}><Link to={`/profile/${item.id}`} style={{ color: 'white' }}> {item.name}</Link></b><br />
                    <div className='mt-2'>
                    <small> {item.description}</small><br/>
                    <small><FontAwesomeIcon icon={faEnvelope} size='md'></FontAwesomeIcon> {item.email}</small><br />
                    <small><FontAwesomeIcon icon={faMoneyBillWave} size='md'></FontAwesomeIcon> IDR {item.expected_salary}</small><br /></div>
                        <small>Skill :</small><br />
                    <div className='ml-3'><small> <p>{item.skill}</p></small></div>
                </Card.Footer>
                </Card>
            ))}</Row>
        </>
    )
}

export default CardList