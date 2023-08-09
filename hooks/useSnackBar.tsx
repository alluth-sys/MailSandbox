// useSnackbar.tsx
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import React, {ReactNode, createContext, useContext, useState} from 'react';

type SnackbarContextType = (message: string) => void;

const SnackbarContext = createContext<SnackbarContextType | null>(null);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  const openSnackbar = (newMessage: string) => {
    setMessage(newMessage);
  };

  const closeSnackbar = () => {
    setMessage(null);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <SnackbarContext.Provider value={openSnackbar}>
      {children}
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={message}
        action={action}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
