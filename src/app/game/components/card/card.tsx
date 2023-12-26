import React from 'react';
import IconXLg from '@/icons/IconXLg';
import IconBxCircle from '@/icons/IconBxCircle';

type Props = {
  handleChoice: (num: number) => void;
  moves: { [key: number]: number };
  number: number;
  className: string;
};

const Card: React.FC<Props> = ({ handleChoice, number, moves, className }) => {
  return (
    <div onClick={() => handleChoice(number)} className={className}>
      {moves[number] === 0 ? (
        <></>
      ) : (
        <></>
      )}
      {moves[number] === 1 ? (
        <IconXLg width='50px' height='50px' style={{ cursor: 'pointer' }} />
      ) : (
        <></>
      )}
      {moves[number] === 2 ? (
        <IconBxCircle width='50px' height='50px' style={{ cursor: 'pointer' }} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
