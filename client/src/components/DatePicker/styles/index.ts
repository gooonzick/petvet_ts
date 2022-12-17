import { CSSProperties } from 'react';

export const dayStyle: {
  dayWithDotContainer: CSSProperties;
  dayWithDot: CSSProperties;
} = {
  dayWithDotContainer: {
    position: 'relative',
  },
  dayWithDot: {
    position: 'absolute',
    backgroundColor: 'black',
    height: 0,
    width: 0,
    border: '2px solid',
    borderRadius: 4,
    borderColor: 'rgba(0,0,0,0.5)',
    right: '50%',
    transform: 'translateX(1px)',
    top: '80%',
  },
};
