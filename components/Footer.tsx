export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 py-4 px-4">
      <p className="text-center text-[9px] md:text-[11px] text-warm-gray/30 whitespace-nowrap">
        &copy; {new Date().getFullYear()} D&apos;Aprile Caff&egrave; — Torrefazione dal 1962 &nbsp;|&nbsp;{" "}
        <a href="https://daprilecaffe.it/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Privacy</a> &nbsp;|&nbsp;{" "}
        <a href="https://daprilecaffe.it/policies/legal-notice" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Cookie</a> &nbsp;|&nbsp;{" "}
        <a href="https://daprilecaffe.it/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Termini</a>
      </p>
    </footer>
  );
}
