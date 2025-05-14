import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../components/GlobalContext";

const AddContact = () => {
    const context = useContext(GlobalContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const formDataDefault= {
        name: '',
        email: '',
        phone: '',
        address: ''
    }
    const navigate = useNavigate();
    

    useEffect(() => {
        if (context.contactToEdit) {
            console.log('useEffect to set Form to Edit')
            setFormData(context.contactToEdit);
        }
    }, [context.contactToEdit])

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (context.contactToEdit) {
            context.dispatch({ 
                type: 'UPDATE_CONTACT', 
                payload: { ...formData, id: context.contactToEdit.id } 
            });
            context.setContactToEdit(null);
            setFormData(formDataDefault);
            navigate('/');
        } else {
            if (formData.name && formData.email && formData.phone && formData.address) {
                context.dispatch({
                    type: "ADD_CONTACT",
                    payload: formData
                });
                setFormData(formDataDefault);
                navigate('/');
            } else {
                alert('You must fill all the contact fields')
            }
        }
    };

    return (
        <>
            <div className="container-fluid m-auto">
                <h1 className="text-white text-center m-auto">
                    {context.contactToEdit ? 'Edit Contact' : 'Add Contact'}
                </h1>

                <form className="m-auto w-50" onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label text-light">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-light">
                            Email address
                        </label>
                        <input
                            type=""
                            className="form-control"
                            id="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label text-light">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label text-light">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg btn-block w-100">
                        {context.contactToEdit ? 'Update' : 'Save'}
                    </button>
                    <div className="mt-3">
                        <Link to="/" className="text-light">
                            Back to Contact List
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};
export default AddContact;
