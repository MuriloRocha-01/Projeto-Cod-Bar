import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface CodbarContextData {
  codBar: string;
  senha: string;
  numpcf: number;
  posicao: number;
  SaveContext: (codBar: string, senha: string, numpcf: number, posicao: number) => void;
  limparContext: () => void;
}

const CodbarContext = createContext<CodbarContextData | undefined>(undefined);

export const CodbarProvider = ({ children }: { children: ReactNode }) => {
  const [codBar, setCodBar] = useState('');
  const [senha, setSenha] = useState('');
  const [numpcf, setNumpcf] = useState(0);
  const [posicao, setPosicao] = useState(0);

  const SaveContext = useCallback((codBar: string, senha: string, numpcf: number, posicao: number) => {
    setCodBar(codBar);
    setSenha(senha);
    setNumpcf(numpcf);
    setPosicao(posicao);
  }, []);

  const limparContext = useCallback(() => {
    setCodBar('');
    setSenha('');
    setNumpcf(0);
    setPosicao(0);
  }, []);

  return (
    <CodbarContext.Provider value={{ numpcf, codBar, senha, posicao, SaveContext, limparContext }}>
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