import React from "react";  

import {  
    DashboardAnimation
} from "./styled";

import ContainerAuthenticated from "containers/Authenticated";
import { Row, Col } from "reactstrap";
import useController from "./controller";
import PageHeader from "components/Dashboard/PageHeader";

export default function DashboardHome(){  

    const {
        header
    } = useController()

    return ( 
        <>
            <ContainerAuthenticated> 
                <PageHeader header={header} />
                <Row>
                    <Col></Col>
                    <Col sm={12} md={6} lg={4}>
                        <DashboardAnimation animationData={require('assets/lotties/peace.json')} />
                    </Col> 
                    <Col></Col>
                </Row>
            </ContainerAuthenticated> 
        </>
    );
}