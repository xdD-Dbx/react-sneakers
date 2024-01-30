import axios from 'axios'
import { useState } from 'react'
import { CartPropsType } from "../../types/CartPropsType"
import styles from "./Cart.module.css"
import { CartItem } from "./cart-item/CartItem"
import { DeleteSvg } from "./cart-item/DeleteSvg"
import { CartTemplate } from "./cart-template/CartTemplate"
import { Total } from "./total/Total"

export const Cart = ({ onClose, items, onRemoveItem, count, setCount, setCartItems, totalPrice }: CartPropsType) => {
  const [clickedShop, setClickedShop] = useState(false)

  const clickOnShop = async () => {

    try {
      const deletePromises = items.map(item =>
        axios.delete(`https://65b01b852f26c3f2139c81de.mockapi.io/cart/${item.id}`)
      )
      await Promise.all(deletePromises)

      setClickedShop(!clickedShop)
      setCount(count + 1)
      setCartItems([])
    } catch (error) {
      console.error('Ошибка при удалении элементов из корзины:', error)
      axios.get('https://65b01b852f26c3f2139c81de.mockapi.io/cart')
        .then(res => setCartItems(res.data))
      alert('Ошибка при оформлении заказа')
    }
  }

  return (
    <div className={`${styles.overlay} d-flex justify-between`}>
      <div className={styles.overlayInner} onClick={onClose}></div>
      <div className={`${styles.cart} d-flex flex-column`}>
        <h2 className="d-flex justify-between">
          Корзина
          {items.length && clickedShop === false ? (
            <div className="cu-p" onClick={onClose}>
              <DeleteSvg />
            </div>
          ) : null}
        </h2>
        {clickedShop ?
          <div className="d-flex flex-auto align-center">
            <CartTemplate
              image={'./img/orderIsProcessed.png'}
              title={'Заказ оформлен!'}
              text={`Ваш заказ #${count} скоро будет передан курьерской доставке`}
              buttonText={'Вернуться назад'}
              onClose={onClose}
            />
          </div> :
          (items.length ? (
            <div className={styles.items}>
              {items.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    onRemoveItem={onRemoveItem}
                  />
                )
              })}
            </div>
          ) : (
            <div className="d-flex flex-auto align-center">
              <CartTemplate
                image={'./img/cart.png'}
                title={'Корзина пустая'}
                text={'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                buttonText={'Вернуться назад'}
                onClose={onClose}
              />
            </div>
          ))}
        {items.length && clickedShop === false ? <Total
          totalPrice={totalPrice}
          clickOnShop={clickOnShop}
        /> : null}
      </div>
    </div>
  )
}
