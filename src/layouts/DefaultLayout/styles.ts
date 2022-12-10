import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(101vh - 5rem);
  margin: 2rem auto;
  margin-inline: auto;
  padding-inline: 2.5rem;

  background-color: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
