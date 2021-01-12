import { type } from 'os';
import React, { useState } from 'react';
import { Container, Dropdown, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle,
        CardText, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import './commonStyleDesign.css';
import "../../../node_modules/noty/lib/themes/bootstrap-v4.css";
import ResponsivePlayer from '../video/ResposivePlayer';

export const CardListItemCustom = ({itemId, itemCardTitle, itemCardSubtitle, itemCardUrlLink}) =>
{

  return (
    <>
     <Card 
     key={itemId} 
     body 
     outline 
     color="warning"
     className="mx-auto my-2">
          <CardBody>
            <CardTitle>{itemCardTitle}</CardTitle>
            <CardSubtitle>{itemCardSubtitle}</CardSubtitle>
            <CardText>
                <ResponsivePlayer url={itemCardUrlLink} />
            </CardText>
          </CardBody>
      </Card>
    </>
  )
}
