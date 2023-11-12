import React, {useContext, useState} from 'react';
import "../styles/PayementPage.css"
import { CartContext } from '../components/CartContext';
import { PROCESS_PAYMENT_MUTATION } from '../components/graphql/mutations';
import { useMutation } from '@apollo/client';

const PaymentPage = () => {
    const { cartItems } = useContext(CartContext);
    const [formData, setFormData] = useState({ name: '', number: '', date: '', security: '' });
    const [processPayment] = useMutation(PROCESS_PAYMENT_MUTATION);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        processPayment({ variables: formData })
            .then(response => {
                console.log(response.data);
                // Traitement en cas de succès
            })
            .catch(error => {
                console.error(error);
                // Traitement en cas d'erreur
            });
    };

    return (
        <div className="background">
            <div className="container gauche">
                <h1 className="title">Récapitulatif</h1>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} - {item.quantity} x {item.price.toFixed(2)} €
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container droite">
                <div className="container-payement">
                    <h1 className="title">Paiement</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nom sur la carte
                            <input type="text" name="name" />
                        </label>
                        <label>
                            Numéro de carte
                            <input type="text" name="number" />
                        </label>
                        <label>
                            Date d'expiration
                            <input type="text" name="date" />
                        </label>
                        <label>
                            Code de sécurité
                            <input type="text" name="security" />
                        </label>
                        <input type="submit" value="Valider" />
                    </form>

            </div>
            </div>
        </div>
        
            
    );
};

export default PaymentPage; 