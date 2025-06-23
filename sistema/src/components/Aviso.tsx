type AvisoProps = {
  mensagem: string;
};
export default function Aviso({ mensagem }: AvisoProps) {
  return <div className="aviso">{mensagem}</div>;
}
