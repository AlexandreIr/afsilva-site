export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand" aria-label="AFSILVA Tech">
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="brand-name">
        AFSILVA <b>TECH</b>
      </span>
      {compact ? null : <span className="sr-only">Tecnologia para atendimento</span>}
    </span>
  );
}
