import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const myAgenda = "juanSeAgenda";
    const url = `https://playground.4geeks.com/contact/agendas/${myAgenda}`;
    let initialContacts = [];
    const [contactToEdit ,setContactToEdit] = useState(null);
   

    useEffect(() => {
        console.log("useEffect Triggered");
        getAgenda();
    }, []);

    const getAgenda = () => {
        fetch(`${url}/contacts`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched contacts:", data.contacts);
                dispatch({ type: "SET_CONTACTS", payload: data.contacts });
            })
            .catch((err) => console.error("There was an error:", err));
    };

    function contactReducer(contactList, action) {
        switch (action.type) {
            case "ADD_CONTACT": {
                console.log("Add task on Reducer");

                fetch(`${url}/contacts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: action.payload.name,
                        phone: action.payload.phone,
                        email: action.payload.email,
                        address: action.payload.address
                    }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("The Contact can't be added");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        if (data) {
                            dispatch({ type: "SET_CONTACTS", payload: [...contactList, data] });
                        }
                    })
                    .catch((error) => console.error("Opps there was an error:", error));
                return contactList;
            }
            case "EDIT_CONTACT": {
                console.log("Edit contact");
                setContactToEdit(action.payload);
                return contactList;
            }
            case 'UPDATE_CONTACT':{
                console.log('Updating Contact ...')
                fetch(`${url}/contacts/${action.payload.id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            name: action.payload.name,
                            phone: action.payload.phone,
                            email: action.payload.email,
                            address: action.payload.address
                        }
                    ),
                }).then ((res)=> {
                    if(!res.ok){
                        throw new Error("Contact can't be updated");
                    }
                    return res.json()
                }).then((data)=>{
                    if (data){
                        getAgenda();
                        setContactToEdit(null);
                    }
                }).catch((error)=> console.error("Oops there was an error:",error))
                return contactList
            }
            case "DELETE_CONTACT": {
                console.log("------ On Delete ------");
                fetch(`${url}/contacts/${action.payload.id}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                    },
                })
                    .then((res) => {
                        console.log(res.status);
                        if (res.status != 204) {
                            throw new Error("There was an error on delete");
                        }
                        return res;
                    })
                    .then((data) => {
                        if (data) {
                            getAgenda();
                        }
                    });
                console.log("Delete Contact");
                return contactList.filter(
                    (contact) => contact.id !== action.payload.id
                );
            }
            case "SET_CONTACTS": {
                return action.payload;
            }
            default:
                return contactList;
        }
    }
    const [contact, setContact] = useState({
        id: null,
        name: "Jhon Doe",
        phone: "+57",
        email: "jhondoe@gmail.com",
        address: "0 0 0 0",
    });

    const [contactList, dispatch] = useReducer(contactReducer, initialContacts);

    //useReducer for list or for contact??
    return (
        <GlobalContext.Provider value={{ contact, setContact, contactList, dispatch, contactToEdit, setContactToEdit }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
