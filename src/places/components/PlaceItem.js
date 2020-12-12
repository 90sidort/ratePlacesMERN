import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import MapboxGLMap from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";

import "./PlaceItem.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModale] = useState(false);
  const [showReviewModal, setShowRevieModal] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showModalHandler = () => setShowConfirmModale(true);
  const cancelModalHandler = () => setShowConfirmModale(false);
  const showReviewModalHandler = () => setShowRevieModal(true);
  const cancelReviewModalHandler = () => setShowRevieModal(false);
  const deleteModalHandler = async () => {
    setShowConfirmModale(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (e) {}
  };

  console.log(props.image);

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
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
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
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
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.creatorId && (
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
