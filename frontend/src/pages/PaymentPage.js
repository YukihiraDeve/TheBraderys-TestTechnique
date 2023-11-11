import React, {useContext} from 'react';
import "../styles/PayementPage.css"
import { CartContext } from '../components/CartContext';

const PaymentPage = () => {

    const { cartItems } = useContext(CartContext);
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
                    <form>
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