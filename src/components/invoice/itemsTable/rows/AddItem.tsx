import styled from "styled-components"
import { Button } from "../../../UI/Button"

const RowItem = styled.div<{ flex?: number, align?: string, backgroundColor: string }>`
    flex: ${props => props.flex ? props.flex : null};
    background-color: ${props => props.backgroundColor};
    padding: 0 15px;
    line-height: 3em;
    text-align: ${props => props.align ? props.align : null};
    border-bottom: 1px solid #ddd;
`

type Props = {
    handleAddItem: () => void,
    backgroundColor: string
}

export const AddItem = ({ handleAddItem, backgroundColor }: Props) => {

    return (
        <RowItem backgroundColor={backgroundColor}>
            <Button color="blue" onClick={handleAddItem}>[+]</Button>
        </RowItem>
    )
}