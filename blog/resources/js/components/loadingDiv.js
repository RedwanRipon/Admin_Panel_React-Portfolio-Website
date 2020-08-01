import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import loadingImg from '../../images/loading.svg';

class LoadingDiv extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="d-flex mt-5 mb-5 justify-content-center">
                        <Col className="text-center" lg={3} md={3} sm={12}>
                            <img className="w-50" src={loadingImg} alt="loading_image"/>
                        </Col>
                    </Row>
                </Container>

            </Fragment>
        );
    }
}

export default LoadingDiv;
