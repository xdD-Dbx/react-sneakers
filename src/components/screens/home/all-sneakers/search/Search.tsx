import { ChangeEvent } from 'react'
import { DeleteSvg } from '../../../../../layout/cart/cart-item/DeleteSvg'
import styles from './Search.module.css'
import { SearchSvg } from './SearchSvg'

type SearchProps = {
	setSearchValue: (value: string) => void
	searchValue: string
}

export const Search = ({ setSearchValue, searchValue }: SearchProps) => {
	const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value)
	}

	return (
		<div className={`${styles.searchBox} d-flex align-center`}>
			<SearchSvg />
			<input onChange={onChangeSearchValue} value={searchValue} placeholder='Поиск...' />
			{searchValue && <button onClick={() => setSearchValue('')}><DeleteSvg /></button>}
		</div>
	)
}