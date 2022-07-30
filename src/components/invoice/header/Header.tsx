import styled from "styled-components"

const SHeader = styled.div`
  background-color: #357EBD;
  color: #FFF;
  padding: 0 14px;
  margin-bottom: 1em;
  text-align: center;
  line-height: 2.5em;
`

export const Header = () => {
    return (
        <SHeader>
            INVOICE
        </SHeader>
    )
}