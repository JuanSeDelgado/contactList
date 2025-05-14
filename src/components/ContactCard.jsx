import { useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faPhone,
    faEnvelope,
    faPen,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const ContactCard = ({ contact }) => {
    const context = useContext(GlobalContext);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const onDeleteContact = (contact) => {
        context.dispatch({ type: "DELETE_CONTACT", payload: contact });
        setShowDeleteModal(false);
    }

    const onEditContact = (contact) => {
        navigate('/addContact')
        context.dispatch({type: "EDIT_CONTACT", payload: contact})
        console.log(contact)
    }

    return (<>
        <div className="card bg-dark mb-3 w-50 m-auto ">
            <div className="row g-0">
                <div className="col-md-3 text-center">
                    <img
                        src="https://thispersondoesnotexist.com"
                        alt="Person generated with AI"
                        className="img-fluid profileImg"
                    />
                </div>
                <div className="col-md-7 px-3">
                    <div className="card-body">
                        <h4 className="card-title text-light">{contact.name}</h4>

                        <p className="card-text text-light">
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="me-2"
                                style={{ color: "#74C0FC" }}
                            />
                            {contact.address}
                        </p>
                        <p className="card-text text-light">
                            <FontAwesomeIcon
                                icon={faPhone}
                                className="me-2"
                                style={{ color: "#74C0FC" }}
                            />
                            {contact.phone}
                        </p>
                        <p className="card-text text-light">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="me-2"
                                style={{ color: "#74C0FC" }}
                            />
                            {contact.email}
                        </p>
                    </div>
                </div>
                <div className="col-md-2 d-flex flex-row justify-content-center pt-3">
                    <span onClick={()=>onEditContact(contact)}><FontAwesomeIcon icon={faPen} style={{ color: "#0f4ecc", }} className="px-3" /></span>
                    <span onClick={()=>setShowDeleteModal(true)}><FontAwesomeIcon icon={faTrash} style={{ color: "#be290e", }} className="px-3"/></span>                    
                </div>
            </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={() => setShowDeleteModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete {contact.name}'s contact?</p>
                            <p className="text-danger">This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={() => onDeleteContact(contact)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {showDeleteModal && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default ContactCard;
