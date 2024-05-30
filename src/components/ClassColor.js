const getClassColor = (location) => {
  switch(location) {
    case 'MP 2':
      return { full: '#0078ae' };
    case 'MAC Gym':
      return { full: '#003a60' };
    case 'MP 1':
      return { full: '#00b259' };
    default:
      return { full: '#ffffff' };
  }
};

export default getClassColor;