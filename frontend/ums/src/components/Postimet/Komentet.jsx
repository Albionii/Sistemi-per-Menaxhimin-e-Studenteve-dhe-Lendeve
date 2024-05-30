import React from 'react';
import Komenti from './Komenti';
import { Box, IconButton , Typography} from '@mui/material';

const Komentet = ({ komentet, postimId, token, user, deleteKomenti, updateKomenti, displayedCommentsCount }) => {
  return (
    <Box>
      
      {komentet.slice(0, displayedCommentsCount).map((koment) => (
        <Komenti 
          key={koment.id}
          koment={koment}
          user={user}
          deleteKomenti={deleteKomenti}
          komentet={komentet}
          updateKomenti={updateKomenti}
        />
      ))}
    </Box>
  );
}

export default Komentet;
