import fragile from '../fragile'
import React from 'react'

export default function BetterItemRow(props) {
    if (props && props.item) {
        return <tr>
            <td>{props.item.itemID}</td>
            <td>{props.item.itemName}</td>
            <td>${props.item.itemPrice}</td>
            <td>{props.item.boxName} ({props.item.boxID})</td>
    <td>{props.lotName}</td>
            <td>{fragile(props.item.itemFragile)}</td>
        </tr>
    } else {
        return <tr><td>Not enough data</td></tr>
    }
}