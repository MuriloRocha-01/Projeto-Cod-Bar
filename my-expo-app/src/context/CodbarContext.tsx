import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface CodbarContextData {
  codBar: string;
  senha: string;
  SaveContext: (codBar: string, senha: string) => void;
  limparContext: () => void;
}

const CodbarContext = createContext<CodbarContextData | undefined>(undefined);

export const CodbarProvider = ({ children }: { children: ReactNode }) => {
  const [codBar, setCodBar] = useState('');
  const [senha, setSenha] = useState('');

  const SaveContext = useCallback((codBar: string, senha: string) => {
    setCodBar(codBar);
    setSenha(senha);
  }, []);

  const limparContext = useCallback(() => {
    setCodBar('');
    setSenha('');
  }, []);

  return (
    <CodbarContext.Provider value={{ codBar, senha, SaveContext, limparContext }}>
      {children}
    </CodbarContext.Provider>
  );
};

// This is where the magic happens to fix the "Property does not exist" error
export const useCodbar = () => {
  const context = useContext(CodbarContext);

  if (!context) {
    throw new Error("useCodbar must be used within a CodbarProvider");
  }

  return context;
};