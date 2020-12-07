import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import MapboxGLMap from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";

import "./PlaceItem.css";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModale] = useState(false);
  const [showReviewModal, setShowRevieModal] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showModalHandler = () => setShowConfirmModale(true);
  const cancelModalHandler = () => setShowConfirmModale(false);
  const showReviewModalHandler = () => setShowRevieModal(true);
  const cancelReviewModalHandler = () => setShowRevieModal(false);
  const deleteModalHandler = () => {
    setShowConfirmModale(false);
    console.log("DELETE");
  };

  console.log(props);

  return (
    <React.Fragment>
      <li className="place-item">
        <Modal
          show={showMap}
          onCancel={closeMapHandler}
          header={props.address}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
          <div className="map-container">
            <MapboxGLMap
              coordinates={[props.coordinates.lat, props.coordinates.lng]}
            />
          </div>
        </Modal>
        <Modal
          show={showConfirmModal}
          onCancel={cancelModalHandler}
          header="Please confirm."
          footerClass="place-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={cancelModalHandler}>
                CANCEL
              </Button>
              <Button danger onClick={deleteModalHandler}>
                DELETE
              </Button>
            </React.Fragment>
          }
        >
          <p>Please confirm deletetion.</p>
        </Modal>
        <Modal
          show={showReviewModal}
          onCancel={cancelReviewModalHandler}
          header="Review"
          footerClass="place-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={cancelReviewModalHandler}>
                CLOSE
              </Button>
            </React.Fragment>
          }
        >
          <p>Very good, would recommend.</p>
        </Modal>
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            <Button inverse onClick={showReviewModalHandler}>
              REVIEW
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showModalHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
