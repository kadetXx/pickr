import styled from "@emotion/styled";

export const StyledHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.4rem;
  cursor: text;
`;

export const Control = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0.25rem 0.5rem;
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  transition: background-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    background-color: var(--col-grey-400);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px white, 0 0 0 4px var(--col-teal);
  }

  &:active {
    background-color: var(--col-grey-300);
  }
`;
