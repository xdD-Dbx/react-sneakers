import { SneakersDataType } from './SneakerDataType'

export type CartPropsType = {
	count: number
	setCount: any
	setCartItems: any
	onClose: () => void
	items: Array<SneakersDataType>
	onRemoveItem: (id: number) => void
	totalPrice: string
}