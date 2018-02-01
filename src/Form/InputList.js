import React from 'react';

import Button from '../Button';

import './InputList.css';

export default function InputList( props ) {
	const { max, type, value, onChange } = props;
	let editableItems = [
		...value,
		'',
	];
	if ( max > 0 ) {
		editableItems = editableItems.slice( 0, max );
	}

	const onEdit = ( e, idx ) => {
		const newItem = e.target.value;

		if ( idx === value.length ) {
			onChange( [ ...value, newItem ] );
			return;
		}

		onChange( [
			...value.slice( 0, idx ),
			newItem,
			...value.slice( idx + 1 )
		] );
	}

	const onRemove = idx => {
		onChange( [
			...value.slice( 0, idx ),
			...value.slice( idx + 1 )
		] );
	}

	return <ul className="InputList">
		{ editableItems.map( ( uri, idx ) =>
			<li key={ idx } className="InputList-item">
				<input
					type={ type }
					value={ uri }
					onChange={ e => onEdit( e, idx ) }
				/>
				<Button
					disabled={ idx === editableItems.length - 1 }
					onClick={ () => onRemove( idx ) }
				>
					Remove
				</Button>
			</li>
		) }
	</ul>;
}

InputList.defaultProps = {
	max: null,
	type: 'text',
};
