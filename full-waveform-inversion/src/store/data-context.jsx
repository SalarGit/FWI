// Reducer
// Function that reduces one ore more complex values to a simpler one
// Much like C++ reduce
// Example: Mapping an array of numbers to the sum

import { createContext, useReducer } from 'react';

// Object that contains a React component
export const SettingsContext = createContext({
    items: [], // Initial value, will later store shopping cart items. Object with key-value pair with array of items.
    // addItemToCart: () => {}, // Bc of this default value I've set, cartContext will suggest it, like typescript, auto completion
    // updateItemQuantity: () => {}
});

// Should not be recreated whenever comp func executes (due to state change), 
// bc it doesn't need access to props or anything like that
function settingsReducer(state, action) { // This func will be called by React after u dispatch an action with shoppingCartDispatch.
    // Return updated state
    // check action.type and then do whatever must be done
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
            id: action.payload,
            name: product.title,
            price: product.price,
            quantity: 1,
            });
        }

        return {
            ...state, // Spread old state first, so that we don't lose other values. (Not needed here, bc we have only 1 value in this state)
            items: updatedItems, // Then update 'items'
        };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state, // again not needed
            items: updatedItems,
        };
    }
}

// Managing & providing CartContext data
export default function SettingsContextProvider({ children }) {
    const [settingsState, settingsDispatch] = useReducer(// Dispatch 'actions' that will be handled by a to-be-defined Reducer func (shoppingCartReducer) and then produce new state
        // Reducer func, initial value
        shoppingCartReducer,
        {
        items: [],
        }
    );

    // Replaced useState with useReduce so that we can put the logic of the 'handleX' functions above the Context component.
    // This way the component is much cleaner and readable. You now only see the actual actions in the comp,
    // such as ADD_ITEM
    // const [shoppingCart, setShoppingCart] = useState({
    //     items: [],
    //   });
    
    function handleAddItemToCart(id) { // Dispatch an action.
        shoppingCartDispatch({ // Action: usually object with info about the action
            type: 'ADD_ITEM', // Property that identifies the action
            payload: id,
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId, // if property name and value is same, u can shorten like this
                amount
            }
        });
    }
    
    const ctxValue = {
    items: settingsState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity
    };

    return <CartContext.Provider value={ctxValue}>
        {children}
    </CartContext.Provider>;
}
