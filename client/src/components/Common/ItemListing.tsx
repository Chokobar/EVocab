import * as React from 'react';

interface ItemListingProps {
    listItems: any[];
}

export const ItemListing = (props: ItemListingProps) => {
    const checkingValue = props && props.listItems;
    return (
        <div>
            {checkingValue && props.listItems[0]} {checkingValue && props.listItems[1]}
        </div>
    )
}