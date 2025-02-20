import { styled } from "@linaria/react";
import { mediaQueryLessOrEqual, mediaQueryMoreOrEqual } from "@/lib/responsive";

import photo from '../../assets/photo.jpg?url';
import { FC, ImgHTMLAttributes } from "react";

import { IoLocation } from "react-icons/io5";
import { FaUniversity } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { css } from "@linaria/core";


const PhotoBoxContainer = styled.div`
  display: block;
  margin-right: 16px;
  align-items: stretch;

`;

const PhotoBoxWrapper = styled.div`
  
  ${mediaQueryMoreOrEqual('lg')} {
    position: sticky;
    top: 20px;
  }
  ${mediaQueryLessOrEqual('md')} {
    display: flex;
    flex-direction: row;
    margin-right: 0;
  }
`;

const Photo = styled.img`
  width: 280px;
  height: 280px;
  object-fit: contain;
  border-radius: 40px;
  background-color: var(--gray-6);

  margin-bottom: 16px;

  ${mediaQueryLessOrEqual('md')} {
    margin-right: 16px;
    margin-bottom: 0;
    width: 240px;
    height: 240px;
  }

  ${mediaQueryLessOrEqual('sm')} {
    width: 200px;
    height: 200px;
  }
  
` as FC<ImgHTMLAttributes<HTMLImageElement>>;


const InfoBox = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  justify-items: start;
  align-items: center;
`;

export type PhotoBoxProps = {
  name: string;
  location: string;
  institute: string;
  email: string;
}

export const PhotoBox = (props: PhotoBoxProps) => {
  const { name, location, institute, email } = props;
  return <PhotoBoxContainer>
    <PhotoBoxWrapper>
      <Photo src={photo} />
      <div>
        <div className={css`
          font-size: xx-large;
          padding-bottom: 0.5em;
        `}>{name}</div>
        <InfoBox>
          <IoLocation />
          <a href={`https://www.google.com/maps/search/${encodeURI(location)}`}>
            {location}
          </a>

          <FaUniversity />
          <a href={`https://www.google.com/search?q=${encodeURI(institute)}`}>
            {institute}
          </a>

          <IoMail />
          <a href={`mailto:${email}`}>
            {email}
          </a>
        </InfoBox>
      </div>
    </PhotoBoxWrapper>
  </PhotoBoxContainer>;
};