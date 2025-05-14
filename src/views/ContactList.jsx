import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../components/GlobalContext";
import ContactCard from "../components/ContactCard.jsx";

const ContactList = () => {

    const context = useContext(GlobalContext);

    return (
        <>
            <div className="container-fluid w-100 ">
                <div className="d-flex flex-row  justify-content-between mt-4 mb-3">
                    <h1 className="text-white">Contact List</h1>
                    <button type="button" className="btn btn-success"><Link to="/addContact" className="text-decoration-none text-white">Add Contact</Link></button>
                </div>
                <ul>
                    {context.contactList.map((contact) => (
                        <ContactCard key={contact.id} contact={contact}/>
                    ))}
                </ul>
                
            </div>

        </>
    )
}
export default ContactList;

