import React from 'react';
import Komenti from './Komenti';
import { Box, IconButton , Typography} from '@mui/material';

const Komentet = ({ komentet, postimId, token, user, deleteKomenti, updateKomenti, isEnrolled }) => {
  return (
    <Box>
      {komentet.length > 0 ? (komentet.map((koment) => (
        <Komenti 
          key={koment.id}
          koment={koment}
          user={user}
          deleteKomenti={deleteKomenti}
          komentet={komentet}
          updateKomenti={updateKomenti}
          isEnrolled={isEnrolled}
        />
      ))): <Typography sx={{display:"flex", justifyContent:"center", padding:2}}>No comments Have been Posted here</Typography>}

    </Box>
  );
}

export default Komentet;
