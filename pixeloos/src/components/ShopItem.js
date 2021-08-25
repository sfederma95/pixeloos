import React, {useState} from 'react';

function ShopItem({src,name,id,description,amount, price, getItemId, userGold, buyBtn}){
    const [itemInfo, setItemInfo] = useState(false)
    const [btnText, setBtnText] = useState('Buy')
    const displayInfo = () => {
        setItemInfo(true)
    }
    const hideInfo = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)){
            setItemInfo(false)
        }
    }
    const updateItem = (e) => {
        getItemId(e);
        setBtnText('Bought')
    }
    return(
        <div tabIndex='0' onBlur={hideInfo} className='shop-item' id={id}>
            <img onClick={displayInfo}  alt={name} className='item-img' src={src}/>
            {itemInfo === true ? <div className='shop-text'>
                <p id='usr-gold'>Your gold: {userGold}</p>
                <p>Item Name: {name}</p>
                <p>Price: {price} Gold</p>
                <p>Description: {description}</p>
                <p>Increase: {amount} points</p>
                <button className='buy-btn' onClick={updateItem}>{btnText}</button>
            </div> : null}
        </div>
    )
}

export default ShopItem;