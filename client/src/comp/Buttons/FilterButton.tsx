import React from "react";
import styled from "styled-components/macro";

interface IProps {
  setFilterOn: () => void;
}

export default function FilterButton({ setFilterOn }: IProps) {
  return (
    <FilterIconWrapper onClick={setFilterOn}>
      <span>Filters</span>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.2857 -0.00012207H0.714298C0.319795 -0.00012207 0 0.319673 0 0.714175V4.28558C4.18526e-05 4.48798 0.0859651 4.68088 0.236425 4.81631L7.14285 11.032V19.2855C7.14268 19.68 7.46231 20 7.85681 20.0002C7.96776 20.0002 8.07721 19.9744 8.17644 19.9248L12.4621 17.782C12.7043 17.661 12.8573 17.4134 12.8571 17.1427V11.032L19.7636 4.81773C19.9144 4.68201 20.0004 4.48852 20 4.28558V0.714175C20 0.319673 19.6802 -0.00012207 19.2857 -0.00012207ZM18.5714 3.96771L11.665 10.182C11.5141 10.3177 11.4282 10.5112 11.4286 10.7141V16.7013L8.5714 18.1298V10.7141C8.57136 10.5117 8.48544 10.3188 8.33498 10.1834L1.42855 3.96771V1.42843H18.5714V3.96771Z" />
      </svg>
    </FilterIconWrapper>
  );
}

const FilterIconWrapper = styled.div`
  cursor: pointer;
  fill: var(--dark);
  display: flex;
  align-items: center;

  & span {
    font-size: 1.8rem;
  }

  & svg {
    margin: 2.5rem 2rem 2rem 1rem;
  }

  &:active {
    fill: var(--highlight);
    color: var(--highlight);
  }
`;
