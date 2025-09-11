import React, { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';
import tw from 'tailwind-styled-components';

const Container = tw.div`flex space-x-4`;
const IconWrapper = tw.div`
  relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
  ${(p) => (p.selected ? 'ring-2 ring-[#F00276]' : 'opacity-50')}
`;
const BackgroundCircle = tw.div`
  w-7 h-7 rounded-full flex items-center justify-center
  ${(p) => (p.isPage ? 'bg-[#F00276]' : 'bg-gray-400')}
`;
const FacebookBadge = tw.div`
  absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center
`;
const FacebookIcon = tw(FaInstagram)`
  ${(p) => (p.selected ? 'text-[#F00276]' : 'text-gray-500')}
`;

const IconSelector = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  return (
    <Container>
      <IconWrapper selected={selectedIcon === 'page'} onClick={() => setSelectedIcon('page')}>
        <BackgroundCircle isPage>
          <span className="text-lg text-white font-bold">P</span>
        </BackgroundCircle>
        <FacebookBadge isPage>
          <FacebookIcon selected={selectedIcon === 'page'} />
        </FacebookBadge>
      </IconWrapper>


    </Container>
  );
};

export default IconSelector;
